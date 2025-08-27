// deployService.js
const axios = require('axios');
const FormData = require('form-data');
const config = require('./config');
const { streamToBuffer } = require('./utils'); // Akan kita buat di langkah selanjutnya

async function deployToVercel(fileStream, domainName, repoName) {
    try {
        // Buat repository di GitHub
        const githubResponse = await axios.post(
            'https://api.github.com/user/repos',
            {
                name: repoName,
                auto_init: false,
                private: false
            },
            {
                headers: {
                    Authorization: `token ${config.GITHUB_TOKEN}`,
                    Accept: 'application/vnd.github.v3+json'
                }
            }
        );

        // Upload file ke GitHub
        const content = await streamToBuffer(fileStream);
        const contentBase64 = content.toString('base64');

        await axios.put(
            `https://api.github.com/repos/${config.GITHUB_USERNAME}/${repoName}/contents/index.html`,
            {
                message: 'Add index.html',
                content: contentBase64
            },
            {
                headers: {
                    Authorization: `token ${config.GITHUB_TOKEN}`,
                    Accept: 'application/vnd.github.v3+json'
                }
            }
        );

        // Deploy ke Vercel
        const vercelResponse = await axios.post(
            'https://api.vercel.com/v13/deployments',
            {
                name: repoName,
                gitSource: {
                    type: 'github',
                    repoId: githubResponse.data.id,
                    ref: 'main'
                },
                target: 'production'
            },
            {
                headers: {
                    Authorization: `Bearer ${config.VERCEL_API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return {
            success: true,
            domain: `https://${domainName}.vercel.app`,
            status: vercelResponse.data.status
        };
    } catch (error) {
        console.error('Error deploying to Vercel:', error.response?.data || error.message);
        return { success: false, message: 'Gagal mendeploy ke Vercel.' };
    }
}

async function deployToNetlify(fileStream, domainName) {
    try {
        const formData = new FormData();
        formData.append('file', fileStream, { filename: 'index.html' });

        const netlifyResponse = await axios.post(
            'https://api.netlify.com/api/v1/sites',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${config.NETLIFY_API_TOKEN}`,
                    ...formData.getHeaders()
                }
            }
        );

        if (domainName !== netlifyResponse.data.subdomain) {
            await axios.patch(
                `https://api.netlify.com/api/v1/sites/${netlifyResponse.data.id}`,
                { name: domainName },
                {
                    headers: {
                        Authorization: `Bearer ${config.NETLIFY_API_TOKEN}`
                    }
                }
            );
        }

        return {
            success: true,
            domain: `https://${netlifyResponse.data.subdomain}.netlify.app`,
            status: netlifyResponse.data.state
        };
    } catch (error) {
        console.error('Error deploying to Netlify:', error.response?.data || error.message);
        return { success: false, message: 'Gagal mendeploy ke Netlify.' };
    }
}

// Helper function
function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
}

module.exports = { deployToVercel, deployToNetlify };

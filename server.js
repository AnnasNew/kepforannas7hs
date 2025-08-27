// server.js
const express = require('express');
const path = require('path');
const multer = require('multer');
const { deployToVercel, deployToNetlify } = require('./deployService');

const app = express();
const upload = multer({ storage: multer.memoryStorage() }); // Menyimpan file di memori

// Set EJS sebagai view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware untuk melayani file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Halaman utama
app.get('/', (req, res) => {
    res.render('index');
});

// Halaman proses deployment
app.post('/deploy', upload.single('htmlFile'), async (req, res) => {
    const { deployTarget, domainName } = req.body;
    const file = req.file;

    if (!file || !domainName || !deployTarget) {
        return res.status(400).json({ success: false, message: 'Semua kolom harus diisi.' });
    }

    let result;
    if (deployTarget === 'vercel') {
        result = await deployToVercel(file.buffer, domainName, `vercel-${domainName}-${Date.now()}`);
    } else if (deployTarget === 'netlify') {
        result = await deployToNetlify(file.buffer, domainName);
    } else {
        return res.status(400).json({ success: false, message: 'Target deploy tidak valid.' });
    }

    res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Web server berjalan di http://localhost:${PORT}`);
});

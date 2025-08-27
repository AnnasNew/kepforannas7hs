// public/js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const deployForm = document.getElementById('deployForm');
    const statusMessage = document.getElementById('statusMessage');

    deployForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(deployForm);
        const submitButton = deployForm.querySelector('button[type="submit"]');

        submitButton.disabled = true;
        submitButton.textContent = 'Deploying...';
        statusMessage.classList.add('hidden');

        try {
            const response = await fetch('/deploy', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            statusMessage.classList.remove('hidden');
            statusMessage.innerHTML = ''; // Clear previous message
            
            if (result.success) {
                statusMessage.classList.remove('error');
                statusMessage.classList.add('success');
                statusMessage.innerHTML = `✅ **Berhasil!** Website berhasil di-deploy. <br>
                **Domain:** <a href="${result.domain}" target="_blank">${result.domain}</a> <br>
                **Status:** ${result.status}`;
            } else {
                statusMessage.classList.remove('success');
                statusMessage.classList.add('error');
                statusMessage.innerHTML = `❌ **Gagal!** ${result.message}`;
            }

        } catch (error) {
            statusMessage.classList.remove('success');
            statusMessage.classList.add('error');
            statusMessage.innerHTML = `❌ **Gagal!** Terjadi kesalahan pada server.`;
            console.error('Error during fetch:', error);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Deploy Sekarang';
        }
    });
});

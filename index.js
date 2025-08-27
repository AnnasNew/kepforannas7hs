<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🤖 Bot Deploy Website</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="card">
            <img src="https://f.top4top.io/p_3496a9bvj1.jpg" alt="Bot Deploy Website" class="hero-image">
            <h1>Deploy Website Anda</h1>
            <p>Mulai mendeploy file HTML Anda ke Vercel atau Netlify dengan mudah.</p>

            <form id="deployForm">
                <div class="form-group">
                    <label for="domainName">Nama Domain:</label>
                    <input type="text" id="domainName" name="domainName" placeholder="contoh: my-awesome-site" required>
                </div>
                <div class="form-group">
                    <label for="htmlFile">Pilih File HTML:</label>
                    <input type="file" id="htmlFile" name="htmlFile" accept=".html" required>
                </div>
                <div class="form-group">
                    <label>Pilih Platform:</label>
                    <div class="radio-group">
                        <label>
                            <input type="radio" name="deployTarget" value="vercel" required>
                            Vercel
                        </label>
                        <label>
                            <input type="radio" name="deployTarget" value="netlify">
                            Netlify
                        </label>
                    </div>
                </div>
                <button type="submit" class="btn">Deploy Sekarang</button>
            </form>

            <div id="statusMessage" class="status-box hidden"></div>
        </div>
    </div>
    <script src="/main.js"></script>
</body>
</html>

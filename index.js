<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🤖 Bot Deploy Website</title>
    <style>
    /* public/css/style.css */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

:root {
    --primary-color: #5d56f9;
    --secondary-color: #4b41d9;
    --bg-color: #1a1a2e;
    --card-bg: #27273d;
    --text-color: #f0f0f0;
    --success-color: #4CAF50;
    --error-color: #f44336;
}

body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    padding: 20px;
}

.container {
    width: 100%;
    max-width: 500px;
}

.card {
    background: var(--card-bg);
    border-radius: 20px;
    padding: 2.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    text-align: center;
}

.hero-image {
    width: 100%;
    max-width: 150px;
    height: auto;
    border-radius: 50%;
    border: 5px solid var(--primary-color);
    margin-bottom: 20px;
}

h1 {
    font-size: 2em;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--primary-color);
}

p {
    color: #b0b0d0;
    margin-bottom: 1.5rem;
}

.form-group {
    text-align: left;
    margin-bottom: 1.5rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

input[type="text"], input[type="file"] {
    width: 100%;
    padding: 12px;
    border: none;
    background-color: #3b3b5b;
    border-radius: 8px;
    color: var(--text-color);
    box-sizing: border-box;
}

input[type="file"] {
    cursor: pointer;
}

input[type="file"]::file-selector-button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

input[type="file"]::file-selector-button:hover {
    background-color: var(--secondary-color);
}

.radio-group {
    display: flex;
    gap: 20px;
    justify-content: center;
}

.radio-group label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}

.btn {
    width: 100%;
    padding: 15px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1em;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn:hover {
    background-color: var(--secondary-color);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.status-box {
    margin-top: 20px;
    padding: 15px;
    border-radius: 8px;
    font-weight: 600;
    text-align: left;
    white-space: pre-wrap; /* Menjaga format baris baru dari API */
}

.status-box.success {
    background-color: #4CAF501a;
    border: 1px solid var(--success-color);
    color: var(--success-color);
}

.status-box.error {
    background-color: #f443361a;
    border: 1px solid var(--error-color);
    color: var(--error-color);
}

.hidden {
    display: none;
}

    
        </style>
    
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
    <script src="main.js"></script>
</body>
</html>

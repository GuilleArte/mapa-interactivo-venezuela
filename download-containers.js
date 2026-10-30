const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'images', 'containers');
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const containers = [
    {
        name: 'cesta_frio.jpg',
        url: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?w=400&q=80'
    },
    {
        name: 'cesta_mimbre.jpg',
        url: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=400&q=80'
    },
    {
        name: 'saco_yute.jpg',
        url: 'https://images.unsplash.com/photo-1584473457406-6240486418e9?w=400&q=80'
    },
    {
        name: 'caja_madera.jpg',
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80'
    },
    {
        name: 'vasija_arcilla.jpg',
        url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&q=80'
    },
    {
        name: 'canasta_palma.jpg',
        url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80'
    },
    {
        name: 'red_pesca.jpg',
        url: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=400&q=80'
    },
    {
        name: 'nevera_pesca.jpg',
        url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80'
    },
    {
        name: 'canoa_madera.jpg',
        url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=400&q=80'
    },
    {
        name: 'corral_trancas.jpg',
        url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&q=80'
    },
    {
        name: 'cantara_leche.jpg',
        url: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=400&q=80'
    }
];

function download(item) {
    return new Promise((resolve) => {
        const dest = path.join(targetDir, item.name);
        function fetchUrl(u, redirects = 0) {
            if (redirects > 5) {
                console.error('Too many redirects for ' + item.name);
                return resolve(false);
            }
            https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    return fetchUrl(res.headers.location, redirects + 1);
                }
                if (res.statusCode !== 200) {
                    console.error(`Status ${res.statusCode} for ${item.name}`);
                    return resolve(false);
                }
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`✓ Descargado: ${item.name} (${(fs.statSync(dest).size / 1024).toFixed(1)} KB)`);
                    resolve(true);
                });
            }).on('error', err => {
                console.error(`Error downloading ${item.name}: ${err.message}`);
                resolve(false);
            });
        }
        fetchUrl(item.url);
    });
}

(async () => {
    for (const item of containers) {
        await download(item);
    }
    console.log('Descarga completada.');
})();

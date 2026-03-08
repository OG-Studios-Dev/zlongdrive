import { Jimp } from 'jimp';

async function main() {
    const img = await Jimp.read('./public/images/image1.png');

    const colors = {};
    for (let x = 0; x < img.bitmap.width; x++) {
        for (let y = 0; y < img.bitmap.height; y++) {
            const hex = img.getPixelColor(x, y).toString(16).padStart(8, '0').slice(0, 6);
            if (hex === '000000' || hex === 'ffffff' || hex.length < 6) continue;

            colors[hex] = (colors[hex] || 0) + 1;
        }
    }

    const sorted = Object.entries(colors).sort((a, b) => b[1] - a[1]);
    console.log(sorted.slice(0, 10));
}

main().catch(console.error);

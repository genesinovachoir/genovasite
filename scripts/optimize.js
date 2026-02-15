import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FORMATS = ['avif', 'webp']; // We can add 'jpeg' if needed as fallback, but mostly original or webp is enough
const BREAKPOINTS = [480, 768, 1024, 1440, 1920];
const INPUT_DIR = path.resolve(__dirname, '../src/assets/raw');
const OUTPUT_DIR = path.resolve(__dirname, '../public/images/optimized');
const DATA_DIR = path.resolve(__dirname, '../src/lib/media');
const MANIFEST_PATH = path.join(DATA_DIR, 'manifest.json');

// Ensure directories exist
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// Load existing manifest or start fresh
let manifest = {};
if (fs.existsSync(MANIFEST_PATH)) {
    try {
        manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
    } catch {
        console.warn("Could not parse existing manifest, starting fresh.");
    }
}

async function processImage(filename) {
    const inputPath = path.join(INPUT_DIR, filename);
    const { name, ext } = path.parse(filename);

    // Skip if not an image (simple check)
    if (!['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tiff'].includes(ext.toLowerCase())) {
        console.log(`Skipping non-image file: ${filename}`);
        return;
    }

    const stat = fs.statSync(inputPath);
    const lastModified = stat.mtimeMs;

    // Check if already processed and not modified
    if (manifest[name] && manifest[name].lastModified === lastModified) {
        // console.log(`Skipping ${filename} (already up to date)`);
        // Check if files actually exist, strict check could go here.
        return;
    }

    console.log(`Processing ${filename}...`);
    const pipeline = sharp(inputPath);
    const metadata = await pipeline.metadata();

    const assetData = {
        id: name,
        src: `/images/optimized/${name}-${BREAKPOINTS[BREAKPOINTS.length - 1]}.webp`, // Default large fallback
        width: metadata.width,
        height: metadata.height,
        lastModified: lastModified,
        variants: {}
    };

    // 1. Generate Blur Placeholder (LQIP)
    const blurBuffer = await pipeline
        .clone()
        .resize(20, 20, { fit: 'inside' })
        .toFormat('webp', { quality: 20 })
        .toBuffer();
    assetData.blurDataURL = `data:image/webp;base64,${blurBuffer.toString('base64')}`;

    // 2. Generate Breakpoints & Formats
    for (const width of BREAKPOINTS) {
        if (width > metadata.width) continue; // Don't upscale

        for (const format of FORMATS) {
            const outputFilename = `${name}-${width}.${format}`;
            const outputPath = path.join(OUTPUT_DIR, outputFilename);

            await pipeline
                .clone()
                .resize(width)
                .toFormat(format, { quality: 80, effort: 4 }) // Effort 4 is a balance
                .toFile(outputPath);

            if (!assetData.variants[format]) assetData.variants[format] = [];
            assetData.variants[format].push(width);
        }
    }

    // Also copy original as fallback if needed or generate a max-res standard format
    // For this system, we'll rely on the largest generated WebP as "src" usually.

    manifest[name] = assetData;
    console.log(`Done: ${name}`);
}

async function run() {
    if (!fs.existsSync(INPUT_DIR)) {
        console.log(`Creating input directory at ${INPUT_DIR}`);
        fs.mkdirSync(INPUT_DIR, { recursive: true });
    }

    const files = fs.readdirSync(INPUT_DIR);
    console.log(`Found ${files.length} files in ${INPUT_DIR}`);

    for (const file of files) {
        try {
            await processImage(file);
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }

    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    console.log(`Manifest updated at ${MANIFEST_PATH}`);
}

run();

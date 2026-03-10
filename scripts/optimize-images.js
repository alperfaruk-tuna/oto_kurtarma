import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, '../fotolar');
const DEST_DIR = path.join(__dirname, '../assets/images');
const MAX_SIZE_KB = 200;
const THUMBNAIL_WIDTH = 400;

// Ensure destination directory exists
await fs.mkdir(DEST_DIR, { recursive: true });

let imageCounter = 1;

async function optimizeImage(sourcePath, filename) {
  const baseName = path.parse(filename).name;
  const ext = path.parse(filename).ext.toLowerCase();
  
  // Skip non-image files
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    console.log(`Skipping ${filename} (not an image)`);
    return;
  }

  console.log(`Processing ${filename}...`);

  try {
    const image = sharp(sourcePath);
    const metadata = await image.metadata();

    // Generate a clean filename
    let cleanName;
    if (filename.includes('arkaplan')) {
      cleanName = 'arkaplan';
    } else if (filename.includes('kartvizit')) {
      cleanName = 'kartvizit';
    } else if (filename.includes('WhatsApp')) {
      cleanName = `work-${imageCounter}`;
      imageCounter++;
    } else {
      cleanName = baseName.replace(/\s+/g, '-').toLowerCase();
    }

    // 1. Create optimized JPEG version (max 200KB)
    const jpegPath = path.join(DEST_DIR, `${cleanName}.jpg`);
    let quality = 85;
    let jpegBuffer;

    do {
      jpegBuffer = await sharp(sourcePath)
        .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality, progressive: true })
        .toBuffer();
      
      if (jpegBuffer.length > MAX_SIZE_KB * 1024 && quality > 60) {
        quality -= 5;
      } else {
        break;
      }
    } while (quality >= 60);

    await fs.writeFile(jpegPath, jpegBuffer);
    const jpegSizeKB = (jpegBuffer.length / 1024).toFixed(2);
    console.log(`  ✓ JPEG: ${jpegSizeKB}KB (quality: ${quality})`);

    // 2. Create WebP version
    const webpPath = path.join(DEST_DIR, `${cleanName}.webp`);
    let webpQuality = 85;
    let webpBuffer;

    do {
      webpBuffer = await sharp(sourcePath)
        .resize(1200, 800, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: webpQuality })
        .toBuffer();
      
      if (webpBuffer.length > MAX_SIZE_KB * 1024 && webpQuality > 60) {
        webpQuality -= 5;
      } else {
        break;
      }
    } while (webpQuality >= 60);

    await fs.writeFile(webpPath, webpBuffer);
    const webpSizeKB = (webpBuffer.length / 1024).toFixed(2);
    console.log(`  ✓ WebP: ${webpSizeKB}KB (quality: ${webpQuality})`);

    // 3. Create thumbnail versions
    const thumbJpegPath = path.join(DEST_DIR, `${cleanName}-thumb.jpg`);
    await sharp(sourcePath)
      .resize(THUMBNAIL_WIDTH, null, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, progressive: true })
      .toFile(thumbJpegPath);
    
    const thumbStats = await fs.stat(thumbJpegPath);
    console.log(`  ✓ Thumbnail JPEG: ${(thumbStats.size / 1024).toFixed(2)}KB`);

    const thumbWebpPath = path.join(DEST_DIR, `${cleanName}-thumb.webp`);
    await sharp(sourcePath)
      .resize(THUMBNAIL_WIDTH, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(thumbWebpPath);
    
    const thumbWebpStats = await fs.stat(thumbWebpPath);
    console.log(`  ✓ Thumbnail WebP: ${(thumbWebpStats.size / 1024).toFixed(2)}KB`);

  } catch (error) {
    console.error(`  ✗ Error processing ${filename}:`, error.message);
  }
}

async function processAllImages() {
  console.log('Starting image optimization...\n');

  const files = await fs.readdir(SOURCE_DIR);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext);
  });

  console.log(`Found ${imageFiles.length} images to process\n`);

  for (const file of imageFiles) {
    const sourcePath = path.join(SOURCE_DIR, file);
    await optimizeImage(sourcePath, file);
    console.log('');
  }

  console.log('✓ Image optimization complete!');
}

processAllImages().catch(console.error);

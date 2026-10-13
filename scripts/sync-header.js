/**
 * Code Regime - Centralized Header Synchronization Script
 * 
 * Usage:
 *   node scripts/sync-header.js             # Synchronize all pages
 *   node scripts/sync-header.js --dry-run   # Preview changes without modifying files
 * 
 * This script:
 * 1. Reads canonical header markup from components/header.html
 * 2. Scans all HTML files across the project (excluding templates and standalone non-nav pages)
 * 3. Replaces divergent <header id="head-nav">... blocks or placeholders with the canonical header
 * 4. Cleans known edge cases (e.g. duplicate orphaned header in about-us/index.html)
 * 5. Ensures <link rel="stylesheet" href="/css/header.css"> is included in <head>
 * 6. Ensures <script src="/js/header.js"></script> is included before </body>
 * 7. Keeps the embedded template inside js/header.js synchronized
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const canonicalHeaderPath = path.join(rootDir, 'components', 'header.html');
const headerJsPath = path.join(rootDir, 'js', 'header.js');

const isDryRun = process.argv.includes('--dry-run');

if (!fs.existsSync(canonicalHeaderPath)) {
  console.error('Error: Canonical header file not found at:', canonicalHeaderPath);
  process.exit(1);
}

const canonicalHeader = fs.readFileSync(canonicalHeaderPath, 'utf8').trim();

// Collect all HTML files recursively
function getHtmlFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', '.gemini', '.claude', '.vscode', 'components'].includes(entry.name)) {
        continue;
      }
      results = results.concat(getHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      // Exclude verification files, standalone preview templates, and standalone non-nav pages
      if (
        (entry.name.startsWith('google') && entry.name.endsWith('.html')) ||
        entry.name === 'header.html' ||
        entry.name === 'footer.html' ||
        entry.name === 'contact.html' ||
        entry.name === '404.html'
      ) {
        continue;
      }
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(rootDir);
console.log(`Found ${htmlFiles.length} HTML files to synchronize.${isDryRun ? ' [DRY RUN MODE]' : ''}\n`);

let updatedCount = 0;
let alreadyInSyncCount = 0;
let noMatchCount = 0;

for (const filePath of htmlFiles) {
  const relativePath = path.relative(rootDir, filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Edge case mitigation: Remove orphaned duplicate header inside about-us/index.html (.header-container)
  if (relativePath.replace(/\\/g, '/') === 'about-us/index.html') {
    const duplicateInnerHeaderRegex = /(<div\s+class=["']header-container["'][\s\S]*?)(<header\s+id=["']head-nav["'][\s\S]*?<\/header>)/i;
    if (duplicateInnerHeaderRegex.test(content)) {
      content = content.replace(duplicateInnerHeaderRegex, (match, prefix) => prefix.trimEnd());
      modified = true;
    }
  }

  // 1. Synchronize header markup (multi-priority matching)
  const headNavRegex = /<header\s+id=["']head-nav["'][\s\S]*?<\/header>/i;
  const genericNavRegex = /<header(?:\s+[^>]*?)?>[\s\S]*?<nav[\s\S]*?<\/header>/i;
  const placeholderRegex = /<(?:div|header)\s+id=["'](?:site-header|cr-header-placeholder|header-container)["']\s*(?:><\/(?:div|header)>|\/>)/i;

  let matchedPattern = null;
  if (headNavRegex.test(content)) {
    matchedPattern = headNavRegex;
  } else if (genericNavRegex.test(content)) {
    matchedPattern = genericNavRegex;
  } else if (placeholderRegex.test(content)) {
    matchedPattern = placeholderRegex;
  }

  if (matchedPattern) {
    const existingMatch = content.match(matchedPattern)[0].trim();
    if (existingMatch !== canonicalHeader) {
      content = content.replace(matchedPattern, canonicalHeader);
      modified = true;
    }
  } else {
    console.warn(`[WARNING: NO HEADER PATTERN MATCHED] ${relativePath}`);
    noMatchCount++;
  }

  // 2. Ensure header.css is linked in <head>
  const hasHeaderCss = /href=["'][^"']*header\.css["']/i.test(content);
  if (!hasHeaderCss && content.includes('</head>')) {
    content = content.replace('</head>', '  <link rel="stylesheet" href="/css/header.css">\n</head>');
    modified = true;
  }

  // 3. Ensure header.js is included before </body>
  const hasHeaderJs = /src=["'][^"']*header\.js["']/i.test(content);
  if (!hasHeaderJs && content.includes('</body>')) {
    content = content.replace('</body>', '  <script src="/js/header.js"></script>\n</body>');
    modified = true;
  }

  if (modified) {
    if (!isDryRun) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
    console.log(`[${isDryRun ? 'WOULD SYNC' : 'SYNCED'}] ${relativePath}`);
    updatedCount++;
  } else {
    alreadyInSyncCount++;
  }
}

console.log(`\nHTML Sync Complete: ${updatedCount} ${isDryRun ? 'would be updated' : 'updated'}, ${alreadyInSyncCount} already in sync, ${noMatchCount} warnings.`);

// 4. Update embedded template in js/header.js
if (fs.existsSync(headerJsPath)) {
  let jsContent = fs.readFileSync(headerJsPath, 'utf8');
  const templateMarkerStart = '/* CANONICAL_HEADER_START */';
  const templateMarkerEnd = '/* CANONICAL_HEADER_END */';

  const newHeaderBlock = `${templateMarkerStart}\n  const canonicalHeaderHTML = \`${canonicalHeader}\`;\n  ${templateMarkerEnd}`;

  if (jsContent.includes(templateMarkerStart) && jsContent.includes(templateMarkerEnd)) {
    const escapedStart = templateMarkerStart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedEnd = templateMarkerEnd.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const markerRegex = new RegExp(`${escapedStart}[\\s\\S]*?${escapedEnd}`);
    jsContent = jsContent.replace(markerRegex, newHeaderBlock);
    if (!isDryRun) {
      fs.writeFileSync(headerJsPath, jsContent, 'utf8');
    }
    console.log(`[${isDryRun ? 'WOULD SYNC' : 'SYNCED'}] js/header.js embedded canonical template updated.`);
  } else {
    console.log('[NOTE] js/header.js markers not found.');
  }
}

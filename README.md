# Greenlight

A browser extension to automatically convert Chinese shopping links to agent links.

## Features

- Automatically replaces Taobao, Weidian and 1688 links on any webpage with Mulebuy links.
- Automatically handles shortened `m.tb.cn` and `e.tb.cn` links without using an external API.
- Right-click any supported link to search for QC photos on Doppel.fit.
- Manual conversion tool for quick link generation.
- All standard link parsing happens locally without external API calls, unlike other extensions.

## Installation

### CRX Package (recomended)
- A signed package is available in the releases.

### Developer Mode 
1. Download or clone this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Enable "Developer mode" in the top right.
4. Click "Load unpacked" and select the `extension/public` folder.

### Building from Source
If you make changes to the code, you must rebuild the bundles:
```bash
cd extension
npm install
npm run build
```

### Packaging
To generate a new crx file:
```bash
cd extension
npx crx pack public -p key.pem -o greenlight.crx
``

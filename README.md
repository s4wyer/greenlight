# Greenlight

A browser extension to automatically convert Chinese shopping links to agent links.

## Features

- Automatically replaces links on any webpage with Mulebuy links.
- Automatically handles shortened `m.tb.cn` and `e.tb.cn` links without using an external API.
- Right-click any supported link to search for QC photos on Doppel.fit.
- Manual conversion tool for quick link generation.
- All standard link parsing happens locally without external API calls, unlike other extensions.

## Supported stores

- Taobao
- Weidan
- 1688
- Fishgoo (conversion only)

## Installation

### CRX (recomended)
1. Go to the [releases](https://github.com/s4wyer/greenlight/releases/latest) and download the latest `greenlight.crx`.
2. Open go to `chrome://extensions`.
3. Enable "Developer mode".
4. Drag and drop the `greenlight.crx` file anywhere on the page.

### Unpacked Extension 
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
```

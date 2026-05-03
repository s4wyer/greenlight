const esbuild = require('esbuild');

const commonConfig = {
  bundle: true,
  minify: true,
  sourcemap: process.env.NODE_ENV !== 'production',
  target: ['es2020'],
};

esbuild.build({
  ...commonConfig,
  entryPoints: ['src/content.js'],
  outfile: 'public/content.js',
}).catch(() => process.exit(1));

esbuild.build({
  ...commonConfig,
  entryPoints: ['src/background.js'],
  outfile: 'public/background.js',
}).catch(() => process.exit(1));

esbuild.build({
  ...commonConfig,
  entryPoints: ['src/popup.js'],
  outfile: 'public/popup.js',
}).catch(() => process.exit(1));

esbuild.build({
  ...commonConfig,
  entryPoints: ['src/mulebuy.js'],
  outfile: 'public/mulebuy.js',
}).catch(() => process.exit(1));

console.log('Build complete.');

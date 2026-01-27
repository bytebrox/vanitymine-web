/**
 * Build script for the vanity worker
 * Compiles the TypeScript worker with @noble/ed25519 into a single JS file
 */

const esbuild = require('esbuild');
const path = require('path');

async function build() {
  try {
    await esbuild.build({
      entryPoints: [path.join(__dirname, '../src/workers/vanity.worker.source.ts')],
      bundle: true,
      outfile: path.join(__dirname, '../public/vanity-worker.js'),
      format: 'iife',
      target: ['es2020'],
      minify: true,
      sourcemap: false,
    });
    console.log('Worker built successfully!');
  } catch (error) {
    console.error('Worker build failed:', error);
    process.exit(1);
  }
}

build();

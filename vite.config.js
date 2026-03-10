import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // Output directory
    outDir: 'dist',
    
    // Asset directory within outDir
    assetsDir: 'assets',
    
    // Enable minification using esbuild (faster than terser)
    minify: 'esbuild',
    
    // Enable CSS minification
    cssMinify: true,
    
    // Target modern browsers for smaller bundle size
    target: 'es2015',
    
    // Generate source maps for production debugging (optional)
    sourcemap: false,
    
    // Chunk size warning limit (500kb)
    chunkSizeWarningLimit: 500,
    
    // Rollup options for advanced bundling
    rollupOptions: {
      output: {
        // Asset file naming pattern
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          // Organize assets by type
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          } else if (/woff2?|ttf|otf|eot/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          } else if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          
          return `assets/[name]-[hash][extname]`;
        },
        
        // JavaScript chunk naming pattern
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        
        // Manual chunks configuration (keep simple for this project)
        manualChunks: undefined,
      },
    },
    
    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb as base64
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Report compressed size (can be disabled for faster builds)
    reportCompressedSize: true,
    
    // Clean output directory before build
    emptyOutDir: true,
  },
  
  // Test configuration for Vitest
  test: {
    environment: 'jsdom',
    globals: true,
  },
});

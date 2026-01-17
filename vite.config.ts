import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "localhost",
    port: 8080,
    strictPort: false,
    // Let Vite handle HMR automatically
  },
  plugins: [
    react(),
  ],
  optimizeDeps: {
    include: ['@react-three/fiber', '@react-three/drei', 'three'],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'supabase': ['@supabase/supabase-js'],
          'pdf-vendor': ['jspdf', 'html2canvas']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';




// https://vitejs.dev/config/
export default defineConfig({
  envDir: './environment',
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0',
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3001', // Backend server
    //     changeOrigin: true,
    //   },
    // },
  },
});













// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   envDir: './environment',
//   plugins: [react()],
//   server: {
//     proxy: {
//       port:3000,
//       open: true,
//       // '/api': {
//       //   target: 'http://localhost:3001',
//       //   changeOrigin: true,
        
//       // },
//     }
// });

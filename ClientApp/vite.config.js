import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite
// incluye el plugin de React y un proxy para redirigir las peticiones
// de API en desarrollo al servidor ASP.NET Core (puerto 5000).

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
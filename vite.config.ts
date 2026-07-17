import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Removes type="module" and crossorigin from script/link tags so the built
// dist/index.html works when loaded via Electron's file:// protocol.
function electronCompatPlugin(): Plugin {
  return {
    name: 'electron-compat',
    transformIndexHtml(html) {
      return html
        .replace(/ type="module"/g, ' defer')
        .replace(/ crossorigin/g, '');
    },
  };
}

export default defineConfig({
  plugins: [react(), electronCompatPlugin()],
  base: './',
  define: {
    // @supabase/supabase-js (via suas dependencias internas) referencia
    // "process" e "global" em tempo de carregamento do modulo. No bundle
    // web normal isso e tratado pelo Vite, mas no formato "iife" usado
    // para rodar via file:// dentro do Electron esses globais podem nao
    // existir, o script inteiro quebra na primeira linha e a tela fica
    // branca (nada chega a renderizar). Definimos aqui para garantir que
    // sempre existam.
    'process.env': {},
    global: 'globalThis',
  },
  build: {
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        inlineDynamicImports: true,
      },
    },
  },
});

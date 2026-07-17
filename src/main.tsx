import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

try {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (err) {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML =
      `<div style="font-family:sans-serif;background:#0a0c12;color:#fca5a5;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;text-align:center;">` +
      `<h2 style="color:#fff;margin-bottom:8px;">Erro ao iniciar o Optimizer</h2>` +
      `<pre style="max-width:700px;white-space:pre-wrap;font-size:12px;color:#f87171;background:#13161e;padding:12px;border-radius:8px;">${String(
        err
      )}</pre></div>`;
  }
  console.error(err);
}

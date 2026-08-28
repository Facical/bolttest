import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { CurrentPage } from '@/routes';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={null}>
      <CurrentPage />
    </Suspense>
  </StrictMode>
);

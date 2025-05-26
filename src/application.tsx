import { createBrowserRouter, RouterProvider } from 'react-router';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { SplashScreen } from './screens/splash';

import './application.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoadProvider } from './features/loads/context/LoadContext';

const main = document.getElementById('main');
const root = createRoot(main!);

const queryClient = new QueryClient()

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <SplashScreen />
  }
]);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoadProvider>
        <RouterProvider router={browserRouter} />
      </LoadProvider>
    </QueryClientProvider>
  </StrictMode>
);

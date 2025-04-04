import { createBrowserRouter, RouterProvider } from 'react-router';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { SplashScreen } from './screens/splash';

import './application.css';

const main = document.getElementById('main');
const root = createRoot(main!);

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <SplashScreen />
  }
]);

root.render(
  <StrictMode>
    <RouterProvider router={browserRouter} />
  </StrictMode>
);

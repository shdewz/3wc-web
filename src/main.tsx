import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@/styles/globals.css';
import { routes } from '@config/routes';
import { DefaultLayout } from '@layouts/default';

import { Provider } from '@/provider';
import { RouteWithTitle } from '@/components/common/route-with-title';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <DefaultLayout>
          <Routes>
            {routes.map((route, i) => (
              <Route
                key={i}
                element={
                  <RouteWithTitle element={route.page} title={route.title} />
                }
                path={route.path}
              />
            ))}
          </Routes>
        </DefaultLayout>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

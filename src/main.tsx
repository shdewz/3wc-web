import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@/styles/globals.css';
import { routes } from '@config/routes';
import { DefaultLayout } from '@layouts/default';
import { RouteWithTitle } from '@components/common/route-with-title';
import { RequireAuth } from '@components/auth/require-auth';
import { Provider } from '@context/provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <DefaultLayout>
          <Routes>
            {routes.map((route, i) => {
              const pageElement = (
                <RouteWithTitle element={route.page} title={route.title} />
              );
              const element = route.requiresAuth ? (
                <RequireAuth>{pageElement}</RequireAuth>
              ) : (
                pageElement
              );

              return <Route key={i} element={element} path={route.path} />;
            })}
          </Routes>
        </DefaultLayout>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

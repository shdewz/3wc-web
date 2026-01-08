import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@/styles/globals.css';
import { routes } from '@config/routes';
import { DefaultLayout } from '@layouts/default';
import { RouteWithTitle } from '@components/common/route-with-title';
import { RequireAuth } from '@components/auth/require-auth';
import { Provider } from '@context/provider';
import { RequireRegistrationOpen } from '@components/auth/require-registration-open';
import { NotFoundPage } from '@pages/not-found';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <DefaultLayout>
          <Routes>
            {routes.map((route, i) => {
              let element = (
                <RouteWithTitle element={route.page} title={route.title} />
              );

              if (route.requiresAuth) {
                element = <RequireAuth>{element}</RequireAuth>;
              }
              if (route.path.startsWith('/register')) {
                element = (
                  <RequireRegistrationOpen redirectTo="/">
                    {element}
                  </RequireRegistrationOpen>
                );
              }

              return <Route key={i} element={element} path={route.path} />;
            })}
            <Route
              element={
                <RouteWithTitle
                  element={<NotFoundPage />}
                  title="404 Not Found"
                />
              }
              path="*"
            />
          </Routes>
        </DefaultLayout>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

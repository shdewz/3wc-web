import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import '@/styles/globals.css';

import { Provider } from '@/provider';
import { IndexPage } from '@/pages/index';
import { RulesPage } from '@/pages/rules';
import { DefaultLayout } from '@/layouts/default';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <DefaultLayout>
          <Routes>
            <Route element={<IndexPage />} path="/" />
            <Route element={<RulesPage />} path="/rules" />
          </Routes>
        </DefaultLayout>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

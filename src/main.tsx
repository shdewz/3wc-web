import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import { Provider } from '@/provider';
import { RulesPage } from '@/pages/rules';
import { IndexPage } from '@/pages/index';
import { InfoPage } from '@/pages/information';

import '@/styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route element={<IndexPage />} path="/" />
          <Route element={<InfoPage />} path="/information" />
          <Route element={<RulesPage />} path="/rules" />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

import { Route, Routes } from 'react-router-dom';
import { useTheme } from '@heroui/use-theme';

import { RulesPage } from '@/pages/rules';
import { IndexPage } from '@/pages/index';
import { InfoPage } from '@/pages/information';

export const App = () => {
  useTheme('dark');

  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<InfoPage />} path="/information" />
      <Route element={<RulesPage />} path="/rules" />
    </Routes>
  );
};

import { Route, Routes } from 'react-router-dom';
import { useTheme } from '@heroui/use-theme';

import IndexPage from '@/pages/index';
import PricingPage from '@/pages/pricing';

function App() {
  useTheme('dark');

  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<PricingPage />} path="/pricing" />
    </Routes>
  );
}

export default App;

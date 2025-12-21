import { CircularProgress } from '@heroui/react';

export const FullScreenLoader = () => (
  <div className="fixed inset-0 z-50 flex justify-center items-center">
    <CircularProgress size="lg" />
  </div>
);

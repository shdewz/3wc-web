import { Button } from '@heroui/react';
import { useState } from 'react';

import { useAuth } from '@/provider';

export const LoginButton = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    await new Promise(requestAnimationFrame);
    login(window.location.href);
  };

  return (
    <Button
      isDisabled={isLoading}
      isLoading={isLoading}
      variant="flat"
      onPress={handleLogin}
    >
      Log in
    </Button>
  );
};

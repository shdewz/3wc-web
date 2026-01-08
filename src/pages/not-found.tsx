import { Button } from '@heroui/react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 h-full py-20 text-center">
      <h1 className="text-3xl font-bold">404 – Page not found</h1>
      <p className="text-default-600">
        The page you are looking for does not exist.
      </p>
      <Button as={Link} color="default" to="/" variant="flat">
        Go to Home
      </Button>
    </section>
  );
};

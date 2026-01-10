import { useEffect } from 'react';
import { addToast } from '@heroui/react';
import { useLocation, useNavigate } from 'react-router-dom';

type ToastPayload = {
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';
  title?: string;
  description?: string;
};

export const RouteToast = () => {
  const location = useLocation() as any;
  const navigate = useNavigate();

  useEffect(() => {
    const payload: ToastPayload | undefined = location.state?.toast;

    if (!payload) return;

    addToast({
      color: payload.color ?? 'default',
      title: payload.title ?? 'Notice',
      description: payload.description,
      timeout: 3500,
      variant: 'flat',
      radius: 'sm',
    });

    navigate(location.pathname + location.search + location.hash, {
      replace: true,
    });
  }, [location, navigate]);

  return null;
};

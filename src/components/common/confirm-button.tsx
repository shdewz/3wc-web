import React from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  useDisclosure,
} from '@heroui/react';

export interface ConfirmActionButtonProps {
  children: React.ReactNode;

  color?: React.ComponentProps<typeof Button>['color'];
  variant?: React.ComponentProps<typeof Button>['variant'];
  size?: React.ComponentProps<typeof Button>['size'];
  className?: string;
  isDisabled?: boolean;
  ariaLabel?: string;

  title: string;
  description?: React.ReactNode;

  confirmText?: string;
  confirmColor?: React.ComponentProps<typeof Button>['color'];
  confirmVariant?: React.ComponentProps<typeof Button>['variant'];

  onConfirm: () => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (err: Error) => void;
}

export const ConfirmActionButton: React.FC<ConfirmActionButtonProps> = ({
  children,
  color = 'primary',
  variant = 'solid',
  size = 'md',
  className,
  isDisabled,
  ariaLabel,

  title,
  description,

  confirmText = 'Confirm',
  confirmColor = 'danger',
  confirmVariant = 'flat',

  onConfirm,
  onSuccess,
  onError,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await onConfirm();
      onSuccess?.();
      onOpenChange(); // close modal on success
    } catch (err: any) {
      const msg = err?.message ?? 'Something went wrong';

      setError(msg);
      onError?.(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        aria-label={ariaLabel}
        className={className}
        color={color}
        isDisabled={isDisabled}
        size={size}
        variant={variant}
        onPress={onOpen}
      >
        {children}
      </Button>

      <Modal
        backdrop="opaque"
        classNames={{ backdrop: 'bg-background-50/80' }}
        isOpen={isOpen}
        size="md"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                {description}
                {error && (
                  <Alert
                    color="danger"
                    description={error}
                    title="Action failed"
                    variant="flat"
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={isSubmitting}
                  variant="light"
                  onPress={onOpenChange}
                >
                  Cancel
                </Button>
                <Button
                  color={confirmColor}
                  isLoading={isSubmitting}
                  variant={confirmVariant}
                  onPress={handleConfirm}
                >
                  {confirmText}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

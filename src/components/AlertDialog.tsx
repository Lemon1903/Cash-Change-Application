import * as AlertDialogue from "@radix-ui/react-alert-dialog";

interface IAlertDialogProps {
  title: string;
  description: string;
  isOpen: boolean;
  setIsOpen?: (open: boolean) => void;
  trigger?: JSX.Element;
  action?: JSX.Element;
}

export default function AlertDialog({
  title,
  description,
  isOpen,
  setIsOpen,
  trigger,
  action,
}: IAlertDialogProps) {
  return (
    <AlertDialogue.Root open={isOpen} onOpenChange={setIsOpen}>
      {trigger && (
        <AlertDialogue.Trigger asChild>{trigger}</AlertDialogue.Trigger>
      )}
      <AlertDialogue.Portal>
        <AlertDialogue.Overlay className="fixed inset-0 z-50 bg-border/60 backdrop-blur-sm" />
        <AlertDialogue.Content className="fixed left-1/2 top-1/2 z-50 -mt-6 grid w-4/5  max-w-sm -translate-x-1/2 -translate-y-1/2 border-2 border-border bg-input px-6 py-8 drop-shadow-md md:max-w-lg">
          <AlertDialogue.Title className="text-2xl font-medium md:text-3xl">
            {title}
          </AlertDialogue.Title>
          <AlertDialogue.Description className="mb-10 mt-2 text-lg md:text-2xl">
            {description}
          </AlertDialogue.Description>
          {action && (
            <AlertDialogue.Action asChild>{action}</AlertDialogue.Action>
          )}
        </AlertDialogue.Content>
      </AlertDialogue.Portal>
    </AlertDialogue.Root>
  );
}

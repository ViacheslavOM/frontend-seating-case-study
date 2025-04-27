import { Button } from "@/components/ui/button.tsx";

interface AuthModalProps {
  onClose: () => void;
  onSignInClick: () => void;
  onGuestClick: () => void;
  showProceedButton?: boolean;
}

export function AuthModal({
  onClose,
  onSignInClick,
  onGuestClick,
  showProceedButton = false,
}: Readonly<AuthModalProps>) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Checkout Options</h2>
        <div className="flex flex-col gap-4">
          <Button onClick={onSignInClick}>Sign In</Button>
          {showProceedButton && (
            <Button onClick={onGuestClick}>Proceed as Guest</Button>
          )}
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

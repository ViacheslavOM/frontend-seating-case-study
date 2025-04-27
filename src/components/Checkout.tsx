import { Button } from "./ui/button";

interface CheckoutProps {
  disabled: boolean;
  onClick: () => void;
}

export function Checkout({
  disabled,
  onClick,
}: Readonly<CheckoutProps>) {
  return (
    <Button disabled={disabled} variant="default" onClick={onClick}>
      Checkout now
    </Button>
  );
}

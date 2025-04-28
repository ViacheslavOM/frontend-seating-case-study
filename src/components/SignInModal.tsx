import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { validateEmail } from "@/shared/utils";

interface SignInModalProps {
  onClose: () => void;
  onSignIn: (email: string, password: string) => void;
  fetchingCreateLogin: boolean;
}

export function SignInModal({
  onClose,
  onSignIn,
  fetchingCreateLogin,
}: Readonly<SignInModalProps>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validatePassword = (password: string) => password.length >= 6;

  const handleSubmit = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length === 0) {
      onSignIn(email, password);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>
        <div className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              className={`border p-2 rounded w-full ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              className={`border p-2 rounded w-full ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSubmit} disabled={fetchingCreateLogin}>
              Sign In
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

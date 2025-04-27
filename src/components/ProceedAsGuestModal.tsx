import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { validateEmail } from "@/shared/utils";

interface ProceedAsGuestModalProps {
  onClose: () => void;
  onSubmit: (user: {
    email: string;
    firstName: string;
    lastName: string;
  }) => void;
}

export function ProceedAsGuestModal({
  onClose,
  onSubmit,
}: Readonly<ProceedAsGuestModalProps>) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    firstName?: string;
    lastName?: string;
  }>({});

  const validateName = (name: string) => {
    return name.trim().length > 0;
  };

  const handleSubmit = () => {
    const newErrors: {
      email?: string;
      firstName?: string;
      lastName?: string;
    } = {};

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!validateName(firstName)) {
      newErrors.firstName = "First name is required";
    }

    if (!validateName(lastName)) {
      newErrors.lastName = "Last name is required";
    }

    if (Object.keys(newErrors).length === 0) {
      onSubmit({ email, firstName, lastName });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Proceed as Guest</h2>
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
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setErrors((prev) => ({ ...prev, firstName: undefined }));
              }}
              className={`border p-2 rounded w-full ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setErrors((prev) => ({ ...prev, lastName: undefined }));
              }}
              className={`border p-2 rounded w-full ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSubmit}>Submit</Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

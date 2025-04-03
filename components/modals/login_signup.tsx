"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';


export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[\W_]/, "Must contain at least one special character (!@#$%^&*)"),
});

export default function AuthModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState<Partial<SignUpFormData>>({});
  const [loading, setLoading] = useState(false);
  const { login, register, isLoading, error, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/pages/muscles';
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
  });
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  
    // Validare pentru câmpul curent
    const fieldSchema = formSchema.shape[name as keyof SignUpFormData]; // Extrage schema pentru acel câmp
    if (fieldSchema) {
      const result = fieldSchema.safeParse(value);
      setErrors((prev) => ({
        ...prev,
        [name]: result.success ? undefined : result.error.errors[0].message,
      }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log("🟢 handleSubmit called!");
    try {
     // formSchema.parse(formData);
      
      const { name, email, password } = formData;
      const body = isSignUp ? { name, email, password } : { email, password };
      
      console.log("📤 Sending payload to BE:", JSON.stringify(body, null, 2));
  
      if (isSignUp) {
        await register({ name, email, password });
        toast.success("Account created successfully! Check your email.");
      } else {
        await login({ email, password });
        toast.success("Logged in successfully!");
        setTimeout(onOpenChange, 1000);
        router.push(from);

      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<SignUpFormData> = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0] as keyof SignUpFormData] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        toast.error(error.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{isSignUp ? "Create an account" : "Sign in"}</ModalHeader>
              <ModalBody>
                {isSignUp && (
                  <div>
                    <label className="text-sm font-bold">Name</label>
                    <Input
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                  </div>
                )}
                <div>
                  <label className="text-sm font-bold">Email</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </div>
                <div>
                  <label className="text-sm font-bold">Password</label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                </div>

                <div className="mt-4 text-sm">
                  {isSignUp ? (
                    <>
                      Already have an account?{" "}
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setIsSignUp(false)}
                      >
                        Sign In
                      </span>
                    </>
                  ) : (
                    <>
                      Don’t have an account?{" "}
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setIsSignUp(true)}
                      >
                        Register here
                      </span>
                    </>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    setIsSignUp(false);
                  }}
                >
                  Close
                </Button>
                <Button className="bg-blue-700" onPress={handleSubmit} isLoading={loading}>
                  {isSignUp ? "Register" : "Login"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

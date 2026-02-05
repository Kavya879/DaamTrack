"use client";

import React, { useState } from "react";
import { Button } from "./button";
import { LogIn, LogOut } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { signOut } from "@/app/actions";

const AuthButton = ({ user }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (user) {
    return (
      <form action={signOut}>
        <Button
          variant="ghost"
          size="sm"
          type="submit"
          className="gap-2 text-slate-600 hover:text-slate-900"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </Button>
      </form>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowAuthModal(true)}
        className="gap-2 text-slate-700 hover:text-indigo-600"
      >
        <LogIn className="w-4 h-4" />
        Sign in
      </Button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default AuthButton;

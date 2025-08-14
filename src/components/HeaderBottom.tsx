// src/components/HeaderBottom.tsx
'use client';
import { MdMenu } from "react-icons/md";
import { useAuth } from "@/utils/hooks/useAuth";

const HeaderBottom = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="bg-amazonLight text-white/80">
      <div className="flex items-center space-x-3 py-1 pl-6 text-sm">
        <p className="link flex items-center">
          <MdMenu className="text-xl mr-1" />
          All
        </p>
        <p className="link">Today&apos;s Deals</p>
        <p className="link">Customer Service</p>
        <p className="link hidden lg:inline-flex">Registry</p>
        <p className="link hidden lg:inline-flex">Gift Cards</p>
        <p className="link hidden lg:inline-flex">Sell</p>
        {user && (
          <button onClick={handleSignOut} className="link">
            Log out
          </button>
        )}
        {!user && (
          <p className="text-amazonYellowDark tracking-wide underline underline-offset-2 decoration-[1px]">
            please signin to access your cart!
          </p>
        )}
      </div>
    </div>
  );
};

export default HeaderBottom;

// components/register/RegisterHeader.tsx
import Image from "next/image";

export function RegisterHeader() {
  return (
    <div className="flex flex-col items-center mb-4">
      <Image
        src="/logo.png"
        alt="HalalBiye logo"
        width={60}
        height={60}
        className="rounded-2xl mb-2"
        priority
      />
      <h1 className="text-2xl font-serif font-bold text-primary mb-1">
        Create Your Account
      </h1>
      <p className="text-base text-gray-500 mb-2 font-sans">
        Start your halal journey today!
      </p>
    </div>
  );
}

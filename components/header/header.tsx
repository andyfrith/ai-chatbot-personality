"use client";

import Image from "next/image";

export function Header() {
  return (
    <Image
      className="dark:invert"
      src="/next.svg"
      alt="Next.js logo"
      width={100}
      height={20}
      priority
    />
  );
}

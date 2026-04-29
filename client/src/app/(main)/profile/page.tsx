"use client";

import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfileCard from "@/components/ProfileCard";

export default function ProfilePage() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const isLoading = useUserStore((s) => s.isLoading);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) return null;
  if (!user) return null;
  return (
    <div className="h-full flex justify-center mt-20">
      <ProfileCard />
    </div>
  );
}

"use client";
import { useAuth } from "@clerk/nextjs"; // Ensure correct import
import { redirect } from "next/navigation";
import DashboardContent from '../../components/dashboard-content';

export default function DashboardPage() { // Removed async
  const { userId } = useAuth(); // Use useAuth correctly

  if (!userId) {
    redirect("/");
  }

  return <DashboardContent userId={userId} />;
}
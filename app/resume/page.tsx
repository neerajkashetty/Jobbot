"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { SideBar } from "../../components/sidebar";
import { Subheader } from "../../components/subheader";
import { GenerateResume } from "../../components/generateResume";
import Loading from "../loading";

export default function Resume() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  if (status !== "authenticated" || isLoading) {
    return <Loading />;
  }
  return (
    <div id="Resume" className="flex flex-row h-screen">
      <SideBar />
      <div className="w-full max-h-fit flex flex-col">
        <Subheader />
        <GenerateResume />
      </div>
    </div>
  );
}

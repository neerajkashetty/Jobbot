"use client";
import { useSession } from "next-auth/react";
import { SideBar } from "../../components/sidebar";

export default function Resume() {
  const { data: session, status } = useSession();
  console.log(status);
  if (status === "authenticated") {
    return (
      <div id="Resume" className="h-full flex flex-row">
        <SideBar />
        <div className="h-screen w-px bg-gray-200 shadow-lg"></div>
      </div>
    );
  } else {
    return <div>Fuck Off</div>;
  }
}

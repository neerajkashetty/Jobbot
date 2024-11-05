"use client";
import { useSession } from "next-auth/react";
import { SideBar } from "../../components/sidebar";
import { Subheader } from "../../components/subheader";
import { GenerateResume } from "../../components/generateResume";

export default function Resume() {
  const { data: session, status } = useSession();
  console.log(status);
  if (status === "authenticated") {
    return (
      <div id="Resume" className=" flex flex-row  w-full">
        <SideBar />
        <div className="w-full h-full">
          <Subheader />
          <GenerateResume />
        </div>
      </div>
    );
  } else {
    return <div>Fuck Off</div>;
  }
}

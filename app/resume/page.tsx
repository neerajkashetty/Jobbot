"use client";
import { useSession } from "next-auth/react";
import { SideBar } from "../../components/sidebar";
import { Subheader } from "../../components/subheader";

export default function Resume() {
  const { data: session, status } = useSession();
  console.log(status);
  if (status === "authenticated") {
    return (
      <div id="Resume" className=" flex flex-row  w-full">
        <SideBar />
        <Subheader />
      </div>
    );
  } else {
    return <div>Fuck Off</div>;
  }
}

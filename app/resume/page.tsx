"use client";
import { useSession } from "next-auth/react";
import { SideBar } from "../../components/sidebar";
import { Subheader } from "../../components/subheader";
import { GenerateResume } from "../../components/generateResume";
import Loading from "../loading";

export default function Resume() {
  const { data: session, status } = useSession();
  console.log({ session, status });
  if (status === "authenticated") {
    return (
      <div id="Resume" className=" flex flex-row h-screen">
        <SideBar />
        <div className="w-full max-h-fit flex flex-col">
          <Subheader />
          <GenerateResume />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Loading />
      </div>
    );
  }
}

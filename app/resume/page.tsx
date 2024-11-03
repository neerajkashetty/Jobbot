"use client";
import { useSession } from "next-auth/react";

export default function Resume() {
  const { data: session, status } = useSession();
  console.log(status);
  if (status === "authenticated") {
    return (
      <div id="Resume" className="bg-red-900">
        fadsfa
      </div>
    );
  } else {
    return <div>Fuck Off</div>;
  }
}

import { useSession } from "next-auth/react";
import { checkdb } from "../app/actions/personaldetails";
import { useState, useEffect } from "react";
import { personalInfo } from "../app/actions/personaldetails";

export function Dialog() {
  const { data: session } = useSession();
  const username = session?.user?.name ?? "";
  const [valid, setValid] = useState<boolean | undefined>(undefined);
  const [experience, setExperience] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>();

  function renderExperience() {
    setExperience(true);
  }

  function handleopen() {
    setOpen(false);
  }

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const isValid = await checkdb(username);
        setValid(isValid);
        setOpen(true);
      } catch (error) {
        console.error("Error checking the database:", error);
        setValid(false);
      }
    };

    if (username) {
      verifyUser();
    }
  }, [username]);

  return (
    <>
      {!valid && open && (
        <div className="absolute inset-0 h-screen flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="w-1/2 bg-slate-100 h-4/5 p-2 rounded-lg flex flex-col gap-2 items-center justify-start">
            {!experience ? (
              <>
                <h1 className="font-bold text-xl p-2">
                  Please Fill in your Personal Details for our Record
                </h1>
                <div className="flex flex-row w-full gap-2 p-2">
                  <div className="flex-col gap-2 w-full flex">
                    <h1 className="text-sm font-medium">First Name</h1>
                    <input
                      placeholder="First Name"
                      className="w-full bg-gray-200 rounded-lg p-2"
                    ></input>
                  </div>
                  <div className="flex-col gap-2 w-full flex">
                    <h1 className="text-sm font-medium">Last Name</h1>
                    <input
                      placeholder="Last name"
                      className="w-full bg-gray-200 rounded-lg p-2"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-row w-full gap-2 p-2">
                  <div className="flex-col gap-2 w-full flex">
                    <h1 className="text-sm font-medium">Location</h1>
                    <input
                      placeholder="Location"
                      className="w-full bg-gray-200 rounded-lg p-2"
                    ></input>
                  </div>
                  <div className="flex-col gap-2 w-full flex">
                    <h1 className="text-sm font-medium">Phone</h1>
                    <input
                      placeholder="Last name"
                      className="w-full bg-gray-200 rounded-lg p-2"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-row w-full gap-2 p-2">
                  <div className="flex-col gap-2 w-full flex">
                    <h1 className="text-sm font-medium">LinkedIn</h1>
                    <input
                      placeholder="Location"
                      className="w-full bg-gray-200 rounded-lg p-2"
                    ></input>
                  </div>
                  <div className="flex-col gap-2 w-full flex">
                    <h1 className="text-sm font-medium">Github</h1>
                    <input
                      placeholder="Last name"
                      className="w-full bg-gray-200 rounded-lg p-2"
                    ></input>
                  </div>
                </div>
                <hr className="w-full h-0.5 bg-blue-100"></hr>
                <div className="w-full">
                  <h1 className="font-bold text-blue-700 text-center text-lg">
                    Education
                  </h1>
                  <div className="flex flex-row w-full gap-2 p-2">
                    <div className="flex-col gap-2 w-full flex">
                      <h1 className="text-sm font-medium">Degree Obtained</h1>
                      <input
                        placeholder="Degree Obtained"
                        className="w-full bg-gray-200 rounded-lg p-2"
                      ></input>
                    </div>
                    <div className="flex-col gap-2 w-full flex">
                      <h1 className="text-sm font-medium">
                        Name of University
                      </h1>
                      <input
                        placeholder="Name of University"
                        className="w-full bg-gray-200 rounded-lg p-2"
                      ></input>
                    </div>
                  </div>
                  <div className="flex flex-row w-full gap-2 p-2">
                    <div className="flex-col gap-2 w-full flex">
                      <h1 className="text-sm font-medium">CGPA</h1>
                      <input
                        placeholder="CGPA"
                        className="w-full bg-gray-200 rounded-lg p-2"
                      ></input>
                    </div>
                    <div className="flex-col gap-2 w-full flex justify-end items-end m-2">
                      <button
                        onClick={renderExperience}
                        className="p-2 bg-blue-300 w-1/3"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="font-bold text-blue-800 text-xl">Experience</h1>
                <div className="flex flex-row w-full gap-2 p-2">
                  <div className="flex-col gap-2 w-full flex">
                    <h1 className="text-sm font-medium">Job Title</h1>
                    <input
                      placeholder="Job Title"
                      className="w-full bg-gray-200 rounded-lg p-2"
                    ></input>
                  </div>
                  <div className="flex-col gap-2 w-full flex">
                    <h1 className="text-sm font-medium">Period of Work</h1>
                    <input
                      placeholder="Period of Work"
                      className="w-full bg-gray-200 rounded-lg p-2"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2 p-2">
                  <div className="flex-col gap-2 w-full flex">
                    <h1 className="text-sm font-medium">Company</h1>
                    <input
                      placeholder="Job Title"
                      className="w-1/2 bg-gray-200 rounded-lg p-2"
                    ></input>
                  </div>
                  <div className="flex-col gap-2 w-full flex">
                    <h1 className="text-sm font-medium">Description</h1>
                    <textarea
                      placeholder="Period of Work"
                      className="w-full h-full bg-gray-200 rounded-lg p-2"
                    ></textarea>
                  </div>
                  <div className="flex-row gap-2  flex justify-between top-20 relative items-end m-2">
                    <button
                      onClick={handleopen}
                      className="p-2 font-bold etx text-white bg-red-500 w-1/3 rounded-lg"
                    >
                      close
                    </button>
                    <button
                      onClick={renderExperience}
                      className="p-2 bg-blue-300 w-1/3"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

import { useSession } from "next-auth/react";
import { checkdb, personalInfo } from "../app/actions/personaldetails";
import { useState, useEffect } from "react";

export function Dialog() {
  const { data: session } = useSession();
  const username = session?.user?.name ?? "";
  const [valid, setValid] = useState<boolean | undefined>(undefined);
  const [experience, setExperience] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [degree, setDegree] = useState("");
  const [university, setUniversity] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [period, setPeriod] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit() {
    const submit = await personalInfo(
      firstname,
      lastname,
      parseInt(phone),
      linkedin,
      location,
      github,
      degree,
      university,
      parseInt(cgpa),
      jobTitle,
      company,
      description,
      parseInt(period),
      username
    );

    if (submit) {
      setOpen(false);
    }
  }

  function renderExperience() {
    setExperience(true);
  }

  function handleOpen() {
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
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      className="w-full bg-gray-200 rounded-lg p-2"
                    />
                  </div>
                  <div className="flex-col gap-2 w-full flex">
                    <h1 className="text-sm font-medium">Last Name</h1>
                    <input
                      placeholder="Last Name"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      className="w-full bg-gray-200 rounded-lg p-2"
                    />
                  </div>
                </div>
                <div className="flex flex-row w-full gap-2 p-2">
                  <div className="flex-col gap-2 w-full flex">
                    <h1 className="text-sm font-medium">Location</h1>
                    <input
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-gray-200 rounded-lg p-2"
                    />
                  </div>
                  <div className="flex-col gap-2 w-full flex">
                    <h1 className="text-sm font-medium">Phone</h1>
                    <input
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-gray-200 rounded-lg p-2"
                    />
                  </div>
                </div>
                <div className="flex flex-row w-full gap-2 p-2">
                  <div className="flex-col gap-2 w-full flex">
                    <h1 className="text-sm font-medium">LinkedIn</h1>
                    <input
                      placeholder="LinkedIn"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      className="w-full bg-gray-200 rounded-lg p-2"
                    />
                  </div>
                  <div className="flex-col gap-2 w-full flex">
                    <h1 className="text-sm font-medium">Github</h1>
                    <input
                      placeholder="Github"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      className="w-full bg-gray-200 rounded-lg p-2"
                    />
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
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        className="w-full bg-gray-200 rounded-lg p-2"
                      />
                    </div>
                    <div className="flex-col gap-2 w-full flex">
                      <h1 className="text-sm font-medium">
                        Name of University
                      </h1>
                      <input
                        placeholder="Name of University"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        className="w-full bg-gray-200 rounded-lg p-2"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row w-full gap-2 p-2">
                    <div className="flex-col gap-2 w-full flex">
                      <h1 className="text-sm font-medium">CGPA</h1>
                      <input
                        placeholder="CGPA"
                        value={cgpa}
                        onChange={(e) => setCgpa(e.target.value)}
                        className="w-full bg-gray-200 rounded-lg p-2"
                      />
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
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full bg-gray-200 rounded-lg p-2"
                    />
                  </div>
                  <div className="flex-col gap-2 w-full flex">
                    <h1 className="text-sm font-medium">Period of Work</h1>
                    <input
                      placeholder="Period of Work"
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      className="w-full bg-gray-200 rounded-lg p-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2 p-2">
                  <div className="flex-col gap-2 w-full flex">
                    <h1 className="text-sm font-medium">Company</h1>
                    <input
                      placeholder="Company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-1/2 bg-gray-200 rounded-lg p-2"
                    />
                  </div>
                  <div className="flex-col gap-2 w-full flex">
                    <h1 className="text-sm font-medium">Description</h1>
                    <textarea
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full h-full bg-gray-200 rounded-lg p-2"
                    />
                  </div>
                  <div className="flex-row gap-2 flex justify-between top-20 relative items-end m-2">
                    <button
                      onClick={handleOpen}
                      className="p-2 font-bold text-white bg-red-500 w-1/3 rounded-lg"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="p-2 bg-blue-300 w-1/3"
                    >
                      Submit
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

import { useSession } from "next-auth/react";
import { checkdb, personalInfo } from "../app/actions/personaldetails";
import { useState, useEffect } from "react";
import { ArrowBigLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PersonalInfoSchema,
  PersonalInfoSchemaType,
} from "../app/schemas/personalInfo.schema";
import z from "zod";

export function Dialog() {
  const { data: session } = useSession();
  const username = session?.user?.name ?? "";
  const [valid, setValid] = useState<boolean | undefined>(true);
  const [experience, setExperience] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
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
  const [errors, setErrors] =
    useState<z.ZodError<PersonalInfoSchemaType> | null>(null);

  async function handleSubmit() {
    const formData = {
      firstname,
      lastname,
      phone,
      linkedin,
      location,
      github,
      degree,
      university,
      cgpa: parseFloat(cgpa),
      jobTitle,
      period,
      company,
      description,
    };

    const result = PersonalInfoSchema.safeParse(formData);

    if (!result.success) {
      console.error("Validation errors:", result.error.format());
      setErrors(result.error);
      alert("Please check your input and try again.");
      return;
    }
    const submit = await personalInfo(
      firstname,
      lastname,
      parseInt(phone),
      linkedin,
      location,
      github,
      degree,
      university,
      parseFloat(cgpa),
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
    setExperience(!experience);
  }

  function handleOpen() {
    setOpen(false);
  }

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const isValid = await checkdb(username);
        console.log(isValid);
        setValid(isValid?.success);
        // setOpen(true);
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
        <AnimatePresence>
          <div className="absolute inset-0 h-screen flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              exit={{ opacity: 0, scale: 0 }}
              className="w-1/2 bg-slate-100 h-4/5 p-2 rounded-lg flex flex-col gap-2 items-center justify-start"
            >
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
                      {errors?.formErrors.fieldErrors.firstname && (
                        <p className="text-red-500 text-sm">
                          {errors.formErrors.fieldErrors.firstname[0]}
                        </p>
                      )}
                    </div>

                    <div className="flex-col gap-2 w-full flex">
                      <h1 className="text-sm font-medium">Last Name</h1>
                      <input
                        placeholder="Last Name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className="w-full bg-gray-200 rounded-lg p-2"
                      />
                      {errors?.formErrors.fieldErrors.lastname && (
                        <p className="text-red-500 text-sm">
                          {errors.formErrors.fieldErrors.lastname[0]}
                        </p>
                      )}
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
                      {errors?.formErrors.fieldErrors.location && (
                        <p className="text-red-500 text-sm">
                          {errors.formErrors.fieldErrors.location[0]}
                        </p>
                      )}
                    </div>
                    <div className="flex-col gap-2 w-full flex">
                      <h1 className="text-sm font-medium">Phone</h1>
                      <input
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-gray-200 rounded-lg p-2"
                      />
                      {errors?.formErrors.fieldErrors.phone && (
                        <p className="text-red-500 text-sm">
                          {errors.formErrors.fieldErrors.phone[0]}
                        </p>
                      )}
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
                      {errors?.formErrors.fieldErrors.linkedin && (
                        <p className="text-red-500 text-sm">
                          {errors.formErrors.fieldErrors.linkedin[0]}
                        </p>
                      )}
                    </div>
                    <div className="flex-col gap-2 w-full flex">
                      <h1 className="text-sm font-medium">Github</h1>
                      <input
                        placeholder="Github"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        className="w-full bg-gray-200 rounded-lg p-2"
                      />
                      {errors?.formErrors.fieldErrors.github && (
                        <p className="text-red-500 text-sm">
                          {errors.formErrors.fieldErrors.github[0]}
                        </p>
                      )}
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
                        {errors?.formErrors.fieldErrors.degree && (
                          <p className="text-red-500 text-sm">
                            {errors.formErrors.fieldErrors.degree[0]}
                          </p>
                        )}
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
                        {errors?.formErrors.fieldErrors.university && (
                          <p className="text-red-500 text-sm">
                            {errors.formErrors.fieldErrors.university[0]}
                          </p>
                        )}
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
                        {errors?.formErrors.fieldErrors.cgpa && (
                          <p className="text-red-500 text-sm">
                            {errors.formErrors.fieldErrors.cgpa[0]}
                          </p>
                        )}
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
                  <div className="flex flex-row w-full gap-16">
                    <ArrowBigLeft
                      onClick={renderExperience}
                      className="flex flex-row justify-start items-start w-1/3 hover:cursor-pointer"
                    />
                    <h1 className="font-bold text-blue-800 text-xl">
                      Experience
                    </h1>
                  </div>
                  <div className="flex flex-row w-full gap-2 p-2">
                    <div className="flex-col gap-2 w-full flex">
                      <h1 className="text-sm font-medium">Job Title</h1>
                      <input
                        placeholder="Job Title"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full bg-gray-200 rounded-lg p-2"
                      />
                      {errors?.formErrors.fieldErrors.jobTitle && (
                        <p className="text-red-500 text-sm">
                          {errors.formErrors.fieldErrors.jobTitle[0]}
                        </p>
                      )}
                    </div>
                    <div className="flex-col gap-2 w-full flex">
                      <h1 className="text-sm font-medium">Period of Work</h1>
                      <input
                        placeholder="Period of Work"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="w-full bg-gray-200 rounded-lg p-2"
                      />
                      {errors?.formErrors.fieldErrors.period && (
                        <p className="text-red-500 text-sm">
                          {errors.formErrors.fieldErrors.period[0]}
                        </p>
                      )}
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
                      {errors?.formErrors.fieldErrors.company && (
                        <p className="text-red-500 text-sm">
                          {errors.formErrors.fieldErrors.company[0]}
                        </p>
                      )}
                    </div>
                    <div className="flex-col gap-2 w-full flex">
                      <h1 className="text-sm font-medium">Description</h1>
                      <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-full bg-gray-200 rounded-lg p-2"
                      />
                      {errors?.formErrors.fieldErrors.description && (
                        <p className="text-red-500 text-sm">
                          {errors.formErrors.fieldErrors.description[0]}
                        </p>
                      )}
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
            </motion.div>
          </div>
        </AnimatePresence>
      )}
    </>
  );
}

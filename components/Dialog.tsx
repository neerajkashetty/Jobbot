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
  const [open, setOpen] = useState<boolean>(true);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [education, setEducation] = useState([
    { degree: "", university: "", cgpa: "" },
  ]);
  const [jobTitle, setJobTitle] = useState("");
  const [currentStep, setCurrentStep] = useState<
    "personal" | "education" | "experience"
  >("personal");
  const [period, setPeriod] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] =
    useState<z.ZodError<PersonalInfoSchemaType> | null>(null);

  function goToNextStep() {
    if (currentStep === "personal") setCurrentStep("education");
    else if (currentStep === "education") setCurrentStep("experience");
  }

  function goToPreviousStep() {
    if (currentStep === "experience") setCurrentStep("education");
    else if (currentStep === "education") setCurrentStep("personal");
  }

  async function handleSubmit() {
    console.log(username, "dsad");
    // Validate education entries
    const parsedEducation = education.map((edu) => ({
      ...edu,
      CGPA: parseInt(edu.cgpa, 10), // Ensure CGPA is an integer
    }));

    const formData = {
      firstname,
      lastname,
      phone,
      linkedin,
      location,
      github,
      education: parsedEducation,
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

    // Submit each education record
    for (const edu of parsedEducation) {
      await personalInfo(
        firstname,
        lastname,
        parseInt(phone),
        linkedin,
        location,
        github,
        edu.degree,
        edu.university,
        edu.CGPA,
        company,
        description,
        parseInt(period),
        username
      );
    }

    setOpen(false);
  }

  function handleEducationChange(index: number, field: string, value: string) {
    setEducation((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  function addEducation() {
    setEducation([...education, { degree: "", university: "", cgpa: "" }]);
  }

  function removeEducation(index: number) {
    setEducation(education.filter((_, i) => i !== index));
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
      {valid && open && (
        <AnimatePresence>
          <div className="absolute inset-0  h-screen flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              exit={{ opacity: 0, scale: 0 }}
              className="w-1/2 overflow-hidden bg-slate-100 h-2/3 p-2 rounded-lg flex flex-col gap-2 items-center justify-start"
            >
              {currentStep === "personal" && (
                <>
                  <h1 className="font-bold text-xl p-2">
                    Please Fill in your Personal Details for our Record
                  </h1>
                  <div className="flex flex-row w-full  gap-2 p-2">
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
                  <div className="flex-col gap-2 w-full flex justify-end items-end m-2">
                    <button
                      onClick={() => goToNextStep()}
                      className="p-1 bg-blue-300 w-1/6"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
              {currentStep === "education" && (
                <div className="w-full ">
                  <div className="flex items-center  justify-between">
                    <div
                      onClick={goToPreviousStep}
                      className="flex hover:cursor-pointer"
                    >
                      <ArrowBigLeft className=" hover:cursor-pointer" />
                      <p className="underline font-semibold">Back</p>
                    </div>
                    <h1 className="font-bold text-blue-700 text-center text-lg w-4/5">
                      Education
                    </h1>
                    <button
                      onClick={addEducation}
                      className="p-1 bg-blue-400 text-white font-semibold rounded-lg w-1/6 mt-2"
                    >
                      Add +
                    </button>
                  </div>
                  {education.map((edu, index) => (
                    <div key={index} className="flex flex-row w-full gap-2 p-2">
                      <div className="flex-col gap-2 w-full flex">
                        <h1 className="text-sm font-medium">Degree Obtained</h1>
                        <input
                          placeholder="Degree Obtained"
                          value={edu.degree}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "degree",
                              e.target.value
                            )
                          }
                          className="w-full bg-gray-200 rounded-lg p-2"
                        />
                        {errors?.formErrors.fieldErrors &&
                          Object.entries(errors.formErrors.fieldErrors).map(
                            ([key, value]) => (
                              <p key={key} className="text-red-500 text-sm">
                                {value[0]}{" "}
                                {/* Assuming value is an array of error messages */}
                              </p>
                            )
                          )}
                      </div>
                      <div className="flex-col gap-2 w-full flex">
                        <h1 className="text-sm font-medium">
                          Name of University
                        </h1>
                        <input
                          placeholder="Name of University"
                          value={edu.university}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "university",
                              e.target.value
                            )
                          }
                          className="w-full bg-gray-200 rounded-lg p-2"
                        />
                        {errors?.formErrors.fieldErrors &&
                          Object.entries(errors.formErrors.fieldErrors).map(
                            ([key, value]) => (
                              <p key={key} className="text-red-500 text-sm">
                                {value[0]}{" "}
                                {/* Assuming value is an array of error messages */}
                              </p>
                            )
                          )}
                      </div>
                      <div className="flex-col gap-2 w-full flex">
                        <h1 className="text-sm font-medium">CGPA</h1>
                        <input
                          placeholder="CGPA"
                          value={edu.cgpa}
                          onChange={(e) =>
                            handleEducationChange(index, "cgpa", e.target.value)
                          }
                          className="w-full bg-gray-200 rounded-lg p-2"
                        />
                        {errors?.formErrors.fieldErrors &&
                          Object.entries(errors.formErrors.fieldErrors).map(
                            ([key, value]) => (
                              <p key={key} className="text-red-500 text-sm">
                                {value[0]}{" "}
                                {/* Assuming value is an array of error messages */}
                              </p>
                            )
                          )}
                      </div>
                      <button
                        onClick={() => removeEducation(index)}
                        className="  text-red-900 font-semibold rounded-lg w-1/6 "
                      >
                        delete
                      </button>
                    </div>
                  ))}

                  <div className="flex-col gap-2 w-full flex justify-end items-end m-2">
                    <button
                      onClick={goToNextStep}
                      className="p-1 bg-blue-300 w-1/6"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {currentStep === "experience" && (
                <>
                  <div className="flex flex-row justify-between w-full gap-16">
                    <div
                      onClick={goToPreviousStep}
                      className="flex hover:cursor-pointer"
                    >
                      <ArrowBigLeft className=" hover:cursor-pointer" />
                      <p className="underline font-semibold">Back</p>
                    </div>
                    <h1 className="font-bold text-blue-800 text-xl">
                      Experience
                    </h1>
                    <button
                      onClick={addEducation}
                      className="p-1 bg-blue-400 text-white font-semibold rounded-lg w-1/6 mt-2"
                    >
                      Add +
                    </button>
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

import React, { useState } from "react";
import { Edit, Save } from "lucide-react";

interface Previewprops {
  resumedata: any;
  Firstname: string;
  Lastname: string;
  Email: string;
  ref: any;
  generate: any;
}

export const Preview = (props: Previewprops) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleContentChange = (key: string, value: any) => {
    props.resumedata[key] = value; // Directly update props.resumedata
  };

  const handleNestedContentChange = (
    parentKey: string,
    key: string,
    value: any
  ) => {
    if (!props.resumedata[parentKey]) {
      props.resumedata[parentKey] = {};
    }
    props.resumedata[parentKey][key] = value;
  };

  const technicalSkills = props?.resumedata?.Skills ?? {};

  return (
    <div className="h-full md:w-2/3 overflow-y-scroll text-xs">
      {/* Header */}
      <div className="flex text-md border h-1/12 justify-between items-center w-full p-2.5">
        <span className="cursor-pointer hover:border-b p-2 font-bold">
          Preview
        </span>
        <span
          onClick={toggleEdit}
          className="cursor-pointer hover:border-b p-2 font-bold flex items-center"
        >
          {isEditing ? "Save" : "Edit"}
          {isEditing ? (
            <Save className="w-4 ml-2" />
          ) : (
            <Edit className="w-4 ml-2" />
          )}
        </span>
        <button
          onClick={() => props.generate()}
          className="font-bold p-2 bg-blue-300 text-blue-900 rounded-lg"
        >
          Download
        </button>
      </div>

      {/* Main Resume Section */}
      <div
        ref={props.ref}
        style={{ maxWidth: "220mm", height: "300mm" }}
        className="h-full w-full rounded-lg flex flex-col"
      >
        {/* Personal Details */}
        <div className="flex flex-col items-center justify-center">
          <h1
            className={`font-bold text-2xl ${
              isEditing ? "border border-gray-300 rounded p-1" : ""
            }`}
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) =>
              handleNestedContentChange(
                "PersonalDetails",
                "Name",
                e.target.innerText
              )
            }
          >
            {props?.resumedata?.PersonalDetails?.Name ?? "NEERAJ"}
          </h1>
          <div className="flex flex-row gap-4 underline justify-between">
            <a
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) =>
                handleNestedContentChange(
                  "PersonalDetails",
                  "Location",
                  e.target.innerText
                )
              }
            >
              {props?.resumedata?.PersonalDetails?.Location ?? "Cincinnati, OH"}
            </a>
            <a
              className="underline"
              href={`mailto:${props.Email ?? "neeraj.kashetty29@gmail.com"}`}
            >
              {props.Email ?? "neeraj.kashetty29@gmail.com"}
            </a>
            <a
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) =>
                handleNestedContentChange(
                  "PersonalDetails",
                  "LinkedIn",
                  e.target.innerText
                )
              }
            >
              {props?.resumedata?.PersonalDetails?.LinkedIn ?? "LinkedIn"}
            </a>
            <a
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) =>
                handleNestedContentChange(
                  "PersonalDetails",
                  "GitHub",
                  e.target.innerText
                )
              }
            >
              {props?.resumedata?.PersonalDetails?.GitHub ?? "GitHub"}
            </a>
            <a
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) =>
                handleNestedContentChange(
                  "PersonalDetails",
                  "Phone",
                  e.target.innerText
                )
              }
            >
              {props?.resumedata?.PersonalDetails?.Phone ?? "Phone"}
            </a>
          </div>
        </div>

        {/* Summary */}
        <div className="flex flex-col items-start justify-start">
          <h1 className="font-medium">Summary</h1>
          <hr className="w-full h-0.2 mt-1 bg-black"></hr>
          <p
            className={`${
              isEditing ? "border border-gray-300 rounded p-1" : ""
            }`}
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentChange("Summary", e.target.innerText)}
          >
            {props.resumedata?.Summary ?? "No summary available."}
          </p>
        </div>

        {/* Technical Skills */}
        <div className="flex flex-col items-start justify-start mt-1">
          <h1 className="font-medium">Technical Skills</h1>
          <hr className="w-full h-0.2 mt-2 bg-black"></hr>
          <div className="m-1 flex flex-col gap-0.5">
            {Object.keys(technicalSkills).length > 0 ? (
              Object.entries(technicalSkills).map(
                ([category, skills]: any, index) => (
                  <div key={index} className="flex flex-row gap-2">
                    <h2 className="font-semibold">{category}:</h2>
                    <div
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        const updatedSkills = e.target.innerText.split(", ");
                        handleContentChange("Skills", {
                          ...props.resumedata.Skills,
                          [category]: updatedSkills,
                        });
                      }}
                      className="flex flex-wrap gap-2"
                    >
                      {skills.join(", ")}
                    </div>
                  </div>
                )
              )
            ) : (
              <p>No technical skills available.</p>
            )}
          </div>
        </div>

        {/* Professional Experience */}
        <div className="flex flex-col items-start justify-start p-1">
          <h1 className="font-medium">Professional Experience</h1>
          <hr className="w-full h-0.2 mt-1 bg-black"></hr>
          {props.resumedata?.Experience?.length > 0 ? (
            props.resumedata.Experience.map(
              (experience: any, index: number) => (
                <div key={index} className="rounded-lg">
                  <h2
                    className={`font-semibold ${
                      isEditing ? "border border-gray-300 rounded p-1" : ""
                    }`}
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) =>
                      handleContentChange("Experience", [
                        ...props.resumedata.Experience.map(
                          (exp: any, idx: number) =>
                            idx === index
                              ? { ...exp, "Job Title": e.target.innerText }
                              : exp
                        ),
                      ])
                    }
                  >
                    {experience["Job Title"]}
                  </h2>
                  <p>{experience.Company}</p>
                  <p>{experience.Period}</p>
                  <ul>
                    {experience.Description.map((desc: string, idx: number) => (
                      <li key={idx}>{desc}</li>
                    ))}
                  </ul>
                </div>
              )
            )
          ) : (
            <p>No experience data available.</p>
          )}
        </div>

        {/* Education */}
        <div className="flex flex-col items-start justify-start p-1 w-full">
          <h1 className="font-medium">Education</h1>
          <hr className="w-full h-0.1 mt-1 bg-black"></hr>
          {props.resumedata?.Education?.length > 0 ? (
            props.resumedata.Education.map((education: any, index: number) => (
              <div key={index} className="mb-4 p-1 rounded-lg bg-gray-100/15">
                <p
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    handleContentChange("Education", [
                      ...props.resumedata.Education.map(
                        (edu: any, idx: number) =>
                          idx === index
                            ? { ...edu, Degree: e.target.innerText }
                            : edu
                      ),
                    ])
                  }
                >
                  <strong>Degree:</strong> {education.Degree}
                </p>
                <p>
                  <strong>Institution:</strong> {education.University}
                </p>
                <p>
                  <strong>Year:</strong> {education.Year}
                </p>
                <p>
                  <strong>CGPA:</strong> {education.CGPA}
                </p>
              </div>
            ))
          ) : (
            <p>No education data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

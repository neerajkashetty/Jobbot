interface Previewprops {
  resumedata: any;
  Firstname: string;
  Lastname: string;
  Email: string;
  ref: any;
  generate: any;
  Errors: any;
}

export const Preview = (props: Previewprops) => {
  const technicalSkills = props?.resumedata?.Skills ?? {};

  return (
    <div className="h-full md:w-2/3 overflow-y-scroll text-xs ">
      <div className="flex text-md border h-1/12 justify-between items-center w-full p-2.5 ">
        <span className="cursor-pointer hover:border-b p-2 font-bold">
          Preview
        </span>
        <button
          onClick={() => props.generate()}
          className="font-bold p-2 bg-blue-300 text-blue-900 rounded-lg "
        >
          Download
        </button>
      </div>
      <div
        ref={props.ref}
        style={{ maxWidth: "220mm", height: "300mm" }}
        className=" h-full w-full rounded-lg flex flex-col "
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-2xl">
            {props?.resumedata?.PersonalDetails?.Name ?? "NEERAJ"}
          </h1>
          <div className="flex flex-row gap-4 underline justify-between">
            <a>
              {props?.resumedata?.PersonalDetails?.Location ?? "Cincinnati, OH"}
            </a>
            <a
              className="underline"
              href={`mailto:${props.Email ?? "neeraj.kashetty29@gmail.com"}`}
            >
              {props.Email ?? "neeraj.kashetty29@gmail.com"}
            </a>
            <a href={props?.resumedata?.PersonalDetails?.LinkedIn}>LinkedIn</a>
            <a href={props?.resumedata?.PersonalDetails?.GitHub}>GitHub</a>
            <a>{props?.resumedata?.PersonalDetails?.Phone ?? "Phone"}</a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start">
          <h1 className="font-medium">Summary</h1>
          <hr className="w-full h-0.2 mt-1 bg-black"></hr>
          <p>{props.resumedata?.Summary ?? "No summary available."}</p>
        </div>

        <div className="flex flex-col items-start justify-start mt-1">
          <h1 className="font-medium">Technical Skills</h1>
          <hr className="w-full h-0.2 mt-2 bg-black"></hr>

          <div className="m-1 flex flex-col gap-0.5">
            {Object.keys(technicalSkills).length > 0 ? (
              Object.entries(technicalSkills).map(
                ([category, skills]: any, index) => (
                  <div key={index} className="flex flex-row gap-2">
                    <h2 className="font-semibold">{category} :</h2>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-blackrounded-md shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )
            ) : (
              <p>No technical skills available.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start justify-start p-1">
          <h1 className="font-medium">Professional Experience</h1>
          <hr className="w-full h-0.2 mt-1 bg-black"></hr>
          <div className="text-pretty w-full tracking ">
            {props.resumedata?.Experience?.length > 0 ? (
              props.resumedata.Experience.map(
                (experience: any, index: number) => (
                  <div key={index} className=" rounded-lg">
                    <div className="flex flex-row justify-between">
                      <h2 className="font-semibold">
                        {experience["Job Title"]}
                      </h2>
                      <p className="font-serif">{experience.Period}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>{experience.Company}</p>
                      <p className="text-xs font-serif">Cincinnati, Ohio</p>
                    </div>
                    <div className="flex flex-col ">
                      <strong>Roles & Responsibilties:</strong>
                      <ul className="list-disc list-outside ml-4 text-wrap">
                        {experience.Description.map(
                          (description: string, idx: number) => (
                            <li key={idx} className="font-normal">
                              {description}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                )
              )
            ) : (
              <p>No experience data available.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start justify-start p-1 w-full">
          <h1 className="font-medium">Education</h1>
          <hr className="w-full h-0.1 mt-1 bg-black"></hr>
          <div className="text-pretty tracking">
            {props.resumedata?.Education?.length > 0 ? (
              props.resumedata.Education.map(
                (education: any, index: number) => (
                  <div
                    key={index}
                    className="mb-4 p-1 rounded-lg bg-gray-100/15"
                  >
                    <p>
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
                )
              )
            ) : (
              <p>No education data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

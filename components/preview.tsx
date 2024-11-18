interface Previewprops {
  resumedata: any;
  Firstname: string;
  Lastname: string;
  Email: string;
  ref: any;
  generate: any;
}

export const Preview = (props: Previewprops) => {
  const technicalSkills = props?.resumedata?.Skills ?? {};

  return (
    <div className="w-1/2 h-full " ref={props.ref}>
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
      <div className="bg-gray-100/25 h-full m-2 rounded-lg flex flex-col">
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

        <div className="flex flex-col items-start justify-start p-2">
          <h1 className="font-medium">Summary</h1>
          <hr className="w-full h-0.5 bg-black"></hr>
          <p>{props.resumedata?.Summary ?? "No summary available."}</p>
        </div>

        <div className="flex flex-col items-start justify-start p-2">
          <h1 className="font-medium">Technical Skills</h1>
          <hr className="w-full h-0.5 bg-black"></hr>

          <div className="p-2 flex flex-col gap-1">
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

        <div className="flex flex-col items-start justify-start p-2">
          <h1 className="font-medium">Professional Experience</h1>
          <hr className="w-full h-0.5 bg-black"></hr>
          <div className="text-pretty w-full tracking ">
            {props.resumedata?.Experience?.length > 0 ? (
              props.resumedata.Experience.map(
                (experience: any, index: number) => (
                  <div key={index} className="p-2 rounded-lg">
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
                    <div className="flex flex-col gap-1 mt-2 ">
                      <strong>Roles & Responsibilties:</strong>
                      <ul className="list-disc list-inside">
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

        <div className="flex flex-col items-start justify-start p-2 w-full">
          <h1 className="font-medium">Education</h1>
          <hr className="w-full h-0.5 bg-black"></hr>
          <div className="text-pretty tracking">
            {props.resumedata?.Education?.length > 0 ? (
              props.resumedata.Education.map(
                (education: any, index: number) => (
                  <div
                    key={index}
                    className="mb-4 p-4 rounded-lg bg-gray-100/15"
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

interface Previewprops {
  resumedata: any;
  Firstname: string;
  Lastname: string;
  Email: string;
}

export const Preview = (props: Previewprops) => {
  //console.log(props.resumedata.Skills);
  return (
    <div className="w-1/2 h-full">
      <div className="flex text-md border h-1/12 justify-between w-full p-2.5  items-end ">
        <span className="cursor-pointer hover:border-b p-2  font-bold ">
          Preview
        </span>
      </div>
      <div className="bg-gray-100 h-full  m-6 rounded-lg flex flex-col ">
        <div className=" flex flex-col items-center justify-center">
          <h1 className="font-bold text-2xl">
            {props?.Firstname ?? "NEERAJ"} {props?.Lastname ?? "Kasheety"}
          </h1>
          <div className="flex flex-row gap-4 underline justify-between">
            <a>Cincinnati, OH</a>
            <a
              className="underline"
              href={props.Email ?? "neeraj.kashetty29@gmail.com"}
            >
              {props.Email ?? "neeraj.kashetty29@gmail.com"}{" "}
            </a>
            <a>LinkedIn</a>
            <a>Github</a>
            <a>Phone</a>
          </div>
        </div>
        <div className="flex flex-col items-start  justify-start ">
          <h1 className="font-medium">Summary</h1>
          <p>{props.resumedata?.Summary ?? ""}</p>
        </div>
        <div className="flex flex-col items-start  justify-start ">
          <h1 className="font-medium">Technical Skills</h1>
          <p className="p-2 flex flex-row overflow-hidden">
            {props.resumedata?.Skills && props.resumedata?.Skills.length > 0
              ? props.resumedata.Skills.map((skill: string, index: number) => (
                  <div key={index} className="flex flex-row ">
                    <p className="text-black flex flex-row p-1 relative bg-blue-200 rounded-md shadow-sm">
                      {skill}
                    </p>
                  </div>
                ))
              : "No Skills Available"}
          </p>
        </div>
        <div className="flex flex-col items-start  justify-start ">
          <h1 className="font-medium">Professional Experience</h1>
          <div className=" text-pretty tracking">
            <div>
              {props.resumedata?.Experience &&
              props.resumedata.Experience.length > 0 ? (
                props.resumedata.Experience.map(
                  (experience: any, index: number) => (
                    <div key={index} className="mb-4 p-2 border rounded-lg">
                      <h2 className="font-semibold">
                        {experience["Job Title"]}
                      </h2>
                      <p>
                        <strong>Company:</strong> {experience.Company}
                      </p>
                      <p>
                        <strong>Duration:</strong> {experience.Duration}
                      </p>
                      <p>
                        <strong>Description:</strong> {experience.Description}
                      </p>
                      <p>
                        <strong>Skills:</strong> {experience.Skills}
                      </p>
                    </div>
                  )
                )
              ) : (
                <p>No experience data available.</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start  justify-start">
          <h1 className="font-medium">Education</h1>
          <div className=" text-pretty tracking">
            <div>
              {props.resumedata?.Education &&
              props.resumedata.Education.length > 0 ? (
                props.resumedata.Education.map(
                  (education: any, index: number) => (
                    <div key={index} className="mb-4 p-2 border rounded-lg">
                      <h2 className="font-semibold"></h2>
                      <p>
                        <strong>Degree:</strong> {education.Degree}
                      </p>
                      <p>
                        <strong>Institution:</strong> {education.Institution}
                      </p>
                      <p>
                        <strong>Year:</strong> {education.Year}
                      </p>
                      <p>
                        <strong>GPA:</strong> {education.GPA}
                      </p>
                    </div>
                  )
                )
              ) : (
                <p>No experience data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

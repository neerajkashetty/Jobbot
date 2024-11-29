import { useState, useRef, useEffect } from "react";
import { Preview } from "./preview";
import { Dialog } from "./Dialog";
import Example from "./combobox";
import { people, output } from "../utils/data";
import { resume, ResumeParams } from "../app/actions/ai";
import { GenerateResumeSchema } from "../app/schemas/generateresume.schema";
import type { ZodError } from "zod";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Clock, Download, ChevronDown, Eye } from "lucide-react";

interface StoredResume {
  id: string;
  jobTitle: string;
  content: any;
  pdfUrl: string;
  createdAt: string;
}

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

const PreviewModal = ({ isOpen, onClose, pdfUrl }: PreviewModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Resume Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0"
            title="Resume Preview"
          />
        </div>
      </div>
    </div>
  );
};

export function GenerateResume() {
  const [jobtitle, setJobTitle] = useState("");
  const [jobdescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [resumedata, setResumeData] = useState<any>();
  const [errors, setErrors] = useState<ZodError<GenerateResumeSchema> | null>(
    null
  );
  const [storedResumes, setStoredResumes] = useState<StoredResume[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!pdfRef.current) {
      console.error("PDF Reference not found");
      return;
    }
    console.log("asldlaks");

    setIsLoading(true);
    try {
      const element = pdfRef.current;
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });
      console.log("asldlaks");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      const pdfBlob = pdf.output("blob");

      console.log("asldlaks");

      const formData = new FormData();

      formData.append("file", pdfBlob, "resume");
      formData.append("jobtitle", jobtitle);
      formData.append("resumeData", JSON.stringify(resumedata));

      const response = await fetch("/api/uploadResume", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.url) {
        console.log("Resume uploaded successfully:", result.url);
        alert("Resume uploaded successfully!");
      } else {
        console.error("Failed to upload resume:", result.error);
        alert("Failed to upload resume. Please try again.");
      }

      pdf.save("Resume.pdf");
    } catch (error) {
      console.error("Failed to save resume:", error);
      alert("Failed to save resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = (pdfUrl: string) => {
    setSelectedPdfUrl(pdfUrl);
    setIsPreviewOpen(true);
  };

  const Generate = async () => {
    const formData = { jobtitle, jobdescription };
    const result = GenerateResumeSchema.safeParse(formData);

    if (!result.success) {
      console.error("Validation errors:", result.error.format());
      setErrors(result.error);
      alert("Please check your input and try again.");
      return;
    }

    const resumeParams: ResumeParams = {
      jobtitle,
      skills: ["React", "Node", "typescript"],
      Firstname: FirstName,
      Lastname: LastName,
      experience: [
        "5 years of experience in the software design and development",
      ],
      jobdescription,
    };

    const resumeData = await resume(resumeParams);
    const final = resumeData[0].message.content ?? "";

    try {
      const parsedData = JSON.parse(final);
      setResumeData(parsedData);
    } catch (error) {
      console.error("Failed to parse the resume data:", error);
    }
  };

  return (
    <div className="flex md:flex-row h-screen overflow-hidden">
      <div className="w-full md:w-1/2 flex flex-col border">
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-2xl mx-auto space-y-8">
            <div>
              <h1 className="font-bold text-xl text-center">
                Generate Your Resume
              </h1>
            </div>
            <div className="bg-white rounded-lg shadow">
              <button
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                className="w-full px-4 py-2 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span className="font-medium">
                    Resume History ({storedResumes.length})
                  </span>
                </div>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform ${
                    isHistoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isHistoryOpen && (
                <div className="px-4 py-2 max-h-60 overflow-y-auto border-t">
                  {storedResumes.length === 0 ? (
                    <p className="text-gray-500 text-sm py-2">
                      No resumes generated yet
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {storedResumes.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{item.jobTitle}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handlePreview(item.pdfUrl)}
                              className="p-2 hover:bg-gray-100 rounded-full"
                            >
                              <Eye size={18} className="text-gray-500" />
                            </button>
                            <a
                              href={item.pdfUrl}
                              download
                              className="p-2 hover:bg-gray-100 rounded-full"
                            >
                              <Download size={18} className="text-gray-500" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              <h1 className="font-bold mb-4">Content</h1>
              <div className="space-y-6">
                <div>
                  <p className="font-bold mb-2">Job Title</p>
                  <input
                    className="w-full p-2 rounded-lg bg-gray-100"
                    placeholder="Job title"
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                  {errors?.formErrors.fieldErrors.jobtitle && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.formErrors.fieldErrors.jobtitle[0]}
                    </p>
                  )}
                </div>

                <div>
                  <p className="mb-2">Paste the job description below</p>
                  <textarea
                    placeholder="Job Description Here please"
                    className="w-full h-32 bg-gray-200/40 p-2 rounded-lg"
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  {errors?.formErrors.fieldErrors.jobdescription && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.formErrors.fieldErrors.jobdescription[0]}
                    </p>
                  )}
                </div>

                <div>
                  <h2 className="text-sm font-medium mb-2">
                    Which skills should be focused?
                  </h2>
                  <div className="relative">
                    <Example people={people} />
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium mb-2">
                    How creative should the output be?
                  </h2>
                  <div className="relative">
                    <Example people={output} />
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <button
                    onClick={Generate}
                    className="bg-blue-400 px-6 py-2 rounded-lg font-semibold text-white hover:bg-blue-500 transition-colors"
                  >
                    Create Content
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Preview
        ref={pdfRef}
        resumedata={resumedata}
        Firstname={FirstName}
        Lastname={LastName}
        Email=""
        generate={handleDownload}
      />

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        pdfUrl={selectedPdfUrl}
      />

      <Dialog />
    </div>
  );
}

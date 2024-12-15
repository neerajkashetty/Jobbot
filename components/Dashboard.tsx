import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getResumes } from "../app/actions/getResumes";
import { ArrowBigLeft, FileText, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard({
  onDashBoard,
  FDashBoard,
  onSelect,
}: {
  onDashBoard: boolean;
  FDashBoard: any;
  onSelect: any;
}) {
  const { data: session } = useSession();
  const username = session?.user?.name ?? "";
  const [resumes, setResumes] = useState<any[]>([]);
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const result = await getResumes("1");
        if (result?.resumes) {
          setResumes(result.resumes);
        }
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    if (username) {
      fetchResumes();
    }
  }, [username]);

  function handlePDFSelect(resumeUrl: string) {
    console.log(resumeUrl);
    window.open(resumeUrl, "_blank");
  }

  function handleDeleteResume(resumeId: string) {
    setResumes(resumes.filter((resume) => resume.id !== resumeId));
  }

  function handleClose() {
    FDashBoard(false);
    onSelect("");
  }

  return (
    <>
      {onDashBoard && (
        <AnimatePresence>
          <div className="absolute inset-0 h-screen flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              exit={{ opacity: 0, scale: 0 }}
              className="w-3/4 overflow-hidden bg-slate-100 h-2/3 p-4 rounded-lg flex flex-col gap-4"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-700">
                  {selectedPDF ? "PDF Viewer" : "Resume Dashboard"}
                </h1>
                {selectedPDF && (
                  <button
                    onClick={() => setSelectedPDF(null)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <ArrowBigLeft /> Back to List
                  </button>
                )}
                <button
                  onClick={handleClose}
                  className="text-red-500 font-bold hover:text-red-700"
                >
                  Close
                </button>
              </div>

              {!selectedPDF ? (
                <div className="grid grid-cols-4 gap-3 overflow-y-auto">
                  {resumes.length === 0 ? (
                    <p className="col-span-3 text-center text-gray-500">
                      No resumes uploaded yet
                    </p>
                  ) : (
                    resumes.map((resume) => (
                      <div
                        key={resume.id}
                        className="flex flex-col group items-center"
                      >
                        <FileText
                          onClick={() => handlePDFSelect(resume.pdfUrl)}
                          className="w-12 h-12 text-blue-300 mb-2 hover:cursor-pointer"
                        />
                        <div className="flex gap-1">
                          <p className="text-sm font-medium mb-2 text-blue-800">
                            {resume.jobTitle || "Unnamed Resume"}
                          </p>
                          <div className=" invisible group-hover:visible">
                            <button
                              onClick={() => handleDeleteResume(resume.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="flex-grow">
                  <iframe
                    src={selectedPDF}
                    className="w-full h-full"
                    title="PDF Viewer"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </AnimatePresence>
      )}
    </>
  );
}

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getResumes } from "../app/actions/getResumes";
import { ArrowBigLeft, FileText, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard({
  onDashBoard,
  FDashBoard,
}: {
  onDashBoard: boolean;
  FDashBoard: any;
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
                  {selectedPDF ? "PDF Viewer" : "Your Resumes"}
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
                  className="text-red-500 hover:text-red-700"
                >
                  Close
                </button>
              </div>

              {!selectedPDF ? (
                <div className="grid grid-cols-3 gap-4 overflow-y-auto">
                  {resumes.length === 0 ? (
                    <p className="col-span-3 text-center text-gray-500">
                      No resumes uploaded yet
                    </p>
                  ) : (
                    resumes.map((resume) => (
                      <div
                        key={resume.id}
                        className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                      >
                        <FileText className="w-16 h-16 text-blue-500 mb-2" />
                        <p className="text-sm font-medium mb-2">
                          {resume.filename || "Unnamed Resume"}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handlePDFSelect(resume.pdfUrl)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          >
                            View
                          </button>

                          <button
                            onClick={() => handleDeleteResume(resume.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 />
                          </button>
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

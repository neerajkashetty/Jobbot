-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobInformation" (
    "id" SERIAL NOT NULL,
    "jobtitle" TEXT NOT NULL,
    "Skills" TEXT NOT NULL,
    "Firstname" TEXT NOT NULL,
    "Lastname" TEXT NOT NULL,

    CONSTRAINT "JobInformation_pkey" PRIMARY KEY ("id")
);

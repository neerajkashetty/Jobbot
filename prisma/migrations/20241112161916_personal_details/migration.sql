-- CreateTable
CREATE TABLE "PersonalDetails" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "Lastname" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "linkedin" TEXT NOT NULL,
    "github" TEXT NOT NULL,

    CONSTRAINT "PersonalDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonalDetails_linkedin_key" ON "PersonalDetails"("linkedin");

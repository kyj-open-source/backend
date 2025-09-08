/*
  Warnings:

  - A unique constraint covering the columns `[title,company_name]` on the table `jobs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "jobs_title_company_name_key" ON "public"."jobs"("title", "company_name");

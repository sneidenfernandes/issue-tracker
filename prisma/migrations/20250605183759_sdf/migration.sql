/*
  Warnings:

  - The primary key for the `IssueMembership` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `projectId` on the `IssueMembership` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `IssueMembership` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "IssueMembership" DROP CONSTRAINT "IssueMembership_projectId_fkey";

-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "IssueMembership" DROP CONSTRAINT "IssueMembership_pkey",
DROP COLUMN "projectId",
DROP COLUMN "role",
ADD CONSTRAINT "IssueMembership_pkey" PRIMARY KEY ("memberId", "issueId");

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

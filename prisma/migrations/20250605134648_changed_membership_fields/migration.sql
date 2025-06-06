/*
  Warnings:

  - The primary key for the `IssueMembership` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createrId` on the `IssueMembership` table. All the data in the column will be lost.
  - The primary key for the `ProjectMembership` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `collaboraterId` on the `ProjectMembership` table. All the data in the column will be lost.
  - Added the required column `memberId` to the `IssueMembership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `IssueMembership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberId` to the `ProjectMembership` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "IssueMembership" DROP CONSTRAINT "IssueMembership_createrId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectMembership" DROP CONSTRAINT "ProjectMembership_collaboraterId_fkey";

-- AlterTable
ALTER TABLE "IssueMembership" DROP CONSTRAINT "IssueMembership_pkey",
DROP COLUMN "createrId",
ADD COLUMN     "memberId" TEXT NOT NULL,
ADD COLUMN     "projectId" TEXT NOT NULL,
ADD CONSTRAINT "IssueMembership_pkey" PRIMARY KEY ("memberId", "issueId", "projectId");

-- AlterTable
ALTER TABLE "ProjectMembership" DROP CONSTRAINT "ProjectMembership_pkey",
DROP COLUMN "collaboraterId",
ADD COLUMN     "memberId" TEXT NOT NULL,
ADD CONSTRAINT "ProjectMembership_pkey" PRIMARY KEY ("memberId", "projectId");

-- AddForeignKey
ALTER TABLE "ProjectMembership" ADD CONSTRAINT "ProjectMembership_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssueMembership" ADD CONSTRAINT "IssueMembership_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssueMembership" ADD CONSTRAINT "IssueMembership_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `ProjectMembership` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `adminId` on the `ProjectMembership` table. All the data in the column will be lost.
  - Added the required column `collaboraterId` to the `ProjectMembership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `ProjectMembership` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProjectMembership" DROP CONSTRAINT "ProjectMembership_adminId_fkey";

-- AlterTable
ALTER TABLE "ProjectMembership" DROP CONSTRAINT "ProjectMembership_pkey",
DROP COLUMN "adminId",
ADD COLUMN     "collaboraterId" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD CONSTRAINT "ProjectMembership_pkey" PRIMARY KEY ("collaboraterId", "projectId");

-- AddForeignKey
ALTER TABLE "ProjectMembership" ADD CONSTRAINT "ProjectMembership_collaboraterId_fkey" FOREIGN KEY ("collaboraterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `label` on the `Issue` table. All the data in the column will be lost.
  - The `role` column on the `ProjectMembership` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `createdAt` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IssuePriority" AS ENUM ('no_priority', 'urgent', 'high', 'medium', 'low');

-- CreateEnum
CREATE TYPE "ProjectRole" AS ENUM ('OWNER', 'ADMIN', 'MAINTAINER', 'CONTRIBUTER');

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "label",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "priority" "IssuePriority" NOT NULL DEFAULT 'no_priority';

-- AlterTable
ALTER TABLE "ProjectMembership" DROP COLUMN "role",
ADD COLUMN     "role" "ProjectRole" NOT NULL DEFAULT 'OWNER';

-- DropEnum
DROP TYPE "IssueLabel";

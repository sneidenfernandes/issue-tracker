/*
  Warnings:

  - Added the required column `role` to the `IssueMembership` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "label" "IssueLabel" NOT NULL DEFAULT 'FEATURE',
ADD COLUMN     "status" "IssueStatus" NOT NULL DEFAULT 'TODO';

-- AlterTable
ALTER TABLE "IssueMembership" ADD COLUMN     "role" TEXT NOT NULL;

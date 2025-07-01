/*
  Warnings:

  - The values [BUG,FEATURE,IMPROVEMENT] on the enum `IssueLabel` will be removed. If these variants are still used in the database, this will fail.
  - The values [TODO,BACKLOG,IN_PROGRESS,IN_REVIEW,DONE,CANCELED,DUPLICATE] on the enum `IssueStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [NO_PRIORITY,URGENT,HIGH,MEDIUM,LOW] on the enum `ProjectPriority` will be removed. If these variants are still used in the database, this will fail.
  - The values [BACKLOG,PLANNED,IN_PROGRESS,COMPLETED,CANCELLED] on the enum `ProjectStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `shortSummary` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "IssueLabel_new" AS ENUM ('bug', 'feature', 'improvement');
ALTER TABLE "Issue" ALTER COLUMN "label" DROP DEFAULT;
ALTER TABLE "Issue" ALTER COLUMN "label" TYPE "IssueLabel_new" USING ("label"::text::"IssueLabel_new");
ALTER TYPE "IssueLabel" RENAME TO "IssueLabel_old";
ALTER TYPE "IssueLabel_new" RENAME TO "IssueLabel";
DROP TYPE "IssueLabel_old";
ALTER TABLE "Issue" ALTER COLUMN "label" SET DEFAULT 'feature';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "IssueStatus_new" AS ENUM ('todo', 'backlog', 'in_progress', 'in_review', 'done', 'cancelled', 'duplicate');
ALTER TABLE "Issue" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Issue" ALTER COLUMN "status" TYPE "IssueStatus_new" USING ("status"::text::"IssueStatus_new");
ALTER TYPE "IssueStatus" RENAME TO "IssueStatus_old";
ALTER TYPE "IssueStatus_new" RENAME TO "IssueStatus";
DROP TYPE "IssueStatus_old";
ALTER TABLE "Issue" ALTER COLUMN "status" SET DEFAULT 'todo';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ProjectPriority_new" AS ENUM ('no_priority', 'urgent', 'high', 'medium', 'low');
ALTER TABLE "Project" ALTER COLUMN "projectPriority" DROP DEFAULT;
ALTER TABLE "Project" ALTER COLUMN "projectPriority" TYPE "ProjectPriority_new" USING ("projectPriority"::text::"ProjectPriority_new");
ALTER TYPE "ProjectPriority" RENAME TO "ProjectPriority_old";
ALTER TYPE "ProjectPriority_new" RENAME TO "ProjectPriority";
DROP TYPE "ProjectPriority_old";
ALTER TABLE "Project" ALTER COLUMN "projectPriority" SET DEFAULT 'no_priority';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ProjectStatus_new" AS ENUM ('backlog', 'planned', 'in_progress', 'completed', 'cancelled');
ALTER TABLE "Project" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Project" ALTER COLUMN "status" TYPE "ProjectStatus_new" USING ("status"::text::"ProjectStatus_new");
ALTER TYPE "ProjectStatus" RENAME TO "ProjectStatus_old";
ALTER TYPE "ProjectStatus_new" RENAME TO "ProjectStatus";
DROP TYPE "ProjectStatus_old";
ALTER TABLE "Project" ALTER COLUMN "status" SET DEFAULT 'planned';
COMMIT;

-- AlterTable
ALTER TABLE "Issue" ALTER COLUMN "label" SET DEFAULT 'feature',
ALTER COLUMN "status" SET DEFAULT 'todo';

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "shortSummary" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'planned',
ALTER COLUMN "projectPriority" SET DEFAULT 'no_priority';

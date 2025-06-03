-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('BACKLOG', 'PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ProjectPriority" AS ENUM ('NO_PRIORITY', 'URGENT', 'HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "IssueStatus" AS ENUM ('TODO', 'BACKLOG', 'IN_PROGRESS', 'IN_REVIEW', 'DONE', 'CANCELED', 'DUPLICATE');

-- CreateEnum
CREATE TYPE "IssueLabel" AS ENUM ('BUG', 'FEATURE', 'IMPROVEMENT');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'PLANNED',
    "projectPriority" "ProjectPriority" NOT NULL DEFAULT 'NO_PRIORITY',
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3),
    "completedDate" TIMESTAMP(3),
    "targetDate" TIMESTAMP(3),

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createrId" TEXT NOT NULL,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IssueMembership" (
    "createrId" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,

    CONSTRAINT "IssueMembership_pkey" PRIMARY KEY ("createrId","issueId")
);

-- CreateTable
CREATE TABLE "ProjectMembership" (
    "adminId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectMembership_pkey" PRIMARY KEY ("adminId","projectId")
);

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_createrId_fkey" FOREIGN KEY ("createrId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssueMembership" ADD CONSTRAINT "IssueMembership_createrId_fkey" FOREIGN KEY ("createrId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssueMembership" ADD CONSTRAINT "IssueMembership_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMembership" ADD CONSTRAINT "ProjectMembership_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMembership" ADD CONSTRAINT "ProjectMembership_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

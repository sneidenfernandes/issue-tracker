/*
  Warnings:

  - Added the required column `role` to the `IssueMembership` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IssueMembership" ADD COLUMN     "role" TEXT NOT NULL;

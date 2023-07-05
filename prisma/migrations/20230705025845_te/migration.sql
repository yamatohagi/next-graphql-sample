/*
  Warnings:

  - You are about to drop the column `belayMonths` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `experienceMonths` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `grade` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `gymId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "belayMonths",
DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "experienceMonths",
DROP COLUMN "grade",
DROP COLUMN "gymId",
DROP COLUMN "updatedAt";

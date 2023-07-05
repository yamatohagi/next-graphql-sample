/*
  Warnings:

  - You are about to drop the column `climbingType` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Gym` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GymImpPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GymImpPostLike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GymLike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mountain` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostLike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PreferredDayAndTime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reply` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tozanguthi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ViewHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GymImpPost" DROP CONSTRAINT "GymImpPost_gymId_fkey";

-- DropForeignKey
ALTER TABLE "GymImpPostLike" DROP CONSTRAINT "GymImpPostLike_gymImpPostId_fkey";

-- DropForeignKey
ALTER TABLE "GymLike" DROP CONSTRAINT "GymLike_gymId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_gymId_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_postId_fkey";

-- DropForeignKey
ALTER TABLE "PreferredDayAndTime" DROP CONSTRAINT "PreferredDayAndTime_postId_fkey";

-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_postId_fkey";

-- DropForeignKey
ALTER TABLE "ViewHistory" DROP CONSTRAINT "ViewHistory_postId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "climbingType";

-- DropTable
DROP TABLE "Gym";

-- DropTable
DROP TABLE "GymImpPost";

-- DropTable
DROP TABLE "GymImpPostLike";

-- DropTable
DROP TABLE "GymLike";

-- DropTable
DROP TABLE "Mountain";

-- DropTable
DROP TABLE "PostLike";

-- DropTable
DROP TABLE "PreferredDayAndTime";

-- DropTable
DROP TABLE "Reply";

-- DropTable
DROP TABLE "Tozanguthi";

-- DropTable
DROP TABLE "ViewHistory";

-- DropEnum
DROP TYPE "ClimbingType";

-- CreateEnum
CREATE TYPE "ClimbingType" AS ENUM ('BOULDER', 'LEAD', 'BOTH');

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "climbingType" "ClimbingType" NOT NULL,
    "gymId" INTEGER NOT NULL,
    "experienceMonths" INTEGER NOT NULL,
    "belayMonths" INTEGER NOT NULL,
    "grade" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViewHistory" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "ViewHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostLike" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "PostLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gym" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "image" TEXT,
    "climbingType" "ClimbingType" NOT NULL,

    CONSTRAINT "Gym_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GymLike" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "gymId" INTEGER NOT NULL,

    CONSTRAINT "GymLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GymImpPost" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "gymId" INTEGER NOT NULL,

    CONSTRAINT "GymImpPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GymImpPostLike" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "gymImpPostId" INTEGER,

    CONSTRAINT "GymImpPostLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreferredDayAndTime" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "dayAndTime" VARCHAR(2) NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "PreferredDayAndTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tozanguthi" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "tozangutiName" TEXT NOT NULL,
    "uphillTime" INTEGER,
    "downhillTime" INTEGER,
    "uphillDistance" INTEGER,
    "downhillDistance" INTEGER,
    "nigiyaka" INTEGER,
    "view" INTEGER,
    "toilet" TEXT,
    "vendingMachin" TEXT,
    "store" TEXT,
    "mycar" TEXT,
    "lastStopByCar" TEXT,
    "entranceTime" INTEGER,
    "transportation" TEXT,
    "remark" TEXT,

    CONSTRAINT "Tozanguthi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mountain" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "nameKana" TEXT NOT NULL,
    "postalCode" INTEGER,
    "prefecture" TEXT,
    "address1" TEXT,
    "address2" TEXT,
    "address3" TEXT,
    "hyakumeizanStatus" BOOLEAN NOT NULL DEFAULT false,
    "MountainPeak" INTEGER,
    "appealPoint" TEXT,
    "description" TEXT,

    CONSTRAINT "Mountain_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewHistory" ADD CONSTRAINT "ViewHistory_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GymLike" ADD CONSTRAINT "GymLike_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GymImpPost" ADD CONSTRAINT "GymImpPost_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GymImpPostLike" ADD CONSTRAINT "GymImpPostLike_gymImpPostId_fkey" FOREIGN KEY ("gymImpPostId") REFERENCES "GymImpPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferredDayAndTime" ADD CONSTRAINT "PreferredDayAndTime_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

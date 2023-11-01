/*
  Warnings:

  - You are about to drop the column `endedAt` on the `ConductedPoll` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `ConductedPoll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ConductedPoll" DROP COLUMN "endedAt",
DROP COLUMN "startedAt",
ADD COLUMN     "conductedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

/*
  Warnings:

  - You are about to drop the column `body` on the `Event` table. All the data in the column will be lost.
  - Added the required column `briefing` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `copy` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "body",
ADD COLUMN     "briefing" TEXT NOT NULL,
ADD COLUMN     "copy" TEXT NOT NULL;

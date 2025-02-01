/*
  Warnings:

  - You are about to drop the column `match_time` on the `matches` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "matches" DROP COLUMN "match_time",
ADD COLUMN     "duration_minutes" INTEGER NOT NULL DEFAULT 10;

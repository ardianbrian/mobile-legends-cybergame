-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('VICTORY', 'DEFEAT', 'DRAW');

-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "status" "MatchStatus" NOT NULL DEFAULT 'DRAW';

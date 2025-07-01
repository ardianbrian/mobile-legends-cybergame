-- CreateEnum
CREATE TYPE "HeroCategory" AS ENUM ('MARKSMAN', 'TANK', 'FIGHTER', 'ASSASSIN', 'MAGE', 'SUPPORT');

-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('VICTORY', 'DEFEAT', 'DRAW');

-- CreateTable
CREATE TABLE "heroes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "HeroCategory" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "heroes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "duration_minutes" INTEGER NOT NULL DEFAULT 10,
    "team_score" INTEGER NOT NULL,
    "enemy_score" INTEGER NOT NULL,
    "team_gold" INTEGER NOT NULL,
    "enemy_gold" INTEGER NOT NULL,
    "status" "MatchStatus" NOT NULL DEFAULT 'DRAW',
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TeamHeroes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TeamHeroes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EnemyHeroes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EnemyHeroes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TeamHeroes_B_index" ON "_TeamHeroes"("B");

-- CreateIndex
CREATE INDEX "_EnemyHeroes_B_index" ON "_EnemyHeroes"("B");

-- AddForeignKey
ALTER TABLE "_TeamHeroes" ADD CONSTRAINT "_TeamHeroes_A_fkey" FOREIGN KEY ("A") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamHeroes" ADD CONSTRAINT "_TeamHeroes_B_fkey" FOREIGN KEY ("B") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnemyHeroes" ADD CONSTRAINT "_EnemyHeroes_A_fkey" FOREIGN KEY ("A") REFERENCES "heroes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnemyHeroes" ADD CONSTRAINT "_EnemyHeroes_B_fkey" FOREIGN KEY ("B") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

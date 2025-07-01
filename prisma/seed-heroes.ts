// prisma/seed-heroes.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Enum yang harus sesuai dengan schema.prisma
enum HeroCategory {
  TANK = "TANK",
  FIGHTER = "FIGHTER",
  ASSASSIN = "ASSASSIN",
  MAGE = "MAGE",
  MARKSMAN = "MARKSMAN",
  SUPPORT = "SUPPORT",
}

const heroesData = [
  // TANK
  { name: "Akai", category: HeroCategory.TANK },
  { name: "Alice", category: HeroCategory.TANK },
  { name: "Atlas", category: HeroCategory.TANK },
  { name: "Barats", category: HeroCategory.TANK },
  { name: "Belerick", category: HeroCategory.TANK },
  { name: "Baxia", category: HeroCategory.TANK },
  { name: "Chip", category: HeroCategory.TANK },
  { name: "Edith", category: HeroCategory.TANK },
  { name: "Franco", category: HeroCategory.TANK },
  { name: "Fredrinn", category: HeroCategory.TANK },
  { name: "Gatotkaca", category: HeroCategory.TANK },
  { name: "Gloo", category: HeroCategory.TANK },
  { name: "Grock", category: HeroCategory.TANK },
  { name: "Hilda", category: HeroCategory.TANK },
  { name: "Hylos", category: HeroCategory.TANK },
  { name: "Johnson", category: HeroCategory.TANK },
  { name: "Khufra", category: HeroCategory.TANK },
  { name: "Lolita", category: HeroCategory.TANK },
  { name: "Minotaur", category: HeroCategory.TANK },
  { name: "Tigreal", category: HeroCategory.TANK },
  { name: "Uranus", category: HeroCategory.TANK },

  // FIGHTER
  { name: "Aldous", category: HeroCategory.FIGHTER },
  { name: "Alpha", category: HeroCategory.FIGHTER },
  { name: "Alucard", category: HeroCategory.FIGHTER },
  { name: "Argus", category: HeroCategory.FIGHTER },
  { name: "Badang", category: HeroCategory.FIGHTER },
  { name: "Balmond", category: HeroCategory.FIGHTER },
  { name: "Bane", category: HeroCategory.FIGHTER },
  { name: "Chou", category: HeroCategory.FIGHTER },
  { name: "Dyrroth", category: HeroCategory.FIGHTER },
  { name: "Esmeralda", category: HeroCategory.FIGHTER },
  { name: "Freya", category: HeroCategory.FIGHTER },
  { name: "Guinevere", category: HeroCategory.FIGHTER },
  { name: "Hilda", category: HeroCategory.FIGHTER },
  { name: "Jawhead", category: HeroCategory.FIGHTER },
  { name: "Kaja", category: HeroCategory.FIGHTER },
  { name: "Khaleed", category: HeroCategory.FIGHTER },
  { name: "Lapu-Lapu", category: HeroCategory.FIGHTER },
  { name: "Leomord", category: HeroCategory.FIGHTER },
  { name: "Lukas", category: HeroCategory.FIGHTER },
  { name: "Martis", category: HeroCategory.FIGHTER },
  { name: "Masha", category: HeroCategory.FIGHTER },
  { name: "Minsitthar", category: HeroCategory.FIGHTER },
  { name: "Paquito", category: HeroCategory.FIGHTER },
  { name: "Phoveus", category: HeroCategory.FIGHTER },
  { name: "Roger", category: HeroCategory.FIGHTER },
  { name: "Ruby", category: HeroCategory.FIGHTER },
  { name: "Silvanna", category: HeroCategory.FIGHTER },
  { name: "Sun", category: HeroCategory.FIGHTER },
  { name: "Terizla", category: HeroCategory.FIGHTER },
  { name: "Thamuz", category: HeroCategory.FIGHTER },
  { name: "X.Borg", category: HeroCategory.FIGHTER },
  { name: "Yu Zhong", category: HeroCategory.FIGHTER },
  { name: "Zilong", category: HeroCategory.FIGHTER },

  // ASSASSIN
  { name: "Aamon", category: HeroCategory.ASSASSIN },
  { name: "Alucard", category: HeroCategory.ASSASSIN },
  { name: "Benedetta", category: HeroCategory.ASSASSIN },
  { name: "Fanny", category: HeroCategory.ASSASSIN },
  { name: "Gusion", category: HeroCategory.ASSASSIN },
  { name: "Hanzo", category: HeroCategory.ASSASSIN },
  { name: "Harley", category: HeroCategory.ASSASSIN },
  { name: "Hayabusa", category: HeroCategory.ASSASSIN },
  { name: "Helcurt", category: HeroCategory.ASSASSIN },
  { name: "Joy", category: HeroCategory.ASSASSIN },
  { name: "Julian", category: HeroCategory.ASSASSIN },
  { name: "Karina", category: HeroCategory.ASSASSIN },
  { name: "Lancelot", category: HeroCategory.ASSASSIN },
  { name: "Lesley", category: HeroCategory.ASSASSIN },
  { name: "Ling", category: HeroCategory.ASSASSIN },
  { name: "Natalia", category: HeroCategory.ASSASSIN },
  { name: "Saber", category: HeroCategory.ASSASSIN },
  { name: "Selena", category: HeroCategory.ASSASSIN },
  { name: "Yi Sun-shin", category: HeroCategory.ASSASSIN },
  { name: "Yin", category: HeroCategory.ASSASSIN },
  { name: "Zilong", category: HeroCategory.ASSASSIN },

  // MAGE
  { name: "Alice", category: HeroCategory.MAGE },
  { name: "Aurora", category: HeroCategory.MAGE },
  { name: "Baxia", category: HeroCategory.MAGE },
  { name: "Cecilion", category: HeroCategory.MAGE },
  { name: "Chang'e", category: HeroCategory.MAGE },
  { name: "Cyclops", category: HeroCategory.MAGE },
  { name: "Eudora", category: HeroCategory.MAGE },
  { name: "Faramis", category: HeroCategory.MAGE },
  { name: "Gord", category: HeroCategory.MAGE },
  { name: "Harith", category: HeroCategory.MAGE },
  { name: "Harley", category: HeroCategory.MAGE },
  { name: "Kadita", category: HeroCategory.MAGE },
  { name: "Kagura", category: HeroCategory.MAGE },
  { name: "Kaja", category: HeroCategory.MAGE },
  { name: "Kimmy", category: HeroCategory.MAGE },
  { name: "Luo Yi", category: HeroCategory.MAGE },
  { name: "Lunox", category: HeroCategory.MAGE },
  { name: "Lylia", category: HeroCategory.MAGE },
  { name: "Mathilda", category: HeroCategory.MAGE },
  { name: "Mobile Legends", category: HeroCategory.MAGE },
  { name: "Nana", category: HeroCategory.MAGE },
  { name: "Novaria", category: HeroCategory.MAGE },
  { name: "Odette", category: HeroCategory.MAGE },
  { name: "Pharsa", category: HeroCategory.MAGE },
  { name: "Selena", category: HeroCategory.MAGE },
  { name: "Valir", category: HeroCategory.MAGE },
  { name: "Vale", category: HeroCategory.MAGE },
  { name: "Vexana", category: HeroCategory.MAGE },
  { name: "Xavier", category: HeroCategory.MAGE },
  { name: "Yve", category: HeroCategory.MAGE },
  { name: "Zhask", category: HeroCategory.MAGE },
  { name: "Zhuxin", category: HeroCategory.MAGE },

  // MARKSMAN
  { name: "Beatrix", category: HeroCategory.MARKSMAN },
  { name: "Brody", category: HeroCategory.MARKSMAN },
  { name: "Bruno", category: HeroCategory.MARKSMAN },
  { name: "Claude", category: HeroCategory.MARKSMAN },
  { name: "Clint", category: HeroCategory.MARKSMAN },
  { name: "Edith", category: HeroCategory.MARKSMAN },
  { name: "Granger", category: HeroCategory.MARKSMAN },
  { name: "Hanabi", category: HeroCategory.MARKSMAN },
  { name: "Irithel", category: HeroCategory.MARKSMAN },
  { name: "Karrie", category: HeroCategory.MARKSMAN },
  { name: "Kimmy", category: HeroCategory.MARKSMAN },
  { name: "Layla", category: HeroCategory.MARKSMAN },
  { name: "Lesley", category: HeroCategory.MARKSMAN },
  { name: "Melissa", category: HeroCategory.MARKSMAN },
  { name: "Miya", category: HeroCategory.MARKSMAN },
  { name: "Moskov", category: HeroCategory.MARKSMAN },
  { name: "Natan", category: HeroCategory.MARKSMAN },
  { name: "Obsidia", category: HeroCategory.MARKSMAN },
  { name: "Popol and Kupa", category: HeroCategory.MARKSMAN },
  { name: "Roger", category: HeroCategory.MARKSMAN },
  { name: "Wanwan", category: HeroCategory.MARKSMAN },
  { name: "Yi Sun-shin", category: HeroCategory.MARKSMAN },

  // SUPPORT
  { name: "Angela", category: HeroCategory.SUPPORT },
  { name: "Carmilla", category: HeroCategory.SUPPORT },
  { name: "Chip", category: HeroCategory.SUPPORT },
  { name: "Diggie", category: HeroCategory.SUPPORT },
  { name: "Estes", category: HeroCategory.SUPPORT },
  { name: "Floryn", category: HeroCategory.SUPPORT },
  { name: "Kaja", category: HeroCategory.SUPPORT },
  { name: "Kalea", category: HeroCategory.SUPPORT },
  { name: "Mathilda", category: HeroCategory.SUPPORT },
  { name: "Minotaur", category: HeroCategory.SUPPORT },
  { name: "Nana", category: HeroCategory.SUPPORT },
  { name: "Rafaela", category: HeroCategory.SUPPORT },
  { name: "Tigreal", category: HeroCategory.SUPPORT },
];

async function seedHeroes() {
  console.log("Seeding heroes...");

  try {
    // Clear existing heroes (optional)
    // await prisma.hero.deleteMany()

    // Create heroes
    const heroes = await prisma.hero.createMany({
      data: heroesData,
      skipDuplicates: true, // Skip jika nama hero sudah ada
    });

    console.log(`Successfully seeded ${heroes.count} heroes`);

    // Tampilkan beberapa heroes untuk verifikasi
    const allHeroes = await prisma.hero.findMany({
      take: 10,
      orderBy: { name: "asc" },
    });

    console.log("Sample heroes created:");
    allHeroes.forEach((hero) => {
      console.log(`- ${hero.name} (${hero.category})`);
    });
  } catch (error) {
    console.error("Error seeding heroes:", error);
    throw error;
  }
}

// Jalankan seeding
seedHeroes()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default seedHeroes;

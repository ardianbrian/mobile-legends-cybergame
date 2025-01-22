import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const searchQuery = searchParams.get("searchQuery") || "";
    const sortOption = searchParams.get("sortOption") || "name";

    const skip = (page - 1) * limit;

    const queryConditions: Prisma.HeroFindManyArgs = {
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive", // Case-insensitive search
        },
      },
      orderBy: {
        [sortOption]: "asc", // Can be 'name' or 'category'
      },
      skip,
      take: limit,
    };

    const heroes = await prisma.hero.findMany(queryConditions);
    const totalHeroes = await prisma.hero.count({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
    });

    const totalPages = Math.ceil(totalHeroes / limit);

    return NextResponse.json({
      data: heroes,
      meta: {
        total: totalHeroes,
        page,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching heroes:", error);
    return NextResponse.json(
      { error: "Error fetching heroes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category } = body;

    const hero = await prisma.hero.create({
      data: {
        name,
        category,
      },
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.error("Error creating hero:", error); // Logging error
    return NextResponse.json({ error: "Error creating hero" }, { status: 500 });
  }
}

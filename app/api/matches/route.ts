import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const skip = (page - 1) * limit;

    const matches = await prisma.match.findMany({
      include: {
        teamHeroes: true,
        enemyHeroes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    const totalMatches = await prisma.match.count();
    const totalPages = Math.ceil(totalMatches / limit);

    return NextResponse.json({
      data: matches,
      meta: {
        total: totalMatches,
        page,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { error: "Error fetching matches" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      matchTime,
      teamScore,
      enemyScore,
      teamGold,
      enemyGold,
      teamHeroIds,
      enemyHeroIds,
      description,
      status,
    } = body;

    const match = await prisma.match.create({
      data: {
        matchTime: new Date(matchTime),
        title,
        teamScore,
        enemyScore,
        teamGold,
        enemyGold,
        description,
        status,
        teamHeroes: {
          connect: teamHeroIds.map((id: string) => ({ id })), // Pastikan id adalah string
        },
        enemyHeroes: {
          connect: enemyHeroIds.map((id: string) => ({ id })), // Pastikan id adalah string
        },
      },
      include: {
        teamHeroes: true,
        enemyHeroes: true,
      },
    });

    return NextResponse.json(match);
  } catch (error) {
    console.error("Error creating match:", error); // Tambahkan logging
    return NextResponse.json(
      { error: "Error creating match" },
      { status: 500 }
    );
  }
}

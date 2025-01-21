import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const matches = await prisma.match.findMany({
      include: {
        teamHeroes: true,
        enemyHeroes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error); // Tambahkan logging
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
      matchTime,
      teamScore,
      enemyScore,
      teamGold,
      enemyGold,
      teamHeroIds,
      enemyHeroIds,
      description,
    } = body;

    const match = await prisma.match.create({
      data: {
        matchTime: new Date(matchTime),
        teamScore,
        enemyScore,
        teamGold,
        enemyGold,
        description,
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

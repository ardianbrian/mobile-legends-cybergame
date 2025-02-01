import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper to unwrap params safely
async function getParams(
  params: Promise<{ id: string }>
): Promise<{ id: string }> {
  return params;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await getParams(context.params); // Unwrap params
    const match = await prisma.match.findUnique({
      where: { id },
      include: {
        teamHeroes: true,
        enemyHeroes: true,
      },
    });
    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }
    return NextResponse.json(match);
  } catch (error) {
    console.error("Error fetching match:", error);
    return NextResponse.json(
      { error: "Error fetching match" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await getParams(context.params); // Unwrap params
    const body = await request.json();
    const {
      title,
      durationMinutes,
      teamScore,
      enemyScore,
      teamGold,
      enemyGold,
      teamHeroIds,
      enemyHeroIds,
      description,
      status,
    } = body;

    const match = await prisma.match.update({
      where: { id },
      data: {
        title,
        durationMinutes,
        teamScore,
        enemyScore,
        teamGold,
        enemyGold,
        description,
        status,
        teamHeroes: {
          set: [],
          connect: teamHeroIds.map((heroId: string) => ({ id: heroId })),
        },
        enemyHeroes: {
          set: [],
          connect: enemyHeroIds.map((heroId: string) => ({ id: heroId })),
        },
      },
      include: {
        teamHeroes: true,
        enemyHeroes: true,
      },
    });

    return NextResponse.json(match);
  } catch (error) {
    console.error("Error updating match:", error);
    return NextResponse.json(
      { error: "Error updating match" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await getParams(context.params); // Unwrap params

    // Periksa apakah match dengan ID tersebut ada
    const existingMatch = await prisma.match.findUnique({
      where: { id },
    });

    if (!existingMatch) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    // Hapus match
    await prisma.match.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Match deleted successfully" });
  } catch (error) {
    console.error("Error deleting match:", error);
    return NextResponse.json(
      { error: "Error deleting match" },
      { status: 500 }
    );
  }
}

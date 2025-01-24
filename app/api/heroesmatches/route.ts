import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("searchQuery") || "";

    const heroes = await prisma.hero.findMany({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json({ data: heroes });
  } catch (error) {
    console.error("Error fetching heroes:", error);
    return NextResponse.json(
      { error: "Error fetching heroes" },
      { status: 500 }
    );
  }
}

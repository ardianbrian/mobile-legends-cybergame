import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const heroes = await prisma.hero.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(heroes);
  } catch (error) {
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
    return NextResponse.json({ error: "Error creating hero" }, { status: 500 });
  }
}

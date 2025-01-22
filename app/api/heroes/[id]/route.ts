import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper to unwrap params safely
async function getParams(
  params: Promise<{ id: string }>
): Promise<{ id: string }> {
  return params;
}

// GET Hero by ID
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await getParams(context.params); // Unwrap params
    const hero = await prisma.hero.findUnique({
      where: { id },
    });

    if (!hero) {
      return NextResponse.json({ error: "Hero not found" }, { status: 404 });
    }

    return NextResponse.json(hero);
  } catch (error) {
    console.error("Error fetching hero:", error);
    return NextResponse.json({ error: "Error fetching hero" }, { status: 500 });
  }
}

// PATCH (Edit Hero)
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await getParams(context.params); // Unwrap params
    const body = await request.json();
    const { name, category } = body;

    const updatedHero = await prisma.hero.update({
      where: { id },
      data: { name, category },
    });

    return NextResponse.json(updatedHero);
  } catch (error) {
    console.error("Error updating hero:", error);
    return NextResponse.json({ error: "Error updating hero" }, { status: 500 });
  }
}

// DELETE (Delete Hero)
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await getParams(context.params); // Unwrap params
    await prisma.hero.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Hero deleted successfully" });
  } catch (error) {
    console.error("Error deleting hero:", error);
    return NextResponse.json({ error: "Error deleting hero" }, { status: 500 });
  }
}

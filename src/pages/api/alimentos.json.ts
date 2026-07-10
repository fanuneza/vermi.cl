import { getCollection } from "astro:content";

export async function GET() {
  try {
    const rawAlimentos = await getCollection("alimentos");
    const indexableData = rawAlimentos.map((item) => ({
      id: item.id,
      name: item.data.name,
      category: item.data.category,
      status: item.data.status,
      instructions: item.data.instructions,
      nutrition: item.data.nutrition,
      keywords: item.data.keywords,
    }));

    return new Response(JSON.stringify(indexableData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Falla al compilar el índice de alimentos." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

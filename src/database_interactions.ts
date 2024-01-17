import { eq } from "drizzle-orm";
import db from "./connnection";
import { Unit, ingredientTable, recipeTable } from "./schema";

export async function dbSelectRecipes() {
  await db.select().from(recipeTable);
}

export async function dbInsertRecipe(name: string, duration: number) {
  await db.insert(recipeTable).values({ name, duration });
}

export async function dbUpdateRecipe(
  recipeId: number,
  name: string,
  duration: number
) {
  await db
    .update(recipeTable)
    .set({ name, duration })
    .where(eq(recipeTable.id, recipeId));
}
export async function dbDeleteRecipe(recipeId: number) {
  await db.delete(recipeTable).where(eq(recipeTable.id, recipeId));
}

export async function dbSelectIngredients(recipeId: number) {
  await db
    .select()
    .from(ingredientTable)
    .where(eq(ingredientTable.id, recipeId));
}

export async function dbInsertIngredient(
  name: string,
  amount: number,
  unit: Unit
) {
  await db.insert(ingredientTable).values({ name, amount, unit });
}

export async function dbDeleteIngredient(ingredientId: number) {
  await db.delete(ingredientTable).where(eq(ingredientTable.id, ingredientId));
}

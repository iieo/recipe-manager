import RecipeCard from "@/components/recipe-card";
import RecipeForm from "@/components/recipe-form";
import { dbSelectRecipes } from "@/database_interactions";
import { Recipe } from "@/schema";

export default async function RecipeScreen() {
  const allRecipes: Recipe[] = await dbSelectRecipes();

  return (
    <main className="p-24 flex flex-col">
      <h1 className="text-2xl font-bold my-4">Add Recipe</h1>
      <RecipeForm />
      <h1 className="text-2xl font-bold my-4">Recipe Overview</h1>
      {allRecipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.id} />
      ))}
    </main>
  );
}

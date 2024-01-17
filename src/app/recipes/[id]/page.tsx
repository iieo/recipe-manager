import Error from "@/components/error";
import IngredientCard from "@/components/ingredient-card";
import InGredientCard from "@/components/ingredient-card";
import IngredientForm from "@/components/ingredient-form";
import { dbSelectIngredients, dbSelectRecipe } from "@/database-interactions";
import { Ingredient, Recipe } from "@/schema";
import Link from "next/link";

type IngredientsScreenProps = {
  params: { id: number };
};

export default async function IngredientsScreen({
  params,
}: IngredientsScreenProps) {
  const recipeId = Number(params.id);
  if (isNaN(recipeId)) {
    return <Error error={"Invalid recipe id"} />;
  }

  const selectedRecipes = await dbSelectRecipe(recipeId);
  if (selectedRecipes.length !== 1) {
    return <Error error={"Problems fetching recipe"} />;
  }
  const recipe = selectedRecipes[0];

  const fetchedIngredients: {
    recipes: {
      id: number;
      name: string;
      duration: number;
    };
    ingredients: {
      id: number;
      name: string;
      recipeId: number;
      amount: number;
      unit: "kg" | "g";
    };
  }[] = await dbSelectIngredients(recipeId);

  const ingredients: Ingredient[] = fetchedIngredients.map(
    (joinItem) => joinItem.ingredients
  );

  return (
    <main className="p-24 flex flex-col">
      <div className="flex mb-4">
        <h1 className="text-3xl grow">
          Recipe {recipe.name} ({recipe.duration} Minuten)
        </h1>
        <Link href={`./${recipe.id}/edit`} className="rounded border-2 p-4">
          Edit
        </Link>
      </div>
      {ingredients.length === 0 && (
        <h1 className="my-8 ">No ingredients found for recipe</h1>
      )}
      <IngredientForm recipeId={recipeId} />
      {ingredients.map((ingredient) => (
        <IngredientCard ingredient={ingredient} key={ingredient.id} />
      ))}
    </main>
  );
}

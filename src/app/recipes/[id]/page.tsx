import IngredientCard from "@/components/ingredient-card";
import InGredientCard from "@/components/ingredient-card";
import IngredientForm from "@/components/ingredient-form";
import { dbSelectIngredients } from "@/database_interactions";
import { Ingredient, Recipe } from "@/schema";

type IngredientsScreenProps = {
  params: { id: number };
};

function Error({ error }: { error: string }) {
  return (
    <div className="flex min-h-screen place-items-center justify-center align-center">
      <h1 className="text-4xl">Error: {error}</h1>
    </div>
  );
}

export default async function IngredientsScreen({
  params,
}: IngredientsScreenProps) {
  if (isNaN(Number(params.id))) {
    return <Error error={"Invalid recipe id"} />;
  }

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
      unit: "Kg" | "g";
    };
  }[] = await dbSelectIngredients(Number(params.id));

  if (fetchedIngredients.length === 0) {
    return <Error error={"Invalid recipe id"} />;
  }

  const ingredients: Ingredient[] = fetchedIngredients.map(
    (joinItem) => joinItem.ingredients
  );

  return (
    <main className="p-24 flex flex-col">
      <h1 className="text-3xl mb-4">Recipe with id {params.id}</h1>
      {ingredients.length === 0 && (
        <h1 className="my-8 ">No ingredients found for recipe</h1>
      )}
      <IngredientForm recipeId={params.id} />
      {ingredients.map((ingredient) => (
        <IngredientCard ingredient={ingredient} key={ingredient.id} />
      ))}
    </main>
  );
}

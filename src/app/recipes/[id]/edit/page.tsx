import Error from "@/components/error";
import RecipeUpdateForm from "@/components/recipe-update-form";
import { dbSelectRecipe } from "@/database-interactions";

type EditScreenProps = {
  params: { id: number };
};

export default async function EditScreen({ params }: EditScreenProps) {
  const recipeId = Number(params.id);
  if (isNaN(recipeId)) {
    return <Error error={"Invalid recipe id"} />;
  }

  const selectedRecipes = await dbSelectRecipe(recipeId);
  if (selectedRecipes.length !== 1) {
    return <Error error={"Problems fetching recipe"} />;
  }
  const recipe = selectedRecipes[0];

  return (
    <main className="p-24 flex flex-col">
      <RecipeUpdateForm recipe={recipe} />
    </main>
  );
}

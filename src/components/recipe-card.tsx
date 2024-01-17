"use client";

import { dbDeleteRecipe } from "@/database-interactions";
import { Recipe } from "@/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";

type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const router = useRouter();

  return (
    <div className="rounded border-2 my-2 flex">
      <Link href={`/recipes/${recipe.id}`} className="grow p-4 ">
        <p>{recipe.name}</p>
        <p>{recipe.duration} Minuten</p>
      </Link>
      <button
        onClick={async() => {
          await dbDeleteRecipe(recipe.id);
          router.refresh();
        }}
        className="border-l-2 p-4 hover:text-white hover:bg-slate-500"
      >
        Delete
      </button>
    </div>
  );
}

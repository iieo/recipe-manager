"use client";

import { dbDeleteIngredient, dbDeleteRecipe } from "@/database_interactions";
import { Ingredient, Recipe } from "@/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import IngredientForm from "./ingredient-form";

type IngredientCardProps = {
  ingredient: Ingredient;
};

export default function IngredientCard({ ingredient }: IngredientCardProps) {
  const router = useRouter();

  return (
    <div className="rounded border-2 my-2 flex">
      <div className="grow p-2 ml-2">
        <p>{ingredient.name}</p>
        <p>{`${ingredient.amount} ${ingredient.unit}`}</p>
      </div>
      <button
        onClick={() => {
          dbDeleteIngredient(ingredient.id);
          router.refresh();
        }}
        className="border-l-2 p-4 hover:text-white hover:bg-slate-500"
      >
        Delete
      </button>
    </div>
  );
}

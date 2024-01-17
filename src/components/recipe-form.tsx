"use client";

import { dbInsertRecipe, dbUpdateRecipe } from "@/database_interactions";
import { Recipe } from "@/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

type RecipeFormProps = {
  recipe?: Recipe;
};

export default function RecipeForm({ recipe }: RecipeFormProps) {
  const isUpdate: boolean = !!recipe;
  const router = useRouter();

  const [name, setName] = useState<string>(isUpdate ? recipe?.name ?? "" : "");
  const [duration, setDuration] = useState<string>(
    isUpdate ? recipe?.duration.toString() ?? "" : ""
  );

  let handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name.length < 2) {
      alert("Please enter a valid recipe name");
      return;
    }
    if (duration === null || isNaN(Number(duration)) || Number(duration) <= 0) {
      alert("Please enter a valid recipe duration");
      return;
    }

    if (recipe === null && isUpdate) {
      alert("Error while updating an unknown recipe");
      return;
    }

    if (isUpdate) {
      if (recipe?.id !== undefined) {
        dbUpdateRecipe(recipe.id, name ?? "Error", Number(duration));
      }
    } else {
      dbInsertRecipe(name ?? "Error", Number(duration));
      setDuration("");
      setName("");
    }

    router.push(`/recipes/${recipe?.id}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-4 rounded border-2"
    >
      <label htmlFor="name">Name</label>
      <input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setName(event.target.value)
        }
        value={name ?? ""}
        name="name"
        id="name"
        type="text"
        className="border-2 rounded p-2 mb-4 mt-2"
      />
      <label htmlFor="duration">Duration</label>
      <input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setDuration(event.target.value)
        }
        name="duration"
        value={duration ?? ""}
        id="duration"
        type="number"
        className="border-2 rounded p-2 mb-4 mt-2"
      />
      <input
        type="submit"
        value={isUpdate ? "Update" : "Add"}
        className="border-2 rounded p-2 mb-4 mt-2 hover:bg-slate-500 transition text-white bg-slate-600"
      />
    </form>
  );
}

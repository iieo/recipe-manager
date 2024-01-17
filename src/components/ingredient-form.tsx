"use client";

import { dbInsertIngredient } from "@/database_interactions";
import { useRouter } from "next/navigation";
import { useState } from "react";

type IngredientFormProps = {
  recipeId: number;
};

export default function IngredientForm({ recipeId }: IngredientFormProps) {
  const router = useRouter();

  const [name, setName] = useState<string | null>();
  const [amount, setAmount] = useState<string | null>();
  const [grams, setGrams] = useState<boolean>(true);

  let handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name === null) {
      alert("Please enter a valid recipe name");
      return;
    }
    if (amount === null || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid recipe amount");
      return;
    }
    try {
      dbInsertIngredient(name!, Number(amount), grams ? "g" : "Kg", recipeId);
    } catch (e) {
      console.error(e);
      return;
    }

    setAmount("");
    setName("");
    setGrams(true);

    router.refresh();
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
      <label htmlFor="amount">Amount</label>
      <input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setAmount(event.target.value)
        }
        name="amount"
        value={amount ?? ""}
        id="amount"
        type="number"
        className="border-2 rounded p-2 mb-4 mt-2"
      />
      <label htmlFor="unit">Unit</label>
      <span>
        Is the unit grams?
        <input
          onChange={() => setGrams(!grams)}
          name="unit"
          checked={grams}
          id="unit"
          type="checkbox"
          className="border-2 rounded p-2 mb-4 mt-2 ml-2"
        />
      </span>
      <input
        type="submit"
        value={"Add"}
        className="border-2 rounded p-2 mb-4 mt-2 hover:bg-slate-500 transition text-white bg-slate-600"
      />
    </form>
  );
}

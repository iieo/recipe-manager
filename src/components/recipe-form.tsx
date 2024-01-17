"use client";

import { dbInsertRecipe } from "@/database_interactions";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function RecipeForm() {
  const router = useRouter();

  const formRef = useRef();

  const [name, setName] = useState<string | null>();
  const [duration, setDuration] = useState<string | null>();

  let handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name === null) {
      alert("Please enter a valid recipe name");
      return;
    }
    if (duration === null || isNaN(Number(duration))) {
      alert("Please enter a valid recipe duration");
      return;
    }

    dbInsertRecipe(name!, Number(duration));

    setDuration("");
    setName("");

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
        value={"Add"}
        className="border-2 rounded p-2 mb-4 mt-2 hover:bg-slate-500 transition text-white bg-slate-600"
      />
    </form>
  );
}

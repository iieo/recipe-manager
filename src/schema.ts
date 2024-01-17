import { integer, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";

const unitEnum = pgEnum("unit", ["Kg", "g"]);

const recipeTable = pgTable("recipes", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  duration: integer("duration").default(0),
});

const ingredientTable = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  recipeId: integer("recipeId").references(() => recipeTable.id),
  name: varchar("name").notNull(),
  amount: integer("amount").default(0),
  unit: unitEnum("unit").default("Kg"),
});

export type Recipe = {
  id: number;
  name: string;
  duration: number;
};

export type Unit = "Kg" | "g";

export type Ingredient = {
  id: number;
  recipeId: number;
  name: string;
  amounnt: number;
  unit: Unit;
};

export { unitEnum, recipeTable, ingredientTable };

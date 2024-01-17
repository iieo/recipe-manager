import { integer, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";

const unitEnum = pgEnum("unit", ["Kg", "g"]);

const recipeTable = pgTable("recipes", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  duration: integer("duration").notNull().default(0),
});

const ingredientTable = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  recipeId: integer("recipeId")
    .notNull()
    .references(() => recipeTable.id),
  name: varchar("name").notNull(),
  amount: integer("amount").notNull().default(0),
  unit: unitEnum("unit").notNull().default("Kg"),
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

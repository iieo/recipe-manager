import {
  InferModel,
  InferModelFromColumns,
  InferSelectModel,
  Many,
  relations,
} from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";

const unitEnum = pgEnum("unit", ["kg", "g"]);

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
  unit: unitEnum("unit").notNull().default("kg"),
});

export type Recipe = InferSelectModel<typeof recipeTable>;

export type Unit = "kg" | "g";

export type Ingredient = InferSelectModel<typeof ingredientTable>;

export { unitEnum, recipeTable, ingredientTable };

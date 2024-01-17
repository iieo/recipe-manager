DO $$ BEGIN
 CREATE TYPE "unit" AS ENUM('Kg', 'g');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipeId" integer,
	"name" varchar NOT NULL,
	"amount" integer DEFAULT 0,
	"unit" "unit" DEFAULT 'Kg'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"duration" integer DEFAULT 0
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_recipeId_recipes_id_fk" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

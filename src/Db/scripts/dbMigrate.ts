import "dotenv/config";
import path from "path"; // Corrección aquí
import fs from "fs";
import { query } from "..";
import { JSONStorage, Umzug } from "umzug";

const migrator = new Umzug({
  migrations: { glob: path.join(__dirname, "../", "migrations", "*{.ts}") },
  context: { query },
  storage: new JSONStorage({
    path: path.join(__dirname, "..", "migrations", "migrations.json"),
  }),
  logger: console,
  create: {
    folder: path.join(__dirname, "..", "migrations"),
    template: (filepath) => [
      [
        filepath,
        fs
          .readFileSync(
            path.join(__dirname, "..", "template", "migration-template.ts") // Corrección aquí
          )
          .toString(),
      ],
    ],
  },
});

export type Migration = typeof migrator._types.migration;

migrator.runAsCLI();

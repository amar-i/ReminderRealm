import {
  boolean,
  index,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const todo = pgTable(
  "todo",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    todo: varchar("todo", { length: 150 }).notNull(),
    completed: boolean("completed").notNull(),
  },
  (table) => {
    return {
      nameIdx: index("userId_idx").on(table.userId),
    };
  }
);

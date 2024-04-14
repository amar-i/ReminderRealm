import {
  boolean,
  date,
  index,
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const todo = pgTable(
  "todo",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    todo: varchar("todo", { length: 150 }).notNull(),
    completed: boolean("completed").notNull(),
    due: date("due", { mode: "string" }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return {
      nameIdx: index("userId_idx").on(table.userId),
    };
  }
);

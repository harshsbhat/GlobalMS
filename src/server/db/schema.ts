import { sql } from "drizzle-orm";
import { integer, jsonb, pgTableCreator, timestamp, varchar } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `globalms_${name}`);

export const workspaces = createTable(
  "workspace",
  {
    id: varchar("id", { length: 256 }).primaryKey(),
    tenantId: varchar("tenantId", { length: 256 }).notNull(),
    workspaceName: varchar("workspace_name", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);

export const apis = createTable(
  "api",
  {
    id: varchar("id", { length: 256 }).primaryKey(), 
    workspaceId: varchar("workspace_id", { length: 256 }).references(() => workspaces.id),
    name: varchar("name", { length: 128 }).notNull(),
    url: varchar("url", { length: 512 }).notNull(),
    method: varchar("method", { length: 10 }).notNull(),
    headers: jsonb("headers").default(sql`'{}'`),
    body: jsonb("body").default(sql`'{}'`),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);

export const statusPages = createTable(
  "status_page",
  {
    id: varchar("id", { length: 256 }).primaryKey(),
    workspaceId: varchar("workspace_id", { length: 256 }).references(() => workspaces.id),
    name: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);

export const performanceResults = createTable(
  "performance_result",
  {
    id: varchar("id", { length: 256 }).primaryKey(),
    apiId: varchar("api_id", { length: 256 }).references(() => apis.id),
    statusCode: integer("status_code").notNull(),
    durationMs: integer("duration_ms").notNull(),
    statusText: varchar("status_text", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);

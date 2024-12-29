import type { InferSelectModel } from "drizzle-orm";
import type * as schema from "./schema";

export type Workspace = InferSelectModel<typeof schema.workspaces>;
export type Api = InferSelectModel<typeof schema.apis>;
export type StatusPage = InferSelectModel<typeof schema.statusPages>;
export type PerformanceResult = InferSelectModel<typeof schema.performanceResults>;

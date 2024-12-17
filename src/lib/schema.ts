import { z } from 'zod';

export const HttpMethodEnum = z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);

export const RequestSchema = z.object({
  method: HttpMethodEnum, // Use the defined HttpMethodEnum
  url: z.string().url(),
  headers: z.record(z.string()), // Define headers as a Record<string, string>
  body: z.string().optional(),
});

export type RequestType = z.infer<typeof RequestSchema>;

export const ResponseSchema = z.object({
  status: z.number(),
  statusText: z.string(),
  headers: z.record(z.string()), 
  body: z.string(),
  durationMs: z.number(),
  region: z.string().optional(),
});

export type ResponseType = z.infer<typeof ResponseSchema>;

export type MultiRegionResponse = Array<ResponseType & {
  region: string;
  status: number;
}>;

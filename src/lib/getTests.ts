import { type RequestType, type ResponseType, type MultiRegionResponse } from "@/lib/schema";

const REGIONS = [
  'arn1', 'bom1', 'cdg1', 'cle1', 'cpt1', 'dub1', 'fra1', 'gru1', 'hkg1', 'hnd1',
  'iad1', 'icn1', 'kix1', 'lhr1', 'pdx1', 'sfo1', 'sin1', 'syd1',
];

/**
 * Makes a POST request to the `/api/test/:region` route with the request data.
 * If the region is "global", it will fetch the results for all regions and include metadata.
 * @param region - The region code (e.g., "global" or a specific region like "arn1").
 * @param requestData - The request details (method, URL, headers, and body).
 * @returns A Promise resolving to an array of responses or a single response.
 */
export async function getTests(
  region: string,
  requestData: RequestType
): Promise<ResponseType | MultiRegionResponse> {
  if (region === "global") {
    const fetchPromises = REGIONS.map(async (regionCode) => {
      const startTime = performance.now();

      try {
        const response = await fetch(`/api/test/${regionCode}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        });

        const endTime = performance.now();
        const durationMs = Math.round(endTime - startTime);

        if (!response.ok) {
          return {
            region: regionCode,
            status: response.status,
            statusText: response.statusText,
            durationMs,
            body: `Error: ${response.statusText}`,
            headers: {},
          };
        }

        const responseBody = await response.json() as ResponseType;

        return {
          ...responseBody,
          region: regionCode,
          durationMs,
        };
      } catch (error) {
        const endTime = performance.now();
        const durationMs = Math.round(endTime - startTime);
        console.error(`Error fetching test results for region ${regionCode}:`, error);

        return {
          region: regionCode,
          status: 500,
          statusText: "Internal Server Error",
          durationMs,
          body: "Error occurred while fetching data",
          headers: {},
        };
      }
    });

    try {
      const results = await Promise.all(fetchPromises);
      return results as MultiRegionResponse;
    } catch (error) {
      console.error("Error fetching test results for all regions:", error);
      throw new Error("Failed to fetch test results for all regions");
    }
  } else if (REGIONS.some((code) => code === region)) {
    try {
      const startTime = performance.now();

      const response = await fetch(`/api/test/${region}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const endTime = performance.now();
      const durationMs = Math.round(endTime - startTime);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch test results for region ${region}: ${response.statusText}`
        );
      }

      const responseBody = await response.json() as ResponseType;

      return {
        ...responseBody,
        region,
        durationMs,
      };
    } catch (error) {
      console.error(`Error fetching test results for region ${region}:`, error);
      throw new Error(`Failed to fetch test results for region ${region}`);
    }
  } else {
    throw new Error(`Invalid region code: ${region}. Please use a valid region or 'global'.`);
  }
}

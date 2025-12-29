/**
 * Converts array of episode IDs into comma-separated string for API requests.
 *
 * @param ids - Array of episode ID numbers
 * @returns Comma-separated string of episode IDs
 *
 * @example
 * ```typescript
 * getEpisodeIdsAsString([1, 2, 3]); // Returns: "1,2,3"
 * getEpisodeIdsAsString([28]);      // Returns: "28"
 * ```
 */
export default function getEpisodeIdsAsString(ids: number[]): string {
  return ids.join(',');
}

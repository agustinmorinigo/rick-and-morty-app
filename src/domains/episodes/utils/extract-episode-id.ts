/**
 * Extracts the episode ID number from an episode URL.
 *
 * @param episodeUrl - Full episode URL string
 * @returns Episode ID as number
 *
 * @example
 * ```typescript
 * extractEpisodeId('https://rickandmortyapi.com/api/episode/1');  // Returns: 1
 * extractEpisodeId('https://rickandmortyapi.com/api/episode/28'); // Returns: 28
 * ```
 */
export default function extractEpisodeId(episodeUrl: string): number {
  const id = episodeUrl.split('/').pop();
  return Number(id);
}

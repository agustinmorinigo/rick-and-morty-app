import extractEpisodeId from '@/domains/episodes/utils/extract-episode-id';

/**
 * Extracts episode IDs from an array of episode URLs.
 *
 * @param episodeUrls - Array of episode URL strings
 * @returns Array of episode ID numbers
 *
 * @example
 * ```typescript
 * const urls = [
 *   'https://rickandmortyapi.com/api/episode/1',
 *   'https://rickandmortyapi.com/api/episode/28'
 * ];
 * extractEpisodeIds(urls); // Returns: [1, 28]
 * ```
 */
export default function extractEpisodeIds(episodeUrls: string[]): number[] {
  return episodeUrls.map(extractEpisodeId);
}

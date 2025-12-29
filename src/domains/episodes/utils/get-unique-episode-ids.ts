import extractEpisodeIds from '@/domains/episodes/utils/extract-episode-ids';

/**
 * Combines episode URLs from two characters and returns unique episode ids.
 * Eliminates duplicates when both characters appear in the same episodes.
 *
 * @param char1EpisodeUrls - Array of episode URLs for the first character
 * @param char2EpisodesUrls - Array of episode URLs for the second character
 * @returns Array of unique episode ids as numbers, sorted in order of appearance
 *
 * @example
 * ```typescript
 * const char1EpisodeUrls = [
 *   'https://rickandmortyapi.com/api/episode/1',
 *   'https://rickandmortyapi.com/api/episode/2'
 * ];
 * const char2EpisodesUrls = [
 *   'https://rickandmortyapi.com/api/episode/2',
 *   'https://rickandmortyapi.com/api/episode/3'
 * ];
 *
 * const uniqueIds = getUniqueEpisodeIds(char1EpisodeUrls, char2EpisodesUrls);
 * // Returns: [1, 2, 3]
 * ```
 *
 * @example
 * ```typescript
 * // When characters have no shared episodes
 * const rickEpisodeUrls = ['https://rickandmortyapi.com/api/episode/1'];
 * const mortyEpisodeUrls = ['https://rickandmortyapi.com/api/episode/2'];
 *
 * getUniqueEpisodeIds(rickEpisodeUrls, mortyEpisodeUrls); // Returns: [1, 2]
 * ```
 */
export default function getUniqueEpisodeIds(char1EpisodeUrls: string[], char2EpisodeUrls: string[]): number[] {
  const ids1 = extractEpisodeIds(char1EpisodeUrls);
  const ids2 = extractEpisodeIds(char2EpisodeUrls);
  return [...new Set([...ids1, ...ids2])];
}

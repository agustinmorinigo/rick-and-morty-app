import type { Episode } from '@/domains/episodes/types';
import extractEpisodeIds from '@/domains/episodes/utils/extract-episode-ids';
import getExclusiveEpisodes from '@/domains/episodes/utils/get-exclusive-episodes';
import getSharedEpisodes from '@/domains/episodes/utils/get-shared-episodes';

/**
 * Categorizes episodes into three groups based on character appearances.
 *
 * @param allEpisodes - Array of all episode objects
 * @param char1EpisodeUrls - Episode URLs for first character
 * @param char2EpisodeUrls - Episode URLs for second character
 * @returns Object with onlyChar1, shared, and onlyChar2 episode arrays
 *
 * @example
 * ```typescript
 * const rickUrls = ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'];
 * const mortyUrls = ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/3'];
 *
 * const result = categorizeEpisodes(allEpisodes, rickUrls, mortyUrls);
 * // Returns:
 * // {
 * //   onlyChar1: [episode2],  // Rick only
 * //   shared: [episode1],     // Both characters
 * //   onlyChar2: [episode3]   // Morty only
 * // }
 * ```
 */
export default function categorizeEpisodes(
  allEpisodes: Episode[],
  char1EpisodeUrls: string[],
  char2EpisodeUrls: string[],
) {
  if (allEpisodes.length === 0) {
    return { onlyChar1: [], shared: [], onlyChar2: [] };
  }

  const char1Ids = new Set(extractEpisodeIds(char1EpisodeUrls));
  const char2Ids = new Set(extractEpisodeIds(char2EpisodeUrls));

  return {
    onlyChar1: getExclusiveEpisodes(allEpisodes, char1Ids, char2Ids),
    shared: getSharedEpisodes(allEpisodes, char1Ids, char2Ids),
    onlyChar2: getExclusiveEpisodes(allEpisodes, char2Ids, char1Ids),
  };
}

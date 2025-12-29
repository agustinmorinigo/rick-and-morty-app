import type { Episode } from '@/domains/episodes/types';

/**
 * Filters episodes that both characters appeared in together.
 * Returns episodes where both character ID sets have a matching episode ID.
 *
 * @param episodes - Array of all episode objects to filter from
 * @param char1Ids - Set of episode IDs for the first character
 * @param char2Ids - Set of episode IDs for the second character
 * @returns Array of episodes where both characters appeared
 *
 * @example
 * ```typescript
 * const episodes = [
 *   { id: 1, name: "Pilot", episode: "S01E01", ... },
 *   { id: 2, name: "Lawnmower Dog", episode: "S01E02", ... },
 *   { id: 3, name: "Anatomy Park", episode: "S01E03", ... }
 * ];
 *
 * const rickEpisodes = new Set([1, 2]);     // Rick in episodes 1 and 2
 * const mortyEpisodes = new Set([1, 3]);    // Morty in episodes 1 and 3
 *
 * const shared = getSharedEpisodes(episodes, rickEpisodes, mortyEpisodes);
 * // Returns: [{ id: 1, name: "Pilot", episode: "S01E01", ... }]
 * ```
 *
 * @example
 * ```typescript
 * // When characters have no shared episodes
 * const char1Ids = new Set([1, 2]);
 * const char2Ids = new Set([3, 4]);
 *
 * getSharedEpisodes(episodes, char1Ids, char2Ids); // Returns: []
 * ```
 */
export default function getSharedEpisodes(
  episodes: Episode[],
  char1Ids: Set<number>,
  char2Ids: Set<number>,
): Episode[] {
  return episodes.filter((ep) => char1Ids.has(ep.id) && char2Ids.has(ep.id));
}

import type { Episode } from '@/domains/episodes/types';

/**
 * Filters episodes that are exclusive to one character and not shared with another.
 * Returns episodes where the include character appeared but the exclude character did not.
 *
 * @param episodes - Array of all episode objects to filter from
 * @param includeIds - Set of episode IDs for the character to include
 * @param excludeIds - Set of episode IDs for the character to exclude
 * @returns Array of episodes exclusive to the included character
 *
 * @example
 * ```typescript
 * const episodes = [
 *   { id: 1, name: "Pilot", episode: "S01E01", ... },
 *   { id: 2, name: "Lawnmower Dog", episode: "S01E02", ... },
 *   { id: 3, name: "Anatomy Park", episode: "S01E03", ... }
 * ];
 *
 * const rickEpisodes = new Set([1, 2, 3]);  // Rick in episodes 1, 2, 3
 * const mortyEpisodes = new Set([1, 2]);    // Morty in episodes 1, 2
 *
 * const rickExclusive = getExclusiveEpisodes(episodes, rickEpisodes, mortyEpisodes);
 * // Returns: [{ id: 3, name: "Anatomy Park", episode: "S01E03", ... }]
 * ```
 *
 * @example
 * ```typescript
 * // Finding episodes exclusive to Morty
 * const mortyEpisodes = new Set([1, 4]);
 * const rickEpisodes = new Set([1, 2, 3]);
 *
 * const mortyExclusive = getExclusiveEpisodes(episodes, mortyEpisodes, rickEpisodes);
 * // Returns episodes where only Morty appeared: [{ id: 4, ... }]
 * ```
 *
 * @example
 * ```typescript
 * // When character has no exclusive episodes
 * const char1Episodes = new Set([1, 2]);
 * const char2Episodes = new Set([1, 2, 3, 4]);
 *
 * getExclusiveEpisodes(episodes, char1Episodes, char2Episodes); // Returns: []
 * ```
 */
export default function getExclusiveEpisodes(
  episodes: Episode[],
  includeIds: Set<number>,
  excludeIds: Set<number>,
): Episode[] {
  return episodes.filter((ep) => includeIds.has(ep.id) && !excludeIds.has(ep.id));
}

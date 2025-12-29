/**
 * Converts episode code format to a human-readable label.
 * Transforms standard episode notation (S01E01) into readable season and episode text.
 *
 * @param episode - Episode code string in format "S##E##"
 * @returns Human-readable episode label or original string if format is invalid
 *
 * @example
 * ```typescript
 * getEpisodeLabel("S01E01"); // Returns: "Season 1, Episode 1"
 * getEpisodeLabel("S02E10"); // Returns: "Season 2, Episode 10"
 * getEpisodeLabel("S10E05"); // Returns: "Season 10, Episode 5"
 * ```
 */
export default function getEpisodeLabel(episode: string): string {
  const match = /^S(\d+)E(\d+)$/i.exec(episode);
  if (!match) return episode;
  const [, season, episodeNumber] = match;
  return `Season ${Number(season)}, Episode ${Number(episodeNumber)}`;
}

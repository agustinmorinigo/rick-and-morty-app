import { describe, expect, it } from 'vitest';
import getUniqueEpisodeIds from './get-unique-episode-ids';

describe('getUniqueEpisodeIds', () => {
  it('should combine episode IDs from two characters with no duplicates', () => {
    const char1Episodes = ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'];
    const char2Episodes = ['https://rickandmortyapi.com/api/episode/3', 'https://rickandmortyapi.com/api/episode/4'];
    const result = getUniqueEpisodeIds(char1Episodes, char2Episodes);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should eliminate duplicate episode IDs when characters share episodes', () => {
    const char1Episodes = ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'];
    const char2Episodes = ['https://rickandmortyapi.com/api/episode/2', 'https://rickandmortyapi.com/api/episode/3'];
    const result = getUniqueEpisodeIds(char1Episodes, char2Episodes);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle empty arrays for both characters', () => {
    const char1Episodes: string[] = [];
    const char2Episodes: string[] = [];
    const result = getUniqueEpisodeIds(char1Episodes, char2Episodes);
    expect(result).toEqual([]);
  });

  it('should handle empty array for first character', () => {
    const char1Episodes: string[] = [];
    const char2Episodes = ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'];
    const result = getUniqueEpisodeIds(char1Episodes, char2Episodes);
    expect(result).toEqual([1, 2]);
  });

  it('should handle identical episode lists', () => {
    const episodeList = [
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/2',
      'https://rickandmortyapi.com/api/episode/3',
    ];

    const result = getUniqueEpisodeIds(episodeList, episodeList);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle single episode for each character', () => {
    const char1Episodes = ['https://rickandmortyapi.com/api/episode/1'];
    const char2Episodes = ['https://rickandmortyapi.com/api/episode/2'];
    const result = getUniqueEpisodeIds(char1Episodes, char2Episodes);
    expect(result).toEqual([1, 2]);
  });

  it('should handle single shared episode', () => {
    const char1Episodes = ['https://rickandmortyapi.com/api/episode/1'];
    const char2Episodes = ['https://rickandmortyapi.com/api/episode/1'];
    const result = getUniqueEpisodeIds(char1Episodes, char2Episodes);
    expect(result).toEqual([1]);
  });
});

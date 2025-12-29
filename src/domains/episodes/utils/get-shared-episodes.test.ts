import { describe, expect, it } from 'vitest';
import type { Episode } from '@/domains/episodes/types';
import getSharedEpisodes from './get-shared-episodes';

const mockEpisodes: Episode[] = [
  {
    id: 1,
    name: 'Pilot',
    airDate: 'December 2, 2013',
    episode: 'S01E01',
    characters: ['https://rickandmortyapi.com/api/character/1', 'https://rickandmortyapi.com/api/character/2'],
    url: 'https://rickandmortyapi.com/api/episode/1',
    created: '2017-11-10T12:56:33.798Z',
  },
  {
    id: 2,
    name: 'Lawnmower Dog',
    airDate: 'December 9, 2013',
    episode: 'S01E02',
    characters: ['https://rickandmortyapi.com/api/character/1'],
    url: 'https://rickandmortyapi.com/api/episode/2',
    created: '2017-11-10T12:56:33.916Z',
  },
  {
    id: 3,
    name: 'Anatomy Park',
    airDate: 'December 16, 2013',
    episode: 'S01E03',
    characters: ['https://rickandmortyapi.com/api/character/2'],
    url: 'https://rickandmortyapi.com/api/episode/3',
    created: '2017-11-10T12:56:34.022Z',
  },
  {
    id: 4,
    name: 'M. Night Shaym-Aliens!',
    airDate: 'January 13, 2014',
    episode: 'S01E04',
    characters: ['https://rickandmortyapi.com/api/character/1', 'https://rickandmortyapi.com/api/character/2'],
    url: 'https://rickandmortyapi.com/api/episode/4',
    created: '2017-11-10T12:56:34.129Z',
  },
];

describe('getSharedEpisodes', () => {
  it('should return episodes where both characters appeared', () => {
    const char1Ids = new Set([1, 2, 4]);
    const char2Ids = new Set([1, 3, 4]);
    const result = getSharedEpisodes(mockEpisodes, char1Ids, char2Ids);
    expect(result).toHaveLength(2);
    expect(result.map((ep) => ep.id)).toEqual([1, 4]);
  });

  it('should return empty array when characters have no shared episodes', () => {
    const char1Ids = new Set([1, 2]);
    const char2Ids = new Set([3]);
    const result = getSharedEpisodes(mockEpisodes, char1Ids, char2Ids);
    expect(result).toEqual([]);
  });

  it('should return empty array when episodes array is empty', () => {
    const char1Ids = new Set([1, 2]);
    const char2Ids = new Set([1, 3]);
    const result = getSharedEpisodes([], char1Ids, char2Ids);
    expect(result).toEqual([]);
  });

  it('should return empty array when first character has no episodes', () => {
    const char1Ids = new Set<number>();
    const char2Ids = new Set([1, 2, 3]);
    const result = getSharedEpisodes(mockEpisodes, char1Ids, char2Ids);
    expect(result).toEqual([]);
  });

  it('should return empty array when second character has no episodes', () => {
    const char1Ids = new Set([1, 2, 3]);
    const char2Ids = new Set<number>();
    const result = getSharedEpisodes(mockEpisodes, char1Ids, char2Ids);
    expect(result).toEqual([]);
  });

  it('should handle single shared episode correctly', () => {
    const char1Ids = new Set([1]);
    const char2Ids = new Set([1]);
    const result = getSharedEpisodes(mockEpisodes, char1Ids, char2Ids);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
    expect(result[0].name).toBe('Pilot');
  });

  it('should maintain original episode objects in result', () => {
    const char1Ids = new Set([1, 4]);
    const char2Ids = new Set([4]);
    const result = getSharedEpisodes(mockEpisodes, char1Ids, char2Ids);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(mockEpisodes[3]);
    expect(result[0].name).toBe('M. Night Shaym-Aliens!');
  });

  it('should handle episodes with IDs not in the episodes array', () => {
    const char1Ids = new Set([1, 99]);
    const char2Ids = new Set([1, 100]);
    const result = getSharedEpisodes(mockEpisodes, char1Ids, char2Ids);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });
});

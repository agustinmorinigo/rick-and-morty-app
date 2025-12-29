import { describe, expect, it } from 'vitest';
import type { Episode } from '@/domains/episodes/types';
import getExclusiveEpisodes from './get-exclusive-episodes';

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
    id: 5,
    name: 'Meeseeks and Destroy',
    airDate: 'January 20, 2014',
    episode: 'S01E05',
    characters: ['https://rickandmortyapi.com/api/character/1'],
    url: 'https://rickandmortyapi.com/api/episode/5',
    created: '2017-11-10T12:56:34.346Z',
  },
];

describe('getExclusiveEpisodes', () => {
  it('should return episodes exclusive to Rick when Morty is excluded', () => {
    const rickEpisodes = new Set([1, 2, 5]);
    const mortyEpisodes = new Set([1, 3]);
    const result = getExclusiveEpisodes(mockEpisodes, rickEpisodes, mortyEpisodes);
    expect(result).toHaveLength(2);
    expect(result.map((ep) => ep.id)).toEqual([2, 5]);
    expect(result.map((ep) => ep.name)).toEqual(['Lawnmower Dog', 'Meeseeks and Destroy']);
  });

  it('should return episodes exclusive to Morty when Rick is excluded', () => {
    const mortyEpisodes = new Set([1, 3]);
    const rickEpisodes = new Set([1, 2, 5]);
    const result = getExclusiveEpisodes(mockEpisodes, mortyEpisodes, rickEpisodes);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(3);
    expect(result[0].name).toBe('Anatomy Park');
  });

  it('should return empty array when all include episodes are also in exclude', () => {
    const includeIds = new Set([1, 2]);
    const excludeIds = new Set([1, 2, 3]);
    const result = getExclusiveEpisodes(mockEpisodes, includeIds, excludeIds);
    expect(result).toEqual([]);
  });

  it('should return all include episodes when exclude set is empty', () => {
    const includeIds = new Set([2, 5]);
    const excludeIds = new Set<number>();
    const result = getExclusiveEpisodes(mockEpisodes, includeIds, excludeIds);
    expect(result).toHaveLength(2);
    expect(result.map((ep) => ep.id)).toEqual([2, 5]);
  });

  it('should return empty array when include set is empty', () => {
    const includeIds = new Set<number>();
    const excludeIds = new Set([1, 2, 3]);
    const result = getExclusiveEpisodes(mockEpisodes, includeIds, excludeIds);
    expect(result).toEqual([]);
  });

  it('should return empty array when episodes array is empty', () => {
    const includeIds = new Set([1, 2]);
    const excludeIds = new Set([3, 4]);
    const result = getExclusiveEpisodes([], includeIds, excludeIds);
    expect(result).toEqual([]);
  });

  it('should handle include IDs that do not exist in episodes array', () => {
    const includeIds = new Set([99, 100]);
    const excludeIds = new Set([1, 2]);
    const result = getExclusiveEpisodes(mockEpisodes, includeIds, excludeIds);
    expect(result).toEqual([]);
  });

  it('should preserve complete episode objects in result', () => {
    const includeIds = new Set([3]);
    const excludeIds = new Set([1, 2]);
    const result = getExclusiveEpisodes(mockEpisodes, includeIds, excludeIds);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(mockEpisodes[2]);
    expect(result[0].characters).toEqual(['https://rickandmortyapi.com/api/character/2']);
  });

  it('should handle overlapping sets with partial exclusions', () => {
    const includeIds = new Set([1, 2, 3, 5]);
    const excludeIds = new Set([1, 3]);
    const result = getExclusiveEpisodes(mockEpisodes, includeIds, excludeIds);
    expect(result).toHaveLength(2);
    expect(result.map((ep) => ep.id)).toEqual([2, 5]);
  });
});

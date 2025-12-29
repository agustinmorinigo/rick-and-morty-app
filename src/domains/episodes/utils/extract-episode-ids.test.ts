import { describe, expect, it } from 'vitest';
import extractEpisodeIds from './extract-episode-ids';

describe('extractEpisodeIds', () => {
  it('should extract IDs from multiple valid episode URLs', () => {
    const urls = [
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/28',
      'https://rickandmortyapi.com/api/episode/51',
    ];

    const result = extractEpisodeIds(urls);
    expect(result).toEqual([1, 28, 51]);
  });

  it('should extract ID from single episode URL', () => {
    const urls = ['https://rickandmortyapi.com/api/episode/42'];
    const result = extractEpisodeIds(urls);
    expect(result).toEqual([42]);
  });

  it('should return empty array for empty URL array', () => {
    const urls: string[] = [];
    const result = extractEpisodeIds(urls);
    expect(result).toEqual([]);
  });

  it('should handle URLs with different episode ID formats', () => {
    const urls = [
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/999',
      'https://rickandmortyapi.com/api/episode/0',
    ];

    const result = extractEpisodeIds(urls);
    expect(result).toEqual([1, 999, 0]);
  });

  it('should handle malformed URLs gracefully', () => {
    const urls = [
      'https://rickandmortyapi.com/api/episode/abc',
      'https://rickandmortyapi.com/api/episode/123def',
      'invalid-url',
    ];

    const result = extractEpisodeIds(urls);
    expect(result).toEqual([NaN, NaN, NaN]);
  });

  it('should handle duplicate episode URLs', () => {
    const urls = [
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/2',
    ];

    const result = extractEpisodeIds(urls);
    expect(result).toEqual([1, 1, 2]);
  });

  it('should handle very large episode numbers', () => {
    const urls = ['https://rickandmortyapi.com/api/episode/999999', 'https://rickandmortyapi.com/api/episode/1000000'];
    const result = extractEpisodeIds(urls);
    expect(result).toEqual([999999, 1000000]);
  });

  it('should handle mixed valid and invalid URLs', () => {
    const urls = [
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/invalid',
      'https://rickandmortyapi.com/api/episode/3',
    ];

    const result = extractEpisodeIds(urls);
    expect(result).toEqual([1, NaN, 3]);
  });
});

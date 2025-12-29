import { describe, expect, it } from 'vitest';
import extractEpisodeId from './extract-episode-id';

describe('extractEpisodeId', () => {
  it('should extract ID from standard episode URL', () => {
    const url = 'https://rickandmortyapi.com/api/episode/1';
    const result = extractEpisodeId(url);
    expect(result).toBe(1);
  });

  it('should extract ID from multi-digit episode URL', () => {
    const url = 'https://rickandmortyapi.com/api/episode/28';
    const result = extractEpisodeId(url);
    expect(result).toBe(28);
  });

  it('should extract ID from large episode number', () => {
    const url = 'https://rickandmortyapi.com/api/episode/999';
    const result = extractEpisodeId(url);
    expect(result).toBe(999);
  });

  it('should handle malformed URL with empty ID', () => {
    const url = 'https://rickandmortyapi.com/api/episode/';
    const result = extractEpisodeId(url);
    expect(result).toBe(0);
  });

  it('should handle URL with non-numeric ID', () => {
    const url = 'https://rickandmortyapi.com/api/episode/abc';
    const result = extractEpisodeId(url);
    expect(result).toBeNaN();
  });

  it('should handle URL with mixed alphanumeric ID', () => {
    const url = 'https://rickandmortyapi.com/api/episode/123abc';
    const result = extractEpisodeId(url);
    expect(result).toBeNaN();
  });

  it('should handle empty string', () => {
    const url = '';
    const result = extractEpisodeId(url);
    expect(result).toBe(0);
  });
});

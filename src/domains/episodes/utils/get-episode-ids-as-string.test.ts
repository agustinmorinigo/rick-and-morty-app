import { describe, expect, it } from 'vitest';
import getEpisodeIdsAsString from './get-episode-ids-as-string';

describe('getEpisodeIdsAsString', () => {
  it('should convert array of multiple IDs to comma-separated string', () => {
    const ids = [1, 2, 3];
    const result = getEpisodeIdsAsString(ids);
    expect(result).toBe('1,2,3');
  });

  it('should convert single ID to string without commas', () => {
    const ids = [28];
    const result = getEpisodeIdsAsString(ids);
    expect(result).toBe('28');
  });

  it('should return empty string for empty array', () => {
    const ids: number[] = [];
    const result = getEpisodeIdsAsString(ids);
    expect(result).toBe('');
  });

  it('should handle duplicate IDs in array', () => {
    const ids = [1, 2, 2, 3, 1];
    const result = getEpisodeIdsAsString(ids);
    expect(result).toBe('1,2,2,3,1');
  });

  it('should handle zero as valid episode ID', () => {
    const ids = [0, 1, 2];
    const result = getEpisodeIdsAsString(ids);
    expect(result).toBe('0,1,2');
  });

  it('should handle negative numbers (edge case)', () => {
    const ids = [-1, 0, 1];
    const result = getEpisodeIdsAsString(ids);
    expect(result).toBe('-1,0,1');
  });

  it('should handle very long array efficiently', () => {
    const ids = Array.from({ length: 100 }, (_, i) => i + 1);
    const result = getEpisodeIdsAsString(ids);
    expect(result).toMatch(/^\d+(,\d+)*$/);
    expect(result.split(',').length).toBe(100);
    expect(result).toContain('1,2,3');
    expect(result).toContain('98,99,100');
  });
});

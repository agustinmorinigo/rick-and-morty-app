import { describe, expect, it } from 'vitest';
import getEpisodeLabel from './get-episode-label';

describe('getEpisodeLabel', () => {
  it('should convert standard episode format to readable label', () => {
    const result = getEpisodeLabel('S01E01');
    expect(result).toBe('Season 1, Episode 1');
  });

  it('should handle double-digit season and episode numbers', () => {
    const result = getEpisodeLabel('S02E10');
    expect(result).toBe('Season 2, Episode 10');
  });

  it('should handle large season numbers', () => {
    const result = getEpisodeLabel('S10E05');
    expect(result).toBe('Season 10, Episode 5');
  });

  it('should be case insensitive for lowercase input', () => {
    const result = getEpisodeLabel('s01e01');
    expect(result).toBe('Season 1, Episode 1');
  });

  it('should be case insensitive for mixed case input', () => {
    const result = getEpisodeLabel('S01e01');
    expect(result).toBe('Season 1, Episode 1');
  });

  it('should return original string for invalid format without S prefix', () => {
    const input = '01E01';
    const result = getEpisodeLabel(input);
    expect(result).toBe(input);
  });

  it('should return original string for invalid format without E separator', () => {
    const input = 'S0101';
    const result = getEpisodeLabel(input);
    expect(result).toBe(input);
  });

  it('should return original string for completely invalid format', () => {
    const input = 'Episode 1';
    const result = getEpisodeLabel(input);
    expect(result).toBe(input);
  });

  it('should return original string for empty string', () => {
    const input = '';
    const result = getEpisodeLabel(input);
    expect(result).toBe(input);
  });

  it('should handle leading zeros in episode numbers', () => {
    const result = getEpisodeLabel('S01E05');
    expect(result).toBe('Season 1, Episode 5');
  });

  it('should return original for partial format with only season', () => {
    const input = 'S01E';
    const result = getEpisodeLabel(input);
    expect(result).toBe(input);
  });

  it('should return original for format with extra characters', () => {
    const input = 'S01E01X';
    const result = getEpisodeLabel(input);
    expect(result).toBe(input);
  });
});

import { describe, expect, it } from 'vitest';
import type { Episode } from '@/domains/episodes/types';
import categorizeEpisodes from './categorize-episodes';

const mockEpisodes: Episode[] = [
  {
    id: 1,
    name: 'Pilot',
    airDate: 'December 2, 2013',
    episode: 'S01E01',
    characters: [],
    url: 'https://rickandmortyapi.com/api/episode/1',
    created: '2017-11-10T12:56:33.798Z',
  },
  {
    id: 2,
    name: 'Lawnmower Dog',
    airDate: 'December 9, 2013',
    episode: 'S01E02',
    characters: [],
    url: 'https://rickandmortyapi.com/api/episode/2',
    created: '2017-11-10T12:56:33.916Z',
  },
  {
    id: 3,
    name: 'Anatomy Park',
    airDate: 'December 16, 2013',
    episode: 'S01E03',
    characters: [],
    url: 'https://rickandmortyapi.com/api/episode/3',
    created: '2017-11-10T12:56:34.022Z',
  },
  {
    id: 4,
    name: 'M. Night Shaym-Aliens!',
    airDate: 'January 13, 2014',
    episode: 'S01E04',
    characters: [],
    url: 'https://rickandmortyapi.com/api/episode/4',
    created: '2017-11-10T12:56:34.129Z',
  },
];

describe('categorizeEpisodes', () => {
  it('should categorize episodes with shared and exclusive appearances', () => {
    const char1Urls = ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'];
    const char2Urls = ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/3'];

    const result = categorizeEpisodes(mockEpisodes, char1Urls, char2Urls);

    expect(result.onlyChar1).toHaveLength(1);
    expect(result.onlyChar1[0].id).toBe(2);
    expect(result.shared).toHaveLength(1);
    expect(result.shared[0].id).toBe(1);
    expect(result.onlyChar2).toHaveLength(1);
    expect(result.onlyChar2[0].id).toBe(3);
  });

  it('should handle characters with no shared episodes', () => {
    const char1Urls = ['https://rickandmortyapi.com/api/episode/1'];
    const char2Urls = ['https://rickandmortyapi.com/api/episode/2'];

    const result = categorizeEpisodes(mockEpisodes, char1Urls, char2Urls);

    expect(result.onlyChar1).toHaveLength(1);
    expect(result.onlyChar1[0].id).toBe(1);
    expect(result.shared).toHaveLength(0);
    expect(result.onlyChar2).toHaveLength(1);
    expect(result.onlyChar2[0].id).toBe(2);
  });

  it('should handle characters appearing in all same episodes', () => {
    const char1Urls = ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'];
    const char2Urls = ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'];

    const result = categorizeEpisodes(mockEpisodes, char1Urls, char2Urls);

    expect(result.onlyChar1).toHaveLength(0);
    expect(result.shared).toHaveLength(2);
    expect(result.shared.map((e) => e.id)).toEqual([1, 2]);
    expect(result.onlyChar2).toHaveLength(0);
  });

  it('should handle empty episode arrays for both characters', () => {
    const char1Urls: string[] = [];
    const char2Urls: string[] = [];

    const result = categorizeEpisodes(mockEpisodes, char1Urls, char2Urls);

    expect(result.onlyChar1).toHaveLength(0);
    expect(result.shared).toHaveLength(0);
    expect(result.onlyChar2).toHaveLength(0);
  });

  it('should handle one character with no episodes', () => {
    const char1Urls = ['https://rickandmortyapi.com/api/episode/1'];
    const char2Urls: string[] = [];

    const result = categorizeEpisodes(mockEpisodes, char1Urls, char2Urls);

    expect(result.onlyChar1).toHaveLength(1);
    expect(result.onlyChar1[0].id).toBe(1);
    expect(result.shared).toHaveLength(0);
    expect(result.onlyChar2).toHaveLength(0);
  });

  it('should return empty arrays when no episodes provided', () => {
    const char1Urls = ['https://rickandmortyapi.com/api/episode/1'];
    const char2Urls = ['https://rickandmortyapi.com/api/episode/2'];

    const result = categorizeEpisodes([], char1Urls, char2Urls);

    expect(result.onlyChar1).toHaveLength(0);
    expect(result.shared).toHaveLength(0);
    expect(result.onlyChar2).toHaveLength(0);
  });

  it('should handle multiple episodes per character with complex overlap', () => {
    const char1Urls = [
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/2',
      'https://rickandmortyapi.com/api/episode/3',
    ];
    const char2Urls = [
      'https://rickandmortyapi.com/api/episode/2',
      'https://rickandmortyapi.com/api/episode/3',
      'https://rickandmortyapi.com/api/episode/4',
    ];

    const result = categorizeEpisodes(mockEpisodes, char1Urls, char2Urls);

    expect(result.onlyChar1).toHaveLength(1);
    expect(result.onlyChar1[0].id).toBe(1);
    expect(result.shared).toHaveLength(2);
    expect(result.shared.map((e) => e.id).sort()).toEqual([2, 3]);
    expect(result.onlyChar2).toHaveLength(1);
    expect(result.onlyChar2[0].id).toBe(4);
  });
});

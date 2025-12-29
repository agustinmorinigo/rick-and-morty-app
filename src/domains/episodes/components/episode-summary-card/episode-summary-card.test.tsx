import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Episode } from '@/domains/episodes/types';
import EpisodeSummaryCard from './episode-summary-card';

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
];

const defaultProps = {
  title: 'Shared Episodes',
  episodes: mockEpisodes,
  isLoading: false,
  variant: 'primary' as const,
};

describe('EpisodeSummaryCard', () => {
  it('should render card with title', () => {
    render(<EpisodeSummaryCard {...defaultProps} />);
    expect(screen.getByTestId('episode-summary-card')).toBeInTheDocument();
    expect(screen.getByText('Shared Episodes')).toBeInTheDocument();
  });

  it('should render episode content when not loading and has episodes', () => {
    render(<EpisodeSummaryCard {...defaultProps} />);
    expect(screen.getAllByTestId('episode-summary-card-content-item')).toHaveLength(2);
    expect(screen.getByText('Pilot')).toBeInTheDocument();
    expect(screen.getByText('Lawnmower Dog')).toBeInTheDocument();
    expect(screen.queryByTestId('episode-summary-card-skeleton')).not.toBeInTheDocument();
  });

  it('should render skeleton when loading', () => {
    render(<EpisodeSummaryCard {...defaultProps} isLoading={true} />);
    expect(screen.getAllByTestId('episode-summary-card-skeleton')).toHaveLength(5);
    expect(screen.queryByTestId('episode-summary-card-content-item')).not.toBeInTheDocument();
    expect(screen.queryByTestId('episode-summary-card-empty')).not.toBeInTheDocument();
  });

  it('should render empty state when not loading and no episodes', () => {
    render(<EpisodeSummaryCard {...defaultProps} episodes={[]} />);
    expect(screen.getByTestId('episode-summary-card-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('episode-summary-card-skeleton')).not.toBeInTheDocument();
    expect(screen.queryByTestId('episode-summary-card-content-item')).not.toBeInTheDocument();
  });

  it('should show correct episode count with empty episodes array', () => {
    render(<EpisodeSummaryCard {...defaultProps} episodes={[]} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should show correct episode count with single episode', () => {
    render(<EpisodeSummaryCard {...defaultProps} episodes={[mockEpisodes[0]]} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getAllByTestId('episode-summary-card-content-item')).toHaveLength(1);
  });

  it('should render different titles correctly', () => {
    render(<EpisodeSummaryCard {...defaultProps} title="Rick Only Episodes" />);
    expect(screen.getByText('Rick Only Episodes')).toBeInTheDocument();
  });

  it('should prioritize loading state over empty episodes', () => {
    render(<EpisodeSummaryCard {...defaultProps} episodes={[]} isLoading={true} />);
    expect(screen.getAllByTestId('episode-summary-card-skeleton')).toHaveLength(5);
    expect(screen.queryByTestId('episode-summary-card-empty')).not.toBeInTheDocument();
  });

  it('should handle large number of episodes', () => {
    const manyEpisodes = Array.from({ length: 50 }, (_, i) => ({
      ...mockEpisodes[0],
      id: i + 1,
      name: `Episode ${i + 1}`,
    }));

    render(<EpisodeSummaryCard {...defaultProps} episodes={manyEpisodes} />);
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getAllByTestId('episode-summary-card-content-item')).toHaveLength(50);
  });
});
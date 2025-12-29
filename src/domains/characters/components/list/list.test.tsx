import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { Character } from '@/domains/characters/types';
import { CharacterList } from './list';

vi.mock('@/domains/characters/queries/use-get-characters-query', () => ({
  useGetCharactersQuery: vi.fn(),
}));

vi.mock('@/hooks/use-pagination', () => ({
  default: vi.fn(),
}));

import { useGetCharactersQuery } from '@/domains/characters/queries/use-get-characters-query';
import usePagination from '@/hooks/use-pagination';

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: ['episode1'],
    url: 'character1',
    created: '2017-11-04T18:48:46.250Z',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    episode: ['episode1'],
    url: 'character2',
    created: '2017-11-04T18:50:21.651Z',
  },
];

describe('CharacterList', () => {
  const defaultProps = {
    label: 'Characters',
    activeCharacter: null,
    onClickCharacter: vi.fn(),
    id: 'test-list',
    disabledCharacter: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    vi.mocked(usePagination).mockReturnValue({
      page: 1,
      goToPage: vi.fn(),
    });

    vi.mocked(useGetCharactersQuery).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        results: mockCharacters,
        info: { pages: 1, count: 2, next: null, prev: null },
      },
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useGetCharactersQuery>);
  });

  it('should render character list with header and characters', () => {
    render(<CharacterList {...defaultProps} />);
    expect(screen.getByTestId('character-list')).toBeInTheDocument();
    expect(screen.getByText('Characters')).toBeInTheDocument();
    expect(screen.getAllByTestId('character-list-item')).toHaveLength(2);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('should render skeleton when loading', () => {
    vi.mocked(useGetCharactersQuery).mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useGetCharactersQuery>);

    render(<CharacterList {...defaultProps} />);
    expect(screen.getAllByTestId('character-list-skeleton')).toHaveLength(6);
    expect(screen.queryByTestId('character-list-item')).not.toBeInTheDocument();
    expect(screen.queryByTestId('character-list-empty')).not.toBeInTheDocument();
  });

  it('should render empty state when no characters found', () => {
    vi.mocked(useGetCharactersQuery).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        results: [],
        info: { pages: 1, count: 0, next: null, prev: null },
      },
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useGetCharactersQuery>);

    render(<CharacterList {...defaultProps} />);
    expect(screen.getByTestId('character-list-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('character-list-skeleton')).not.toBeInTheDocument();
    expect(screen.queryByTestId('character-list-item')).not.toBeInTheDocument();
  });

  it('should render error content when query fails', () => {
    vi.mocked(useGetCharactersQuery).mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useGetCharactersQuery>);

    render(<CharacterList {...defaultProps} />);
    expect(screen.getByText('Failed to load characters.')).toBeInTheDocument();
    expect(screen.getByText('Retry')).toBeInTheDocument();
    expect(screen.queryByTestId('character-list')).not.toBeInTheDocument();
  });

  it('should call refetch when retry button is clicked on error', () => {
    const mockRefetch = vi.fn();
    vi.mocked(useGetCharactersQuery).mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
      refetch: mockRefetch,
    } as unknown as ReturnType<typeof useGetCharactersQuery>);

    render(<CharacterList {...defaultProps} />);
    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton);
    expect(mockRefetch).toHaveBeenCalledOnce();
  });

  it('should call onClickCharacter when character is clicked', () => {
    const mockOnClick = vi.fn();
    render(<CharacterList {...defaultProps} onClickCharacter={mockOnClick} />);
    const firstCharacter = screen.getAllByTestId('character-list-item')[0];
    fireEvent.click(firstCharacter);
    expect(mockOnClick).toHaveBeenCalledWith(mockCharacters[0]);
  });

  it('should not call onClickCharacter when disabled character is clicked', () => {
    const mockOnClick = vi.fn();
    render(
      <CharacterList 
        {...defaultProps} 
        onClickCharacter={mockOnClick} 
        disabledCharacter={mockCharacters[0]} 
      />
    );

    const firstCharacter = screen.getAllByTestId('character-list-item')[0];
    fireEvent.click(firstCharacter);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should handle different labels', () => {
    render(<CharacterList {...defaultProps} label="Select Character 1" />);
    expect(screen.getByText('Select Character 1')).toBeInTheDocument();
  });

  it('should handle undefined data gracefully', () => {
    vi.mocked(useGetCharactersQuery).mockReturnValue({
      isLoading: false,
      isError: false,
      data: undefined,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useGetCharactersQuery>);

    render(<CharacterList {...defaultProps} />);
    expect(screen.getByTestId('character-list-empty')).toBeInTheDocument();
  });

  it('should prioritize loading state over empty results', () => {
    vi.mocked(useGetCharactersQuery).mockReturnValue({
      isLoading: true,
      isError: false,
      data: {
        results: [],
        info: { pages: 1, count: 0, next: null, prev: null },
      },
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useGetCharactersQuery>);

    render(<CharacterList {...defaultProps} />);
    expect(screen.getAllByTestId('character-list-skeleton')).toHaveLength(6);
    expect(screen.queryByTestId('character-list-empty')).not.toBeInTheDocument();
  });

  it('should display character details correctly', () => {
    render(<CharacterList {...defaultProps} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getAllByText('Alive')).toHaveLength(2);
    expect(screen.getAllByText(/human/i)).toHaveLength(2);
  });
});
import { useQuery } from '@tanstack/react-query';
import { characterQueryKeys } from '@/domains/characters/queries/query-keys';
import { charactersService } from '@/domains/characters/services';

export const useGetCharactersQuery = (page: number) => {
  const query = useQuery({
    queryKey: characterQueryKeys.get(page),
    queryFn: () => charactersService.get(page),
  });
  return query;
};

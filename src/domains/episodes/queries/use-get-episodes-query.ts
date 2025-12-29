import { useQuery } from '@tanstack/react-query';
import { episodeQueryKeys } from '@/domains/episodes/queries/query-keys';
import { episodesService } from '@/domains/episodes/services';

export function useGetEpisodesQuery(episodeIds: number[]) {
  const query = useQuery({
    queryKey: episodeQueryKeys.get(episodeIds),
    queryFn: () => episodesService.get(episodeIds),
  });
  return query;
}

import apiClient from '@/client';
import { getById } from '@/domains/episodes/services/get-by-id';
import type { Episode } from '@/domains/episodes/types';
import getEpisodeIdsAsString from '@/domains/episodes/utils/get-episode-ids-as-string';

export async function get(ids: number[]): Promise<Episode[]> {
  if (ids.length === 0) return [];

  if (ids.length === 1) {
    const episode = await getById(ids[0]);
    return [episode];
  }

  const { data } = await apiClient.get<Episode[]>(`/episode/${getEpisodeIdsAsString(ids)}`);
  return data;
}

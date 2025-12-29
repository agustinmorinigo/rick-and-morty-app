import apiClient from '@/client';
import type { Episode } from '@/domains/episodes/types';

export async function getById(id: number): Promise<Episode> {
  const { data } = await apiClient.get<Episode>(`/episode/${id}`);
  return data;
}

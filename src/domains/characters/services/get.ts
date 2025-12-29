import apiClient from '@/client';
import type { Character } from '@/domains/characters/types';
import type { ApiResponse } from '@/types/api';

export async function get(page: number): Promise<ApiResponse<Character>> {
  const { data } = await apiClient.get<ApiResponse<Character>>('/character', { params: { page } });
  return data;
}

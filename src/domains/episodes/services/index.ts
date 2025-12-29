import { get } from '@/domains/episodes/services/get';
import { getById } from '@/domains/episodes/services/get-by-id';

export const episodesService = {
  getById,
  get,
};

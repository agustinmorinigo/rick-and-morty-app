export const episodeQueryKeys = {
  all: ['episodes'] as const,
  get: (episodeIds: number[]) => [...episodeQueryKeys.all, episodeIds] as const,
};

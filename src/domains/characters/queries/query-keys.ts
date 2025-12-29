export const characterQueryKeys = {
  all: ['character'] as const,
  get: (page: number) => [...characterQueryKeys.all, page] as const,
};

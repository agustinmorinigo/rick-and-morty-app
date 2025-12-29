export default {
  '*.{ts,tsx,js,jsx}': [
    'biome check --write --no-errors-on-unmatched --files-ignore-unknown=true',
    () => 'pnpm run check-types',
  ],
  '*.{json,css,md}': ['biome format --write --no-errors-on-unmatched'],
};

'use client';
import Summary from '@/domains/comparator/components/summary-grid/summary';
import SummaryGridEmpty from '@/domains/comparator/components/summary-grid/summary-grid-empty';
import useComparatorStore from '@/domains/comparator/stores/use-comparator-store';

export default function SummaryGrid() {
  const { character1, character2 } = useComparatorStore();

  if (!character1 || !character2) {
    return <SummaryGridEmpty />;
  }

  return <Summary character1={character1} character2={character2} />;
}

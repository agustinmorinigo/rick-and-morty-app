import { notFound } from 'next/navigation';
import EpisodeDetails from '@/domains/episodes/components/episode-details/episode-details';
import { episodesService } from '@/domains/episodes/services';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  if (!id || Number.isNaN(Number(id))) {
    notFound();
  }

  const episode = await episodesService.getById(Number(id));
  return <EpisodeDetails episode={episode} />;
}

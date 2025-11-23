'use client';
import { Share } from '@/components/share';
import { url } from '@/lib/metadata';

export interface Tier {
  name: string;
  description: string;
  image: string;
}

export default function Result({
  tier,
  retake,
}: {
  tier: Tier;
  retake: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src={tier.image}
        alt={tier.name}
        width={512}
        height={512}
        className="rounded"
      />
      <h2 className="text-2xl font-bold">{tier.name}</h2>
      <p className="text-center">{tier.description}</p>
      <Share text={`I just discovered I'm a ${tier.name}! Check it out: ${url}`} />
      <button
        className="px-4 py-2 bg-secondary text-secondary-foreground rounded"
        onClick={retake}
      >
        Retake Quiz
      </button>
    </div>
  );
}

'use client';
import { useState } from 'react';
import Result from './result';
import { Share } from '@/components/share';
import { url } from '@/lib/metadata';

const questions = [
  {
    question: 'What is your biggest motivation for starting a business?',
    options: [
      { text: 'Making a difference', points: 1 },
      { text: 'Earning money', points: 2 },
      { text: 'Building a legacy', points: 3 },
      { text: 'Creating a brand', points: 4 },
    ],
  },
  {
    question: 'How do you handle risk?',
    options: [
      { text: 'Avoid it', points: 1 },
      { text: 'Take calculated risks', points: 2 },
      { text: 'Embrace uncertainty', points: 3 },
      { text: 'Take bold risks', points: 4 },
    ],
  },
  {
    question: 'What is your preferred work environment?',
    options: [
      { text: 'Home office', points: 1 },
      { text: 'Co‑working space', points: 2 },
      { text: 'Startup incubator', points: 3 },
      { text: 'Boardroom', points: 4 },
    ],
  },
  {
    question: 'How do you approach product development?',
    options: [
      { text: 'Sketch ideas', points: 1 },
      { text: 'Build a prototype', points: 2 },
      { text: 'Validate with data', points: 3 },
      { text: 'Launch and iterate', points: 4 },
    ],
  },
  {
    question: 'What is your ideal team size?',
    options: [
      { text: 'Solo', points: 1 },
      { text: '2‑3 people', points: 2 },
      { text: '5‑10 people', points: 3 },
      { text: '20+ people', points: 4 },
    ],
  },
];

const tiers = [
  {
    name: 'Idea‑Stage Guppy',
    description: 'Lots of dreams, still figuring out the basics.',
    image: '/idea-stage-guppy.png',
  },
  {
    name: 'Side‑Hustle Starter',
    description: 'Hustling nights/weekends, testing the waters.',
    image: '/side-hustle-starter.png',
  },
  {
    name: 'Deal‑Ready Founder',
    description: 'Knows their numbers, pitch almost investor‑ready.',
    image: '/deal-ready-founder.png',
  },
  {
    name: 'Boardroom Shark',
    description: 'Confident, strategic, ready to negotiate and invest.',
    image: '/boardroom-shark.png',
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (points: number) => {
    setAnswers([...answers, points]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const retake = () => {
    setCurrent(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const total = answers.reduce((a, b) => a + b, 0);
    const tierIndex = Math.min(
      Math.floor((total - 5) / 4),
      tiers.length - 1
    );
    const tier = tiers[tierIndex];
    return <Result tier={tier} retake={retake} />;
  }

  const q = questions[current];
  const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <h2 className="text-xl font-semibold">{q.question}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt, idx) => (
          <button
            key={idx}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            onClick={() => handleAnswer(opt.points)}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}

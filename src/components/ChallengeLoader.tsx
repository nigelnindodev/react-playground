import { useState, useEffect } from 'react';
import type { Challenge, ValidateFunction } from '../types';

interface ChallengeLoaderProps {
  challengeId: string;
  onLoad: (challenge: Challenge, validateFn: ValidateFunction) => void;
}

const challengeModules = import.meta.glob('../challenges/**/starter.tsx', { eager: true });
const validateModules = import.meta.glob('../challenges/**/validate.ts');

export default function ChallengeLoader({ challengeId, onLoad }: ChallengeLoaderProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const loadChallenge = async () => {
      try {
        const starterModule = challengeModules[`../challenges/${challengeId}/starter.tsx`] as { default: string };
        const validatePath = `../challenges/${challengeId}/validate.ts`;
        
        if (!starterModule) {
          throw new Error(`Challenge ${challengeId} not found`);
        }

        let validateFn: ValidateFunction | null = null;
        if (validateModules[validatePath]) {
          const validateModule = await import(`../challenges/${challengeId}/validate.ts`);
          validateFn = validateModule.default;
        }

        const instructions = await import(`../challenges/${challengeId}/instructions.md?raw`);

        const challenge: Challenge = {
          id: challengeId,
          name: formatChallengeName(challengeId),
          description: instructions.default,
          starterCode: starterModule.default,
        };

        onLoad(challenge, validateFn || (() => ({ passed: true, message: 'No validation' })));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load challenge');
      } finally {
        setLoading(false);
      }
    };

    loadChallenge();
  }, [challengeId, onLoad]);

  if (loading) return <div style={{ padding: '16px' }}>Loading challenge...</div>;
  if (error) return <div style={{ padding: '16px', color: '#d73a49' }}>Error: {error}</div>;
  return null;
}

function formatChallengeName(id: string): string {
  const num = id.replace(/\D/g, '');
  return `Challenge ${num}`;
}

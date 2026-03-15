import { useState, useCallback, useRef } from 'react';
import CodeEditor from './components/Editor';
import Preview from './components/Preview';
import Validator from './components/Validator';
import ChallengeLoader from './components/ChallengeLoader';
import type { Challenge, ValidateFunction } from './types';

const challenges = ['01-counter'];

export default function App() {
  const [selectedChallenge, setSelectedChallenge] = useState<string>(challenges[0]);
  const [code, setCode] = useState('');
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [validateFn, setValidateFn] = useState<ValidateFunction | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleChallengeLoad = useCallback((ch: Challenge, fn: ValidateFunction) => {
    setChallenge(ch);
    setCode(ch.starterCode);
    setValidateFn(() => fn);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ 
        padding: '12px 24px', 
        background: '#1e1e1e', 
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #333'
      }}>
        <h1 style={{ fontSize: '18px', margin: 0, fontWeight: 600 }}>React Training</h1>
        <select
          value={selectedChallenge}
          onChange={(e) => setSelectedChallenge(e.target.value)}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            border: '1px solid #444',
            background: '#2d2d2d',
            color: '#fff',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          {challenges.map(id => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
      </header>

      <ChallengeLoader challengeId={selectedChallenge} onLoad={handleChallengeLoad} />

      {challenge && (
        <>
          <div style={{ 
            padding: '16px 24px', 
            background: '#f6f8fa',
            borderBottom: '1px solid #e1e4e8',
            maxHeight: '200px',
            overflow: 'auto'
          }}>
            <h2 style={{ fontSize: '16px', margin: '0 0 8px 0' }}>{challenge.name}</h2>
            <div style={{ fontSize: '14px', whiteSpace: 'pre-wrap', color: '#24292e' }}>
              {challenge.description}
            </div>
          </div>

          <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
            <div style={{ width: '50%', borderRight: '1px solid #e1e4e8' }}>
              <div style={{ 
                padding: '8px 16px', 
                background: '#1e1e1e', 
                color: '#fff',
                fontSize: '12px',
                borderBottom: '1px solid #333'
              }}>
                Editor
              </div>
              <CodeEditor value={code} onChange={setCode} />
            </div>
            <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
              <Preview code={code} containerRef={containerRef} />
            </div>
          </div>

          <div style={{ 
            borderTop: '1px solid #e1e4e8',
            background: '#fff'
          }}>
            <Validator 
              validateFn={validateFn} 
              containerRef={containerRef}
            />
          </div>
        </>
      )}
    </div>
  );
}

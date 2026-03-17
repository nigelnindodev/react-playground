import { useState, useCallback, useRef } from 'react';
import CodeEditor from './components/Editor';
import Preview from './components/Preview';
import Validator from './components/Validator';
import ChallengeLoader from './components/ChallengeLoader';
import type { Challenge, ValidateFunction } from './types';

const challenges = [
  '01-counter',
  '02-todo-list',
  '03-fetch-data',
  '04-context-theme',
  '05-memoized-fibonacci',
  '06-custom-modal',
  '07-virtualized-list',
  '09-accordion',
  '10-form-validation',
  '11-infinite-scroll',
  '12-drag-and-drop',
  '13-debounced-search'
];

export default function App() {
  const [selectedChallenge, setSelectedChallenge] = useState<string>(challenges[0]);
  const [code, setCode] = useState('');
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [validateFn, setValidateFn] = useState<ValidateFunction | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isVimMode, setIsVimMode] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleChallengeLoad = useCallback((ch: Challenge, fn: ValidateFunction) => {
    setChallenge(ch);
    setCode(ch.starterCode);
    setValidateFn(() => fn);
    setShowHint(false); // Reset hints when loading a new challenge
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
        <h1 style={{ fontSize: '18px', margin: 0, fontWeight: 600 }}>React Playground</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={isVimMode}
              onChange={(e) => setIsVimMode(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            Vim Mode
          </label>
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
        </div>
      </header>

      <ChallengeLoader challengeId={selectedChallenge} onLoad={handleChallengeLoad} />

      {challenge && (() => {
        // Parse the Markdown for Hints. Assumes format has `## Hints`
        const parts = challenge.description.split(/##\s+Hints/i);
        const mainDescription = parts[0];
        const hintsValue = parts.length > 1 ? parts[1].trim() : null;

        return (
          <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

            {/* Left Column: Instructions & Preview */}
            <div style={{ width: '40%', display: 'flex', flexDirection: 'column', borderRight: '1px solid #e1e4e8' }}>

              {/* Top Left: Instructions */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
                <div style={{
                  flex: 1,
                  padding: '16px 24px',
                  background: '#f6f8fa',
                  overflow: 'auto'
                }}>
                  <h2 style={{ fontSize: '16px', margin: '0 0 8px 0' }}>{challenge.name}</h2>
                  <div style={{ fontSize: '14px', whiteSpace: 'pre-wrap', color: '#24292e' }}>
                    {mainDescription}
                  </div>

                  {hintsValue && (
                    <div style={{ marginTop: '16px', borderTop: '1px solid #e1e4e8', paddingTop: '16px' }}>
                      <button
                        onClick={() => setShowHint(!showHint)}
                        style={{
                          padding: '6px 12px',
                          background: '#e1e4e8',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#24292e'
                        }}
                      >
                        {showHint ? 'Hide Hints' : 'Show Hints'}
                      </button>
                      {showHint && (
                        <div style={{
                          marginTop: '12px',
                          padding: '12px',
                          background: '#fff',
                          border: '1px solid #e1e4e8',
                          borderRadius: '6px',
                          fontSize: '14px',
                          whiteSpace: 'pre-wrap',
                          color: '#24292e'
                        }}>
                          {hintsValue}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Mid Left: Validator */}
                <div style={{ borderTop: '1px solid #e1e4e8', background: '#fff' }}>
                  <Validator
                    validateFn={validateFn}
                    containerRef={containerRef}
                  />
                </div>
              </div>

              {/* Bottom Left: Preview */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderTop: '1px solid #e1e4e8', minHeight: 0 }}>
                <Preview code={code} containerRef={containerRef} />
              </div>
            </div>

            {/* Right Column: Editor */}
            <div style={{ width: '60%', display: 'flex', flexDirection: 'column' }}>
              <div style={{
                padding: '8px 16px',
                background: '#1e1e1e',
                color: '#fff',
                fontSize: '12px',
                borderBottom: '1px solid #333'
              }}>
                Editor
              </div>
              <CodeEditor value={code} onChange={setCode} isVimMode={isVimMode} />
            </div>

          </div>
        );
      })()}
    </div>
  );
}

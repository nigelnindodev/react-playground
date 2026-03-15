import { useState } from 'react';
import type { MutableRefObject } from 'react';
import type { ValidateFunction, ValidationResult } from '../types';

interface ValidatorProps {
  validateFn: ValidateFunction | null;
  containerRef: MutableRefObject<HTMLDivElement | null>;
}

export default function Validator({ validateFn, containerRef }: ValidatorProps) {
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const handleValidate = () => {
    if (!validateFn || !containerRef.current) {
      setResult({ passed: false, message: 'Preview not ready or no validation configured' });
      return;
    }

    setIsValidating(true);
    setResult(null);

    try {
      const validationResult = validateFn(containerRef.current);
      setResult(validationResult);
    } catch (err) {
      setResult({ 
        passed: false, 
        message: err instanceof Error ? err.message : 'Validation failed' 
      });
    } finally {
      setIsValidating(false);
    }
  };

  if (!validateFn) {
    return null;
  }

  return (
    <div style={{ padding: '16px' }}>
      <button
        onClick={handleValidate}
        disabled={isValidating}
        style={{
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: 600,
          background: isValidating ? '#94a3b8' : '#2ea44f',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: isValidating ? 'not-allowed' : 'pointer',
        }}
      >
        {isValidating ? 'Validating...' : 'Validate'}
      </button>

      {result && (
        <div style={{ 
          padding: '12px', 
          marginTop: '12px',
          background: result.passed ? '#e6ffed' : '#ffebe9',
          borderRadius: '6px',
          border: `1px solid ${result.passed ? '#3fb950' : '#f97583'}`
        }}>
          <div style={{ fontWeight: 600, color: result.passed ? '#1a7f37' : '#d73a49' }}>
            {result.passed ? '✓ Passed' : '✗ Failed'}
          </div>
          <div style={{ fontSize: '14px', marginTop: '4px', color: result.passed ? '#1a7f37' : '#d73a49' }}>
            {result.message}
          </div>
        </div>
      )}
    </div>
  );
}

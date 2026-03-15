import { useState, useEffect, useRef } from 'react';
import type { ValidateFunction, ValidationResult } from '../types';

interface ValidatorProps {
  code: string;
  validateFn: ValidateFunction | null;
  onValidationComplete: (result: ValidationResult) => void;
}

export default function Validator({ code, validateFn, onValidationComplete }: ValidatorProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!validateFn || !iframeRef.current) return;

    const iframe = iframeRef.current;
    const container = iframe.contentDocument?.getElementById('root');

    if (!container) return;

    setIsValidating(true);
    
    try {
      const validationResult = validateFn(container as HTMLElement);
      setResult(validationResult);
      onValidationComplete(validationResult);
    } catch (err) {
      const errorResult = { 
        passed: false, 
        message: err instanceof Error ? err.message : 'Validation failed' 
      };
      setResult(errorResult);
      onValidationComplete(errorResult);
    } finally {
      setIsValidating(false);
    }
  }, [code, validateFn]);

  if (!validateFn) {
    return (
      <div style={{ padding: '16px', color: '#666', fontSize: '14px' }}>
        No validation configured for this challenge.
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '16px', 
      background: result?.passed ? '#e6ffed' : result ? '#ffebe9' : '#f6f8fa',
      borderRadius: '6px',
      margin: '16px'
    }}>
      <div style={{ fontWeight: 600, marginBottom: '8px' }}>
        {isValidating ? 'Validating...' : result ? (result.passed ? '✓ Passed' : '✗ Failed') : 'Ready to validate'}
      </div>
      {result && <div style={{ fontSize: '14px' }}>{result.message}</div>}
      <iframe
        ref={iframeRef}
        style={{ display: 'none' }}
        title="Validator"
      />
    </div>
  );
}

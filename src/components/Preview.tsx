import { useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';

interface PreviewProps {
  code: string;
  containerRef: MutableRefObject<HTMLDivElement | null>;
}

/**
 * Strip import/export statements from raw source code so
 * Babel standalone can process it as a plain script (not a module).
 * React hooks are provided as globals from the UMD build.
 */
function prepareCodeForPreview(raw: string): string {
  return raw
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      // Remove import lines
      if (trimmed.startsWith('import ')) return '';
      // "export default function Foo" → "function Foo"
      if (trimmed.startsWith('export default function '))
        return line.replace('export default function ', 'function ');
      if (trimmed.startsWith('export default class '))
        return line.replace('export default class ', 'class ');
      // "export default Foo;" → ""
      if (trimmed.startsWith('export default ')) return '';
      // "export function Foo" → "function Foo"
      if (trimmed.startsWith('export ')) return line.replace('export ', '');
      return line;
    })
    .join('\n');
}

export default function Preview({ code, containerRef }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument;

    if (!doc) return;

    const processedCode = prepareCodeForPreview(code);

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            * { box-sizing: border-box; }
            body { 
              margin: 0; 
              padding: 16px; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
          </style>
          <script src="/vendor/react.development.js"></script>
          <script src="/vendor/react-dom.development.js"></script>
          <script src="/vendor/babel.min.js"></script>
        </head>
        <body>
          <div id="root"></div>
          <script>
            // Destructure commonly-used React APIs as globals
            var useState = React.useState;
            var useEffect = React.useEffect;
            var useRef = React.useRef;
            var useMemo = React.useMemo;
            var useCallback = React.useCallback;
            var useContext = React.useContext;
            var useReducer = React.useReducer;
            var createContext = React.createContext;
            var Fragment = React.Fragment;
          </script>
          <script type="text/babel" data-presets="react">
            (function() {
              try {
                ${processedCode}

                const rootElement = document.getElementById('root');
                const root = ReactDOM.createRoot(rootElement);
                root.render(<App />);
                window.parent.postMessage({ type: 'preview-success' }, '*');
              } catch (err) {
                window.parent.postMessage({ type: 'preview-error', error: err.message }, '*');
              }
            })();
          </script>
        </body>
      </html>
    `;

    doc.open();
    doc.write(html);
    doc.close();

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'preview-error') {
        setError(event.data.error);
      } else if (event.data.type === 'preview-success') {
        setError(null);
        // Set containerRef only after the component has rendered
        const iframeDoc = iframe.contentDocument;
        if (iframeDoc) {
          containerRef.current = iframeDoc.getElementById('root') as HTMLDivElement | null;
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
      containerRef.current = null;
      if (iframe.contentDocument) {
        iframe.contentDocument.open();
        iframe.contentDocument.write('');
        iframe.contentDocument.close();
      }
    };
  }, [code, containerRef]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '8px 16px',
        background: '#1e1e1e',
        color: '#fff',
        fontSize: '12px',
        borderBottom: '1px solid #333'
      }}>
        Preview
      </div>
      <iframe
        ref={iframeRef}
        style={{
          flex: 1,
          border: 'none',
          background: '#fff'
        }}
        sandbox="allow-scripts allow-same-origin"
        title="Preview"
      />
      {error && (
        <div style={{
          padding: '12px',
          background: '#ffebe9',
          color: '#d73a49',
          fontSize: '12px',
          borderTop: '1px solid #f97583'
        }}>
          {error}
        </div>
      )}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';

interface PreviewProps {
  code: string;
}

export default function Preview({ code }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument;

    if (!doc) return;

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
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            ${code}

            const root = ReactDOM.createRoot(document.getElementById('root'));
            try {
              root.render(<App />);
              window.parent.postMessage({ type: 'preview-success' }, '*');
            } catch (err) {
              window.parent.postMessage({ type: 'preview-error', error: err.message }, '*');
            }
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
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [code]);

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
        sandbox="allow-scripts"
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

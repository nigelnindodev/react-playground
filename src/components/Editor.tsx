import { useRef, useCallback, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import type { Monaco } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { initVimMode } from 'monaco-vim';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  isVimMode?: boolean;
}

function handleEditorWillMount(monaco: Monaco) {
  // Suppress TypeScript diagnostics for unresolved modules (e.g. 'react')
  // since the editor is just a code authoring surface for challenges.
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: false,
  });

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
    target: monaco.languages.typescript.ScriptTarget.ESNext,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    allowNonTsExtensions: true,
    esModuleInterop: true,
  });
}

export default function CodeEditor({ value, onChange, isVimMode = true }: CodeEditorProps) {
  const vimModeRef = useRef<ReturnType<typeof initVimMode> | null>(null);
  const statusBarRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (!editorRef.current || !statusBarRef.current) return;

    if (isVimMode) {
      if (!vimModeRef.current) {
        vimModeRef.current = initVimMode(editorRef.current, statusBarRef.current);
      }
    } else {
      if (vimModeRef.current) {
        if ('dispose' in vimModeRef.current && typeof vimModeRef.current.dispose === 'function') {
          vimModeRef.current.dispose();
        }
        vimModeRef.current = null;

        // Clean up status bar text if any
        if (statusBarRef.current) {
          statusBarRef.current.innerHTML = '';
        }
      }
    }
  }, [isVimMode]);

  const handleEditorDidMount = useCallback(
    (editorInstance: editor.IStandaloneCodeEditor) => {
      editorRef.current = editorInstance;

      if (isVimMode && statusBarRef.current) {
        vimModeRef.current?.dispose();
        vimModeRef.current = initVimMode(editorInstance, statusBarRef.current);
      }
    },
    [isVimMode],
  );

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <Editor
          height="100%"
          defaultLanguage="typescriptreact"
          theme="vs-dark"
          value={value}
          onChange={(val) => onChange(val || '')}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            cursorBlinking: 'solid',
          }}
        />
      </div>
      <div
        ref={statusBarRef}
        style={{
          height: '24px',
          padding: '2px 8px',
          background: '#1e1e1e',
          color: '#abb2bf',
          fontSize: '12px',
          fontFamily: 'monospace',
          borderTop: '1px solid #333',
          display: 'flex',
          alignItems: 'center',
        }}
      />
    </div>
  );
}

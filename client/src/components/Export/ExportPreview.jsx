import { useEffect, useRef } from 'react'
import { EditorView, lineNumbers } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { bracketMatching, foldGutter, indentOnInput } from '@codemirror/language'
import { getLanguageExtension } from '../../lib/languages'
import { getThemeExtension } from '../../lib/themes'
import { BACKGROUNDS, PADDING_OPTIONS } from '../../lib/exportConfig'

export default function ExportPreview({
  code,
  language,
  theme,
  settings,
  previewRef,
}) {
  const editorContainerRef = useRef(null)
  const viewRef = useRef(null)

  const bg = BACKGROUNDS.find((b) => b.id === settings.background) || BACKGROUNDS[1]
  const padding = PADDING_OPTIONS.find((p) => p.id === settings.padding) || PADDING_OPTIONS[2]

  useEffect(() => {
    if (!editorContainerRef.current || !code) return

    if (viewRef.current) {
      viewRef.current.destroy()
    }

    const extensions = [
      getThemeExtension(theme),
      getLanguageExtension(language),
      bracketMatching(),
      indentOnInput(),
      EditorView.editable.of(false),   // Read-only
      EditorState.readOnly.of(true),
      EditorView.theme({
        '&': {
          backgroundColor: 'transparent !important',
        },
        '.cm-content': {
          padding: '16px 0',
          fontSize: '14px',
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        },
        '.cm-line': {
          padding: '0 16px',
        },
        '.cm-gutters': {
          backgroundColor: 'transparent !important',
          borderRight: 'none !important',
        },
        '.cm-activeLineGutter': {
          backgroundColor: 'transparent !important',
        },
        '.cm-activeLine': {
          backgroundColor: 'transparent !important',
        },
        '.cm-cursor': {
          display: 'none',
        },
        '.cm-selectionBackground': {
          display: 'none',
        },
      }),
    ]

    if (settings.showLineNumbers) {
      extensions.unshift(lineNumbers())
    }

    const state = EditorState.create({
      doc: code,
      extensions,
    })

    const view = new EditorView({
      state,
      parent: editorContainerRef.current,
    })

    viewRef.current = view

    return () => {
      view.destroy()
    }
  }, [code, language, theme, settings.showLineNumbers])

  return (
    <div
      ref={previewRef}
      style={{
        ...parseStyle(bg.style),
        padding: padding.value,
        display: 'inline-block',
        minWidth: '400px',
        maxWidth: '800px',
      }}
    >
      {/* Window Frame */}
      <div
        style={{
          backgroundColor: getEditorBg(theme),
          borderRadius: settings.borderRadius,
          boxShadow: '0 20px 68px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255,255,255,0.05)',
          overflow: 'hidden',
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* macOS Dots */}
          {settings.showWindowControls && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#febc2e' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28c840' }} />
            </div>
          )}
          {!settings.showWindowControls && <div />}

          {/* Language Label */}
          {settings.showLanguage && (
            <span
              style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.4)',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {language}
            </span>
          )}

          <div />
        </div>

        {/* Code Area */}
        <div ref={editorContainerRef} style={{ padding: '0 8px 8px' }} />
      </div>

      {/* Watermark */}
      {settings.showWatermark && (
        <div
          style={{
            textAlign: 'center',
            marginTop: '12px',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.35)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            letterSpacing: '0.5px',
          }}
        >
          codeshare.dev
        </div>
      )}
    </div>
  )
}

// Helper: parse CSS string to object
function parseStyle(styleStr) {
  const obj = {}
  if (styleStr.includes('linear-gradient')) {
    obj.background = styleStr.replace('background: ', '')
  } else {
    obj.backgroundColor = styleStr.replace('background: ', '')
  }
  return obj
}

// Helper: get editor background per theme
function getEditorBg(themeId) {
  const map = {
    'one-dark': '#282c34',
    'github-dark': '#0d1117',
    'dracula': '#282a36',
    'nord': '#2e3440',
    'monokai': '#272822',
  }
  return map[themeId] || '#282c34'
}
import { useEffect, useRef } from 'react'
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
} from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { defaultKeymap, indentWithTab } from '@codemirror/commands'
import {
  bracketMatching,
  foldGutter,
  indentOnInput,
} from '@codemirror/language'
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from '@codemirror/autocomplete'
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search'
import { yCollab, yUndoManagerKeymap } from 'y-codemirror.next'
import * as Y from 'yjs'
import { getLanguageExtension } from '../../lib/languages'
import { getThemeExtension } from '../../lib/themes'

const DEFAULT_CODE = `// Welcome to CodeShare! 🚀
// Start typing or paste your code here.
// Share the URL with a friend to collaborate in real-time.

function greet(name) {
  const message = \`Hello, \${name}! Welcome to CodeShare.\`;
  console.log(message);
  return message;
}

greet("Developer");

// Try changing the language using the dropdown above!
// Supports: JavaScript, TypeScript, Python, Rust, C++, and more.

// Try switching themes too — click the palette icon! 🎨
`

const CURSOR_COLORS = [
  { color: '#6366f1', light: 'rgba(99,102,241,0.25)' },
  { color: '#f43f5e', light: 'rgba(244,63,94,0.25)' },
  { color: '#22c55e', light: 'rgba(34,197,94,0.25)' },
  { color: '#f59e0b', light: 'rgba(245,158,11,0.25)' },
  { color: '#06b6d4', light: 'rgba(6,182,212,0.25)' },
  { color: '#a855f7', light: 'rgba(168,85,247,0.25)' },
]

function getRandomColor() {
  return CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)]
}

function getRandomName() {
  const adj = ['Swift', 'Clever', 'Brave', 'Calm', 'Keen', 'Bold', 'Wise', 'Cool']
  const noun = ['Coder', 'Dev', 'Hacker', 'Ninja', 'Owl', 'Fox', 'Wolf', 'Bear']
  return `${adj[Math.floor(Math.random() * adj.length)]} ${noun[Math.floor(Math.random() * noun.length)]}`
}

export default function CollabEditor({
  language,
  ydoc,
  awareness,
  theme = 'one-dark',
  fontSize = 14,
  onUpdate,          // ← NEW: callback for status bar
}) {
  const editorRef = useRef(null)
  const viewRef = useRef(null)
  const userColor = useRef(getRandomColor())
  const userName = useRef(getRandomName())
  const onUpdateRef = useRef(onUpdate)

  // Keep callback ref fresh without re-creating editor
  useEffect(() => {
    onUpdateRef.current = onUpdate
  }, [onUpdate])

  useEffect(() => {
    if (!editorRef.current || !ydoc) return

    if (viewRef.current) {
      viewRef.current.destroy()
    }

    const ytext = ydoc.getText('codemirror')

    if (ytext.length === 0) {
      ytext.insert(0, DEFAULT_CODE)
    }

    if (awareness) {
      awareness.setLocalStateField('user', {
        name: userName.current,
        color: userColor.current.color,
        colorLight: userColor.current.light,
      })
    }

    const undoManager = new Y.UndoManager(ytext)

    const state = EditorState.create({
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        highlightActiveLineGutter(),
        foldGutter(),
        indentOnInput(),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        highlightSelectionMatches(),

        keymap.of([
          ...yUndoManagerKeymap,
          ...defaultKeymap,
          ...closeBracketsKeymap,
          ...searchKeymap,
          ...completionKeymap,
          indentWithTab,
        ]),

        getThemeExtension(theme),
        getLanguageExtension(language),
        yCollab(ytext, awareness, { undoManager }),

        // ✨ THE FIX: Proper update listener for status bar
        EditorView.updateListener.of((update) => {
          if (onUpdateRef.current) {
            onUpdateRef.current(update.view)
          }
        }),

        EditorView.theme({
          '&': { height: '100%' },
          '.cm-content': {
            padding: '16px 0',
            caretColor: userColor.current.color,
            fontSize: `${fontSize}px`,
          },
          '.cm-line': { padding: '0 16px' },
          '.cm-cursor': {
            borderLeftColor: userColor.current.color,
            borderLeftWidth: '2px',
          },
          '.cm-ySelectionInfo': {
            position: 'absolute',
            top: '-1.4em',
            left: '-1px',
            fontSize: '11px',
            fontWeight: '600',
            fontFamily: 'Inter, sans-serif',
            padding: '1px 6px',
            borderRadius: '4px 4px 4px 0',
            color: 'white',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          },
        }),

        EditorView.lineWrapping,
      ],
    })

    const view = new EditorView({
      state,
      parent: editorRef.current,
    })

    viewRef.current = view

    // Fire initial update so status bar populates immediately
    if (onUpdateRef.current) {
      onUpdateRef.current(view)
    }

    return () => {
      view.destroy()
    }
  }, [ydoc, awareness, language, theme, fontSize])

  return (
    <div
      ref={editorRef}
      className="flex-1 overflow-hidden"
      style={{ minHeight: '0' }}
    />
  )
}
import { EditorView } from '@codemirror/view'
import { oneDark } from '@codemirror/theme-one-dark'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'

// ─── 1. One Dark (already installed) ───
export const oneDarkTheme = {
  id: 'one-dark',
  name: 'One Dark',
  extension: oneDark,
}

// ─── 2. GitHub Dark ───
const githubDarkBase = EditorView.theme({
  '&': {
    color: '#e6edf3',
    backgroundColor: '#0d1117',
  },
  '.cm-content': { caretColor: '#58a6ff' },
  '.cm-cursor': { borderLeftColor: '#58a6ff' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
    backgroundColor: '#264f78 !important',
  },
  '.cm-activeLine': { backgroundColor: '#161b22' },
  '.cm-gutters': {
    backgroundColor: '#0d1117',
    color: '#484f58',
    border: 'none',
  },
  '.cm-activeLineGutter': { backgroundColor: '#161b22', color: '#e6edf3' },
}, { dark: true })

const githubDarkHighlight = syntaxHighlighting(
  HighlightStyle.define([
    { tag: tags.keyword, color: '#ff7b72' },
    { tag: tags.string, color: '#a5d6ff' },
    { tag: tags.number, color: '#79c0ff' },
    { tag: tags.comment, color: '#8b949e', fontStyle: 'italic' },
    { tag: tags.function(tags.variableName), color: '#d2a8ff' },
    { tag: tags.typeName, color: '#79c0ff' },
    { tag: tags.definition(tags.variableName), color: '#ffa657' },
    { tag: tags.operator, color: '#ff7b72' },
    { tag: tags.bool, color: '#79c0ff' },
    { tag: tags.null, color: '#79c0ff' },
    { tag: tags.className, color: '#ffa657' },
    { tag: tags.propertyName, color: '#79c0ff' },
  ])
)

export const githubDarkTheme = {
  id: 'github-dark',
  name: 'GitHub Dark',
  extension: [githubDarkBase, githubDarkHighlight],
}

// ─── 3. Dracula ───
const draculaBase = EditorView.theme({
  '&': {
    color: '#f8f8f2',
    backgroundColor: '#282a36',
  },
  '.cm-content': { caretColor: '#f8f8f2' },
  '.cm-cursor': { borderLeftColor: '#f8f8f2' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
    backgroundColor: '#44475a !important',
  },
  '.cm-activeLine': { backgroundColor: '#2d2f3d' },
  '.cm-gutters': {
    backgroundColor: '#282a36',
    color: '#6272a4',
    border: 'none',
  },
  '.cm-activeLineGutter': { backgroundColor: '#2d2f3d', color: '#f8f8f2' },
}, { dark: true })

const draculaHighlight = syntaxHighlighting(
  HighlightStyle.define([
    { tag: tags.keyword, color: '#ff79c6' },
    { tag: tags.string, color: '#f1fa8c' },
    { tag: tags.number, color: '#bd93f9' },
    { tag: tags.comment, color: '#6272a4', fontStyle: 'italic' },
    { tag: tags.function(tags.variableName), color: '#50fa7b' },
    { tag: tags.typeName, color: '#8be9fd' },
    { tag: tags.definition(tags.variableName), color: '#50fa7b' },
    { tag: tags.operator, color: '#ff79c6' },
    { tag: tags.bool, color: '#bd93f9' },
    { tag: tags.null, color: '#bd93f9' },
    { tag: tags.className, color: '#8be9fd' },
    { tag: tags.propertyName, color: '#66d9ef' },
  ])
)

export const draculaTheme = {
  id: 'dracula',
  name: 'Dracula',
  extension: [draculaBase, draculaHighlight],
}

// ─── 4. Nord ───
const nordBase = EditorView.theme({
  '&': {
    color: '#d8dee9',
    backgroundColor: '#2e3440',
  },
  '.cm-content': { caretColor: '#88c0d0' },
  '.cm-cursor': { borderLeftColor: '#88c0d0' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
    backgroundColor: '#434c5e !important',
  },
  '.cm-activeLine': { backgroundColor: '#3b4252' },
  '.cm-gutters': {
    backgroundColor: '#2e3440',
    color: '#4c566a',
    border: 'none',
  },
  '.cm-activeLineGutter': { backgroundColor: '#3b4252', color: '#d8dee9' },
}, { dark: true })

const nordHighlight = syntaxHighlighting(
  HighlightStyle.define([
    { tag: tags.keyword, color: '#81a1c1' },
    { tag: tags.string, color: '#a3be8c' },
    { tag: tags.number, color: '#b48ead' },
    { tag: tags.comment, color: '#616e88', fontStyle: 'italic' },
    { tag: tags.function(tags.variableName), color: '#88c0d0' },
    { tag: tags.typeName, color: '#8fbcbb' },
    { tag: tags.definition(tags.variableName), color: '#d8dee9' },
    { tag: tags.operator, color: '#81a1c1' },
    { tag: tags.bool, color: '#81a1c1' },
    { tag: tags.null, color: '#81a1c1' },
    { tag: tags.className, color: '#8fbcbb' },
    { tag: tags.propertyName, color: '#88c0d0' },
  ])
)

export const nordTheme = {
  id: 'nord',
  name: 'Nord',
  extension: [nordBase, nordHighlight],
}

// ─── 5. Monokai ───
const monokaiBase = EditorView.theme({
  '&': {
    color: '#f8f8f2',
    backgroundColor: '#272822',
  },
  '.cm-content': { caretColor: '#f8f8f0' },
  '.cm-cursor': { borderLeftColor: '#f8f8f0' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
    backgroundColor: '#49483e !important',
  },
  '.cm-activeLine': { backgroundColor: '#3e3d32' },
  '.cm-gutters': {
    backgroundColor: '#272822',
    color: '#75715e',
    border: 'none',
  },
  '.cm-activeLineGutter': { backgroundColor: '#3e3d32', color: '#f8f8f2' },
}, { dark: true })

const monokaiHighlight = syntaxHighlighting(
  HighlightStyle.define([
    { tag: tags.keyword, color: '#f92672' },
    { tag: tags.string, color: '#e6db74' },
    { tag: tags.number, color: '#ae81ff' },
    { tag: tags.comment, color: '#75715e', fontStyle: 'italic' },
    { tag: tags.function(tags.variableName), color: '#a6e22e' },
    { tag: tags.typeName, color: '#66d9ef' },
    { tag: tags.definition(tags.variableName), color: '#a6e22e' },
    { tag: tags.operator, color: '#f92672' },
    { tag: tags.bool, color: '#ae81ff' },
    { tag: tags.null, color: '#ae81ff' },
    { tag: tags.className, color: '#66d9ef' },
    { tag: tags.propertyName, color: '#a6e22e' },
  ])
)

export const monokaiTheme = {
  id: 'monokai',
  name: 'Monokai',
  extension: [monokaiBase, monokaiHighlight],
}

// ─── All Themes Export ───
export const ALL_THEMES = [
  oneDarkTheme,
  githubDarkTheme,
  draculaTheme,
  nordTheme,
  monokaiTheme,
]

export const DEFAULT_THEME = 'one-dark'

export const getThemeExtension = (themeId) => {
  const theme = ALL_THEMES.find((t) => t.id === themeId)
  return theme ? theme.extension : oneDarkTheme.extension
}
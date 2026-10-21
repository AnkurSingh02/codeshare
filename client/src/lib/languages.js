import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { json } from '@codemirror/lang-json'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { rust } from '@codemirror/lang-rust'
import { sql } from '@codemirror/lang-sql'
import { markdown } from '@codemirror/lang-markdown'

export const LANGUAGES = [
  { id: 'javascript',  name: 'JavaScript',  ext: 'js',   loader: () => javascript() },
  { id: 'typescript',  name: 'TypeScript',   ext: 'ts',   loader: () => javascript({ typescript: true }) },
  { id: 'jsx',         name: 'JSX',          ext: 'jsx',  loader: () => javascript({ jsx: true }) },
  { id: 'python',      name: 'Python',       ext: 'py',   loader: () => python() },
  { id: 'html',        name: 'HTML',         ext: 'html', loader: () => html() },
  { id: 'css',         name: 'CSS',          ext: 'css',  loader: () => css() },
  { id: 'json',        name: 'JSON',         ext: 'json', loader: () => json() },
  { id: 'java',        name: 'Java',         ext: 'java', loader: () => java() },
  { id: 'cpp',         name: 'C++',          ext: 'cpp',  loader: () => cpp() },
  { id: 'rust',        name: 'Rust',         ext: 'rs',   loader: () => rust() },
  { id: 'sql',         name: 'SQL',          ext: 'sql',  loader: () => sql() },
  { id: 'markdown',    name: 'Markdown',     ext: 'md',   loader: () => markdown() },
]

export const DEFAULT_LANGUAGE = 'javascript'

export const getLanguageExtension = (langId) => {
  const lang = LANGUAGES.find(l => l.id === langId)
  return lang ? lang.loader() : javascript()
}
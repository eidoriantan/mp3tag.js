import { useMemo } from 'react'
import { highlight } from 'sugar-high'
import { CopyButton } from './CopyButton'

/** Removes the common indentation and surrounding blank lines of a snippet */
function dedent (code: string): string {
  const lines = code.replace(/^\n+|\s+$/g, '').split('\n')
  const indent = Math.min(...lines.filter((line) => line.trim() !== '').map((line) => line.match(/^ */)![0].length))
  return lines.map((line) => line.slice(indent)).join('\n')
}

interface CodeBlockProps {
  code: string
  /** Disables syntax highlighting, e.g. for shell commands */
  plain?: boolean
  className?: string
}

export function CodeBlock ({ code, plain = false, className = '' }: CodeBlockProps) {
  const source = useMemo(() => dedent(code), [code])
  const html = useMemo(() => plain ? null : highlight(source), [source, plain])

  return (
    <div className={`group relative rounded-xl border border-border bg-surface ${className}`}>
      <pre className="overflow-x-auto p-4 pr-12 font-mono text-[13px] leading-6">
        {html === null
          ? <code>{source}</code>
          : <code dangerouslySetInnerHTML={{ __html: html }} />}
      </pre>
      <CopyButton text={source} className="absolute top-2.5 right-2.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100" />
    </div>
  )
}

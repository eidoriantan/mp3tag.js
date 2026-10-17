import type { ReactNode } from 'react'
import { Info, Link as LinkIcon, TriangleAlert } from 'lucide-react'
import { CodeBlock } from './CodeBlock'

export function Section ({ id, title, children }: { id: string, title: ReactNode, children: ReactNode }) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 id={id} className="group mb-4 flex items-center gap-2 border-b border-border pb-3 text-xl font-semibold tracking-tight">
        {title}
        <a href={`#${id}`} className="text-muted opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100" aria-label="Link to this section">
          <LinkIcon className="size-4" />
        </a>
      </h2>
      {children}
    </section>
  )
}

export function SubHeading ({ id, children }: { id?: string, children: ReactNode }) {
  return <h3 id={id} className="mt-8 mb-3 text-base font-semibold tracking-tight first:mt-0">{children}</h3>
}

interface EntryProps {
  id: string
  name: ReactNode
  /** Small label before the name, e.g. "Method" */
  kind?: string
  /** Second line of the header, e.g. "Type: string" or "ID: TXXX" */
  meta?: ReactNode[]
  code?: string
  /** Renders the name in a monospace font, for code identifiers */
  mono?: boolean
  children?: ReactNode
}

/** A documented property, method, or frame */
export function Entry ({ id, name, kind, meta = [], code, mono = true, children }: EntryProps) {
  return (
    <article id={id} className="group/entry mt-4 overflow-hidden rounded-xl border border-border target:border-accent target:ring-3 target:ring-accent/15">
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 pt-3.5 pb-3">
        {kind && <span className="text-xs font-medium tracking-wide text-muted uppercase">{kind}</span>}
        <h3 className={`text-[15px] font-semibold text-fg ${mono ? 'font-mono' : ''}`}>
          <a href={`#${id}`} className="hover:text-accent">{name}</a>
        </h3>
        {meta.length > 0 && (
          <div className="flex w-full flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted">
            {meta.map((item, index) => <span key={index}>{item}</span>)}
          </div>
        )}
      </header>
      {children && <div className="prose-doc border-t border-border px-4 py-3 text-sm leading-6">{children}</div>}
      {code && <CodeBlock code={code} className="rounded-none border-x-0 border-b-0" />}
    </article>
  )
}

export function Callout ({ variant = 'note', children, action }: { variant?: 'note' | 'warning', children: ReactNode, action?: ReactNode }) {
  const warning = variant === 'warning'
  const Icon = warning ? TriangleAlert : Info

  return (
    <div className={`prose-doc mt-4 flex flex-wrap items-start gap-3 rounded-xl border p-4 text-sm leading-6 ${warning ? 'border-warning/30 bg-warning-soft' : 'border-border bg-surface'}`}>
      <Icon className={`mt-1 size-4 shrink-0 ${warning ? 'text-warning' : 'text-accent'}`} aria-hidden="true" />
      <div className="min-w-0 flex-1">{children}</div>
      {action}
    </div>
  )
}

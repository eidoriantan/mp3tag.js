import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'

export function CopyButton ({ text, className = '' }: { text: string, className?: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(timeout)
  }, [copied])

  const copy = (): void => {
    navigator.clipboard.writeText(text).then(() => setCopied(true), () => {})
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex size-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-fg ${className}`}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      title={copied ? 'Copied' : 'Copy'}
    >
      {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
    </button>
  )
}

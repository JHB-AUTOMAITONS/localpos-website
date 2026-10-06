import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router'

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g

/** Renders the small inline markup used in content data: [text](/path/) links and **bold**. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN)
  return (
    <>
      {parts.map((part, i): ReactNode => {
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
        const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part)
        if (link) {
          const [, label, href] = link
          return href.startsWith('/') ? (
            <Link key={i} to={href}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} rel="noopener">
              {label}
            </a>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}

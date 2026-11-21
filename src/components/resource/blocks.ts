import type { IconName } from '@/components/Icon'

/**
 * Content sections for the tool and format pages. Each page picks the blocks that suit its subject and puts them in its own order,
 * so the pages share a design without sharing a script. All text accepts the inline markup of <Inline>: [label](/path/) and **bold**.
 */
export type Block =
  /** Running text, optionally followed by a bullet list and a boxed side note. */
  | { kind: 'prose'; title: string; body: string[]; bullets?: string[]; aside?: { title: string; body: string } }
  /** A real sequence of actions. */
  | { kind: 'steps'; title: string; lead?: string; steps: Array<{ title: string; body: string }> }
  /** Term and explanation pairs, for the fields of a document or the parts of a tool. */
  | { kind: 'defs'; title: string; lead?: string; items: Array<{ term: string; desc: string }> }
  /** Short cards, for use cases or situations. */
  | { kind: 'cards'; title: string; lead?: string; items: Array<{ icon?: IconName; title: string; body: string }> }
  /** A data table, for worked examples and comparisons. Keep to five columns or fewer. */
  | { kind: 'table'; title: string; lead?: string; head: string[]; rows: string[][]; note?: string }
  /** Two lists side by side, for example "good for" and "limits". */
  | { kind: 'split'; title: string; lead?: string; left: { title: string; items: string[] }; right: { title: string; items: string[] } }
  /** A boxed caution or disclaimer. */
  | { kind: 'note'; title: string; body: string }

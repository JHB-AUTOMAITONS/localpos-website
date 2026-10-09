import { SolutionCard } from '@/components/SolutionCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SOLUTION_META } from '@/data/solutionMeta'

export function SolutionsSection({ title = 'Built for the way your kind of business bills', lead }: { title?: string; lead?: string }) {
  return (
    <Section tone="paper" labelledBy="solutions-heading">
      <SectionHeading
        id="solutions-heading"
        eyebrow="Solutions"
        eyebrowTone="coral"
        title={title}
        lead={lead ?? 'A restaurant bills by table, a jeweller by weight, a pharmacy by batch. LocalPOS adapts to each, instead of making everyone use the same screen.'}
      />
      <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {SOLUTION_META.map((s, i) => (
          <li key={s.slug} className={i === SOLUTION_META.length - 1 ? 'md:col-span-2 lg:col-span-1' : undefined}>
            <Reveal delay={i * 70} className="h-full">
              <SolutionCard solution={s} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

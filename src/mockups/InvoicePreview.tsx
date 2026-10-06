import { cn } from '@/lib/cn'
import { rupees } from '@/lib/format'
import { Barcode, Receipt } from './parts'
import { BILL_ITEMS, BILL_TOTAL, SAMPLE_STORE, billTotals } from './sample'

/** The hero receipt: it "prints" line by line and ends with a PAID stamp. Static when motion is reduced. */
export function HeroReceipt({ className }: { className?: string }) {
  const { taxable, tax: gst } = billTotals()
  return (
    <Receipt className={cn('w-full max-w-[250px] px-4 pb-5 pt-4', className)}>
      <div className="text-center">
        <div className="font-display text-[13px] font-bold uppercase tracking-wide">{SAMPLE_STORE}</div>
        <div className="text-[9.5px] text-ink-3">GSTIN 33AAAAA0000A1Z5</div>
        <div className="mt-0.5 text-[9.5px] text-ink-3">INV-2041 · 06 Oct · 11:42 am</div>
      </div>
      <div className="perforation my-2.5" aria-hidden="true" />
      <ul className="space-y-1.5">
        {BILL_ITEMS.map((it, i) => (
          <li key={it.name} className="print-item flex justify-between gap-2" style={{ ['--i' as string]: i }}>
            <span className="min-w-0">
              <span className="block truncate">{it.name}</span>
              <span className="block text-[9.5px] text-ink-3">{it.qty} × {rupees(it.rate, true)}</span>
            </span>
            <span className="tnum">{rupees(it.qty * it.rate, true)}</span>
          </li>
        ))}
      </ul>
      <div className="perforation my-2.5" aria-hidden="true" />
      <dl className="space-y-0.5 text-[10.5px] text-ink-2">
        <div className="print-item flex justify-between" style={{ ['--i' as string]: 5 }}>
          <dt>Taxable value</dt>
          <dd className="tnum">{rupees(taxable, true)}</dd>
        </div>
        <div className="print-item flex justify-between" style={{ ['--i' as string]: 5 }}>
          <dt>CGST + SGST</dt>
          <dd className="tnum">{rupees(gst, true)}</dd>
        </div>
        <div className="print-item mt-1 flex items-baseline justify-between text-[13px] font-bold text-ink" style={{ ['--i' as string]: 6 }}>
          <dt>Total</dt>
          <dd className="tnum">{rupees(BILL_TOTAL, true)}</dd>
        </div>
      </dl>
      <div className="relative mt-3">
        <Barcode code="INV2041" height={28} />
        <div className="mt-1 text-center text-[9px] tracking-[0.25em] text-ink-3">INV 2041 UPI</div>
        <span
          className="stamp-in absolute -right-1 top-0 rotate-[-9deg] rounded-md border-[2.5px] border-brand-600 px-2.5 py-0.5 font-display text-[15px] font-extrabold uppercase tracking-[0.12em] text-brand-600 mix-blend-multiply"
          style={{ ['--i' as string]: 7 }}
        >
          Paid
        </span>
      </div>
    </Receipt>
  )
}

interface InvoicePreviewProps {
  className?: string
  /** Show the GST columns (HSN, rate, CGST/SGST). */
  gst?: boolean
}

/** A full tax invoice sheet. With `gst` it shows HSN codes and the CGST/SGST split. */
export function InvoicePreview({ className, gst = true }: InvoicePreviewProps) {
  const rows = BILL_ITEMS.map((it) => {
    const gross = it.qty * it.rate
    const rate = it.gst ?? 5
    const taxable = +(gross / (1 + rate / 100)).toFixed(2)
    const tax = +(gross - taxable).toFixed(2)
    return { ...it, gross, rate, taxable, tax }
  })
  const taxableTotal = rows.reduce((s, r) => s + r.taxable, 0)
  const taxTotal = rows.reduce((s, r) => s + r.tax, 0)

  return (
    <div className={cn('@container rounded-xl border border-line bg-white p-4 text-[11px] leading-snug text-ink-2 shadow-app @[480px]:p-6', className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-display text-[15px] font-bold text-ink">{SAMPLE_STORE}</div>
          <div className="mt-0.5 text-ink-3">12, Main Road, Coimbatore</div>
          <div className="text-ink-3">GSTIN 33AAAAA0000A1Z5</div>
        </div>
        <div className="text-right">
          <div className="font-display text-[13px] font-bold uppercase tracking-[0.12em] text-brand-700">Tax Invoice</div>
          <div className="mt-0.5 tnum text-ink-3">INV-2041</div>
          <div className="text-ink-3">06 Oct 2026</div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 rounded-lg bg-paper p-3 @[420px]:grid-cols-2">
        <div>
          <div className="text-[9.5px] font-bold uppercase tracking-wide text-ink-3">Billed to</div>
          <div className="mt-0.5 font-semibold text-ink">Anita Sharma</div>
          <div className="text-ink-3">Place of supply: Tamil Nadu (33)</div>
        </div>
        <div>
          <div className="text-[9.5px] font-bold uppercase tracking-wide text-ink-3">Payment</div>
          <div className="mt-0.5 font-semibold text-ink">Paid via UPI</div>
          <div className="text-ink-3">Reference ending 4821</div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-line">
        <div className={cn('grid gap-2 bg-paper-2 px-2.5 py-1.5 text-[9.5px] font-bold uppercase tracking-wide text-ink-3', gst ? 'grid-cols-[1fr_auto_auto] @[480px]:grid-cols-[1.6fr_.6fr_.4fr_.5fr_.7fr]' : 'grid-cols-[1fr_auto_auto]')}>
          <span>Item</span>
          {gst && <span className="hidden @[480px]:block">HSN</span>}
          <span>Qty</span>
          {gst && <span className="hidden @[480px]:block">GST</span>}
          <span className="text-right">Amount</span>
        </div>
        {rows.map((r) => (
          <div key={r.name} className={cn('grid items-center gap-2 border-t border-line px-2.5 py-1.5', gst ? 'grid-cols-[1fr_auto_auto] @[480px]:grid-cols-[1.6fr_.6fr_.4fr_.5fr_.7fr]' : 'grid-cols-[1fr_auto_auto]')}>
            <span className="truncate font-medium text-ink">{r.name}</span>
            {gst && <span className="tnum hidden text-ink-3 @[480px]:block">{r.hsn}</span>}
            <span className="tnum text-ink-3">{r.qty}</span>
            {gst && <span className="tnum hidden text-ink-3 @[480px]:block">{r.rate}%</span>}
            <span className="tnum text-right font-semibold text-ink">{rupees(r.gross, true)}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <dl className="w-full max-w-[240px] space-y-1">
          {gst && (
            <>
              <div className="flex justify-between">
                <dt>Taxable value</dt>
                <dd className="tnum">{rupees(taxableTotal, true)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>CGST</dt>
                <dd className="tnum">{rupees(taxTotal / 2, true)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>SGST</dt>
                <dd className="tnum">{rupees(taxTotal / 2, true)}</dd>
              </div>
            </>
          )}
          <div className="flex items-baseline justify-between border-t border-line pt-1.5 text-[14px] font-bold text-ink">
            <dt>Total</dt>
            <dd className="tnum">{rupees(BILL_TOTAL, true)}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

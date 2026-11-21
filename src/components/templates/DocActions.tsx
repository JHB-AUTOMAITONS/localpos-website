import { useState } from 'react'
import { Icon } from '@/components/Icon'
import { CTAButton } from '@/components/ui/CTAButton'
import { DOCX_TYPE, XLSX_TYPE, downloadBlob } from '@/lib/download'
import type { TemplateDoc } from './types'

/**
 * Print / PDF, Excel and Word buttons for a document. The Excel and Word writers are loaded only when a button is pressed,
 * and the files are built in the browser, so nothing the visitor typed leaves their device.
 */
export function DocActions({ doc, className }: { doc: TemplateDoc; className?: string }) {
  const [error, setError] = useState('')

  async function save(kind: 'xlsx' | 'docx') {
    setError('')
    try {
      if (kind === 'xlsx') {
        const { buildXlsx } = await import('@/lib/office/xlsx')
        downloadBlob(buildXlsx(doc) as BlobPart, `${doc.fileName}.xlsx`, XLSX_TYPE)
      } else {
        const { buildDocx } = await import('@/lib/office/docx')
        downloadBlob(buildDocx(doc) as BlobPart, `${doc.fileName}.docx`, DOCX_TYPE)
      }
    } catch {
      setError('The file could not be created. Please try again.')
    }
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2.5">
        <CTAButton size="sm" onClick={() => window.print()}>
          <Icon name="printer" size={17} />
          Print / Save as PDF
        </CTAButton>
        <CTAButton size="sm" variant="secondary" onClick={() => save('xlsx')}>
          <Icon name="download" size={17} />
          Excel (.xlsx)
        </CTAButton>
        <CTAButton size="sm" variant="secondary" onClick={() => save('docx')}>
          <Icon name="download" size={17} />
          Word (.docx)
        </CTAButton>
      </div>
      <p role="status" className="mt-2 min-h-5 text-[0.86rem] font-medium text-coral-700">
        {error}
      </p>
    </div>
  )
}

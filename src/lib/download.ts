/** Save bytes or text made in the browser as a file. Nothing is uploaded: the file is built on the visitor's device. */
export function downloadBlob(data: BlobPart | Blob, fileName: string, type: string): void {
  const blob = data instanceof Blob ? data : new Blob([data], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  a.remove()
  // Give the browser a moment to start the download before the address is released.
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

export const XLSX_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
export const DOCX_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

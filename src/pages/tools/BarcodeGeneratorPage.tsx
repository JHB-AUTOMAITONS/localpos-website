import type { Block } from '@/components/resource/blocks'
import { ResourcePage } from '@/components/resource/ResourcePage'
import { BarcodeGenerator } from '@/components/tools/BarcodeGenerator'
import type { FaqItem } from '@/lib/seo'

const blocks: Block[] = [
  {
    kind: 'table',
    title: 'The six formats this barcode generator supports',
    lead: 'Each format has its own rules for what it can hold. The tool checks your value against these rules before drawing the bars.',
    head: ['Format', 'What you type', 'Typical use'],
    rows: [
      ['Code 128', 'Letters, digits and symbols', 'In-store item codes, shelf and asset labels'],
      ['EAN-13', '12 or 13 digits', 'Retail packs sold in India and most countries'],
      ['EAN-8', '7 or 8 digits', 'Very small retail packs'],
      ['UPC-A', '11 or 12 digits', 'Retail packs for the USA and Canada'],
      ['Code 39', 'Capitals, digits and - . space $ / + %', 'Older industrial and ID systems'],
      ['ITF-14', '13 or 14 digits', 'Outer cartons and shipping cases'],
    ],
    note: 'For EAN-13, type 12 digits and the check digit is added for you, or type all 13 and the last digit is verified.',
  },
  {
    kind: 'prose',
    title: 'Which format should you choose?',
    body: [
      'Start with one question: will anyone outside your own shop scan this label? If the answer is no, **Code 128** is the practical choice. It is compact, takes letters as well as digits, and almost every scanner reads it.',
      'If the product will sit on another retailer’s shelf or be listed on a marketplace, the buyer will normally expect an **EAN-13** built from a registered number. **EAN-8** is for packs too small to carry thirteen digits, and **UPC-A** is the twelve-digit format used in North America.',
      '**ITF-14** goes on the carton, not the unit. It is printed large so that warehouse scanners can read it on corrugated board. **Code 39** is worth choosing only when an existing system or a customer asks for it, because it needs more width for the same value.',
    ],
  },
  {
    kind: 'split',
    title: 'In-store codes and GS1 numbers are different things',
    lead: 'A barcode is only a way of printing a number. Where the number comes from is a separate matter.',
    left: {
      title: 'Your own in-store codes',
      items: [
        'Any numbering scheme you like, for example KUR-0042 for a kurta',
        'Suits loose goods, repacked items and products without a printed code',
        'Code 128 handles them well',
        'Meaningful only inside your own billing software',
      ],
    },
    right: {
      title: 'GS1 product numbers (GTIN)',
      items: [
        'Issued by GS1. Indian companies register with GS1 India',
        'Needed when other retailers, distributors or marketplaces scan your pack',
        'Printed as EAN-13, EAN-8 or UPC-A on the unit and ITF-14 on the carton',
        'Each number identifies one product and pack size',
      ],
    },
  },
  {
    kind: 'steps',
    title: 'Make a label in four steps',
    steps: [
      { title: 'Pick the format', body: 'Select one of the six formats. The hint under the box tells you what the format accepts.' },
      { title: 'Type the value', body: 'Enter the number or code. If something is wrong, such as a missing digit or a failed check digit, the tool tells you what to fix.' },
      { title: 'Adjust the look', body: 'Set the bar width and bar height, and choose whether the number is printed under the bars. Keeping the number visible lets staff type it when a label is damaged.' },
      { title: 'Download or print', body: 'Save the barcode as a PNG or an SVG, or print it directly. Use SVG if a print shop will place it on packaging artwork.' },
    ],
  },
  {
    kind: 'prose',
    title: 'Printing tips so the scanner reads it first time',
    body: [
      'Most scanning problems come from the print, not from the code. A few habits prevent nearly all of them.',
      'After printing, read the label back with the scanner you use at the counter. If you only have the image file, the [barcode scanner](/barcode-scanner/) page can read it from a picture.',
    ],
    bullets: [
      '**Leave a quiet zone.** Keep clear white space to the left and right of the bars. Text or a border that touches the bars stops the scanner from finding the start.',
      '**Scale evenly.** Resize the image by the corner so width and height change together. Stretching it sideways changes the bar widths and makes the code unreadable.',
      '**Print dark bars on a light label.** Black on white is the safe combination. Avoid coloured, transparent or shiny label stock.',
      '**Check the thermal printer.** On thermal label printers, a worn print head or low darkness setting leaves thin white lines through the bars. Clean the head and raise the darkness if scans start failing.',
      '**Do not shrink too far.** If the narrow bars start to merge, increase the bar width or use a wider label.',
    ],
  },
  {
    kind: 'cards',
    title: 'Where barcodes fit into billing and stock',
    lead: 'The label is only useful when the same code exists against the item in your software. The guide on [how a barcode system works in a retail shop](/blog/how-a-barcode-system-works-in-a-retail-shop/) covers the full set-up.',
    items: [
      { icon: 'receipt', title: 'Faster billing', body: 'One scan adds the item, price and tax to the bill. [LocalPOS barcode billing](/features/barcode-billing-software/) works with a regular USB or Bluetooth scanner.' },
      { icon: 'boxes', title: 'Cleaner stock counts', body: 'Scanning during purchase entry and stock-taking cuts typing mistakes. See [inventory management](/features/inventory-management-software/) for how stock is tracked.' },
      { icon: 'tag', title: 'Fewer pricing errors', body: 'The price comes from the item record, not from memory, so two staff members charge the same amount.' },
    ],
  },
  {
    kind: 'note',
    title: 'A barcode image is not a registered product number',
    body: 'This tool draws the bars for whatever number you type. It does not issue or register numbers. If you make up an EAN-13 number, it may clash with another company’s product. For retail GTIN and EAN numbers, apply to GS1, which in India means GS1 India. For labels used only inside your own shop, your own scheme is fine.',
  },
]

const faqs: FaqItem[] = [
  { q: 'Can I make a barcode for my products without GS1 registration?', a: 'Yes, for use inside your own shop. Give each item your own code, print it as Code 128 and save the same code against the item in your billing software. For products sold through other retailers or marketplaces, you will normally need numbers issued by GS1.' },
  { q: 'What is the check digit in EAN-13?', a: 'It is the thirteenth digit, calculated from the first twelve. A scanner uses it to catch misreads. Type twelve digits and the tool works it out, or type all thirteen and the tool confirms that the last digit is correct.' },
  { q: 'Can I print many labels on one sheet?', a: 'Not from this tool. It makes one barcode at a time. You can download the image and place copies in a label template yourself. Billing software with label printing is the better route when you need labels in bulk.' },
  { q: 'Does it make QR codes as well?', a: 'No. This page makes one-dimensional barcodes only. For links, Wi-Fi, contact cards and UPI codes, use the [QR code generator](/qr-code-generator/).' },
  { q: 'Why does Code 39 reject my value?', a: 'Code 39 accepts capital letters, digits and seven symbols: hyphen, full stop, space, dollar, slash, plus and per cent. Lower-case letters and other symbols are not part of the format. Switch to Code 128 if you need them.' },
  { q: 'Is this online barcode generator free to use?', a: 'Yes. It runs in your browser with no sign-up, and the value you type is not uploaded anywhere.' },
]

export default function BarcodeGeneratorPage() {
  return (
    <ResourcePage
      slug="barcode-generator"
      seoTitle="Barcode Generator: Code 128, EAN-13 and UPC | LocalPOS"
      seoDescription="Free barcode generator for Code 128, EAN-13, EAN-8, UPC-A, Code 39 and ITF-14. Type a value, check it, then download a PNG or SVG, or print it."
      h1="Barcode Generator for product and shelf labels"
      intro="Type a number or code, choose a format, and this barcode generator draws a label you can download or print. It checks the value as you type, so a wrong length or a bad check digit is caught before you print."
      points={['Six common formats', 'PNG, SVG and print', 'Value checked as you type']}
      toolTitle="Create a barcode"
      toolLead="One barcode at a time. The preview follows your settings."
      featureList={['Code 128, EAN-13, EAN-8, UPC-A, Code 39 and ITF-14 barcodes', 'Input validation with check digit calculation', 'Adjustable bar width and height', 'Optional number under the bars', 'PNG and SVG download, and print']}
      blocks={blocks}
      faqs={faqs}
      faqTitle="Barcode questions from shop owners"
      related={['barcode-scanner', 'qr-code-generator', 'qr-code-scanner', 'invoice-generator']}
      cta={{ title: 'Scan, bill and update stock in one step', text: 'LocalPOS adds the item to the bill when you scan its label and reduces the stock at the same moment.' }}
    >
      <BarcodeGenerator />
    </ResourcePage>
  )
}

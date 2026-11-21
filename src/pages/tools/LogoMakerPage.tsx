import type { Block } from '@/components/resource/blocks'
import { ResourcePage } from '@/components/resource/ResourcePage'
import { LogoMaker } from '@/components/tools/LogoMaker'
import type { FaqItem } from '@/lib/seo'

const blocks: Block[] = [
  {
    kind: 'prose',
    title: 'What makes a small-business logo work',
    body: [
      'A shop’s logo is seen small far more often than it is seen large. It sits in the corner of a bill, in a WhatsApp circle and on a sticker the size of a coin. If the name cannot be read at that size, the design is not doing its job.',
      'That is why a plain text logo, a name set in one clear typeface with a simple badge of initials, serves many local businesses well. It is easy to print, cheap to reproduce and hard to get wrong.',
    ],
    bullets: [
      '**Readable when small.** Shrink the preview in your mind to 2 cm wide. If the tagline disappears, shorten it or drop it.',
      '**One or two colours.** Every extra colour raises the cost of boards, bags and stamps, and makes the mark harder to remember.',
      '**Works in black.** Thermal bill printers and photocopies have no colour. Make a black-on-white version and check that it still looks like you.',
      '**Easy to say and spell.** The name carries the logo. Keep it as customers actually say it.',
    ],
  },
  {
    kind: 'defs',
    title: 'The controls, one by one',
    lead: 'Everything changes in the live preview as you adjust it.',
    items: [
      { term: 'Name and tagline', desc: 'The business name is the main line. The tagline is optional and sits below it in smaller letters.' },
      { term: 'Badge initials', desc: 'Filled in from the name automatically. You can edit them, up to three characters.' },
      { term: 'Badge shape', desc: 'Circle, rounded square, square, or no badge at all.' },
      { term: 'Layout', desc: 'Badge on the left of the name, badge on top of the name, or text only.' },
      { term: 'Typeface and weight', desc: 'Four typefaces: a display face, a clean sans-serif, a monospace and a serif. Each can be regular or bold, with an UPPERCASE switch and a letter spacing control.' },
      { term: 'Colours', desc: 'Separate colours for the text, the badge, the badge letters and the background. A few ready colour sets give you a starting point, and the background can be made transparent.' },
    ],
  },
  {
    kind: 'table',
    title: 'Where the logo will be used, and what suits each place',
    head: ['Place', 'Layout that suits', 'File tip'],
    rows: [
      ['Bills and invoices', 'Badge on the left, or text only', '1200 px PNG. Test a black version on your printer'],
      ['Visiting cards', 'Badge on the left or on top', '2400 px PNG for a sharper print'],
      ['WhatsApp display picture', 'Badge on top', 'Solid background. The picture is cropped to a circle, so check the edges'],
      ['Packaging stickers', 'Badge on top, short name', 'Transparent background on white or kraft labels'],
      ['Shop board', 'Badge on the left', 'Share the 2400 px PNG as a reference. The board maker will usually redraw it'],
    ],
    note: 'Both downloads are PNG files, 1200 or 2400 pixels wide. A PNG is made of pixels, so it turns soft when stretched across a large board or banner.',
  },
  {
    kind: 'steps',
    title: 'Putting the logo on your invoice',
    steps: [
      { title: 'Download a clean version', body: 'Choose dark text on a white or transparent background. Light text on a transparent background vanishes on white paper.' },
      { title: 'Place it at the top', body: 'Insert the PNG beside your business name and address. The [invoice formats](/invoice-formats/) come as Word and Excel files where a picture can be added in the header.' },
      { title: 'Keep it modest', body: 'On an A4 invoice, a logo about 3 to 4 cm wide is enough. The buyer still needs to find your GSTIN, the invoice number and the date quickly.' },
      { title: 'Print one test copy', body: 'Check it on the printer you really use. If you have no letterhead yet, the [invoice generator](/invoice-generator/) prepares a neat bill with your business details in the meantime.' },
    ],
  },
  {
    kind: 'split',
    title: 'A free logo maker or a designer?',
    lead: 'Be honest about what you need this year. You can always upgrade later.',
    left: {
      title: 'This tool is enough when',
      items: [
        'You are opening soon and need something tidy for bills and cards',
        'A wordmark with initials suits the business',
        'The logo will mostly appear small, on paper and on phones',
        'You want to try names, colours and layouts before spending money',
      ],
    },
    right: {
      title: 'Hire a designer when',
      items: [
        'You want a drawn symbol, a mascot or custom lettering',
        'You need vector files (SVG or EPS) for large boards, vehicles or embroidery',
        'The brand name is in Hindi, Tamil or another script and needs a chosen typeface',
        'You plan to register the mark or open several outlets',
      ],
    },
  },
  {
    kind: 'cards',
    title: 'After the download: three quick jobs',
    items: [
      { icon: 'qr', title: 'Add a QR to the card', body: 'Make a contact or UPI code with the [QR code generator](/qr-code-generator/) and place it beside the logo on your visiting card or counter stand.' },
      { icon: 'receipt', title: 'Match your bills', body: 'Use the same name and spelling on every bill. [LocalPOS billing software](/features/pos-billing-software/) prints your business name and details on each one.' },
      { icon: 'layers', title: 'Keep the originals', body: 'Save the colour version, a black version and a transparent version in one folder, and note the colour codes you chose.' },
    ],
  },
  {
    kind: 'note',
    title: 'The tool does not check trademarks',
    body: 'It cannot tell you whether a name or design is already registered or used by someone else. Before you spend on boards and packaging, it is sensible to search the public trademark records of the Trade Marks Registry and to speak to a trademark professional. This page is not legal advice.',
  },
]

const faqs: FaqItem[] = [
  { q: 'Is this an AI logo generator?', a: 'No. It is a simple text logo tool. You type the name and choose the typeface, badge, layout and colours yourself. It does not draw icons, symbols or illustrations.' },
  { q: 'Which file do I get?', a: 'A PNG image, 1200 or 2400 pixels wide, with a solid or transparent background. There is no SVG or EPS vector file.' },
  { q: 'Can I write my shop name in Hindi or another Indian language?', a: 'You can type it, but the four typefaces cover English and other Latin letters. Text in scripts such as Devanagari or Tamil is shown in your device’s own font, so it may look different on another phone or computer. Check the downloaded PNG, which keeps the look you saw.' },
  { q: 'Can I use the logo for my business?', a: 'Yes. The design is made from your own text and colour choices, and the tool is free with no sign-up. Whether the name itself is free to use is a separate question that the tool does not check.' },
  { q: 'What size should the logo be on a bill?', a: 'Small. Around 3 to 4 cm wide on an A4 invoice, and a single line of text on a narrow thermal receipt. The 1200 px download is more than enough for both.' },
  { q: 'Why should I make a transparent version?', a: 'A transparent background lets the logo sit on coloured paper, a photo or a sticker without a white box around it. Use dark text for light surfaces and light text for dark ones.' },
]

export default function LogoMakerPage() {
  return (
    <ResourcePage
      slug="logo-maker"
      seoTitle="Logo Maker for Small Business: Free Text Logo | LocalPOS"
      seoDescription="A simple logo maker for shops and small businesses. Type your name, choose a badge, typeface and colours, then download a text logo as a PNG file."
      h1="Logo Maker for shops and small businesses"
      intro="This logo maker builds a clean text logo from your business name, a badge of initials and your choice of typeface and colours. Adjust it in the live preview and download a PNG."
      points={['Name, tagline and badge', 'Transparent background', 'PNG download']}
      toolTitle="Design your text logo"
      toolLead="Start with the name. The initials fill in by themselves."
      featureList={['Text logo from a business name and tagline', 'Initials badge in three shapes', 'Four typefaces with weight and spacing controls', 'Custom colours and ready colour sets', 'Transparent background option', 'PNG download at 1200 or 2400 px']}
      blocks={blocks}
      faqs={faqs}
      faqTitle="Questions about the text logo tool"
      related={['qr-code-generator', 'invoice-generator', 'invoice-formats', 'receipt-maker']}
      cta={{ title: 'Put your business name on every bill', text: 'LocalPOS prints your business name, address and GSTIN on each bill, so every customer leaves with your details in hand.' }}
    >
      <LogoMaker />
    </ResourcePage>
  )
}

import type { Block } from '@/components/resource/blocks'
import { ResourcePage } from '@/components/resource/ResourcePage'
import { QrCodeGenerator } from '@/components/tools/QrCodeGenerator'
import type { FaqItem } from '@/lib/seo'

const blocks: Block[] = [
  {
    kind: 'cards',
    title: 'Five QR codes a shop can put to work',
    lead: 'Each of these takes a minute to make and costs only the print.',
    items: [
      { icon: 'wallet', title: 'UPI at the counter', body: 'Print a payment code with your UPI ID and payee name. The customer scans it in any UPI app and types the amount.' },
      { icon: 'zap', title: 'Wi-Fi for guests', body: 'A cafe, salon or clinic can let visitors join the guest network by scanning, without spelling out the password.' },
      { icon: 'utensils', title: 'Menu or catalogue link', body: 'Point the code to your online menu, price list or product catalogue and place it on tables or the shop window.' },
      { icon: 'award', title: 'Google review link', body: 'Put your review link in a code near the billing counter so a happy customer can leave a rating before walking out.' },
      { icon: 'user', title: 'Visiting card', body: 'A contact code saves your name, phone and email to the phone book in one scan. Pair it with a logo from the [logo maker](/logo-maker/).' },
      { icon: 'tag', title: 'Text on a label', body: 'Store a short note, a batch reference or care instructions as plain text on a product sticker.' },
    ],
  },
  {
    kind: 'defs',
    title: 'What to enter for each type of code',
    items: [
      { term: 'Link', desc: 'A full web address, starting with https://. Shorter addresses make simpler codes that scan faster.' },
      { term: 'Text', desc: 'Any short message. The phone shows the text as it is, with nothing to open.' },
      { term: 'Wi-Fi', desc: 'The network name exactly as it appears on a phone, the password, and the security type: WPA/WPA2, WEP or none. Tick the hidden network box if your router does not broadcast its name.' },
      { term: 'Contact', desc: 'Name, organisation, phone, email and website. These are saved as a vCard, the standard contact format that phones understand.' },
      { term: 'UPI payment', desc: 'Your UPI ID and payee name, with an optional amount and note. The result is a standard **upi://pay** code that UPI apps can scan.' },
    ],
  },
  {
    kind: 'prose',
    title: 'Static and dynamic QR codes: which one is this?',
    body: [
      'This QR code generator makes **static** codes. The link, text or UPI ID is stored inside the pattern itself. Nothing sits on a server in between, so there is no account to keep and nothing to renew.',
      'A **dynamic** code works differently. It holds a short redirect address run by a service provider, and the provider can change where it leads and count the scans. That needs an account with the provider and the code depends on their service staying active.',
      'The practical result: a static code cannot be edited after printing, and it has no tracking or scan counts. If your menu link or Wi-Fi password changes, make a new code and reprint. A code made here keeps working for as long as the thing it points to stays valid.',
    ],
    aside: {
      title: 'Keep the destination stable',
      body: 'Before printing a large batch, choose a web address you do not expect to change, such as a page on your own domain.',
    },
  },
  {
    kind: 'table',
    title: 'Error correction levels explained',
    lead: 'Error correction lets a scanner read a code that is partly scratched or dirty. Higher levels add more squares, so the code becomes denser. The recovery figures are the approximate values from the QR standard.',
    head: ['Level', 'Damage it can absorb', 'Where it suits'],
    rows: [
      ['Low', 'About 7%', 'Screens and clean indoor prints with long content'],
      ['Medium', 'About 15%', 'Most everyday uses, a sensible default'],
      ['Quartile', 'About 25%', 'Counter stands and labels that get handled'],
      ['High', 'About 30%', 'Stickers and outdoor prints that may wear'],
    ],
    note: 'If the content is long, a lower level keeps the squares larger and easier to scan. If the content is short, a higher level costs very little.',
  },
  {
    kind: 'steps',
    title: 'From download to a print that scans',
    steps: [
      { title: 'Pick the file type', body: 'Download SVG for a print shop, because it stays sharp at any size. Download PNG at 512, 1024 or 2048 px for documents, WhatsApp and web pages.' },
      { title: 'Size it sensibly', body: 'Keep the printed code at least about 2 cm wide for scanning from close range. Go larger for a counter stand or a poster that people scan from a distance.' },
      { title: 'Protect the margin and contrast', body: 'Leave the white border around the code clear of text and artwork. Print it black on white or on a very light surface, and avoid glossy lamination that reflects light.' },
      { title: 'Test before the print run', body: 'Scan the proof with two different phones. For a payment code, confirm the payee name the app shows. You can also check the file itself with the [QR code scanner](/qr-code-scanner/).' },
    ],
  },
  {
    kind: 'split',
    title: 'What this QR code generator does and where it stops',
    left: {
      title: 'It does',
      items: [
        'Link, text, Wi-Fi, contact and UPI payment codes',
        'A live preview that updates as you type',
        'PNG in three sizes and SVG downloads',
        'Four error correction levels',
        'Work in the browser, free, with no sign-up and nothing uploaded',
      ],
    },
    right: {
      title: 'It does not',
      items: [
        'Edit a code after it is printed',
        'Track scans or show scan counts',
        'Place a logo in the middle of the code',
        'Offer colours: codes are black on white',
        'Fit unlimited text. A message appears when the content is too long',
      ],
    },
  },
  {
    kind: 'note',
    title: 'A UPI code made here is a plain payment code',
    body: 'It tells the customer’s app whom to pay. It does not confirm that money has arrived and it does not replace a merchant QR issued by your bank or payment provider. Check each payment in your own UPI app or bank account, and always test-scan the code before you print it. To record UPI, cash and card receipts against each bill, see [LocalPOS payment management](/features/payment-management-software/).',
  },
]

const faqs: FaqItem[] = [
  { q: 'Will a QR code made here stop working after some time?', a: 'The code itself has no timer, because the content is stored in the pattern and not on a server. It works as long as what it points to stays valid. If the web page is removed, the UPI ID is closed or the Wi-Fi password changes, you need a new code.' },
  { q: 'Can I change the link after printing the code?', a: 'No. These are static codes, so the content cannot be changed once printed. Create a QR code with the new link and replace the old print.' },
  { q: 'How do I make a UPI QR code for my shop?', a: 'Choose UPI payment, enter your UPI ID exactly as your bank app shows it, and add the payee name. Leave the amount blank if customers pay different amounts. Scan the result with a UPI app and confirm the name before printing.' },
  { q: 'Why does my code look so dense?', a: 'More content means more squares. Long links, long text and a high error correction level all add density. Shorten the content or choose a lower level, and print the code larger.' },
  { q: 'Should I download PNG or SVG?', a: 'Use SVG for anything a printer will resize, such as a standee, a board or packaging. Use PNG for a bill footer, a document or a message. The 2048 px PNG is the safest choice for print if your software cannot open SVG.' },
  { q: 'Is this QR code maker the right tool for product labels?', a: 'It works for links and text on labels. For the numbers that a billing counter scans, a one-dimensional barcode is the usual choice. The [barcode generator](/barcode-generator/) makes Code 128, EAN and UPC labels.' },
]

export default function QrCodeGeneratorPage() {
  return (
    <ResourcePage
      slug="qr-code-generator"
      seoTitle="QR Code Generator for UPI, Wi-Fi and Links | LocalPOS"
      seoDescription="Free QR code generator for links, text, Wi-Fi, contact cards and UPI payments. Preview the code live and download it as a PNG or SVG. No sign-up."
      h1="QR Code Generator for links, Wi-Fi, contacts and UPI"
      intro="This free QR code generator turns a link, a short text, Wi-Fi details, a contact card or a UPI ID into a code you can print or share. The preview updates as you type, and the download is a PNG or an SVG."
      points={['Five content types', 'PNG and SVG downloads', 'No sign-up']}
      toolTitle="Create your QR code"
      toolLead="Choose a type, fill in the details and download the code."
      featureList={['QR codes for links and plain text', 'Wi-Fi network QR codes', 'Contact (vCard) QR codes', 'UPI payment QR codes', 'Four error correction levels', 'PNG and SVG download']}
      blocks={blocks}
      faqs={faqs}
      faqTitle="Questions about making QR codes"
      related={['qr-code-scanner', 'barcode-generator', 'logo-maker', 'receipt-maker']}
      cta={{ title: 'Take payments and bill from one screen', text: 'LocalPOS records cash, UPI and card payments against every bill, so the day’s collection matches the day’s sales.' }}
    >
      <QrCodeGenerator />
    </ResourcePage>
  )
}

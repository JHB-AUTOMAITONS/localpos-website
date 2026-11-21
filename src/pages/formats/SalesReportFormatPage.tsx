import type { Block } from '@/components/resource/blocks'
import { ResourcePage } from '@/components/resource/ResourcePage'
import { TemplateViewer } from '@/components/templates/TemplateViewer'
import type { TemplateDoc } from '@/components/templates/types'
import type { FaqItem } from '@/lib/seo'

const templates: TemplateDoc[] = [
  {
    id: 'daily',
    name: 'Daily sales report',
    description: 'A bill-wise sheet for one day of counter sales, with the payment split and a cash tally to close the drawer.',
    fileName: 'daily-sales-report',
    blocks: [
      { t: 'title', text: 'Daily Sales Report', sub: 'Bill-wise' },
      { t: 'org', name: 'Shree Ganesh Kirana Store', lines: ['18 Laxmi Road, Sadashiv Peth, Pune, Maharashtra 411030', 'Phone: 98765 43210'] },
      {
        t: 'pairs',
        cols: [
          { rows: [['Date', '20 Nov 2026'], ['Day', 'Friday'], ['Prepared by', 'Suresh (cashier)']] },
          { rows: [['First bill no.', '3401'], ['Last bill no.', '3408'], ['Number of bills', '8']] },
        ],
      },
      {
        t: 'table',
        head: ['Bill no.', 'Customer', 'Items', 'Cash', 'UPI', 'Card', 'Credit', 'Bill amount'],
        align: ['c', 'l', 'r', 'r', 'r', 'r', 'r', 'r'],
        rows: [
          ['3401', 'Walk-in', '6', '840.00', '', '', '', '840.00'],
          ['3402', 'Walk-in', '3', '', '465.00', '', '', '465.00'],
          ['3403', 'Sunita Patil', '12', '', '', '', '2,350.00', '2,350.00'],
          ['3404', 'Walk-in', '9', '', '', '1,780.00', '', '1,780.00'],
          ['3405', 'Walk-in', '4', '520.00', '', '', '', '520.00'],
          ['3406', 'Ramesh Jadhav', '15', '', '3,125.00', '', '', '3,125.00'],
          ['3407', 'Walk-in', '7', '500.00', '660.00', '', '', '1,160.00'],
          ['3408', 'Walk-in', '5', '760.00', '', '', '', '760.00'],
          { total: ['Total', '', '61', '2,620.00', '4,250.00', '1,780.00', '2,350.00', '11,000.00'] },
        ],
        totals: [
          ['Total sales', '11,000.00'],
          ['Less: sales returns', '400.00'],
          ['Net sales (₹)', '10,600.00'],
        ],
        blankRows: 10,
      },
      {
        t: 'table',
        head: ['Cash tally', 'Amount (₹)'],
        align: ['l', 'r'],
        keep: [0],
        rows: [
          ['Opening cash in drawer', '2,000.00'],
          ['Add: cash sales', '2,620.00'],
          ['Add: cash received against old credit', '1,500.00'],
          ['Less: cash refunded on returns', '400.00'],
          ['Less: cash expenses (tea, delivery)', '320.00'],
          ['Less: cash deposited in bank', '3,000.00'],
          { total: ['Closing cash as per report', '2,400.00'] },
          ['Cash counted in drawer', '2,400.00'],
          ['Difference', '0.00'],
        ],
      },
      { t: 'text', label: 'Remarks', text: 'Bill 3407 was paid partly in cash and partly by UPI. One return of 400.00 was refunded in cash against bill 3391.' },
      { t: 'sign', labels: ['Cashier', 'Owner / Manager'] },
    ],
  },
  {
    id: 'monthly',
    name: 'Monthly sales report',
    description: 'A week-wise summary of one month: bills, gross sales, returns and discounts, net sales and GST, with a total row.',
    fileName: 'monthly-sales-report',
    blocks: [
      { t: 'title', text: 'Monthly Sales Report', sub: 'November 2026' },
      { t: 'org', name: 'Malabar Fashion House', lines: ['42 S M Street, Kozhikode, Kerala 673001', 'GSTIN: 32ABCDE1234F1Z5 · Phone: 98765 43210'] },
      {
        t: 'pairs',
        cols: [
          { rows: [['Period', '1 to 30 Nov 2026'], ['Financial year', '2026-27']] },
          { rows: [['Trading days', '30'], ['Prepared on', '30 Nov 2026']] },
        ],
      },
      {
        t: 'table',
        head: ['Week', 'Bills', 'Gross sales', 'Returns and discounts', 'Net sales', 'GST', 'Total with GST'],
        align: ['l', 'r', 'r', 'r', 'r', 'r', 'r'],
        keep: [0],
        rows: [
          ['Week 1 (1 to 7)', '412', '3,29,600.00', '6,400.00', '3,23,200.00', '16,160.00', '3,39,360.00'],
          ['Week 2 (8 to 14)', '386', '3,08,800.00', '5,800.00', '3,03,000.00', '15,150.00', '3,18,150.00'],
          ['Week 3 (15 to 21)', '455', '3,86,750.00', '8,750.00', '3,78,000.00', '18,900.00', '3,96,900.00'],
          ['Week 4 (22 to 28)', '398', '3,18,400.00', '4,400.00', '3,14,000.00', '15,700.00', '3,29,700.00'],
          ['Week 5 (29 to month end)', '109', '87,200.00', '1,200.00', '86,000.00', '4,300.00', '90,300.00'],
          { total: ['Total for the month', '1,760', '14,30,750.00', '26,550.00', '14,04,200.00', '70,210.00', '14,74,410.00'] },
        ],
      },
      { t: 'text', label: 'Note', text: 'Gross sales and net sales are shown before GST. GST in this sample is taken at 5% of net sales for illustration only.', keep: true },
      { t: 'sign', labels: ['Prepared by', 'Checked by'] },
    ],
  },
  {
    id: 'category',
    name: 'Category-wise summary',
    description: 'The same month split by product category, to show which lines bring in the sales.',
    fileName: 'category-wise-sales-summary',
    blocks: [
      { t: 'title', text: 'Category-wise Sales Summary', sub: 'November 2026' },
      { t: 'org', name: 'Malabar Fashion House', lines: ['42 S M Street, Kozhikode, Kerala 673001', 'GSTIN: 32ABCDE1234F1Z5 · Phone: 98765 43210'] },
      {
        t: 'table',
        head: ['#', 'Category', 'Quantity sold', 'Net sales', 'Share of sales'],
        align: ['c', 'l', 'r', 'r', 'r'],
        rows: [
          ['1', 'Women’s wear', '1,720', '5,61,680.00', '40%'],
          ['2', 'Men’s wear', '1,480', '4,91,470.00', '35%'],
          ['3', 'Kids’ wear', '1,105', '2,10,630.00', '15%'],
          ['4', 'Accessories', '965', '1,40,420.00', '10%'],
        ],
        totals: [
          ['Total quantity', '5,270'],
          ['Total net sales (₹)', '14,04,200.00'],
        ],
        blankRows: 8,
      },
      { t: 'text', label: 'Note', text: 'Net sales are before GST and agree with the monthly report for the same period.', keep: true },
      { t: 'sign', labels: ['Prepared by'] },
    ],
  },
]

const blocks: Block[] = [
  {
    kind: 'split',
    title: 'How the daily and monthly sheets are built',
    lead: 'Both sheets answer the same question, how much did we sell, but at a different level of detail.',
    left: {
      title: 'Daily sheet: one row per bill',
      items: [
        'The date, the first and last bill number, and the number of bills raised.',
        'One row for each bill, or one row for each item if you prefer an item-wise day book.',
        'The amount of each bill placed under cash, UPI, card or credit.',
        'Total sales, returns for the day and net sales.',
        'A cash tally that ends with the closing cash in the drawer.',
      ],
    },
    right: {
      title: 'Monthly sheet: one row per day or week',
      items: [
        'The month, the financial year and the number of trading days.',
        'One row for each day, or for each week when you want a single page.',
        'Bills, gross sales, returns and discounts, and net sales in every row.',
        'The GST collected, kept apart from your own sales figure.',
        'A total row, which becomes the starting point for your books.',
      ],
    },
  },
  {
    kind: 'defs',
    title: 'Summary fields in a sales report format',
    lead: 'These are the figures at the foot of the sheets above. Use the same meaning every day, or the totals stop being comparable.',
    items: [
      { term: 'Total sales (gross sales)', desc: 'The value of all bills raised in the period, before returns are taken off. Decide once whether you record it with or without GST and stay with that choice.' },
      { term: 'Returns and discounts', desc: 'Goods taken back and price reductions given after billing. They are shown separately so that a high figure is noticed.' },
      { term: 'Net sales', desc: 'Total sales less returns and discounts. This is the figure that goes to the top of your [income statement](/income-statement-format/).' },
      { term: 'Payment split', desc: 'Net or total sales divided by how the customer paid: cash, UPI, card or credit. Only the cash column should match the drawer.' },
      { term: 'Credit sales', desc: 'Bills that are not yet paid. They are sales today, but the money arrives later, so they need follow-up.' },
      { term: 'GST', desc: 'The tax collected on the sales of the period. It is not your income. It is payable to the government after input tax credit.' },
      { term: 'Closing cash', desc: 'Opening cash plus cash received, less refunds, cash expenses and bank deposits. It should equal the cash counted at closing time.' },
    ],
  },
  {
    kind: 'table',
    title: 'How to read the report: figures from the samples',
    lead: 'A sales report is useful when you turn its totals into a few simple ratios. These are worked out from the daily and monthly samples on this page.',
    head: ['Measure', 'How it is worked out', 'Result'],
    rows: [
      ['Average bill value (day)', '11,000 ÷ 8 bills', '₹1,375.00'],
      ['Items per bill (day)', '61 items ÷ 8 bills', '7.6'],
      ['Share of UPI (day)', '4,250 ÷ 11,000', '38.6%'],
      ['Share of credit (day)', '2,350 ÷ 11,000', '21.4%'],
      ['Returns as a share of sales (day)', '400 ÷ 11,000', '3.6%'],
      ['Average bill value (month)', '14,30,750 ÷ 1,760 bills', '₹812.93'],
      ['Average net sales per day (month)', '14,04,200 ÷ 30 days', '₹46,806.67'],
      ['Returns and discounts (month)', '26,550 ÷ 14,30,750', '1.9%'],
    ],
    note: 'In the daily sample the payment split adds back to the total: cash 2,620 + UPI 4,250 + card 1,780 + credit 2,350 = 11,000. If your four columns do not add up to total sales, a bill has been entered in the wrong column or left out.',
  },
  {
    kind: 'cards',
    title: 'Who uses a sales report',
    items: [
      { icon: 'store', title: 'Shop owners', body: 'To see the day’s sales at closing time and to check that the cash in the drawer matches the report.' },
      { icon: 'users', title: 'Sales staff and managers', body: 'To compare days, weeks and counters, and to notice a slow week before the month is over.' },
      { icon: 'calculator', title: 'Accountants', body: 'To post monthly sales and GST into the books without opening every bill again.' },
      { icon: 'building', title: 'Lenders and partners', body: 'A bank or a business partner may ask for month-wise sales as a quick picture of how the business is doing.' },
    ],
  },
  {
    kind: 'steps',
    title: 'A simple routine for keeping the sheets',
    steps: [
      { title: 'Fill the daily sheet at closing', body: 'Enter each bill from the bill book, or copy the totals from your billing machine, and put every amount under the right payment column.' },
      { title: 'Count the cash', body: 'Work out the closing cash from the tally and compare it with the cash in the drawer. Write down any difference the same day.' },
      { title: 'Carry totals to the month', body: 'Copy the day’s bills, gross sales, returns and net sales to the monthly sheet. In Excel you can add a formula for the total row.' },
      { title: 'Review at month end', body: 'Compare the month with the previous one, look at returns and credit, and hand the totals to your accountant.' },
    ],
  },
  {
    kind: 'prose',
    title: 'When the sheet takes too long to fill',
    body: [
      'A daily sales report format in Excel works well while you raise a few dozen bills a day. Past that, copying bills into a sheet every evening takes time, and one missed bill throws off the cash tally.',
      'Billing software removes the copying. [LocalPOS sales reporting software](/features/sales-reporting-software/) builds the daily and monthly figures from the bills themselves, and its [sales management](/features/sales-management-software/) screens keep every sale and return in one place.',
    ],
  },
]

const faqs: FaqItem[] = [
  { q: 'What should a daily sales report include?', a: 'The date, the bills raised during the day, the amount of each bill, how it was paid (cash, UPI, card or credit), total sales, returns and net sales. A cash tally with the closing cash is useful for any shop that handles cash.' },
  { q: 'Should the report be bill-wise or item-wise?', a: 'Bill-wise is quicker and is enough to check cash and payment modes. Item-wise shows what sold, which helps with reordering. Many shops keep the day bill-wise and add a category or item summary once a month, like the third sheet on this page.' },
  { q: 'Is there a monthly sales report format in Excel here?', a: 'Yes. Choose the monthly sheet above and download it as an Excel workbook (.xlsx) or a Word document (.docx), with the sample figures or blank. It is free and needs no sign-up. To get a PDF, print it and choose “Save as PDF”.' },
  { q: 'Should sales be shown with GST or without GST?', a: 'Either can work, as long as you are consistent and the heading says which one it is. The monthly sample shows sales before GST and the tax in its own column, which makes it easier to hand the figures to an accountant.' },
  { q: 'How is average bill value calculated?', a: 'Divide total sales by the number of bills for the same period. In the daily sample, 11,000 ÷ 8 bills gives an average bill value of ₹1,375.' },
  { q: 'Why does my closing cash not match the report?', a: 'The usual causes are a UPI or card bill entered as cash, a cash expense or refund that was not written down, or wrong change given. Check the payment column of each bill first, then the expenses and deposits.' },
]

export default function SalesReportFormatPage() {
  return (
    <ResourcePage
      slug="sales-report-format"
      seoTitle="Sales Report Format: Daily and Monthly Sheets | LocalPOS"
      seoDescription="Free sales report format in Excel and Word. Daily bill-wise sheet with cash, UPI, card and credit split, plus a monthly summary. Sample figures or blank."
      h1="Sales report format for daily and monthly sales"
      intro="Download a sales report format for your shop: a daily bill-wise sheet with a cash tally, a monthly summary and a category-wise page. Each one opens with sample figures and can be switched to blank."
      points={['Daily, monthly, category', 'Excel, Word or print', 'Sample or blank']}
      toolTitle="Daily and monthly sales report templates"
      toolLead="Pick a sheet, then download it or print it."
      blocks={blocks}
      faqs={faqs}
      faqTitle="Questions about sales reports"
      related={['income-statement-format', 'bill-book-format', 'invoice-formats', 'receipt-format']}
      relatedTitle="Related formats"
      cta={{ title: 'Get your sales report without filling a sheet', text: 'LocalPOS records every bill and payment mode as you sell, so the day’s totals and the month’s summary are ready when you close the counter.' }}
    >
      <TemplateViewer templates={templates} />
    </ResourcePage>
  )
}

import type { LegalPage } from './types'

/**
 * Template policies for a SaaS billing-software company operating in India.
 * Anything in [square brackets] is a placeholder for a company fact that is not yet known.
 * Fill every placeholder, and have a qualified lawyer review these pages, before publishing.
 */
export const LEGAL_PAGES: LegalPage[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'privacy-policy',
    path: '/privacy-policy/',
    title: 'Privacy Policy',
    seoTitle: 'Privacy Policy | LocalPOS',
    seoDescription:
      'How LocalPOS collects, uses and protects information on our website and in the Local POS app for Android, iOS and Windows, and the choices you have.',
    updated: '2026-11-20',
    intro:
      'This Privacy Policy explains what information Thukal Innovatives LLP (“LocalPOS”, “we”, “us”) collects when you visit our website or use our billing, POS and inventory software, including the Local POS app on Android, iOS and Windows, how we use it, and the choices you have.',
    sections: [
      {
        heading: 'Who we are',
        paragraphs: [
          'LocalPOS is operated by Thukal Innovatives LLP (LLPIN ADB-2811), a limited liability partnership registered in India, whose registered address is 39/3A, 12th Ward, Eswari Garden, Kannankurichi, Salem 636008, Tamil Nadu, India. In this policy, “Service” means our website, our software (the Local POS app for Android, iOS and Windows, and the servers it connects to) and any related support or demo we provide. The app is listed as “Local POS” on Google Play and the App Store.',
          'If you have a question about this policy or about your information, write to us at info@localpos.in.',
        ],
      },
      {
        heading: 'Information we collect',
        paragraphs: ['We collect the following kinds of information, depending on how you use the Service.'],
        items: [
          'Account and business details: your name, phone number, email address, business name, address, GSTIN and similar details you give us when you book a demo, register or contact us.',
          'Business records you enter: items, prices, stock, invoices, purchases, payments, reports and other data you create in the Service.',
          'Customer and supplier details you enter: names, phone numbers, addresses, GSTINs and transaction history of the people and businesses you deal with.',
          'Usage and device data: pages and features used, device model, operating system, browser type, app version, IP address and log information, collected automatically. The Local POS app does not collect your location.',
          'Photos you add: pictures of your items, your logo and your signature that you choose to add.',
          'Voice questions: if you use the voice assistant, the recording of your question and its text (see “Voice assistant” below).',
          'Error reports: when the app hits an error, a technical report (what went wrong, the app version and the device type), so we can fix it.',
          'Support communications: messages, emails and notes from calls when you contact us.',
          'Payment details: the billing information needed to process your subscription. Payments are processed by Razorpay; we do not see or store your full card, UPI or bank account details, which Razorpay handles under its own privacy policy.',
        ],
      },
      {
        heading: 'The Local POS app and device permissions',
        paragraphs: [
          'The app keeps a copy of your business records on your phone or computer so you can keep billing without the internet, and sends them to our servers to sync them with your other devices and keep them backed up. Uninstalling the app removes the copy on that device; your records stay on our servers until you delete your account.',
          'The app asks for a device permission only when you use the feature that needs it, and you can refuse or turn it off later in your device settings. The rest of the app keeps working without it.',
        ],
        items: [
          'Camera: to scan barcodes and serial numbers, and to take photos of your items. Photos are uploaded only when you save them to an item.',
          'Photos and media: to pick an existing picture for an item, your logo or your signature.',
          'Microphone: to ask the voice assistant a question. The app listens only while you hold or tap the microphone button.',
          'Bluetooth and nearby devices: to find and connect to your receipt printer. We do not use Bluetooth to find your location.',
          'Internet: to sync your records, sign you in and send invoices.',
        ],
      },
      {
        heading: 'Voice assistant',
        paragraphs: [
          'When you ask the assistant a question by voice, the recording is sent to a speech-to-text provider that turns it into text, and the text is sent to an AI language provider that works out which report or record you asked for. The answer itself is worked out from your records on your device. These providers process the request for us and may do so outside India. They may not use it for their own purposes.',
          'We may keep the recording and the text of your question for up to one year to check and improve the answers, and then delete them. The business owner can ask us at info@localpos.in to stop keeping them, and we delete the ones already kept within 24 hours. If you do not use the voice assistant, no recording is made.',
        ],
      },
      {
        heading: 'What we do not do',
        items: [
          'We do not sell your personal data or your business records.',
          'We do not show advertising in the app and do not use your data for advertising.',
          'We do not track you across other companies’ apps or websites.',
          'We do not read your contacts, messages, call history or location.',
        ],
      },
      {
        heading: 'How we use your information',
        paragraphs: ['We use information to run and improve the Service. In particular, we use it to:'],
        items: [
          'create and manage your account and provide the Service you ask for;',
          'process subscription payments, send invoices and share service messages such as security or billing notices;',
          'answer questions, give support and arrange demos;',
          'understand how the Service is used, fix problems and develop new features;',
          'send you product updates and offers, which you can opt out of at any time;',
          'protect the Service, prevent fraud and misuse, and keep our records;',
          'meet our legal obligations.',
        ],
      },
      {
        heading: 'Data you enter about your own customers',
        paragraphs: [
          'When you use LocalPOS to store information about your own customers, suppliers and staff, you decide what to collect and why. You are responsible for having a valid reason and any consent needed to collect it, and for telling those people how you use their information.',
          'We process that data on your behalf and on your instructions, to provide the Service to you. If one of your customers contacts us about their information, we may refer them to you.',
        ],
      },
      {
        heading: 'How we share information',
        paragraphs: ['We do not sell personal data. We share information only in these situations:'],
        items: [
          'With service providers who help us run the Service, such as cloud hosting and storage, email, speech-to-text and AI language providers (for the voice assistant), payment and support providers. They may use the information only to provide their services to us.',
          'When the law requires it, for example in response to a lawful request from a court or authority, or to protect rights, safety and security.',
          'In a business transfer, such as a merger or sale of our business, in which case we will tell you and the new owner will be bound by this policy.',
          'With your consent or on your instruction, for example when you share an invoice or report with a customer or your accountant.',
        ],
      },
      {
        heading: 'Cookies and similar technologies',
        paragraphs: [
          'Our website uses cookies and similar technologies to keep it working, remember your preferences and understand how it is used. We use Google Analytics and Microsoft Clarity to see which pages people visit and how they click and scroll; they may estimate your city or country from your IP address. The Book a Demo form is provided by GoHighLevel (LeadConnector), which sets its own cookies when you use it.',
          'The Local POS app does not use advertising or analytics cookies, and does not share your use of the app with Google Analytics, Microsoft Clarity or any advertising service.',
          'You can control cookies through your browser settings. If you block them, some parts of the website may not work as expected.',
        ],
      },
      {
        heading: 'Data storage and retention',
        paragraphs: [
          'We keep your account and business data while your account is active and as long as we need it to provide the Service. After you cancel or ask us to delete your account, we delete or anonymise your data within 30 days, unless we must keep some of it for legal, tax, security or dispute-resolution reasons. Backup copies may take a little longer to clear.',
          'Our servers, and the business records on them, are in India. Some service providers that help us run the Service, such as the speech-to-text and AI providers for the voice assistant, email delivery and off-site backup storage, may process information outside India, under the safeguards described in this policy.',
        ],
      },
      {
        heading: 'Security',
        paragraphs: [
          'We use reasonable technical and organisational measures to protect information against loss, misuse and unauthorised access. The app and website talk to our servers only over encrypted (HTTPS) connections, passwords are stored only in a hashed form, each business’s records are kept separate from every other business’s, access inside a business follows the roles its owner gives each user, and changes to records are logged.',
          'No system is completely secure, so we cannot guarantee absolute security. Please choose a strong password, keep it private, and tell us at info@localpos.in straight away if you suspect someone has accessed your account without permission.',
        ],
      },
      {
        heading: 'Your choices and rights',
        paragraphs: [
          'Subject to applicable law, you can ask us to give you access to the personal information we hold about you, correct anything that is wrong, or delete it. You can also withdraw a consent you gave and opt out of marketing messages at any time using the link in the message or by writing to us.',
          'To make a request, email info@localpos.in. We may ask you to verify your identity first, and some requests may be limited by legal requirements. If you have a complaint about how we handle your information, you can write to our Grievance Officer, Sudhakar, at info@localpos.in or at our registered address.',
        ],
      },
      {
        heading: 'Delete your account',
        paragraphs: [
          'You can ask us to delete your Local POS account and the data that goes with it at any time, from any device and without the app. The steps, what we delete and what we have to keep are on our Delete your account page: https://localpos.in/delete-account/.',
        ],
      },
      {
        heading: 'Children',
        paragraphs: [
          'The Service is meant for businesses and is not directed at children under 18. We do not knowingly collect personal information from children. If you believe a child has given us information, contact us and we will delete it.',
        ],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          'We may update this policy from time to time. The date at the top shows when it was last changed. If we make a significant change, we will tell you by email or inside the Service before it takes effect.',
        ],
      },
      {
        heading: 'Contact us',
        paragraphs: [
          'Thukal Innovatives LLP, 39/3A, 12th Ward, Eswari Garden, Kannankurichi, Salem 636008, Tamil Nadu, India.',
          'Email: info@localpos.in. Phone: +91 70900 06577. Grievance Officer: Sudhakar, info@localpos.in.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  // The account-deletion URL for Google Play (Data safety → "Delete account URL") and the App Store.
  // Google requires it to name the app as listed ("Local POS"), give the steps, and say what is deleted and kept.
  {
    slug: 'delete-account',
    path: '/delete-account/',
    title: 'Delete your account',
    seoTitle: 'Delete your account | LocalPOS',
    seoDescription:
      'How to delete your Local POS account and data, for the Local POS app on Android, iOS and Windows: the steps, what we delete and what we keep.',
    updated: '2026-11-20',
    intro:
      'This page explains how to delete your account in Local POS, the billing app by Thukal Innovatives LLP for Android, iOS and Windows, and what happens to your data when you do.',
    sections: [
      {
        heading: 'How to delete your account',
        paragraphs: ['You do not need the app to do this.'],
        items: [
          'Email info@localpos.in from the email address you sign in to Local POS with, with the subject “Delete my account”.',
          'Tell us your business name and your phone number, and whether you want to delete only your own login or the whole business account.',
          'We confirm the request with you by email or phone, so nobody else can delete your account, and reply within 7 business days.',
          'We delete the account and email you when it is done.',
        ],
      },
      {
        heading: 'If someone else added you',
        paragraphs: [
          'If the owner of a business added you as a user, your login belongs to that business. Ask the owner to remove you from the Users list in Local POS, or email us and we will remove your login. The bills and records you made stay with the business, because they are its records.',
        ],
      },
      {
        heading: 'What we delete',
        items: [
          'Your login: name, email address, phone number and password.',
          'For a whole business account: every company in it, with its items, customers and suppliers, bills, purchases, payments, stock and reports, item photos, logos and signatures.',
          'Voice assistant recordings and the text of your questions.',
          'The copy of the records on your devices, once you uninstall the app.',
        ],
      },
      {
        heading: 'What we keep, and for how long',
        paragraphs: [
          'We delete or anonymise your data within 30 days of confirming the request. Our backups are overwritten on their normal schedule and clear within 90 days.',
          'We keep only what the law requires us to keep: the invoices we issued to you for your subscription and our record of your deletion request, for as long as tax and other laws require.',
        ],
      },
      {
        heading: 'Before you delete',
        paragraphs: [
          'A deleted account cannot be restored. GST law asks businesses to keep their books and invoices for several years, so export or print the reports and bills you need to keep before you ask us to delete a business account.',
        ],
      },
      {
        heading: 'Delete some data and keep your account',
        items: [
          'Items, customers, suppliers and bills: delete them in the app. A saved bill stays as a cancelled or deleted bill with its number, as GST numbering requires.',
          'Voice recordings: the business owner can email info@localpos.in to have them deleted and no longer kept.',
          'Photos: remove a photo from the item in the app, or ask us to delete it.',
        ],
      },
      {
        heading: 'Contact us',
        paragraphs: ['Thukal Innovatives LLP, 39/3A, 12th Ward, Eswari Garden, Kannankurichi, Salem 636008, Tamil Nadu, India.', 'Email: info@localpos.in. Phone: +91 70900 06577.'],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'terms-and-conditions',
    path: '/terms-and-conditions/',
    title: 'Terms and Conditions',
    seoTitle: 'Terms and Conditions | LocalPOS',
    seoDescription:
      'The terms that apply when you use LocalPOS billing, POS and inventory software, including accounts, acceptable use, subscriptions, your data and liability.',
    updated: '2026-10-06',
    intro:
      'These Terms and Conditions govern your use of the LocalPOS website and software, provided by Thukal Innovatives LLP. By using the Service you agree to them.',
    sections: [
      {
        heading: 'Acceptance of these terms',
        paragraphs: [
          'By creating an account or using our website or software (together, the “Service”), you agree to these Terms and to our Privacy Policy. If you use the Service for a business, you confirm that you have the authority to accept these Terms on its behalf.',
          'If you do not agree with them, please do not use the Service.',
        ],
      },
      {
        heading: 'The service and its availability',
        paragraphs: [
          'LocalPOS is online software that helps businesses in India with billing, point of sale, inventory, purchases, payments, customers and reports. We may add, change or remove features over time.',
          'We work to keep the Service available, but we do not promise that it will be uninterrupted or free of errors. Maintenance, internet problems and failures of third-party services may affect it. [Add any availability commitment, if one is offered.]',
        ],
      },
      {
        heading: 'Your account',
        paragraphs: ['To use the Service you need an account. You agree to:'],
        items: [
          'give accurate and current information and keep it up to date;',
          'be at least 18 years old and able to enter into a binding contract;',
          'keep your login details confidential and make sure only authorised people in your business use them;',
          'take responsibility for everything done through your account, including by your staff;',
          'tell us promptly at info@localpos.in if you suspect unauthorised use.',
        ],
      },
      {
        heading: 'Acceptable use',
        paragraphs: ['You agree not to use the Service to:'],
        items: [
          'break any law, or to issue false, misleading or fake invoices or records;',
          'attempt to access accounts, systems or data that are not yours, or interfere with how the Service works;',
          'upload malicious code or overload the Service;',
          'copy, reverse engineer or resell the Service, except as the law allows or we agree in writing;',
          'share your access with people outside your business.',
        ],
      },
      {
        heading: 'Your data',
        paragraphs: [
          'You own the information you enter into the Service (“Your Data”), including your items, invoices, customers and reports. You give us permission to host, process, back up and display Your Data as needed to provide the Service and as described in the Privacy Policy.',
          'You are responsible for the accuracy and legality of Your Data and for having the right to enter personal information about your own customers and staff. You can export Your Data as described in [data export arrangement].',
        ],
      },
      {
        heading: 'Subscriptions and payment',
        paragraphs: ['Some parts of the Service are paid. The details of your plan are as follows.'],
        items: [
          'Plans and prices: shown on our pricing page or in your order. Current fees: [plan names, fees and billing cycle].',
          'Payment methods: UPI, debit and credit cards, net banking and wallets, through Razorpay.',
          'Renewal: subscriptions renew at the end of each billing period unless you cancel first. [Confirm auto-renewal terms.]',
          'Taxes: fees are [inclusive or exclusive] of GST and any other applicable taxes.',
          'Late payment: we may suspend access if a payment is overdue by more than [number of days] days.',
          'Price changes: we will give you at least [notice period] notice before a price change applies to you.',
          'Refunds: handled under our Refund Policy.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'The Service, including its software, design, text, logos and trademarks, belongs to Thukal Innovatives LLP or its licensors. While your subscription is active, we give you a limited, non-exclusive, non-transferable right to use the Service for your own business.',
          'You keep ownership of Your Data. If you send us feedback or suggestions, we may use them to improve the Service without owing you anything for them.',
        ],
      },
      {
        heading: 'Tax and invoice responsibility',
        paragraphs: [
          'LocalPOS helps you create invoices and keep business records, but you remain responsible for the accuracy of what you enter and for following the tax and other laws that apply to your business. That includes your GSTIN, HSN codes, tax rates, prices, discounts and customer details, as well as filing returns and keeping the records the law requires.',
          'The Service is not tax, legal or accounting advice. Tax rules and rates change, so please consult your chartered accountant or tax adviser. We are not responsible for penalties, interest or losses that result from incorrect data or settings.',
        ],
      },
      {
        heading: 'Disclaimers and limitation of liability',
        paragraphs: [
          'To the extent permitted by law, the Service is provided “as is” and “as available”, and we do not give any warranty that it will meet every requirement of your business, including any implied warranties of fitness for a particular purpose.',
          'To the extent permitted by law, we are not liable for indirect, incidental, special or consequential loss, or for loss of profit, revenue, data or goodwill. Our total liability for any claim arising out of these Terms is limited to the fees you paid us in the [number of months] months before the claim. [Confirm the liability cap with your lawyer.]',
          'Nothing in these Terms limits any liability that cannot be limited by law.',
        ],
      },
      {
        heading: 'Termination',
        paragraphs: [
          'You can cancel your subscription at any time as described in [cancellation method]. Unless our Refund Policy says otherwise, cancellation takes effect at the end of the current billing period.',
          'We may suspend or end your access if you break these Terms, do not pay, or if we are required to by law. Where reasonable, we will give you notice first.',
          'After your access ends, we will keep Your Data available for export for [export period in days] days and then delete it as described in the Privacy Policy. Terms that by their nature should continue, such as those on intellectual property, disclaimers, liability and governing law, will continue.',
        ],
      },
      {
        heading: 'Governing law, changes and contact',
        paragraphs: [
          'These Terms are governed by the laws of India. The courts at [governing city and state], India will have jurisdiction over any dispute. [Add an arbitration clause here if one is wanted.] Before starting a dispute, please contact us so we can try to resolve it informally.',
          'We may update these Terms from time to time. If a change is significant, we will give you at least [notice period] notice by email or in the Service. If you keep using the Service after a change takes effect, you accept the updated Terms.',
          'Questions about these Terms can be sent to Thukal Innovatives LLP, 39/3A, 12th Ward, Eswari Garden, Kannankurichi, Salem 636008, Tamil Nadu, India, or info@localpos.in.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'refund-policy',
    path: '/refund-policy/',
    title: 'Refund Policy',
    seoTitle: 'Refund Policy | LocalPOS',
    seoDescription:
      'Read the LocalPOS refund policy: our free demo, how to cancel your subscription, when refunds apply, what is not refundable and how to request one.',
    updated: '2026-10-06',
    intro:
      'This Refund Policy explains how cancellations and refunds work for LocalPOS subscriptions provided by Thukal Innovatives LLP.',
    sections: [
      {
        heading: 'Scope of this policy',
        paragraphs: [
          'This policy applies to paid subscriptions to LocalPOS bought directly from us. It should be read together with our Terms and Conditions. If something here conflicts with a written order or agreement we made with you, that agreement applies.',
        ],
      },
      {
        heading: 'Free demo',
        paragraphs: [
          'We offer a free demo so you can see how LocalPOS works with your own items and workflow before you decide to subscribe. The demo is free of charge, so there is nothing to refund.',
        ],
      },
      {
        heading: 'Subscriptions and billing',
        paragraphs: [
          'Paid plans are billed in advance for each billing period, as shown on our pricing page or in your order. Current plans and billing cycles: [plan names and billing cycles].',
        ],
      },
      {
        heading: 'Cancelling your subscription',
        paragraphs: [
          'You can cancel at any time as described in [cancellation method]. When you cancel, your subscription stays active until the end of the billing period you have already paid for, and it will not renew after that.',
          'Cancelling stops future charges. It does not by itself refund a payment that has already been made, except as set out in this policy.',
        ],
      },
      {
        heading: 'Refund eligibility',
        paragraphs: ['You may be eligible for a refund in these situations:'],
        items: [
          'You ask for a refund within [refund window in days] days of your first payment for a plan. [Confirm whether renewal payments are covered.]',
          'You were charged twice for the same period, or charged an amount that does not match your plan. These are refunded in full, whenever you tell us.',
          'A technical problem with the Service stopped you from using it, you reported it to support within [number of days] days, and we could not fix it in a reasonable time.',
        ],
      },
      {
        heading: 'What is not refundable',
        paragraphs: ['Unless the law requires otherwise, we do not refund:'],
        items: [
          'payments requested after the refund window has passed;',
          'the unused part of a billing period after you cancel, [confirm whether pro-rata refunds are offered];',
          'one-time services such as data migration, setup or training once they have been delivered;',
          'third-party hardware, such as printers or barcode scanners, bought from other sellers;',
          'accounts closed or suspended for breaking our Terms and Conditions;',
          'bank, gateway or currency-conversion charges applied by your bank or payment provider.',
        ],
      },
      {
        heading: 'How to request a refund',
        paragraphs: [
          'Email info@localpos.in from the address registered on your account, with the subject “Refund request”. Please include:',
        ],
        items: [
          'your business name and registered email or phone number;',
          'the date and amount of the payment, and the invoice or payment reference;',
          'the reason for your request, with any details that help us understand it.',
        ],
      },
      {
        heading: 'How and when refunds are processed',
        paragraphs: [
          'We will review your request and reply within [response time in business days] business days. If it is approved, we will return the money to the original payment method within [processing time in business days] business days. Your bank or payment provider may take additional time to show it in your account.',
        ],
      },
      {
        heading: 'Plan changes',
        paragraphs: [
          'If you upgrade, downgrade, or add users or stores during a billing period, the charge or credit works as follows: [plan change and pro-rata policy]. Please check the details in your order before you make a change.',
        ],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          'We may update this policy from time to time. The date at the top shows when it was last changed. A change applies to payments made after the date it takes effect.',
        ],
      },
      {
        heading: 'Contact us',
        paragraphs: [
          'Thukal Innovatives LLP, 39/3A, 12th Ward, Eswari Garden, Kannankurichi, Salem 636008, Tamil Nadu, India.',
          'Email: info@localpos.in. Phone: +91 70900 06577. Support hours: [support hours].',
        ],
      },
    ],
  },
]

export const getLegal = (slug: LegalPage['slug']): LegalPage => {
  const page = LEGAL_PAGES.find((p) => p.slug === slug)
  if (!page) throw new Error(`Unknown legal page: ${slug}`)
  return page
}

import { StaticImageData } from 'next/image'

import drBao1 from '@/assets/images/dr-bao/dr-bao-1.jpg'
import drBao2 from '@/assets/images/dr-bao/dr-bao-2.jpg'
import drBao3 from '@/assets/images/dr-bao/dr-bao-3.jpg'
import drBao4 from '@/assets/images/dr-bao/dr-bao-4.png'
import smile1 from '@/assets/images/smile/smile-1.jpg'
import smile2 from '@/assets/images/smile/smile-2.jpg'
import smile3 from '@/assets/images/smile/smile-3.jpg'
import smile4 from '@/assets/images/smile/smile-4.jpg'

export interface Procedure {
  name: string
  price: {
    usd: number
    vnd: number
  }
  duration: string
}

export interface ProcedureCategory {
  name: string
  procedures: Procedure[]
}

export interface Clinic {
  id: number
  name: string
  thumbnail: StaticImageData
  images: StaticImageData[]
  description: string
  procedureCategories: ProcedureCategory[]
}

export interface Package {
  name: string
  price: number
  features: string[]
}

export const clinics: Clinic[] = [
  {
    id: 1,
    name: 'Dr.Bao Dental Clinic',
    thumbnail: drBao1,
    images: [drBao2, drBao3, drBao4],
    description: 'Modern dental clinic in the heart of Da Nang with state-of-the-art equipment.',
    procedureCategories: [
      {
        name: 'Implant Procedures',
        procedures: [
          {
            name: 'Single Implant',
            price: { usd: 1200, vnd: 29000000 },
            duration: '2-3 hours'
          },
          {
            name: 'Multiple Implants (3 teeth)',
            price: { usd: 3200, vnd: 77000000 },
            duration: '4-5 hours'
          },
          {
            name: 'All-on-4 Implants',
            price: { usd: 8500, vnd: 205000000 },
            duration: '6-8 hours'
          }
        ]
      },
      {
        name: 'Cosmetic Dentistry',
        procedures: [
          {
            name: 'Porcelain Crown',
            price: { usd: 500, vnd: 12000000 },
            duration: '1-2 hours'
          },
          {
            name: 'Dental Veneers (per tooth)',
            price: { usd: 400, vnd: 9600000 },
            duration: '1-2 hours'
          },
          {
            name: 'Teeth Whitening',
            price: { usd: 300, vnd: 7200000 },
            duration: '1-1.5 hours'
          }
        ]
      },
      {
        name: 'General Dentistry',
        procedures: [
          {
            name: 'Tooth Filling',
            price: { usd: 50, vnd: 1200000 },
            duration: '30-45 mins'
          },
          {
            name: 'Root Canal Treatment',
            price: { usd: 250, vnd: 6000000 },
            duration: '1-2 hours'
          },
          {
            name: 'Deep Cleaning',
            price: { usd: 100, vnd: 2400000 },
            duration: '1 hour'
          }
        ]
      },
      {
        name: 'Orthodontics',
        procedures: [
          {
            name: 'Traditional Braces',
            price: { usd: 2500, vnd: 60000000 },
            duration: '18-24 months'
          },
          {
            name: 'Clear Aligners',
            price: { usd: 3500, vnd: 84000000 },
            duration: '12-18 months'
          },
          {
            name: 'Retainers',
            price: { usd: 200, vnd: 4800000 },
            duration: '30 mins'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Smile Dental Clinic',
    thumbnail: smile1,
    images: [smile2, smile3, smile4],
    description: 'Modern dental clinic in the heart of Da Nang with state-of-the-art equipment.',
    procedureCategories: [
      {
        name: 'Implant Procedures',
        procedures: [
          { name: 'Single Implant', price: { usd: 1200, vnd: 29000000 }, duration: '2-3 hours' },
          { name: 'Multiple Implants', price: { usd: 2200, vnd: 77000000 }, duration: '3-4 hours' }
        ]
      },
      {
        name: 'Crowns/Veneers',
        procedures: [
          { name: 'Porcelain Crown', price: { usd: 500, vnd: 12000000 }, duration: '1-2 hours' },
          { name: 'Dental Veneers', price: { usd: 400, vnd: 9600000 }, duration: '1-2 hours' }
        ]
      }
      // Add more categories as needed
    ]
  }
  // Add more clinics here
]

export const packages: Package[] = [
  {
    name: 'Basic',
    price: 19,
    features: [
      'Assistance with dental clinic bookings',
      'Online support via WhatsApp, Viber, and Facebook'
    ]
  },
  {
    name: 'Silver',
    price: 39,
    features: [
      'Includes all features of the Basic package',
      'Professional translation services',
      'Medical document translation',
      'On-site interpreter during treatment (2-3 hours)'
    ]
  },
  {
    name: 'Gold',
    price: 99,
    features: [
      'Includes all features of the Silver package',
      'Extended on-site interpreter service during treatment (4-5 hours)',
      'Airport pickup and drop-off (up to 30 km)',
      'Transportation to and from the dental clinic (up to 30 km)'
    ]
  }
]

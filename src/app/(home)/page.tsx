'use client'

import { Banner } from './banner'
import { HowItWorks } from './how-it-works'
import { Testimonials } from './testimonial'

export default function Home() {
  return (
    <>
      <Banner />
      <div id='how-it-works'>
        <HowItWorks />
      </div>
      <div id='reviews'>
        <Testimonials />
      </div>
    </>
  )
}

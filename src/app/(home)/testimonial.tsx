'use client'

import { Star } from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

const testimonials = [
  {
    stars: 5,
    content:
      "I had my dental work done here and saved over 70% compared to prices back home. The facilities are modern and the dentists are highly skilled. Couldn't be happier with the results!",
    author: '- Sarah, Australia'
  },
  {
    stars: 5,
    content:
      "World-class dental care in a beautiful city. The staff speaks English well, and the treatment quality matches what you'd find in the US or Europe, but at a fraction of the cost.",
    author: '- Michael, United States'
  },
  {
    stars: 5,
    content:
      'From airport pickup to treatment completion, everything was perfectly organized. The clinic is state-of-the-art and the dentists are very professional. Highly recommend!',
    author: '- David, UK'
  }
]

export function Testimonials() {
  return (
    <section className='py-16 px-4 bg-muted/50'>
      <div className='max-w-screen-xl mx-auto'>
        <h2 className='text-3xl font-bold text-center mb-12'>What Our Patients Say</h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className='border-none shadow-lg dark:bg-gray-800'>
              <CardHeader>
                <div className='flex gap-1'>
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className='w-5 h-5 fill-rose-500 text-rose-500' />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground mb-4'>{testimonial.content}</p>
                <p className='font-semibold text-foreground'>{testimonial.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

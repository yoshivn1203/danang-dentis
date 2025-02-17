'use client'

import { Check } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: {
    title: string
    description?: string
  }[]
  currentStep: number
}

export function Steps({ steps, currentStep, className, ...props }: StepsProps) {
  return (
    <div className={cn('space-y-8', className)} {...props}>
      {steps.map((step, index) => (
        <div key={index} className='relative'>
          <div className='flex items-center gap-4'>
            <div
              className={cn(
                'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-white',
                currentStep > index + 1
                  ? 'border-rose-600 bg-rose-600 text-white'
                  : currentStep === index + 1
                    ? 'border-rose-600 text-rose-600'
                    : 'border-gray-300 text-gray-500'
              )}
            >
              {currentStep > index + 1 ? <Check className='h-4 w-4' /> : <span>{index + 1}</span>}
            </div>
            <div className='flex flex-col'>
              <span
                className={cn(
                  'text-sm font-medium leading-none',
                  currentStep >= index + 1 ? 'text-rose-600' : 'text-gray-500'
                )}
              >
                {step.title}
              </span>
              {step.description && (
                <span className='mt-1 text-sm text-gray-500'>{step.description}</span>
              )}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className='absolute left-3.5 h-[calc(100%-24px)] w-[2px] bg-gray-200'>
              <div
                className='h-full w-full bg-rose-600 transition-all duration-200'
                style={{
                  transform: `scaleY(${currentStep > index + 1 ? 1 : 0})`,
                  transformOrigin: 'top'
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

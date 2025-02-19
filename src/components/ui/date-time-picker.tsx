import { format } from 'date-fns'
import { Calendar as CalendarIcon, X } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface DateTimePicker24hProps {
  date: Date | undefined
  // eslint-disable-next-line no-unused-vars
  setDate: (date: Date) => void
  disablePastDates?: boolean
}

export function DateTimePicker24h({
  date,
  setDate,
  disablePastDates = false
}: DateTimePicker24hProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const hours = Array.from({ length: 24 }, (_, i) => i)

  // Get current date with time set to start of day
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      if (date) {
        selectedDate.setHours(date.getHours(), date.getMinutes())
      }
      setDate(selectedDate)
    }
  }

  const handleTimeChange = (type: 'hour' | 'minute', value: string) => {
    if (date) {
      const newDate = new Date(date)
      if (type === 'hour') {
        newDate.setHours(parseInt(value))
      } else if (type === 'minute') {
        newDate.setMinutes(parseInt(value))
      }
      setDate(newDate)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-full justify-start text-left font-normal group relative',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? (
            <span className='flex-1'>
              {format(date, 'MM/dd/yyyy HH:mm')}
              <span
                role='button'
                className='absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-70 cursor-pointer p-1'
                onClick={e => {
                  e.stopPropagation()
                  setDate(undefined as any)
                }}
              >
                <X className='h-4 w-4' />
              </span>
            </span>
          ) : (
            <span>MM/DD/YYYY HH:mm</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <div className='sm:flex'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            disabled={disablePastDates ? date => date < today : undefined}
          />
          <div className='flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'>
            <ScrollArea className='w-64 sm:w-auto'>
              <div className='flex sm:flex-col p-2'>
                {hours.reverse().map(hour => (
                  <Button
                    key={hour}
                    size='icon'
                    variant={date && date.getHours() === hour ? 'default' : 'ghost'}
                    className='sm:w-full shrink-0 aspect-square'
                    onClick={() => handleTimeChange('hour', hour.toString())}
                  >
                    {hour.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation='horizontal' className='sm:hidden' />
            </ScrollArea>
            <ScrollArea className='w-64 sm:w-auto'>
              <div className='flex sm:flex-col p-2'>
                {Array.from({ length: 12 }, (_, i) => i * 5).map(minute => (
                  <Button
                    key={minute}
                    size='icon'
                    variant={date && date.getMinutes() === minute ? 'default' : 'ghost'}
                    className='sm:w-full shrink-0 aspect-square'
                    onClick={() => handleTimeChange('minute', minute.toString())}
                  >
                    {minute.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation='horizontal' className='sm:hidden' />
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

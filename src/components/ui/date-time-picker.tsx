import { format } from 'date-fns'
import { Calendar as CalendarIcon, X } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
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
    const newDate = date ? new Date(date) : new Date()
    if (!date) {
      newDate.setHours(0)
      newDate.setMinutes(0)
    }
    if (type === 'hour') {
      newDate.setHours(parseInt(value))
    } else if (type === 'minute') {
      newDate.setMinutes(parseInt(value))
    }
    setDate(newDate)
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
        <div className='flex flex-col'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            disabled={disablePastDates ? date => date < today : undefined}
          />
          <div className='border-t p-4'>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <div className='text-sm text-muted-foreground'>Hour:</div>
                <select
                  className='w-14 rounded-md border border-input bg-background px-2 py-1 text-sm [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300'
                  value={date ? date.getHours() : 0}
                  onChange={e => handleTimeChange('hour', e.target.value)}
                >
                  {hours.map(hour => (
                    <option key={hour} value={hour}>
                      {hour.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex items-center gap-2'>
                <div className='text-sm text-muted-foreground'>Minute:</div>
                <select
                  className='w-14 rounded-md border border-input bg-background px-2 py-1 text-sm'
                  value={date ? date.getMinutes() : 0}
                  onChange={e => handleTimeChange('minute', e.target.value)}
                >
                  {Array.from({ length: 12 }, (_, i) => i * 5).map(minute => (
                    <option key={minute} value={minute}>
                      {minute.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

'use client'

import { Trash2 } from 'lucide-react'

import type { Book } from '@/api/books-api'
import { useDeleteBookMutation, useGetBooksQuery } from '@/api/books-api'
import { Button } from '@/components/ui/button'

import { CreateBookModal } from './create-book-modal'

interface ClientBooksProps {
  initialBooks: Book[]
}

export function ClientBooks({ initialBooks }: ClientBooksProps) {
  const { data: books = initialBooks, refetch } = useGetBooksQuery()
  const [deleteBook] = useDeleteBookMutation()

  return (
    <div className='flex flex-col items-center justify-center py-8'>
      <h1 className='text-2xl font-bold mb-4'>Books List</h1>
      <ul className='space-y-2 mb-4'>
        {books?.map(book => (
          <li key={book.id} className='p-2 border rounded flex justify-between items-center'>
            <span>
              {book.name} by {book.authorName}
            </span>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => deleteBook(book.id)}
              className='ml-6'
            >
              <Trash2 className='h-4 w-4 text-destructive' />
            </Button>
          </li>
        ))}
      </ul>
      <div className='space-x-2'>
        <CreateBookModal />
        <Button variant='outline' size='default' onClick={() => refetch()}>
          Refresh Books
        </Button>
      </div>
    </div>
  )
}

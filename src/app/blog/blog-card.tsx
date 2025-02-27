import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import type { Post } from './actions'

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className='h-full overflow-hidden hover:shadow-lg transition-shadow'>
        {post.thumbnail && (
          <div className='relative w-full h-48'>
            <Image src={post.thumbnail} alt={post.title} fill className='object-cover' />
          </div>
        )}
        <CardHeader>
          <CardTitle className='line-clamp-2'>{post.title}</CardTitle>
          <div className='text-sm text-muted-foreground'>
            {new Date(post.date).toLocaleDateString()}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className='line-clamp-3'>{post.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}

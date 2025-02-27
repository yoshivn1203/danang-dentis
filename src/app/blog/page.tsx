'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { type Post, getPosts } from './actions'
import { BlogCard } from './blog-card'

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [categories, setCategories] = useState<string[]>(['All'])

  useEffect(() => {
    getPosts().then(posts => {
      setPosts(posts)
      setCategories(['All', ...new Set(posts.map(post => post.category))])
    })
  }, [])

  const filteredPosts =
    activeCategory === 'All' ? posts : posts.filter(post => post.category === activeCategory)

  return (
    <Card className='p-6'>
      <CardHeader>
        <CardTitle className='text-3xl font-bold'>Blog Posts</CardTitle>
        <div className='flex flex-wrap gap-2 mt-4'>
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category)}
              size='sm'
            >
              {category}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredPosts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

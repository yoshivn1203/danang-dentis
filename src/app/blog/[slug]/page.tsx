import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { getPostBySlug } from '../actions'

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  return (
    <article className='container mx-auto px-4 py-8'>
      <div className='prose prose-lg dark:prose-invert max-w-none'>
        <h1 className='text-4xl font-bold mb-4'>{post.title}</h1>
        <div className='mb-8'>
          <time className='text-muted-foreground'>{new Date(post.date).toLocaleDateString()}</time>
        </div>
        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt={post.title}
            className='w-full h-[400px] object-cover rounded-lg mb-8'
          />
        )}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  )
}

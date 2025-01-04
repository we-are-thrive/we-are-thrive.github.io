import { defineCollection, z } from 'astro:content';

// Define your collections here
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }).optional()
  })
});

export const collections = {
  'blog': blog
}; 
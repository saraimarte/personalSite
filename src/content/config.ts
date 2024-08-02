import { defineCollection, z } from 'astro:content';
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    author: z.string(),
    tags: z.array(z.string()),
    phase: z.string()
  }),
});


const bibleCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    author: z.string(),
    tags: z.array(z.string()),
    phase: z.string()
  }),
});


export const collections = {
  blog: blogCollection,
  bible: bibleCollection
};
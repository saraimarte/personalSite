// src/content/config.js
import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string().default('Sarai Marte'),
    tags: z.array(z.string()),
    date: z.string().transform(str => new Date(str)),
    draft: z.boolean().default(true),
    description: z.string(),
    featured: z.boolean(),
    language: z.enum(['en', 'es']),
  }),
});

export const collections = {
  'blog': blogCollection,
};


import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export const GET: APIRoute = async (): Promise<Response> => {
  // Fetch all blog posts
  const allBlogArticles: CollectionEntry<'blog'>[] = await getCollection('blog');

  // Sort blog posts by pubDate in descending order, treating dates as UTC
  const sortedBlogArticles = allBlogArticles.sort((a, b) => {
    const dateA = new Date(a.data.pubDate).getTime();
    const dateB = new Date(b.data.pubDate).getTime();
    return dateB - dateA;
  });

  // Map the sorted collection to include both data and slug
  const blogData = sortedBlogArticles.map(article => ({
    ...article.data, // Spread the post data
    slug: article.slug // Add the slug
  }));

  return new Response(JSON.stringify(blogData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

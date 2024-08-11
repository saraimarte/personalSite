import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { formatDate } from '../../utils';

export const GET: APIRoute = async (): Promise<Response> => {
  // Fetch all blog posts
  const allBlogArticles: CollectionEntry<'blog'>[] = await getCollection('blog');

  // Sort blog posts by pubDate in descending order
  const sortedBlogArticles = allBlogArticles.sort((a, b) => {
    return new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime();
  });

  // Map the sorted collection to include both data and slug
  const blogData = sortedBlogArticles.map(article => ({
    ...article.data, // Spread the post data
    slug: article.slug, // Add the slug
    pubDate: formatDate(new Date(article.data.pubDate)) // Format pubDate
  }));

  return new Response(JSON.stringify(blogData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

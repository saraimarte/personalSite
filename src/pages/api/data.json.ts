import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export const GET: APIRoute = async (): Promise<Response> => {
  // Fetch all blog posts
  const allBlogArticles: CollectionEntry<'blog'>[] = await getCollection('blog');

  // Convert and sort blog posts by pubDate in descending order, treating dates as UTC
  const sortedBlogArticles = allBlogArticles.sort((a, b) => {
    const dateA = new Date(a.data.pubDate).getTime();
    const dateB = new Date(b.data.pubDate).getTime();
    return dateB - dateA;
  });

  // Map the sorted collection to include both data and slug
  const blogData = sortedBlogArticles.map(article => {
    // Format the date to ISO string in UTC
    const pubDateUTC = new Date(article.data.pubDate).toISOString();

    return {
      ...article.data, // Spread the post data
      slug: article.slug, // Add the slug
      pubDate: pubDateUTC, // Add the formatted UTC date
    };
  });

  return new Response(JSON.stringify(blogData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};


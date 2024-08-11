import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export const GET: APIRoute = async (): Promise<Response> => {
  // Fetch all blog posts
  const allBlogArticles: CollectionEntry<'blog'>[] = await getCollection('blog');

  // Log raw pubDate values for debugging
  console.log('Raw pubDate values:', allBlogArticles.map(article => article.data.pubDate));

  // Sort blog posts by pubDate in descending order
  const sortedBlogArticles = allBlogArticles.sort((a, b) => {
    // Parse dates as UTC to avoid time zone issues
    const dateA = new Date(a.data.pubDate + 'Z').getTime(); // Append 'Z' to ensure UTC parsing
    const dateB = new Date(b.data.pubDate + 'Z').getTime(); // Append 'Z' to ensure UTC parsing
    return dateB - dateA;
  });

  // Map the sorted collection to include both data and slug
  const blogData = sortedBlogArticles.map(article => {
    // Ensure pubDate is correctly formatted in UTC
    const pubDateUTC = new Date(article.data.pubDate + 'Z').toISOString();

    return {
      ...article.data, // Spread the post data
      slug: article.slug, // Add the slug
      pubDate: pubDateUTC, // Add the formatted UTC date
    };
  });

  // Return the response
  return new Response(JSON.stringify(blogData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// d:\GoalSphere\goalsphere\src\lib\cms.ts

// To connect to your Hygraph project, you need to provide the endpoint and an API access token.
// Go to your Hygraph project dashboard, navigate to Project Settings > API Access.
// 1. Under "Content API", find your Content API endpoint.
// 2. Create a new Permanent Auth Token or use an existing one.
// 3. Make sure the token has permissions to read content.
// 4. Add both the endpoint and the token to your .env.local file.

const HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
const HYGRAPH_API_TOKEN = process.env.HYGRAPH_API_TOKEN;

interface Thumbnail {
  url: string;
}

export interface NewsArticle {
  title: string;
  slug: string;
  excerpt: string;
  published: string;
  thumbnail: Thumbnail;
  content?: string; // Plain string, not RichText
}

interface NewsData {
  news: NewsArticle[];
}

/**
 * Fetches data from Hygraph using a GraphQL query.
 * @param query The GraphQL query string.
 * @returns The fetched data.
 */
export async function fetchHygraphQuery<T>(query: string): Promise<T> {
  console.log('Connecting to Hygraph endpoint:', HYGRAPH_ENDPOINT); // Added for debugging

  if (!HYGRAPH_ENDPOINT) {
    throw new Error('HYGRAPH_ENDPOINT is not configured');
  }

  const response = await fetch(HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Uncomment the next line if you have an API token
      Authorization: `Bearer ${HYGRAPH_API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
    // Add cache to reduce API calls
    next: { revalidate: 120 }, // Cache for 2 minutes
  });

  if (!response.ok) {
    console.error('Hygraph query failed:', response.status, response.statusText);
    throw new Error('Failed to fetch data from Hygraph.');
  }

  const json = await response.json();

  if (json.errors) {
    console.error('Hygraph query errors:', json.errors);
    console.error('Query that failed:', query);
    throw new Error('Failed to fetch data from Hygraph due to GraphQL errors.');
  }

  return json.data;
}

/**
 * Query to fetch news articles list.
 */
export const getNewsQuery = `
  query GetNews {
    news(orderBy: published_DESC) {
      title
      slug
      excerpt
      published
      thumbnail {
        url
      }
    }
  }
`;

/**
 * Query to fetch single news article by slug.
 * Using array query with first() to get single item
 * Note: content is String type, not RichText
 */
export const getNewsBySlugQuery = (slug: string) => `
  query GetNewsBySlug {
    news(where: { slug: "${slug}" }, first: 1) {
      title
      slug
      excerpt
      published
      thumbnail {
        url
      }
      content
    }
  }
`;

/**
 * Fetches all news articles from Hygraph.
 * @returns A promise that resolves to an array of news articles.
 */
export async function getNews(): Promise<NewsArticle[]> {
    try {
        const data = await fetchHygraphQuery<{ news: NewsArticle[] }>(getNewsQuery);
        return data.news || [];
    } catch (error) {
        console.error('Error fetching news:', error);
        // Return empty array instead of throwing - prevents showing ads on error pages
        return [];
    }
}

/**
 * Fetches a single news article by slug from Hygraph.
 * @param slug The slug of the news article.
 * @returns A promise that resolves to a news article or null.
 */
export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
    try {
        const data = await fetchHygraphQuery<{ news: NewsArticle[] }>(getNewsBySlugQuery(slug));
        return data.news && data.news.length > 0 ? data.news[0] : null;
    } catch (error) {
        console.error('Error fetching news by slug:', slug, error);
        return null;
    }
}

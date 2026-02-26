// src/app/page.tsx
import { request, gql } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8080/graphql';

async function getPosts() {
  try {
    const query = gql`
      query GetPosts {
        posts(first: 5) {
          nodes {
            title
            slug
            date
            excerpt
          }
        }
      }
    `;
    const data: any = await request(endpoint, query);
    return data.posts.nodes || [];
  } catch (error) {
    console.error('GraphQL Error:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">وبلاگ Headless با Next.js</h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-600">
            هنوز پستی وجود ندارد یا وردپرس در دسترس نیست.  
            <br />
            <small>چک کن: http://localhost:8080/graphql</small>
          </p>
        ) : (
          <div className="grid gap-6">
            {posts.map((post: any) => (
              <article key={post.slug} className="border rounded-lg p-6 bg-white shadow-sm">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>

                {/* excerpt با suppress */}
                <div
                  className="text-gray-700 mb-4 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  suppressHydrationWarning // ← این خط کلیدی!
                />

                <a
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  ادامه مطلب →
                </a>

                {/* date با suppress */}
                <p
                  className="text-sm text-gray-500 mt-2"
                  suppressHydrationWarning // ← این هم اضافه کن
                >
                  {new Date(post.date).toLocaleDateString('fa-IR')}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// ISR: هر ۶۰ ثانیه صفحه refresh بشه (برای محتوای جدید)
export const revalidate = 60;
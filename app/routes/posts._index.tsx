import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";


export interface Post {
  userId: number
  id: number
  title: string
  body: string
}


export const loader = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return json<Post[]>(await res.json());
};

export default function Posts() {
  const posts = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.userId}>
            <Link
              to={post.userId.toString()}
              className="text-blue-600 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>

      <Button>Click me</Button>
    </main>
  );
}

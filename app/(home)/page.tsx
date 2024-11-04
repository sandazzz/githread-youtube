import { getAuthSession } from "@/lib/auth";
import { getLatestPosts } from "@/src/query/post.query";
import { Post } from "@/src/features/post/Post";

export default async function Home() {
  const session = await getAuthSession();
  const post = await getLatestPosts(session?.user.id);
  
  return (
    <div className="divide-y divide-muted">
      {post.map((p) => (
        <Post post={p} key={p.id}></Post>
      ))}
    </div>
  );
}

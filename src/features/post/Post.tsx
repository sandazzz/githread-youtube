import { PostHome } from "@/src/query/post.query";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { PostLayout } from "./PostLayout";
import LikeButton from "./LikeButton";

type PostProps = {
  post: PostHome;
};

export const Post = ({ post }: PostProps) => {
  return (
    <PostLayout user={post.user} postId={post.id} createdAt={post.createdAt}>
      <Link href={`/post/${post.id}`} className="text-sm text-foreground">
        {post.content}
      </Link>
      <div className="flex gap-2 items-center">
        {<LikeButton postId={post.id} isLiked={post.likes.length > 0} />}
        <Link
          href={`/post/${post.id}/reply`}
          className="rounded-md hover:bg-accent flex gap-1 items-center"
        >
          <MessageCircle size={20} />
        </Link>
      </div>
      <div>
        <Link
          className="text-muted-foreground text-sm"
          href={`/post/${post.id}`}
        >
          {post._count.likes} likes
        </Link>
        {" ‧ "}
        <Link
          className="text-muted-foreground text-sm"
          href={`/post/${post.id}`}
        >
          {post._count.replies} comments
        </Link>
      </div>
    </PostLayout>
  );
};

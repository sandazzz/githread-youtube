import { Button, buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import { Post } from "@/src/features/post/Post";
import { getUserProfile } from "@/src/query/user.query"
import { followUser } from "../users/[userId]/follow.action";
import Profile from "@/app/users/[userId]/Profile";
import { notFound } from "next/navigation";
import Link from "next/link";


export default async function ProfilePage() {
  const session = await getAuthSession();
  if (!session?.user.id) {
    notFound();
  }
  const user = await getUserProfile(session?.user.id);

  if (!user) {
    notFound();
  }
  return (
    <div className="">
      <Profile user={user}>
        <form className="mt-4">
          <Link href="/profile/edit"
            className={buttonVariants({
              variant: 'outline',
            })}>Edit profile</Link>
        </form>
      </Profile>
      <div className="divide-y divide-accent border-t border-accent mt-4">
        {user.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

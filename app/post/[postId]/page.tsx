export default function Post({ params }: { params: { postId: string }}) {
    return <div>{params.postId}</div>
}
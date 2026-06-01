import EditBlogContent from './EditBlogContent'

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <EditBlogContent postId={id} />
}

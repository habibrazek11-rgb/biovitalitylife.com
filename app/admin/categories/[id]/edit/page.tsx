import EditCategoryContent from './EditCategoryContent'

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="p-6 lg:p-8">
      <EditCategoryContent categoryId={id} />
    </div>
  )
}

import EditProductContent from './EditProductContent'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="p-6 lg:p-8">
      <EditProductContent productId={id} />
    </div>
  )
}

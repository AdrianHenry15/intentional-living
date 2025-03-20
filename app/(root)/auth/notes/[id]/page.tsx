import NoteForm from "@/components/notes/note-form"

// 'use client' directive is not needed in this main page because it's an async component
export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // Resolve the params promise to get the slug value
  const { id } = await params

  return (
    <div>
      <NoteForm id={id} />
    </div>
  )
}

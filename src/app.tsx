/* eslint-disable prettier/prettier */
import { ChangeEvent, useState } from 'react'

import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

interface Note {
  id: string
  date: Date
  content: string
}

export function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('@react-notes:notes')
    if (notesOnStorage) return JSON.parse(notesOnStorage)
    return []
  })

  const filteredNotes =
    search !== ''
      ? notes.filter((note) =>
        note.content.toLocaleUpperCase().includes(search.toLocaleUpperCase()),
      )
      : notes

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('@react-notes:notes', JSON.stringify(notesArray))
  }

  function onNoteDeleted(id: string) {
    const notesWithoutDeletedNote = notes.filter((note) => note.id !== id)
    setNotes(notesWithoutDeletedNote)
    localStorage.setItem(
      '@react-notes:notes',
      JSON.stringify(notesWithoutDeletedNote),
    )
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value
    setSearch(query)
  }

  return (
    <main className="mx-auto max-w-6xl my-12 space-y-6 px-8 xl:px-0">
      <img src={logo} alt="NLW Expert" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Search on your notes..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-[240px] gap-6">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note) => {
          return (
            <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
          )
        })}
      </section>
    </main>
  )
}

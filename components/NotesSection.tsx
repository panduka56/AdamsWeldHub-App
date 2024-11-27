"use client"

import { useState, useEffect } from 'react'
import { PlusCircle, X } from 'lucide-react'

interface Note {
  id: string
  content: string
  timestamp: string
}

export default function NotesSection() {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState('')

  useEffect(() => {
    const savedNotes = localStorage.getItem('welding-notes')
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  const saveNotes = (updatedNotes: Note[]) => {
    localStorage.setItem('welding-notes', JSON.stringify(updatedNotes))
    setNotes(updatedNotes)
  }

  const addNote = () => {
    if (!newNote.trim()) return
    
    const note: Note = {
      id: `note-${Date.now()}`,
      content: newNote,
      timestamp: new Date().toISOString()
    }
    
    saveNotes([...notes, note])
    setNewNote('')
  }

  const deleteNote = (id: string) => {
    saveNotes(notes.filter(note => note.id !== id))
  }

  return (
    <div>
      <h2 className="text-xl font-[350] mb-4">Notes & Bookmarks</h2>
      
      {/* Add Note Form */}
      <div className="flex gap-2 mb-6">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note or calculation..."
          className="flex-1 bg-[#1A1A1A] rounded-lg p-3 min-h-[100px] 
                     border border-[#FF8C42]/20 focus:border-[#FF8C42]/50 
                     focus:outline-none text-[#E5E5E5]"
        />
        <button
          onClick={addNote}
          className="bg-[#FF8C42]/20 hover:bg-[#FF8C42]/30 
                   text-[#FF8C42] p-3 rounded-lg transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.map((note) => (
          <div 
            key={note.id}
            className="bg-[#1A1A1A] p-4 rounded-lg border border-[#FF8C42]/20 
                     relative group"
          >
            <button
              onClick={() => deleteNote(note.id)}
              className="absolute top-2 right-2 text-[#FF8C42]/60 
                       hover:text-[#FF8C42] opacity-0 group-hover:opacity-100 
                       transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="text-[#E5E5E5] whitespace-pre-wrap">{note.content}</p>
            <p className="text-xs text-[#E5E5E5]/40 mt-2">
              {new Date(note.timestamp).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {notes.length === 0 && (
        <p className="text-[#E5E5E5]/60 text-center py-8">
          No notes yet. Add your first note above!
        </p>
      )}
    </div>
  )
} 
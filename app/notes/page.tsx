"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Search, PlusCircle, X, Edit2, Check, Download, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"

interface Note {
  id: string
  content: string
  timestamp: string
  title: string
  header?: string
}

const MotionCard = motion(Card) as typeof motion.div

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>
type TextareaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [editingTitle, setEditingTitle] = useState(false)
  const [editingHeader, setEditingHeader] = useState(false)
  const [tempTitle, setTempTitle] = useState('')
  const [tempHeader, setTempHeader] = useState('')

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

  const updateNote = (updatedNote: Note) => {
    saveNotes(notes.map(n => n.id === updatedNote.id ? updatedNote : n))
    setSelectedNote(updatedNote)
  }

  const startTitleEdit = () => {
    if (selectedNote) {
      setTempTitle(selectedNote.title)
      setEditingTitle(true)
    }
  }

  const startHeaderEdit = () => {
    if (selectedNote) {
      setTempHeader(selectedNote.header || '')
      setEditingHeader(true)
    }
  }

  const saveTitle = () => {
    if (selectedNote && tempTitle.trim()) {
      updateNote({ ...selectedNote, title: tempTitle })
      setEditingTitle(false)
    }
  }

  const saveHeader = () => {
    if (selectedNote) {
      updateNote({ ...selectedNote, header: tempHeader.trim() || undefined })
      setEditingHeader(false)
    }
  }

  const deleteNote = (id: string) => {
    saveNotes(notes.filter(note => note.id !== id))
    if (selectedNote?.id === id) {
      setSelectedNote(null)
    }
  }

  const createNewNote = () => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      content: '',
      timestamp: new Date().toISOString(),
      title: 'Untitled Note'
    }
    saveNotes([...notes, newNote])
    setSelectedNote(newNote)
  }

  const filteredNotes = notes.filter(note => 
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.header?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const exportNotes = () => {
    const dataStr = JSON.stringify(notes, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = 'welding-notes.json'

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
    toast({
      title: "Notes Exported",
      description: "Your notes have been exported successfully.",
    })
  }

  const importNotes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedNotes = JSON.parse(e.target?.result as string)
          saveNotes([...notes, ...importedNotes])
          toast({
            title: "Notes Imported",
            description: "Your notes have been imported successfully.",
          })
        } catch (err) {
          console.error('Error:', err)
        }
      }
      reader.readAsText(file)
    }
  }

  const handleFileInputClick = () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  const handleSearchChange = (e: InputChangeEvent) => {
    setSearchQuery(e.target.value)
  }

  const handleNoteContentChange = (e: TextareaChangeEvent) => {
    if (selectedNote) {
      updateNote({ ...selectedNote, content: e.target.value })
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#1A1A1A]"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-12 min-h-screen">
          {/* Sidebar */}
          <motion.div 
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            className="col-span-3 border-r border-[#FF8C42]/20 p-6"
          >
            <Link href="/" className="inline-flex items-center text-[#FF8C42] mb-8">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Calculator
            </Link>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-[350] text-white">Notes</h2>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={exportNotes}
                  className="text-[#FF8C42]"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <label>
                  <Input
                    type="file"
                    accept=".json"
                    onChange={importNotes}
                    className="hidden"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#FF8C42]"
                    onClick={handleFileInputClick}
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                </label>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={createNewNote}
                  className="text-[#FF8C42]"
                >
                  <PlusCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>

            <ScrollArea className="h-[calc(100vh-200px)]">
              <AnimatePresence>
                {filteredNotes.map((note) => (
                  <MotionCard
                    key={note.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ scale: 1.02 }}
                    style={{
                      marginBottom: "0.5rem",
                      cursor: "pointer",
                      backgroundColor: selectedNote?.id === note.id ? "rgba(255, 140, 66, 0.2)" : ""
                    }}
                    onTap={() => setSelectedNote(note)}
                  >
                    <CardContent className="p-4">
                      {note.header && (
                        <span className="text-[#FF8C42] text-sm mb-1 block">
                          {note.header}
                        </span>
                      )}
                      <h3 className="text-[#E5E5E5] font-medium mb-1">{note.title}</h3>
                      <p className="text-[#E5E5E5]/60 text-sm line-clamp-2">
                        {note.content}
                      </p>
                    </CardContent>
                  </MotionCard>
                ))}
              </AnimatePresence>
            </ScrollArea>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="col-span-9 p-6"
          >
            <AnimatePresence mode="wait">
              {selectedNote ? (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Header & Title Section */}
                  <div className="space-y-4">
                    {/* Header */}
                    {editingHeader ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tempHeader}
                          onChange={(e) => setTempHeader(e.target.value)}
                          placeholder="Add header..."
                          className="bg-[#252525] rounded-lg px-4 py-2 text-[#FF8C42] text-sm
                                   border border-[#FF8C42]/20 focus:border-[#FF8C42]/50 
                                   focus:outline-none flex-1"
                          autoFocus
                        />
                        <button
                          onClick={saveHeader}
                          className="p-2 bg-[#FF8C42]/20 hover:bg-[#FF8C42]/30 
                                   rounded-lg transition-colors"
                        >
                          <Check className="w-4 h-4 text-[#FF8C42]" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span 
                          onClick={startHeaderEdit}
                          className="text-[#FF8C42] text-sm cursor-pointer hover:text-[#FF8C42]/80"
                        >
                          {selectedNote.header || 'Add header...'}
                        </span>
                        <Edit2 
                          className="w-4 h-4 text-[#FF8C42]/60 cursor-pointer hover:text-[#FF8C42]"
                          onClick={startHeaderEdit}
                        />
                      </div>
                    )}

                    {/* Title */}
                    {editingTitle ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tempTitle}
                          onChange={(e) => setTempTitle(e.target.value)}
                          className="bg-[#252525] rounded-lg px-4 py-2 text-[#E5E5E5] text-xl
                                   border border-[#FF8C42]/20 focus:border-[#FF8C42]/50 
                                   focus:outline-none flex-1"
                          autoFocus
                        />
                        <button
                          onClick={saveTitle}
                          className="p-2 bg-[#FF8C42]/20 hover:bg-[#FF8C42]/30 
                                   rounded-lg transition-colors"
                        >
                          <Check className="w-4 h-4 text-[#FF8C42]" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <h1 
                          onClick={startTitleEdit}
                          className="text-xl text-[#E5E5E5] cursor-pointer hover:text-[#E5E5E5]/80"
                        >
                          {selectedNote.title}
                        </h1>
                        <div className="flex items-center gap-2">
                          <Edit2 
                            className="w-4 h-4 text-[#FF8C42]/60 cursor-pointer hover:text-[#FF8C42]"
                            onClick={startTitleEdit}
                          />
                          <button
                            onClick={() => deleteNote(selectedNote.id)}
                            className="text-[#FF8C42]/60 hover:text-[#FF8C42] transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Note Content */}
                  <Card className="min-h-[600px]">
                    <CardContent className="p-6">
                      <Textarea
                        value={selectedNote.content}
                        onChange={handleNoteContentChange}
                        className="min-h-[550px] bg-transparent resize-none focus:outline-none"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(255,140,66,0.1) 31px, rgba(255,140,66,0.1) 32px)',
                          lineHeight: '32px',
                          border: 'none'
                        }}
                        placeholder="Start typing..."
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="bg-[#252525] rounded-full p-4 mb-4">
                    <PlusCircle className="w-8 h-8 text-[#FF8C42]" />
                  </div>
                  <h2 className="text-xl text-[#E5E5E5] mb-2">Create a New Note</h2>
                  <p className="text-[#E5E5E5]/60">
                    Select a note from the sidebar or create a new one to get started
                  </p>
                  <button
                    onClick={createNewNote}
                    className="mt-6 px-6 py-2 bg-[#FF8C42]/20 hover:bg-[#FF8C42]/30 
                             text-[#FF8C42] rounded-lg transition-colors"
                  >
                    New Note
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
} 
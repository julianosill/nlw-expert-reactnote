import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [content, setContent] = useState('')

  function handleStartEditor() {
    setShouldShowOnboarding(false)
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)
    if (event.target.value === '') return setShouldShowOnboarding(true)
  }

  function handleAddNote(event: FormEvent) {
    event.preventDefault()

    if (content === '') return toast.error('Content must not be empty')

    onNoteCreated(content)
    setContent('')
    setShouldShowOnboarding(true)
    toast.success('Note saved successfully')
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    console.log(isSpeechRecognitionAPIAvailable)

    if (!isSpeechRecognitionAPIAvailable) {
      return alert('Speech Recognition not supported on your browser.')
    }

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()
    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.error(event)
    }

    setIsRecording(true)
    setShouldShowOnboarding(false)
    speechRecognition.start()
  }

  function handleStopRecording() {
    setIsRecording(false)
    speechRecognition?.stop()
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md bg-slate-700 flex flex-col gap-3 text-left outline-none p-5 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">Add note</span>
        <p className="text-sm leading-6 text-slate-400">
          Record a note that will be converted to audio automatically.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />

        <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:ounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="absolute right-3 top-3 p-1 bg-slate-800/50 text-slate-400 rounded-sm hover:bg-slate-800">
            <X className="size-5" />
          </Dialog.Close>

          <form className="flex flex-col flex-1">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-400">
                Add note
              </span>
              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-300">
                  <button
                    type="button"
                    className="font-medium text-lime-400 hover:underline"
                    onClick={handleStartRecording}
                  >
                    Record an audio
                  </button>{' '}
                  note or{' '}
                  <button
                    type="button"
                    className="font-medium text-lime-400 hover:underline"
                    onClick={handleStartEditor}
                  >
                    include your text
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate 400 bg-transparent resize-none flex-1 outline-none"
                  value={content}
                  onChange={handleContentChange}
                />
              )}
            </div>

            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="w-full bg-slate-900 py-4 text-center text-sm outline-none font-medium text-slate-400 group hover:text-slate-100 flex items-center gap-2 justify-center"
              >
                <div className="size-2 rounded-full bg-red-500 animate-pulse" />
                Recording...{' '}
                <span className="text-slate-500">(click to stop)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAddNote}
                className="w-full bg-lime-400 py-4 text-center text-sm outline-none font-medium text-lime-950 group hover:bg-lime-500"
              >
                <span className="group-hover:underline">Add note</span>
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

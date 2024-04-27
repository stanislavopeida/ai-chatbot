'use client'

import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { Button } from '@/components/ui/button'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { useRouter } from 'next/navigation'
import { BotMessage, Messages } from './chat'
import { nanoid } from 'nanoid'
import { UserMessage } from './chat'
import { Socket } from 'socket.io-client'

export function PromptForm({
  input,
  setInput,
  messages,
  setMessages
}: {
  input: string
  setInput: (value: string) => void
  messages: Messages
  setMessages: any
}) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const socket = new WebSocket('ws://localhost:8000/ws_test')

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  React.useEffect(() => {
    socket.onmessage = event => {
      const message = event.data
      console.log(event.data)
      setMessages([
        ...messages,
        { id: nanoid(), content: message, type: 'bot' } as BotMessage
      ])
    }
  }, [socket])

  return (
    <form
      ref={formRef}
      onSubmit={(e: any) => {
        e.preventDefault()
        e.stopPropagation()
        if (input.trim() !== '') {
          setMessages([
            ...messages,
            { id: nanoid(), content: input, type: 'user' } as UserMessage
          ])
          socket.send(input)
        }
        setInput('')
      }}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background sm:rounded-md sm:border">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div className="absolute right-0 top-[13px] sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" size="icon" disabled={input === ''}>
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}

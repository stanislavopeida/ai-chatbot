import * as React from 'react'

import { PromptForm, socket } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { Messages, UserMessage } from './chat'
import { nanoid } from 'nanoid'

export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
  messages: Messages
  setMessages: any
}

export function ChatPanel({
  input,
  setInput,
  isAtBottom,
  scrollToBottom,
  messages,
  setMessages
}: ChatPanelProps) {
  const [exampleMessages, setExampleMessages] = React.useState<string[]>([])

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {exampleMessages.map((example, index) => (
            <div
              className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                index > 1 && 'hidden md:block'
              }`}
              onClick={(e: any) => {
                e.preventDefault()
                e.stopPropagation()
                if (example.trim() !== '') {
                  setMessages([
                    ...messages,
                    {
                      id: nanoid(),
                      content: example,
                      type: 'user'
                    } as UserMessage
                  ])
                  socket.send(example)
                }
                setInput('')
              }}
            >
              {example}
            </div>
          ))}
        </div>

        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            input={input}
            setInput={setInput}
            messages={messages}
            setMessages={setMessages}
            setExampleMessages={setExampleMessages}
          />
        </div>
      </div>
    </div>
  )
}

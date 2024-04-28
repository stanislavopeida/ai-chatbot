'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { useState } from 'react'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { nanoid } from 'nanoid'

export type Messages = (UserMessage | BotMessage)[]

export type UserMessage = {
  type: 'user'
  id: string
  content: string
}

export type BotMessage = {
  type: 'bot'
  id: string
  content: string
}

export function Chat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Messages>([
    {
      type: 'bot',
      id: nanoid(),
      content: "Hi. Tell me about yourself and what you're looking for."
    } as BotMessage
  ])

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div className={cn('pb-[220px] pt-4 md:pt-10')} ref={messagesRef}>
        {messages.length ? <ChatList messages={messages} /> : undefined}
        <div className="h-px w-full" ref={visibilityRef} />
      </div>
      <ChatPanel
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  )
}

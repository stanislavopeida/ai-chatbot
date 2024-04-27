import { Separator } from '@/components/ui/separator'
import { Messages } from './chat'
import { BotMessage, UserMessage } from './messages'

export function ChatList({ messages }: { messages: Messages }) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => {
        return (
          <>
            {isUserMessage(message) ? (
              <UserMessage content={message.content} />
            ) : (
              <BotMessage content={message} />
            )}
            {index < messages.length - 1 && <Separator className="my-4" />}
          </>
        )
      })}
    </div>
  )
}

function isUserMessage(obj: any): obj is typeof UserMessage {
  return (
    obj &&
    obj.type === 'user' &&
    typeof obj.id === 'string' &&
    typeof obj.content === 'string'
  )
}

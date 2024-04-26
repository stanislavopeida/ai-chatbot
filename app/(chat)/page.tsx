import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { getMissingKeys } from '../actions'

export const metadata = {
  title: 'Next.js AI Chatbot'
}

export default async function IndexPage() {
  const missingKeys = await getMissingKeys()

  return (
    <AI>
      <Chat missingKeys={missingKeys} />
    </AI>
  )
}

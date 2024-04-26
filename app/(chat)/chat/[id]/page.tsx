import { type Metadata } from 'next'

import { getMissingKeys } from '@/app/actions'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  return {
    title: 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const missingKeys = await getMissingKeys()

  return (
    <AI>
      <Chat missingKeys={missingKeys} />
    </AI>
  )
}

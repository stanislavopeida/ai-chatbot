'use client'

import { IconMercedes, IconUser } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export function UserMessage({ content }: { content: string }) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
        <IconUser />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2">
        {content}
      </div>
    </div>
  )
}

export function BotMessage({
  content,
  className
}: {
  content: string
  className?: string
}) {
  return (
    <div className={cn('group relative flex items-start md:-ml-12', className)}>
      <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        <IconMercedes />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        {content}
      </div>
    </div>
  )
}

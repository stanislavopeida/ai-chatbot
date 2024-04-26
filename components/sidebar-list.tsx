import { clearChats, getChats } from '@/app/actions'
import { ClearHistory } from '@/components/clear-history'
import { SidebarItems } from '@/components/sidebar-items'
import { ThemeToggle } from '@/components/theme-toggle'
import { cache } from 'react'

const loadChats = cache(async (userId?: string) => {
  return await getChats(userId)
})

export async function SidebarList() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <div className="p-8 text-center">
          <p className="text-sm text-muted-foreground">No chat history</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <ThemeToggle />
        <ClearHistory clearChats={clearChats} isEnabled={false} />
      </div>
    </div>
  )
}

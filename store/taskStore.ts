import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Priority = 'Low' | 'Medium' | 'High'
type Filter = 'All' | 'Pending' | 'Done'

interface Task {
  id: string
  title: string
  priority: Priority
  done: boolean
}

interface TaskStore {
  tasks: Task[]
  activeFilter: Filter
  addTask: (title: string, priority: Priority) => void
  toggleDone: (id: string) => void
  setFilter: (filter: Filter) => void
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      activeFilter: 'All',
      addTask: (title, priority) =>
        set((state) => ({
          tasks: [...state.tasks, { id: crypto.randomUUID(), title, priority, done: false }]
        })),
      toggleDone: (id) =>
        set((state) => ({
          tasks: state.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)
        })),
      setFilter: (filter) => set({ activeFilter: filter }),
    }),
    { name: 'task-store' }
  )
)


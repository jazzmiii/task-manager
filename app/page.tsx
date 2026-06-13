'use client'
import { useState } from 'react'
import { useTaskStore } from '@/store/taskStore'

export default function Home() {
  const { tasks, activeFilter, addTask, toggleDone, setFilter } = useTaskStore()
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<'Low'|'Medium'|'High'>('Medium')

  const filtered = tasks.filter(t =>
    activeFilter === 'All' ? true : activeFilter === 'Done' ? t.done : !t.done
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 p-6">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white text-lg">✓</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
            <p className="text-sm text-gray-500">Stay organized, stay ahead</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-violet-600">{tasks.length}</div>
            <div className="text-xs text-gray-500 mt-1">Total</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-amber-500">{tasks.filter(t => !t.done).length}</div>
            <div className="text-xs text-gray-500 mt-1">Pending</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-emerald-500">{tasks.filter(t => t.done).length}</div>
            <div className="text-xs text-gray-500 mt-1">Done</div>
          </div>
        </div>

        {/* Add Task */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Add a new task</p>
          <div className="flex gap-2">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && title.trim()) { addTask(title.trim(), priority); setTitle('') }}}
              placeholder="What needs to be done?"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-400"
            />
            <select
              value={priority}
              onChange={e => setPriority(e.target.value as 'Low'|'Medium'|'High')}
              className="border border-gray-200 rounded-lg px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-400"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <button
              onClick={() => { if (title.trim()) { addTask(title.trim(), priority); setTitle('') }}}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          {(['All','Pending','Done'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeFilter === f
                  ? f === 'All' ? 'bg-violet-600 text-white'
                  : f === 'Pending' ? 'bg-amber-400 text-white'
                  : 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="flex flex-col gap-2">
          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400 bg-white rounded-2xl">
              No tasks here!
            </div>
          )}
          {filtered.map(task => (
            <div key={task.id} className={`bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 transition-opacity ${task.done ? 'opacity-60' : ''}`}>
              <button
                onClick={() => toggleDone(task.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  task.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'
                }`}
              >
                {task.done && <span className="text-xs">✓</span>}
              </button>
              <span className={`flex-1 text-sm font-medium ${task.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {task.title}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                task.priority === 'High' ? 'bg-red-100 text-red-700' :
                task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                'bg-green-100 text-green-700'
              }`}>
                {task.priority}
              </span>
              <span className="text-xs text-gray-400">{task.done ? 'Done' : 'Pending'}</span>
              <button
                onClick={() => toggleDone(task.id)}
                className="text-xs bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-lg transition-colors"
              >
                {task.done ? 'Undo' : 'Mark done'}
              </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
              }

import Topbar from './components/layout/Topbar'
import KanbanBoard from './components/kanban/KanbanBoard'

function App() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 font-sans selection:bg-emerald-500/30">
      <Topbar />
      <main className="animate-in fade-in duration-1000">
        <KanbanBoard />
      </main>
    </div>
  )
}

export default App
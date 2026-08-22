function App() {
  return (
    <div className="w-[380px] min-h-[500px] bg-slate-950 text-white p-5">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">
          ✨ WebPilot AI
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Your AI assistant for the web
        </p>
      </header>

      <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
        <p className="text-sm text-slate-400 mb-2">
          Current page
        </p>

        <p className="font-medium">
          No webpage connected yet
        </p>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium mb-3">
          What would you like to do?
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-lg bg-slate-800 hover:bg-slate-700 p-3 text-sm">
            Summarize
          </button>

          <button className="rounded-lg bg-slate-800 hover:bg-slate-700 p-3 text-sm">
            Explain
          </button>

          <button className="rounded-lg bg-slate-800 hover:bg-slate-700 p-3 text-sm">
            Key Points
          </button>

          <button className="rounded-lg bg-slate-800 hover:bg-slate-700 p-3 text-sm">
            Rewrite
          </button>
        </div>
      </div>

      <div className="mt-6">
        <textarea
          placeholder="Ask anything about this page..."
          className="w-full h-24 resize-none rounded-lg bg-slate-900 border border-slate-800 p-3 text-sm outline-none focus:border-slate-600"
        />

        <button className="w-full mt-3 rounded-lg bg-white text-slate-950 py-2.5 font-medium hover:bg-slate-200">
          Ask AI
        </button>
      </div>

      <footer className="mt-6 pt-4 border-t border-slate-800">
        <p className="text-xs text-slate-500 text-center">
          WebPilot AI · v1.0.0
        </p>
      </footer>
    </div>
  );
}

export default App;
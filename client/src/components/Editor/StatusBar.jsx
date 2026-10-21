export default function StatusBar({ cursorPos, stats, language }) {
  return (
    <div className="flex items-center justify-between px-4 py-1 bg-[#1e293b] border-t border-[#334155] text-xs text-slate-400 shrink-0">
      {/* Left */}
      <div className="flex items-center gap-4">
        <span>
          Ln {cursorPos.line}, Col {cursorPos.col}
        </span>
        {stats.selected > 0 && (
          <span className="text-indigo-400">
            ({stats.selected} selected)
          </span>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span>{stats.lines} lines</span>
        <span>{stats.chars} chars</span>
        <span className="text-slate-500">UTF-8</span>
        <span className="px-1.5 py-0.5 rounded bg-[#334155] text-slate-300 font-medium uppercase">
          {language}
        </span>
      </div>
    </div>
  )
}
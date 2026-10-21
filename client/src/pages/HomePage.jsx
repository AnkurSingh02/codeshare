import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Code2,
  Plus,
  ArrowRight,
  Radio,
  Braces,
  Image,
  Sparkles,
  Globe,
} from 'lucide-react'
import { useRoom } from '../hooks/useRoom'
import { toast } from '../components/UI/Toast'

const FEATURES = [
  {
    icon: Radio,
    title: 'Real-Time Sync',
    desc: 'See every keystroke instantly. No refresh, no delays.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    icon: Braces,
    title: '12+ Languages',
    desc: 'JavaScript, Python, Rust, C++, SQL, and more.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    icon: Image,
    title: 'Export as Image',
    desc: 'Beautiful code screenshots like Carbon or ray.so.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function HomePage() {
  const { createRoom, joinRoom } = useRoom()
  const [joinId, setJoinId] = useState('')
  const [joinError, setJoinError] = useState('')

  const handleJoin = (e) => {
    e.preventDefault()
    setJoinError('')
    if (!joinId.trim()) {
      setJoinError('Please enter a room ID or URL')
      return
    }
    const success = joinRoom(joinId)
    if (!success) {
      setJoinError('Invalid room ID')
    }
  }

  const handleCreate = () => {
    createRoom()
    toast('Room created! Share the link to collaborate.', 'success')
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col overflow-x-hidden">
      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-6 py-4"
      >
        <div className="flex items-center gap-2">
          <Code2 className="w-6 h-6 text-indigo-400" />
          <span className="text-xl font-bold text-white">
            Code<span className="text-indigo-400">Share</span>
          </span>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-white transition-colors"
        >
          <Globe className="w-5 h-5" />
        </a>
      </motion.nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-12">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-xs text-indigo-300 font-medium">
            Free & Open Source
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-white leading-tight mb-4"
        >
          Share Code{' '}
          <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Instantly
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-lg text-slate-400 text-center max-w-lg mb-10"
        >
          Create a room, share the link, and code together in real-time.
          No signup. No install. Just open and type.
        </motion.p>

        {/* CTA */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreate}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-base transition-colors shadow-lg shadow-indigo-500/20"
          >
            <Plus className="w-5 h-5" />
            Create Room
          </motion.button>

          <form onSubmit={handleJoin} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={joinId}
                onChange={(e) => { setJoinId(e.target.value); setJoinError('') }}
                placeholder="Room ID or URL"
                className={`w-full px-4 py-3.5 rounded-xl bg-[#1e293b] border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  joinError ? 'border-red-500/50' : 'border-[#334155] hover:border-[#475569]'
                }`}
              />
              {joinError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-5 left-1 text-xs text-red-400"
                >
                  {joinError}
                </motion.p>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-3.5 rounded-xl bg-[#1e293b] border border-[#334155] hover:border-indigo-500/50 hover:bg-[#334155] text-slate-300 transition-all"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>
        </motion.div>

        {/* Features */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-20 w-full max-w-2xl"
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex flex-col items-center text-center p-5 rounded-2xl bg-[#1e293b]/50 border border-[#334155]/50 hover:border-[#475569] transition-colors"
            >
              <div className={`p-2.5 rounded-xl ${f.bg} mb-3`}>
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-slate-600">
        Built with React + CodeMirror + Yjs + WebSockets
      </footer>
    </div>
  )
}
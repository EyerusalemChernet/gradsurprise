/**
 * MessageStation.jsx
 * Send messages to AstroJerry and view replies from the backend.
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame, SCENES } from '../store/gameStore'
import StarBackground from '../components/StarBackground'
import AstroJerry from '../components/AstroJerry'
import { sendMessage, getMessages } from '../utils/api'

export default function MessageStation() {
  const { setScene, visitPlanet } = useGame()
  const [tab, setTab] = useState('send')
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleBack = () => {
    visitPlanet('message')
    setScene(SCENES.GALAXY)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return
    setSending(true)
    setError(null)
    try {
      await sendMessage(name.trim(), content.trim())
      setSent(true)
      setName('')
      setContent('')
      setTimeout(() => setSent(false), 4000)
    } catch {
      setError('Could not reach the station. Is the backend running?')
    } finally {
      setSending(false)
    }
  }

  const loadMessages = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getMessages()
      setMessages(res.data)
    } catch {
      setError('Could not load messages. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (tab === 'inbox') loadMessages()
  }, [tab])

  return (
    <div className="relative w-full h-full overflow-hidden">
      <StarBackground speed={0.0001} />

      {/* Teal atmosphere */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,150,120,0.25) 0%, transparent 70%)' }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-0 right-0 text-center z-10"
      >
        <h2 className="font-space text-2xl sm:text-3xl text-teal-300 glow-text">📡 Message Station</h2>
        <p className="text-white/50 text-xs mt-1">Transmit to AstroJerry</p>
      </motion.div>

      {/* Tabs */}
      <div className="absolute top-20 left-0 right-0 flex justify-center gap-3 z-10">
        {['send', 'inbox'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1 rounded-full font-space text-xs capitalize transition-all ${
              tab === t ? 'bg-teal-600 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            {t === 'send' ? '📤 Send' : '📥 Inbox'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center pt-28 pb-20 px-4 z-5">
        <AnimatePresence mode="wait">
          {tab === 'send' ? (
            <motion.div
              key="send"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full max-w-sm"
            >
              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 p-3 rounded-xl text-center text-sm text-teal-300 font-space"
                    style={{ background: 'rgba(0,150,120,0.3)', border: '1px solid rgba(0,200,160,0.4)' }}
                  >
                    🚀 Message transmitted to AstroJerry!
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSend} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  maxLength={50}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 font-space text-sm focus:outline-none focus:border-teal-400 transition-colors"
                />
                <textarea
                  placeholder="Write your message to AstroJerry..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  maxLength={500}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 font-space text-sm focus:outline-none focus:border-teal-400 transition-colors resize-none"
                />
                {error && <p className="text-red-400 text-xs text-center">{error}</p>}
                <motion.button
                  type="submit"
                  disabled={sending || !name.trim() || !content.trim()}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-space text-sm rounded-full transition-colors"
                >
                  {sending ? '📡 Transmitting...' : '🚀 Send Message'}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="inbox"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-sm planet-scroll"
              style={{ maxHeight: 'calc(100vh - 200px)' }}
            >
              {loading && <p className="text-white/50 text-sm text-center font-space">Loading transmissions...</p>}
              {error && <p className="text-red-400 text-xs text-center">{error}</p>}
              {!loading && messages.length === 0 && !error && (
                <p className="text-white/40 text-sm text-center font-space">No messages yet. Be the first!</p>
              )}
              <div className="flex flex-col gap-3">
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl"
                    style={{ background: 'rgba(0,100,80,0.3)', border: '1px solid rgba(0,200,160,0.3)' }}
                  >
                    <p className="text-teal-300 font-space text-xs mb-1">📡 {msg.sender_name}</p>
                    <p className="text-white text-sm">{msg.content}</p>
                    {msg.reply && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-yellow-300 font-space text-xs mb-1">🐱 AstroJerry replied:</p>
                        <p className="text-white/80 text-sm italic">{msg.reply}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AstroJerry */}
      <div className="absolute bottom-16 right-4 z-10">
        <AstroJerry size={65} message="I read every message! 📡" />
      </div>

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={handleBack}
        className="absolute bottom-4 left-4 px-4 py-2 font-space text-xs text-white/70 hover:text-white border border-white/20 hover:border-white/50 rounded-full transition-colors z-10"
      >
        ← Galaxy Map
      </motion.button>
    </div>
  )
}

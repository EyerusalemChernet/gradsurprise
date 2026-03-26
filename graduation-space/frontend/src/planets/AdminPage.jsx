/**
 * AdminPage.jsx
 * Admin panel — login, read messages, send replies.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame, SCENES } from '../store/gameStore'
import { adminLogin, adminGetMessages, adminReply } from '../utils/api'

export default function AdminPage() {
  const { setScene } = useGame()
  const [token, setToken] = useState(localStorage.getItem('admin_token'))
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(null)
  const [messages, setMessages] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [replyText, setReplyText] = useState({})
  const [sending, setSending] = useState(null)
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError(null)
    try {
      const res = await adminLogin(username, password)
      localStorage.setItem('admin_token', res.data.access_token)
      setToken(res.data.access_token)
    } catch {
      setLoginError('Invalid credentials')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setToken(null)
    setMessages([])
    setLoaded(false)
  }

  const loadMessages = async () => {
    setError(null)
    try {
      const res = await adminGetMessages()
      setMessages(res.data)
      setLoaded(true)
    } catch {
      setError('Failed to load messages')
    }
  }

  const handleReply = async (id) => {
    const reply = replyText[id]
    if (!reply?.trim()) return
    setSending(id)
    try {
      await adminReply(id, reply.trim())
      setMessages(prev => prev.map(m => m.id === id ? { ...m, reply: reply.trim() } : m))
      setReplyText(prev => ({ ...prev, [id]: '' }))
    } catch {
      setError('Failed to send reply')
    } finally {
      setSending(null)
    }
  }

  return (
    <div className="relative w-full h-full overflow-auto planet-scroll"
      style={{ background: 'radial-gradient(ellipse at center, #0a0a2e 0%, #000008 100%)' }}>

      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-space text-xl text-cyan-300">⚙️ Admin Panel</h2>
          <button
            onClick={() => setScene(SCENES.GALAXY)}
            className="text-white/40 hover:text-white/80 font-space text-xs transition-colors"
          >
            ← Back
          </button>
        </div>

        {/* Login form */}
        {!token ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleLogin}
            className="flex flex-col gap-3"
          >
            <p className="text-white/50 text-sm font-space mb-2">AstroJerry Admin Access</p>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 font-space text-sm focus:outline-none focus:border-cyan-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 font-space text-sm focus:outline-none focus:border-cyan-400"
            />
            {loginError && <p className="text-red-400 text-xs">{loginError}</p>}
            <button
              type="submit"
              className="px-6 py-3 bg-cyan-700 hover:bg-cyan-600 text-white font-space text-sm rounded-full transition-colors"
            >
              Login
            </button>
          </motion.form>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex gap-3 mb-4">
              <button
                onClick={loadMessages}
                className="px-4 py-2 bg-cyan-700 hover:bg-cyan-600 text-white font-space text-xs rounded-full transition-colors"
              >
                📥 Load Messages
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white/60 font-space text-xs rounded-full transition-colors"
              >
                Logout
              </button>
            </div>

            {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

            {loaded && messages.length === 0 && (
              <p className="text-white/40 text-sm font-space">No messages yet.</p>
            )}

            <div className="flex flex-col gap-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className="p-4 rounded-2xl"
                  style={{ background: 'rgba(0,100,120,0.3)', border: '1px solid rgba(0,200,200,0.3)' }}
                >
                  <p className="text-cyan-300 font-space text-xs mb-1">
                    📡 {msg.sender_name} — {new Date(msg.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-white text-sm mb-3">{msg.content}</p>

                  {msg.reply ? (
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-yellow-300 font-space text-xs mb-1">🐱 Your reply:</p>
                      <p className="text-white/70 text-sm italic">{msg.reply}</p>
                    </div>
                  ) : (
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="Write a reply..."
                        value={replyText[msg.id] || ''}
                        onChange={e => setReplyText(prev => ({ ...prev, [msg.id]: e.target.value }))}
                        className="flex-1 px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-cyan-400"
                      />
                      <button
                        onClick={() => handleReply(msg.id)}
                        disabled={sending === msg.id}
                        className="px-3 py-2 bg-teal-700 hover:bg-teal-600 disabled:opacity-50 text-white text-xs rounded-xl transition-colors"
                      >
                        {sending === msg.id ? '...' : 'Send'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

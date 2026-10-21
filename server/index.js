const WebSocket = require('ws')
const http = require('http')
const express = require('express')
const { setupWSConnection } = require('y-websocket/bin/utils')

const app = express()
const server = http.createServer(app)

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    name: 'CodeShare WebSocket Server',
    uptime: process.uptime(),
  })
})

// WebSocket server for Yjs sync
const wss = new WebSocket.Server({ server })

wss.on('connection', (conn, req) => {
  setupWSConnection(conn, req, { gc: true })
})

const PORT = process.env.PORT || 1234

server.listen(PORT, () => {
  console.log('')
  console.log('  ✅ CodeShare Server Running')
  console.log(`  📡 WebSocket: ws://localhost:${PORT}`)
  console.log(`  🌐 Health:    http://localhost:${PORT}`)
  console.log('')
})
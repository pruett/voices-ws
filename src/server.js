import Server from 'socket.io'
const port = process.env.PORT || 8090

export function startServer (store) {
  const io = new Server().attach(port)

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  )

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS())
    socket.on('action', store.dispatch.bind(store))
  })
}

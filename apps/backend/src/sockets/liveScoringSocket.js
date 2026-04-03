export function registerLiveScoringSocket(io) {
  io.on('connection', (socket) => {
    socket.on('join_tournament', (tournamentId) => {
      socket.join(`tournament:${tournamentId}`);
    });

    socket.on('live_score_update', (payload) => {
      if (!payload?.tournamentId) return;
      io.to(`tournament:${payload.tournamentId}`).emit('live_score_update', payload);
    });
  });
}

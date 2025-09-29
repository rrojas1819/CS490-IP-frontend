function ActorCard({ actor, rank, onOpen }) {
  const handleOpen = () => {
    if (typeof onOpen === 'function') onOpen(actor)
  }
  return (
    <div className="top5ActorItem" onClick={handleOpen} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') handleOpen() }}>
      <div className="rankNumber">{rank}</div>
      <div className="actorName">{actor.first_name} {actor.last_name}</div>
    </div>
  )
}

export default ActorCard

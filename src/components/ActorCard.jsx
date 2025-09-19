function ActorCard({ actor, rank }) {
  return (
    <div className="top5ActorItem">
      <div className="rankNumber">{rank}</div>
      <div className="actorName">{actor.name}</div>
    </div>
  )
}

export default ActorCard

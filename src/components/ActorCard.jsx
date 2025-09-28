function ActorCard({ actor, rank }) {
  return (
    <div className="top5ActorItem">
      <div className="rankNumber">{rank}</div>
      <div className="actorName">{actor.first_name} {actor.last_name}</div>
    </div>
  )
}

export default ActorCard

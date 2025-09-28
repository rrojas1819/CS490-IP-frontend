import ActorCard from './ActorCard'

function ActorsSection({ actors, title = "Top 5 Actors" }) {
  return (
    <div className='top5ActorsContainer'>
      <h1 className='topActorsTitle'>{title}</h1>
      <div className='actorCardContainerTop5'>
        {actors.map((actor, index) => (
          <ActorCard 
            key={actor.actor_id} 
            actor={actor} 
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  )
}

export default ActorsSection

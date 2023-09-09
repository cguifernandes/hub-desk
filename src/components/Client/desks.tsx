/* eslint-disable camelcase */
'use client'
import useConnection from '@/hooks/useConnection'
import CardDesk from './cardDesk'

const Desks = () => {
  const { desks, client } = useConnection()

  const name = client.map((client) => client.name)

  return (
    <div className="grid grid-cols-4 gap-8 self-center py-10">
      {desks.map((desk) => (
        <CardDesk
          category={desk.category}
          createdAt={desk.createdAt}
          description={desk.description}
          imageURL={desk.imageURL}
          repo={desk.repo}
          title={desk.title}
          website={desk.website}
          key={desk.id}
          id={desk.id}
          name={name}
        />
      ))}
    </div>
  )
}

export default Desks

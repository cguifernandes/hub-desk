import Desks from '@/components/Client/desks'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Desks | Hub Desk',
}

const Dashboard = () => {
  return (
    <section
      id="desk"
      className="flex min-h-[calc(100vh_-_192px)] flex-col bg-gradient-to-b from-grey-550 to-grey-500"
    >
      <Desks />
    </section>
  )
}

export default Dashboard

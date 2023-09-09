import Desks from '@/components/Client/desks'
import Heading from '@/components/Typography/heading'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Desks | Hub Desk',
}

const Dashboard = () => {
  return (
    <main className="mt-24">
      <section className="flex min-h-[calc(100vh_-_192px)] flex-col bg-gradient-to-b from-grey-550 to-grey-500">
        <div className="mt-8 flex items-center justify-center px-10 sm:mt-14">
          <Heading size="lg" className="text-white">
            Bem-vindo(a) às suas Desks
          </Heading>
        </div>
        <Desks />
      </section>
    </main>
  )
}

export default Dashboard

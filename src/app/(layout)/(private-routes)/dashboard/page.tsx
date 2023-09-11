import Desks from '@/components/Client/Dashboard/desks'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Desks | Hub Desk',
}

const Dashboard = () => {
  return <Desks />
}

export default Dashboard

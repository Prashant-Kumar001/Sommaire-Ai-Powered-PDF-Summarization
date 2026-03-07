import { GradientBackground1 } from '@/components/common/gradient'
import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <main className='mt-20 w-full max-w-4xl mx-auto'>
      <GradientBackground1 />
    <PricingTable />
    </main>
  )
}

export default page

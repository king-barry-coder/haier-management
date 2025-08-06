
'use client'

import React from 'react'
import NavbarNew from '@/components/navbarNew'
import { HeroParallax } from '@/components/ui/hero-parallax'

const products = [
  {
    title: 'Dashboard',
    link: '#',
    thumbnail: '/dashboardOne.png',
  },

  {
    title: 'Dashboard',
    link: '#',
    thumbnail: '/dashboardTwo.png',
  },
  {
    title: 'Inventory',
    link: '#',
    thumbnail: '/inventory.png',
  },

  {
    title: 'Product',
    link: '#',
    thumbnail: '/product.png',
  },

  {
    title: 'Order Management',
    link: '#',
    thumbnail: '/orderMangeOne.png',
  },
  {
    title: 'Order Management',
    link: '#',
    thumbnail: '/orderMangeTwo.png',
  },

  {
    title: 'Order',
    link: '#',
    thumbnail: '/order.png',
  },

  {
    title: 'Order Form',
    link: '#',
    thumbnail: '/orderForm.png',
  },
]

const Landing = () => {
  return (
    <div>
      <NavbarNew />
      <HeroParallax products={products} />
    </div>
  )
}

export default Landing




// 'use client'

// import React from 'react'
// import NavbarNew from '@/components/navbarNew'
// import { ContainerScroll } from '@/components/ui/container-scroll-animation'
// import Image from 'next/image'

// const Landing = () => {
//   return (
//     <div className="relative w-[1250px] min-h-screen overflow-hidden">
     
//       <NavbarNew />

     
//       <ContainerScroll
//         titleComponent={
//         <div className="text-center space-y-4">
//           <h1 className="text-5xl font-bold text-blue-700 leading-tight">
//             Welcome to <br /> Abby Store
//           </h1>
//           <p className="text-lg text-gray-700 mt-2 max-w-xl mx-auto">
//             Abby Store is a smart e-commerce solution designed to simplify how you manage your online store — from tracking products and managing inventory to processing customer orders efficiently.
//           </p>
//           <p className="text-md text-gray-600 max-w-2xl mx-auto">
//             Our platform integrates modern sales order management with real-time inventory control, helping you grow your business and stay organized with ease.
//           </p>
//         </div>
//         }
//       >
        
//         <div className="relative w-full h-[600px]">
//           <Image
//             src="/dashboard.png"
//             alt="Background Visual"
//             fill
//             className="object-cover"
//             priority
//           />
//         </div>
//       </ContainerScroll>
//     </div>
//   )
// }

// export default Landing

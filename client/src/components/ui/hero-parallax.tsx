"use client";

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import { ShoppingCart } from "lucide-react";

// Types
interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

interface HeroParallaxProps {
  products: Product[];
}

// Main Component
export const HeroParallax = ({ products }: HeroParallaxProps) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[300vh] w-screen overflow-hidden relative flex flex-col [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />

      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="absolute top-[25%] max-w-screen z-0"
      >
        {/* First Row */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20 mt-[450px] ml-[-650px] absolute">
          {firstRow.map((product) => (
            <ProductCard key={product.title} product={product} translate={translateX} />
          ))}
        </motion.div>

        {/* Second Row */}
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard key={product.title} product={product} translate={translateXReverse} />
          ))}
        </motion.div>

        {/* Third Row */}
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard key={product.title} product={product} translate={translateX} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

// Header Component
export const Header = () => {
  return (
    <div className="relative max-w-7xl mx-auto px-4 w-full flex flex-col items-center z-10 text-center">
      <h1 className="text-2xl md:text-7xl font-bold text-blue-600">
        Abby Stores
      </h1>

      <p className="max-w-2xl text-base md:text-xl mt-8 text-neutral-700 dark:text-neutral-200">
        A smart e-commerce solution designed to simplify how you manage your online store — from tracking products and managing inventory to processing customer orders. Our platform integrates modern sales order management with real-time inventory control, helping you grow your business and stay organized with ease.
      </p>

      <div className="mt-8 flex flex-col gap-4 items-center">
        <Link href="/order">
          <Button variant="default" size="sm" className="hover:bg-white hover:text-black transition-colors">
            <ShoppingCart className="mr-2" /> Order Now
          </Button>
        </Link>

        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="secondary" size="sm" className="hover:bg-blue-500 hover:text-white transition-colors">
              Login as Trader
            </Button>
          </Link>

          <Link href="/signUp">
            <Button size="sm" className="bg-blue-500 text-white hover:bg-white hover:text-black transition-colors">
              Sign Up as Trader
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Product Card Component
export const ProductCard = ({
  product,
  translate,
}: {
  product: Product;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/product h-96 w-[30rem] relative shrink-0"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={600}
          height={600}
          className="absolute inset-0 w-full h-full object-cover object-left-top"
        />
      </a>

      <div className="absolute inset-0 bg-black opacity-0 group-hover/product:opacity-80 pointer-events-none" />
      <h2 className="absolute bottom-4 left-4 text-white opacity-0 group-hover/product:opacity-100">
        {product.title}
      </h2>
    </motion.div>
  );
};




// "use client";

// import React from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   useSpring,
//   MotionValue,
// } from "motion/react";

// import Link from "next/link";
// import { Button } from "./button";
// import { ShoppingCart } from "lucide-react";

// // Types
// interface Product {
//   title: string;
//   link: string;
//   thumbnail: string;
// }

// interface HeroParallaxProps {
//   products: Product[];
// }

// // Main Component
// export const HeroParallax = ({ products }: HeroParallaxProps) => {
//   const firstRow = products.slice(0, 5);
//   const secondRow = products.slice(5, 10);
//   const thirdRow = products.slice(10, 15);

//   const ref = React.useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   });

//   const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

//   const translateX = useSpring(
//     useTransform(scrollYProgress, [0, 1], [0, 1000]),
//     springConfig
//   );
//   const translateXReverse = useSpring(
//     useTransform(scrollYProgress, [0, 1], [0, -1000]),
//     springConfig
//   );
//   const rotateX = useSpring(
//     useTransform(scrollYProgress, [0, 0.2], [15, 0]),
//     springConfig
//   );
//   const rotateZ = useSpring(
//     useTransform(scrollYProgress, [0, 0.2], [20, 0]),
//     springConfig
//   );
//   const translateY = useSpring(
//     useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
//     springConfig
//   );
//   const opacity = useSpring(
//     useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
//     springConfig
//   );

//   return (
//     <div
//       ref={ref}
//       className="h-[300vh] w-screen overflow-hidden relative flex flex-col [perspective:1000px] [transform-style:preserve-3d]"
//     >
//       <Header />

//       <motion.div
//         style={{ rotateX, rotateZ, translateY, opacity }}
//         className="absolute top-[25%] max-w-screen z-0"
//       >
//         {/* First Row */}
//         <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20 mt-[450px] ml-[-650px] absolute">
//           {firstRow.map((product) => (
//             <ProductCard key={product.title} product={product} translate={translateX} />
//           ))}
//         </motion.div>

//         {/* Second Row */}
//         <motion.div className="flex flex-row mb-20 space-x-20">
//           {secondRow.map((product) => (
//             <ProductCard key={product.title} product={product} translate={translateXReverse} />
//           ))}
//         </motion.div>

//         {/* Third Row */}
//         <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
//           {thirdRow.map((product) => (
//             <ProductCard key={product.title} product={product} translate={translateX} />
//           ))}
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// // Header Component
// export const Header = () => {
//   return (
//     <div className="relative max-w-7xl mx-auto px-4 w-full flex flex-col items-center z-10 text-center">
//       <h1 className="text-2xl md:text-7xl font-bold text-blue-600">
//         Abby Stores
//       </h1>

//       <p className="max-w-2xl text-base md:text-xl mt-8 text-neutral-700 dark:text-neutral-200">
//         A smart e-commerce solution designed to simplify how you manage your online store — from tracking products and managing inventory to processing customer orders. Our platform integrates modern sales order management with real-time inventory control, helping you grow your business and stay organized with ease.
//       </p>

//       <div className="mt-8 flex flex-col gap-4 items-center">
//         <Link href="/order">
//           <Button variant="default" size="sm" className="hover:bg-white hover:text-black transition-colors">
//             <ShoppingCart className="mr-2" /> Order Now
//           </Button>
//         </Link>

//         <div className="flex gap-4">
//           <Link href="/login">
//             <Button variant="secondary" size="sm" className="hover:bg-blue-500 hover:text-white transition-colors">
//               Login as Trader
//             </Button>
//           </Link>

//           <Link href="/signup">
//             <Button size="sm" className="bg-blue-500 text-white hover:bg-white hover:text-black transition-colors">
//               Sign Up as Trader
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Product Card Component
// export const ProductCard = ({
//   product,
//   translate,
// }: {
//   product: Product;
//   translate: MotionValue<number>;
// }) => {
//   return (
//     <motion.div
//       style={{ x: translate }}
//       whileHover={{ y: -20 }}
//       className="group/product h-96 w-[30rem] relative shrink-0"
//     >
//       <a href={product.link} className="block group-hover/product:shadow-2xl">
//         <img
//           src={product.thumbnail}
//           alt={product.title}
//           width={600}
//           height={600}
//           className="absolute inset-0 w-full h-full object-cover object-left-top"
//         />
//       </a>

//       <div className="absolute inset-0 bg-black opacity-0 group-hover/product:opacity-80 pointer-events-none" />
//       <h2 className="absolute bottom-4 left-4 text-white opacity-0 group-hover/product:opacity-100">
//         {product.title}
//       </h2>
//     </motion.div>
//   );
// };




// "use client";
// import React from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   useSpring,
//   MotionValue,
// } from "motion/react";

// import Link from "next/link";
// import { Button } from "./button";
// import { ShoppingCart } from "lucide-react";



// export const HeroParallax = ({
//   products,
// }: {
//   products: {
//     title: string;
//     link: string;
//     thumbnail: string;
//   }[];
// }) => {
//   const firstRow = products.slice(0, 5);
//   const secondRow = products.slice(5, 10);
//   const thirdRow = products.slice(10, 15);
//   const ref = React.useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   });

//   const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

//   const translateX = useSpring(
//     useTransform(scrollYProgress, [0, 1], [0, 1000]),
//     springConfig
//   );
//   const translateXReverse = useSpring(
//     useTransform(scrollYProgress, [0, 1], [0, -1000]),
//     springConfig
//   );
//   const rotateX = useSpring(
//     useTransform(scrollYProgress, [0, 0.2], [15, 0]),
//     springConfig
//   );
//   const opacity = useSpring(
//     useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
//     springConfig
//   );
//   const rotateZ = useSpring(
//     useTransform(scrollYProgress, [0, 0.2], [20, 0]),
//     springConfig
//   );
//   const translateY = useSpring(
//     useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
//     springConfig
//   );
//   return (
//     <div
//       ref={ref}
//       className="h-[300vh] w-screen overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
//     >
//       <Header />
//       <motion.div
//         style={{
//           rotateX,
//           rotateZ,
//           translateY,
//           opacity,
//         }}
//         className="max-w-screen absolute top-[25%] z-0"
//       >
//         <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20 mt-[450px] ml-[-650px] absolute">
//           {firstRow.map((product) => (
//             <ProductCard
//               product={product}
//               translate={translateX}
//               key={product.title}
//             />
//           ))}
//         </motion.div>
//         <motion.div className="flex flex-row  mb-20 space-x-20  ">
//           {secondRow.map((product) => (
//             <ProductCard
//               product={product}
//               translate={translateXReverse}
//               key={product.title}
//             />
//           ))}
//         </motion.div>
//         <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
//           {thirdRow.map((product) => (
//             <ProductCard
//               product={product}
//               translate={translateX}
//               key={product.title}
//             />
//           ))}
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export const Header = () => {
//   return (
//     <div className="max-w-7xl relative mx-auto px-4 w-full flex flex-col justify-center items-center z-10">
//       <h1 className="text-2xl md:text-7xl font-bold text-blue-600">
//         Abby Stores
//       </h1>
//       <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200 text-center">
//         is a smart e-commerce solution designed to simplify how you manage your online store — from tracking products and managing
//         inventory to processing customer orders efficiently.
//          Our platform integrates modern sales order management with real-time inventory control, helping you grow your business and stay organized with ease.
       
//       </p>


//             <div className="flex flex-col mt-[30px]">
//               <Link href='/order'>
//                 <Button variant='default' size='sm' className=" hover:bg-white hover:text-black transition-colors"> 
//                         <ShoppingCart/> Order now
//                 </Button>
//               </Link>
//             </div>

//               {/*  Auth button */}
//                 <div className=" flex gap-4 mt-5">
//                     <Link href='/login'>
//                         <Button variant='secondary' size='sm' className="hover:bg-blue-500 hover:text-white transition-colors"> 
//                                 Login as Trader
//                         </Button>
//                     </Link>

//                     <Link href='/signup'>
//                         <Button  size='sm' className= "bg-blue-500 text-white hover:bg-white hover:text-black transition-colors"> 
//                                 sign Up as Trader
//                         </Button>
//                     </Link>
//                 </div>
//     </div>
//   );
// };

// export const ProductCard = ({
//   product,
//   translate,
// }: {
//   product: {
//     title: string;
//     link: string;
//     thumbnail: string;
//   };
//   translate: MotionValue<number>;
// }) => {
//   return (
//     <motion.div
//       style={{
//         x: translate,
//       }}
//       whileHover={{
//         y: -20,
//       }}
//       key={product.title}
//       className="group/product h-96 w-[30rem] relative shrink-0"
//     >
//       <a
//         href={product.link}
//         className="block group-hover/product:shadow-2xl "
//       >
//         <img
//           src={product.thumbnail}
//           height="600"
//           width="600"
//           className="object-cover object-left-top absolute h-full w-full inset-0"
//           alt={product.title}
//         />
//       </a>
//       <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
//       <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
//         {product.title}
//       </h2>
//     </motion.div>
//   );
// };

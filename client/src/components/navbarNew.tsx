"use client";

import { Moon, Sun, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";

const NavbarNew = () => {
  const { setTheme } = useTheme();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex items-center justify-between p-2 shadow-md bg-white dark:bg-gray-900">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/Abby.png" alt="logo" width={50} height={20} />
        <span className="font-bold text-lg hidden sm:block">MyStore</span>
      </Link>

      {/* Right side controls */}
      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Cart icon */}
        <Link href="/cartMobile" className="relative">
          <ShoppingCart size={26} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default NavbarNew;


// "use client"

// import { Moon, Sun } from "lucide-react";
// import { Button } from "./ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
// import { useTheme } from "next-themes";
// import Image from "next/image";




// const NavbarNew = () => {
//     const {setTheme} = useTheme();

//   return (
//     <div>
//         <nav className="flex items-center justify-between p-4 ml-auto">

//              <Image src="/Abby.png" alt="logo" width={50} height={20} />

//             <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                     <Button variant="outline" size="icon">
//                     <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
//                     <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
//                     <span className="sr-only">Toggle theme</span>
//                     </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                     <DropdownMenuItem onClick={() => setTheme("light")}>
//                     Light
//                     </DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => setTheme("dark")}>
//                     Dark
//                     </DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => setTheme("system")}>
//                     System
//                     </DropdownMenuItem>
//                 </DropdownMenuContent>
//                 </DropdownMenu>
               
//         </nav>
//     </div>
//   )
// }

// export default NavbarNew
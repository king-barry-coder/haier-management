"use client"

import { Bell, Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { SidebarTrigger } from "./ui/sidebar"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Input } from "./ui/input"


const Navbar = () => {
    const {setTheme} = useTheme();
  return (
    <div>
        <nav className="flex items-center justify-between p-4">
            {/* left side  */}
            <SidebarTrigger/>

           
           {/* middle */}
           <div className=" relative">
             <Input type="Search" placeholder="Search groups and products" className=" w-90 h-7 rounded-sm" />

             {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-non">
                <Bell className="text-gray-500" size={20}/>
             </div> */}

           </div>



            {/* right side */}

            <div className=" flex gap-2"> 
             {/* theme */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>

                {/* Auth Buttons
                <Link href='/login'>
                    <Button variant='secondary' size='sm'> 
                            Login
                    </Button>
                </Link>

                 <Link href='/signup'>
                    <Button variant='secondary' size='sm'> 
                            sign Up
                    </Button>
                </Link> */}
            </div>
        </nav>
    </div>
  )
}

export default Navbar
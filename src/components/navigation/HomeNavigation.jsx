"use client"

import Link from "next/link";
import { MoonIcon, SunIcon, LaptopIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useTheme } from 'next-themes';
import { 
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function HomeNavigation() {

  const { setTheme } = useTheme();

  return (
    <section className="w-full border-b border-border">
      <header className="container">
        <div className="flex h-16 items-center justify-between py-6">
          <div className="flex gap-6 md:gap-10 items-center">
            <Link href="/" className="items-center space-x-2 flex">
              <span className="text-xl font-bold inline-block">Poll</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <SunIcon className="mr-2 h-4 w-4" /> Lyst
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <MoonIcon className="mr-2 h-4 w-4" /> Mørkt
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTheme('system')}>
                  <LaptopIcon className="mr-2 h-4 w-4" /> System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ variant: 'default', size: 'default' })
              )}
            >
              Opprett en konto
            </Link>
          </div>
        </div>
      </header>
    </section>
  );
}

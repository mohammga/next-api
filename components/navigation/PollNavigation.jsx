"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { MoonIcon, SunIcon, LaptopIcon, PlusIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { MobileNav } from "@/components/navigation/MobileNav";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";

export default function PollNavigation() {
  const { setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const isHome = pathname === "/";
  const isSignup = pathname === "/signup";
  const isPoll = pathname === "/poll";
  const isPollRoute = pathname.startsWith("/poll/");

  const handleSignIn = () => {
    router.push("/");
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <section className="w-full sm:px-4 md:px-6 lg:px-8 border-b border-border">
      <header className="container p-0">
        <div className="flex h-16 items-center justify-between py-6">
          <div className="flex gap-6 md:gap-10 items-center">
            {!isHome && !isSignup && (
              <span
                className="flex text-lg cursor-pointer items-center md:hidden"
                onClick={toggleMobileMenu}
              >
                {showMobileMenu ? (
                  <span className="h-9 w-9">
                    <XMarkIcon />
                  </span>
                ) : (
                  <span className="h-9 w-9">
                    <Bars2Icon />
                  </span>
                )}
              </span>
            )}

            {(isHome || isSignup) && (
              <Link href="/" className="items-center space-x-2 flex">
                <span className="text-xl font-bold inline-block">Pollify</span>
              </Link>
            )}

            {(isPoll || isPollRoute) && (
              <Link href="/poll" className="items-center space-x-2 flex">
                <span className="text-xl font-bold inline-block">Pollify</span>
              </Link>
            )}

            {(isPoll || isPollRoute) && (
              <nav className="hidden gap-6 md:flex">
                <Link
                  className="hover:underline rounded-md text-sm font-medium transition-colors"
                  href={"/poll"}
                >
                  Pollify Community
                </Link>
                <Link
                  className="hover:underline rounded-md text-sm font-medium transition-colors"
                  href={"/poll/my-poll"}
                >
                  Mine Poll
                </Link>
                <Link
                  className="hover:underline rounded-md text-sm font-medium transition-colors"
                  href={"/poll/conducted-poll"}
                >
                  Gjennomførte Poll
                </Link>
              </nav>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {!isHome && !isSignup && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={"/poll/new"}
                      className={buttonVariants({
                        variant: "outline",
                        size: "icon",
                      })}
                    >
                      <PlusIcon className="h-[1.2rem] w-[1.2rem]" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Legg til poll</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <SunIcon className="mr-2 h-4 w-4" /> Lyst
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <MoonIcon className="mr-2 h-4 w-4" /> Mørkt
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <LaptopIcon className="mr-2 h-4 w-4" /> System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isHome && <Button onClick={handleSignUp}>Opprett konto</Button>}
            {isSignup && <Button onClick={handleSignIn}>Logg inn</Button>}
            {(isPoll || isPollRoute) && (
              <Button onClick={handleSignOut}>Logg ut</Button>
            )}
          </div>
        </div>
        {!isHome && !isSignup && showMobileMenu && (
          <MobileNav closeMenu={toggleMobileMenu} />
        )}
      </header>
    </section>
  );
}

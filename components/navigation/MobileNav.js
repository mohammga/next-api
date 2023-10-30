import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLockBody } from "@/hooks/useLockBody";
import { cn } from "@/lib/utils";

export function MobileNav({ children, closeMenu }) {
  useLockBody();
  const pathname = usePathname();

  return (
    <div className="fixed inset-0 top-14 z-50 h-full overflow-auto md:hidden transform transition-transform duration-300 ease-in-out bg-background shadow-sm">
      <div className="relative z-20 h-full p-4 text-popover-foreground">
        <nav className="flex flex-col space-y-3">
          <Link
            href={"/poll"}
            onClick={closeMenu}
            className={cn(
              "block w-full py-2 px-3 rounded-md text-sm font-medium transition-colors",
              pathname === "/poll"
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline"
            )}
          >
            Pollify Community
          </Link>

          <Link
            href={"/poll/my-poll"}
            onClick={closeMenu}
            className={cn(
              "block w-full py-2 px-3 rounded-md text-sm font-medium transition-colors",
              pathname === "/poll/my-poll"
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline"
            )}
          >
            Mine poll
          </Link>

          <Link
            href={"/poll/conducted-poll"}
            onClick={closeMenu}
            className={cn(
              "block w-full py-2 px-3 rounded-md text-sm font-medium transition-colors",
              pathname === "/poll/conducted-poll"
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline"
            )}
          >
            Gjennomførte poll
          </Link>


        </nav>

        {children}
      </div>
    </div>
  );
}

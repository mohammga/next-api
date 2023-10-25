import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLockBody } from "@/hooks/UseLockBody";

export function MobileNav({ children, closeMenu }) {
  useLockBody();
  const pathname = usePathname();

  return (
    <div className="fixed inset-0 top-14 z-50 h-full overflow-auto md:hidden transform transition-transform duration-300 ease-in-out bg-background shadow-sm">
      <div className="relative z-20 h-full p-4 text-popover-foreground">
        <nav className="flex flex-col space-y-3">
          <Link
            onClick={closeMenu}
            className="hover:underline"
            href={"/poll/new"}
          >
            Mine poll
          </Link>

          <Link
            onClick={closeMenu}
            className="hover:underline"
            href={"/poll/new"}
          >
            Gjennomførte poll
          </Link>

          <Link
            onClick={closeMenu}
            className="hover:underline"
            href={"/poll/new"}
          >
            Pollify Sammfunet
          </Link>
        </nav>
        {children}
      </div>
    </div>
  );
}

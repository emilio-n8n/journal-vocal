import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";

export default function Header() {
  return (
    <header className="p-4 border-b">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <span className="text-2xl font-bold">Journal Vocal</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/articles">
            <span className="text-lg">Mes articles</span>
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}

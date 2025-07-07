import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Journal Vocal</h1>
      <p className="mt-4 text-lg text-center">
        Commencez à enregistrer votre journée et transformez vos paroles en un magnifique article de blog.
      </p>
      <Link href="/conversation">
        <Button className="mt-8">Commencer l'enregistrement</Button>
      </Link>
    </main>
  );
}

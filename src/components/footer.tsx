import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-6 px-4 border-t">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} SearchThing
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/legal/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/legal/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="/bangs" className="hover:text-foreground transition-colors">
            Bangs
          </Link>
        </div>
      </div>
    </footer>
  )
}


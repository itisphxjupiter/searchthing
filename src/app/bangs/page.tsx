import { bangs } from "../bang"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"

export default function BangsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="w-full p-4 flex-none">
        <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
          <Link 
            href="/" 
            className="p-2 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 container max-w-5xl mx-auto px-4 py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            Bang Commands
          </h1>
          <p className="text-muted-foreground">
            Quick shortcuts to search your favorite sites directly
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bangs.map((bang) => (
            <div 
              key={bang.u}
              className="group relative overflow-hidden rounded-lg border bg-card p-6 hover:bg-accent/50 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{bang.s}</h2>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    !{bang.t}
                  </code>
                </div>
                <p className="text-sm text-muted-foreground break-all">
                  {bang.u.replace('{{{s}}}', 'query')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
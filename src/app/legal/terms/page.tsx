"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"

export default function TermsOfService() {
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

      <main className="flex-1 container max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
            <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p>
              By accessing or using SearchThing, you agree to be bound by these Terms of Service. 
              If you disagree with any part of the terms, you may not access the service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Description of Service</h2>
            <p>
              SearchThing is a web application that provides a clean interface for searching the web 
              and accessing various websites through bang commands. We redirect your searches to 
              third-party search engines and websites.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Use of the Service</h2>
            <p>
              You agree to use SearchThing only for lawful purposes and in a way that does not infringe 
              the rights of, restrict, or inhibit anyone else's use and enjoyment of the service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Third-Party Websites</h2>
            <p>
              Our service contains links to third-party websites. We are not responsible for the content, 
              privacy policies, or practices of any third-party websites. You access these websites at your own risk.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Intellectual Property</h2>
            <p>
              The design, layout, and code of SearchThing are protected by intellectual property rights. 
              You may not copy, modify, distribute, or reproduce any part of our service without prior written consent.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Limitation of Liability</h2>
            <p>
              SearchThing is provided on an "as is" and "as available" basis. We make no warranties, 
              expressed or implied, and hereby disclaim all warranties, including without limitation, 
              implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p>
              In no event shall SearchThing be liable for any indirect, incidental, special, consequential, 
              or punitive damages, including without limitation, loss of profits, data, use, goodwill, or 
              other intangible losses.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. We will notify users 
              of any changes by updating the date at the top of this page. Your continued use of the 
              service after any such changes constitutes your acceptance of the new Terms of Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p>
              <a 
                href="mailto:contact@eliasnau.dev" 
                className="text-purple-500 hover:text-purple-700 transition-colors"
              >
                contact@eliasnau.dev
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
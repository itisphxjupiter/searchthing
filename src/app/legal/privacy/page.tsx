"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicy() {
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
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Introduction</h2>
            <p>
              SearchThing ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, and store your information when you use our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Information We Collect</h2>
            <p>
              SearchThing is designed with privacy in mind. We collect minimal data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Local Storage Data:</strong> We store your preferences (such as theme settings and favorites) 
                in your browser's local storage. This data never leaves your device and is not accessible to us.
              </li>
              <li>
                <strong>Search Queries:</strong> When you perform searches, your queries are processed to direct you 
                to the appropriate search engine. We do not store your search history on our servers.
              </li>
              <li>
                <strong>Usage Data:</strong> We may collect anonymous usage statistics through our hosting provider 
                (Vercel) to help us improve our service. This includes information like browser type, device type, 
                and pages visited.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain our service</li>
              <li>Improve and optimize our website</li>
              <li>Understand how users interact with our service</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Storage</h2>
            <p>
              Your preferences are stored locally on your device using browser local storage. 
              We do not maintain user accounts or store personal information on our servers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Third-Party Services</h2>
            <p>
              Our service is hosted on Vercel, which may collect some anonymous usage data. 
              When you use bang commands or perform searches, you will be redirected to third-party 
              websites that have their own privacy policies and data collection practices.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page. You are advised to review this Privacy 
              Policy periodically for any changes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
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
"use client"

import { useState } from "react"
import { Chrome, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function AddToChrome() {
  const [copied, setCopied] = useState(false)
  const searchUrl = "https://searchthing.xyz/search?q=%s"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(searchUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div id="add-extension-button">
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          <Chrome className="mr-2 h-3 w-3" />
          Add to Chrome
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add SearchThing to Chrome</DialogTitle>
          <DialogDescription>Choose your preferred setup method</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <h3 className="font-medium text-lg">Option 1: Chrome Extension</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Automatically configure SearchThing as your default search engine and new tab page
            </p>
            <Button 
              variant="default" 
              className="w-full"
              onClick={() => window.open('https://chromewebstore.google.com/detail/searchthing/oilahejhenoeljbicconidaicggjemej', '_blank')}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Get Chrome Extension
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-lg">Option 2: Manual Setup</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Manually add SearchThing as a custom search engine in Chrome
            </p>
            <div className="flex items-center space-x-2 mb-4">
              <code className="flex-1 p-2 rounded bg-muted text-xs">{searchUrl}</code>
              <Button onClick={copyToClipboard} size="sm" variant="outline">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <ol className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Open Chrome Settings &gt; Search engines</li>
              <li>Click "Add" under "Site search"</li>
              <li>Enter "SearchThing" as the name</li>
              <li>Paste the URL in the "URL with %s in place of query" field</li>
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </div>
  )
}


"use client";

import { useState } from "react";
import { Chrome, Layers, Search, Code, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AddToChromeProps {
  onDismiss?: () => void;
}

export function AddToChrome({ onDismiss }: AddToChromeProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const searchUrl = "https://searchthing.xyz/search?q=%s";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(searchUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openChromeStore = (extensionType: "search" | "newtab") => {
    // URLs for the extensions
    const urls = {
      search: "https://chromewebstore.google.com/detail/searchthing/oilahejhenoeljbicconidaicggjemej",
      newtab: "https://chrome.google.com/webstore/detail/searchthing-new-tab/coming-soon"
    };

    window.open(urls[extensionType], "_blank");
  };

  return (
    <div id="add-extension-button">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="text-xs">
            <Chrome className="mr-2 w-3 h-3" />
            Add to Chrome
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add SearchThing to Chrome</DialogTitle>
            <DialogDescription>Choose your preferred setup method</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Option 1: Chrome Extension</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Automatically configure SearchThing as your default search engine and new tab page
              </p>
              <Button
                variant="default"
                className="w-full"
                onClick={() => window.open('https://chromewebstore.google.com/detail/searchthing/oilahejhenoeljbicconidaicggjemej', '_blank')}
              >
                <Chrome className="mr-2 w-4 h-4" />
                Get Chrome Extension
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Option 2: Manual Setup</h3>
              <Tabs defaultValue="search" className="mb-4">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="search">
                    <Search className="mr-2 w-4 h-4" />
                    Search Engine
                  </TabsTrigger>
                  <TabsTrigger value="newtab">
                    <Layers className="mr-2 w-4 h-4" />
                    New Tab Page
                  </TabsTrigger>
                  <TabsTrigger value="manual">
                    <Code className="mr-2 w-4 h-4" />
                    Manual Setup
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="search" className="mt-4">
                  <div className="flex gap-4 p-4 rounded-lg border bg-muted/30">
                    <div className="overflow-hidden flex-shrink-0 w-16 h-16 bg-white rounded-lg border">
                      <div className="flex justify-center items-center h-full">
                        <Search className="w-8 h-8 text-purple-500" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-medium">SearchThing Search Engine</h4>
                      <p className="mt-1 mb-3 text-sm text-muted-foreground">
                        Add SearchThing as a search engine in Chrome. Use bang commands directly from your address bar.
                      </p>
                      <Button
                        size="sm"
                        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 border-0 hover:from-purple-600 hover:to-pink-600"
                        onClick={() => openChromeStore("search")}
                      >
                        <Chrome className="mr-2 w-4 h-4" />
                        Add to Chrome
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="newtab" className="mt-4">
                  <div className="flex gap-4 p-4 rounded-lg border bg-muted/30">
                    <div className="overflow-hidden flex-shrink-0 w-16 h-16 bg-white rounded-lg border">
                      <div className="flex justify-center items-center h-full">
                        <Layers className="w-8 h-8 text-purple-500" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-medium">SearchThing New Tab <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">Coming Soon</span></h4>
                      <p className="mt-1 mb-3 text-sm text-muted-foreground">
                        Replace your new tab page with SearchThing for quick access to search and your favorite sites.
                      </p>
                      <Button
                        size="sm"
                        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 border-0 hover:from-purple-600 hover:to-pink-600"
                        onClick={() => openChromeStore("newtab")}
                        disabled
                      >
                        <Chrome className="mr-2 w-4 h-4" />
                        Coming Soon
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="manual" className="mt-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">Manual Setup</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Manually add SearchThing as a custom search engine in Chrome
                    </p>
                    <div className="flex items-center mb-4 space-x-2">
                      <code className="flex-1 p-2 text-xs rounded bg-muted">{searchUrl}</code>
                      <Button onClick={copyToClipboard} size="sm" variant="outline">
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <ol className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                      <li>Open Chrome Settings &gt; Search engines</li>
                      <li>Click "Add" under "Site search"</li>
                      <li>Enter "SearchThing" as the name</li>
                      <li>Paste the URL in the "URL with %s in place of query" field</li>
                    </ol>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
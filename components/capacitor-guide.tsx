"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function CapacitorGuide() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Android APK Conversion Guide</h2>
        <p className="text-muted-foreground">
          Follow these steps to convert the ScrapMaster web app into an Android APK
        </p>
      </div>

      <Tabs defaultValue="capacitor">
        <TabsList>
          <TabsTrigger value="capacitor">Capacitor</TabsTrigger>
          <TabsTrigger value="pwabuilder">PWA Builder</TabsTrigger>
        </TabsList>
        <TabsContent value="capacitor" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Converting with Capacitor</CardTitle>
              <CardDescription>
                Capacitor is Ionic's official native runtime for building web apps that run natively on iOS, Android,
                and the web
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Step 1: Install Capacitor</h3>
                <div className="bg-muted p-4 rounded-md">
                  <pre className="text-sm">
                    <code>npm install @capacitor/core @capacitor/cli @capacitor/android</code>
                  </pre>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Step 2: Initialize Capacitor</h3>
                <div className="bg-muted p-4 rounded-md">
                  <pre className="text-sm">
                    <code>npx cap init ScrapMaster com.yourcompany.scrapmaster --web-dir=out</code>
                  </pre>
                </div>
                <p className="text-sm text-muted-foreground">
                  Note: Make sure to update your next.config.js to include output: 'export' for static export
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Step 3: Build your Next.js app</h3>
                <div className="bg-muted p-4 rounded-md">
                  <pre className="text-sm">
                    <code>npm run build</code>
                  </pre>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Step 4: Add Android platform</h3>
                <div className="bg-muted p-4 rounded-md">
                  <pre className="text-sm">
                    <code>npx cap add android</code>
                  </pre>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Step 5: Copy web assets</h3>
                <div className="bg-muted p-4 rounded-md">
                  <pre className="text-sm">
                    <code>npx cap copy android</code>
                  </pre>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Step 6: Open in Android Studio</h3>
                <div className="bg-muted p-4 rounded-md">
                  <pre className="text-sm">
                    <code>npx cap open android</code>
                  </pre>
                </div>
                <p className="text-sm text-muted-foreground">
                  This will open the project in Android Studio. From there, you can build and generate an APK file.
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Step 7: Build APK in Android Studio</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>In Android Studio, go to Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</li>
                  <li>Wait for the build to complete</li>
                  <li>Click on the "locate" link in the popup to find your APK file</li>
                  <li>The APK file can now be installed on Android devices</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pwabuilder" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Converting with PWA Builder</CardTitle>
              <CardDescription>
                PWA Builder helps you build and package Progressive Web Apps for app stores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Step 1: Make your Next.js app a PWA</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>
                    Install next-pwa: <code>npm install next-pwa</code>
                  </li>
                  <li>Create a manifest.json file in the public folder</li>
                  <li>Add service worker support through next-pwa in next.config.js</li>
                  <li>Add necessary icons in the public folder</li>
                </ol>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Step 2: Deploy your PWA</h3>
                <p className="text-sm">Deploy your Next.js PWA to a hosting service like Vercel to get a public URL.</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Step 3: Use PWA Builder</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>
                    Go to{" "}
                    <a
                      href="https://www.pwabuilder.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      pwabuilder.com
                    </a>
                  </li>
                  <li>Enter your deployed PWA URL</li>
                  <li>Let PWA Builder analyze your site</li>
                  <li>Fix any issues highlighted by the tool</li>
                  <li>Click on "Build" and select "Android"</li>
                  <li>Download the generated APK file</li>
                </ol>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Step 4: Test and Distribute</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Install the APK on an Android device for testing</li>
                  <li>Make any necessary adjustments to your PWA</li>
                  <li>Generate a new APK if needed</li>
                  <li>Publish to the Google Play Store or distribute directly</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MusicIcon, UsersIcon, TrendingUpIcon, HeadphonesIcon } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-white dark:bg-gray-800 shadow-sm">
        <Link className="flex items-center justify-center" href="#">
          <MusicIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          <span className="ml-2 text-2xl font-bold text-purple-600 dark:text-purple-400">MusicStreamChoice</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-purple-700 dark:text-purple-300">
                  Let Your Fans Choose the Beat
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-300">
                  Empower your audience to curate your music stream. Create unforgettable experiences with fan-driven playlists.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
                <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:border-purple-400 dark:hover:bg-purple-900">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-purple-700 dark:text-purple-300">Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-purple-50 dark:bg-purple-900">
                <UsersIcon className="h-12 w-12 mb-2 text-purple-600 dark:text-purple-400" />
                <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300">Fan Interaction</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  Let your audience choose the music for your stream.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-purple-50 dark:bg-purple-900">
                <TrendingUpIcon className="h-12 w-12 mb-2 text-purple-600 dark:text-purple-400" />
                <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300">Real-time Voting</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  Watch as your playlist evolves with live voting.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-purple-50 dark:bg-purple-900">
                <HeadphonesIcon className="h-12 w-12 mb-2 text-purple-600 dark:text-purple-400" />
                <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300">Seamless Integration</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  Connect with popular streaming platforms easily.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-600 dark:bg-purple-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                  Ready to Revolutionize Your Music Streams?
                </h2>
                <p className="mx-auto max-w-[600px] text-purple-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of creators transforming their streams with fan-driven music choices.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-white dark:bg-gray-800" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-purple-800 hover:bg-purple-900 text-white">Sign Up</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 MusicStreamChoice. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-purple-600 dark:text-purple-400" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-purple-600 dark:text-purple-400" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

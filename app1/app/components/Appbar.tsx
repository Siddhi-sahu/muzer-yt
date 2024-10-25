"use client"
import { signIn, signOut, useSession } from "next-auth/react";

import { MusicIcon } from "lucide-react"
import Link from "next/link"

export function Appbar() {
    const session = useSession();
    return <div >
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
            {session?.data?.user && <button className="p-2 m-2 bg-blue-500" onClick={() => signOut()}>LogOut</button>}
            {!session?.data?.user && <button className="p-2 m-2 bg-blue-500" onClick={() => signIn()}>SignIn</button>}
        </nav>


    </div>
}
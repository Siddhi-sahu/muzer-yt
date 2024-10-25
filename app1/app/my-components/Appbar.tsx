"use client"
import { signIn, signOut, useSession } from "next-auth/react";

import { MusicIcon } from "lucide-react"
import Link from "next/link"

export function Appbar() {
    const session = useSession();
    return <div className="flex justify-between bg-purple-200 px-16">
        <Link className="flex items-center justify-center" href="#">
            <MusicIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <span className="ml-2 text-2xl font-bold text-purple-600 dark:text-purple-400">MusicStreamChoice</span>
        </Link>
        <div className="ml-auto flex gap-4 sm:gap-6">

            {session?.data?.user && <button className="p-2 m-2 bg-purple-600  text-white rounded" onClick={() => signOut()}>LogOut</button>}
            {!session?.data?.user && <button className="p-2 m-2 bg-purple-600  rounded text-white" onClick={() => signIn()}>SignIn</button>}
        </div>


    </div>
}
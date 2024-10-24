"use client"
import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
    const session = useSession();
    return <div className="flex justify-between">
        <div>

            muzer
        </div>
        <div>
            {session?.data?.user && <button className="p-2 m-2 bg-blue-500" onClick={() => signOut()}>LogOut</button>}
            {!session?.data?.user && <button className="p-2 m-2 bg-blue-500" onClick={() => signIn()}>SignIn</button>}
        </div>
    </div>
}
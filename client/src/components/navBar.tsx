
"use client"
import Link from "next/link"
import Image from "next/image"
import { useUserStore } from "@/store/useUserStore"

export default function NavBar() {
  const user = useUserStore((state) => state.user)
  const initial = user?.name?.trim().charAt(0).toUpperCase() || "U"
  const isContributor = user?.userType?.toUpperCase() === "CONTRIBUTOR"

  return (
    <div className="px-10 mt-5  h-10 w-full rounded-2xl  flex  items-center justify-center  ">

      <div className="flex w-full justify-start ">
        <Link href={"/"}>
          <div className="">
            <Image src="/logo.jpg" alt="logo" width={300} height={300} className="w-15"></Image>
          </div>
        </Link>

      </div>


      <div className="flex flex-row  gap-10 justify-center font-medium ">

        <div className=" p-2 rounded-xl hover:underline cursor-pointer hover:text-gray-800 transition-transform duration-300 ease-in-out hover:scale-[1.2]
          ">
          PLACES
        </div>
        <div className=" p-2 rounded-xl hover:underline cursor-pointer hover:text-gray-800 transition-transform duration-300 ease-in-out hover:scale-[1.2] ">
          EVENTS
        </div>
        <div className=" p-2 rounded-xl hover:underline cursor-pointer hover:text-gray-800  transition-transform duration-300 ease-in-out hover:scale-[1.2]">
          SERVICES
        </div>

      </div>

      <div className="flex w-full justify-end items-center gap-3">
        {user && !isContributor && (
          <Link href={"/contributor-login"}>
            <div className="bg-green-500 p-2 rounded-xl text-white">
              BECOME A CONTRIBUTER
            </div>
          </Link>
        )}

        {user ? (
          <Link
            href={"/profile"}
            aria-label="Open profile"
            className="h-10 w-10 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold hover:bg-amber-900 transition"
          >
            {initial}
          </Link>
        ) : (
          <Link href={"/contributor-login"}>
            <div className="bg-green-500 p-2 rounded-xl text-white">
              BECOME A CONTRIBUTER
            </div>
          </Link>
        )}
      </div>

    </div>
  )
}

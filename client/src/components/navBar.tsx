
"use client"
import Link from "next/link"

export default function NavBar() {
  return (
    <div className="px-10 mt-5  h-10 w-full rounded-2xl  flex  items-center justify-center  ">

      <div className="flex w-full justify-start ">
        <Link href={"/"}>
          <div className="bg-green-200 p-1 rounded-xl">
            OUR LOGO
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

      <div className="flex w-full justify-end">

        <Link href={"/contributorLogin"}>
          <div className="bg-green-500 p-2 rounded-xl text-white">


            BECOME A CONTRIBUTER

          </div>

        </Link>
      </div>

    </div>
  )
}

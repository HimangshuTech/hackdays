export default function NavBar() {
  return (
    <div className="px-10 h-10 w-full rounded-2xl  flex  items-center justify-center  ">

      <div className="flex w-full justify-start ">
        <div className="bg-green-200 p-1 rounded-xl">
          OUR LOGO
        </div>
      </div>


      <div className="flex flex-row  gap-10 justify-center font-medium text-gray-600">

        <div className="bg-blue-200 p-2 rounded-xl hover:underline cursor-pointer hover:text-gray-800 hover:bg-blue-300 hover:">
          PLACES
        </div>
        <div className="bg-blue-200 p-2 rounded-xl hover:underline cursor-pointer hover:text-gray-800 hover:bg-blue-300 ">
          EVENTS
        </div>
        <div className="bg-blue-200 p-2 rounded-xl hover:underline cursor-pointer hover:text-gray-800 hover:bg-blue-300 ">
          SERVICES
        </div>

      </div>

      <div className="flex w-full justify-end">
        <div className="bg-green-600 p-2 rounded-xl">

          CONTRIBUTE
        </div>
      </div>

    </div>
  )
}

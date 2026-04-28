import Link from "next/link";

export default function Personalize() {

  return (
    <div>

      <Link href="/recommendation" className="block bg-blue-500 text-white w-fit p-3 rounded-2xl text-center items-center justify-center hover:bg-blue-800 cursor-pointer">

        Get Personalized recommendations
      </Link>


    </div>

  )
}

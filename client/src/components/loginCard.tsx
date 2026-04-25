import api from "@/config/axios";

export default function LoginCard() {


  const handleLogin = async () => {
    const user = await api.post("api/auth/login")



  }




  return (
    <form
      className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-md border border-gray-200 flex flex-col gap-5"
    >
      <h1 className="text-gray-800 font-semibold text-2xl text-center">
        Enter your Details
      </h1>

      {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}

      <input
        type="email"
        placeholder="Enter Your Email"
        className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      <input
        type="password"
        placeholder="Enter Your Password"
        className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      <button
        type="submit"
        className="cursor-pointer w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition text-white font-medium disabled:opacity-50"
      >
        Login
        {/* {loading ? "Logging in..." : "Login"} */}
      </button>
    </form>
  );
}

export default function LoginBox() {

  return (
    <form
      className="w-full max-w-sm bg-gray-300 p-8 rounded-2xl shadow-lg flex flex-col gap-5"
    >
      <h1 className="text-white font-mono text-2xl text-center">
        Enter your Details
      </h1>

      {/* {error && <p className="text-red-400 text-sm">{error}</p>} */}

      <input
        type="email"
        placeholder="email"
        className="w-full px-4 py-2 rounded-md bg-gray-600 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="password"
        className="w-full px-4 py-2 rounded-md bg-gray-600 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="cursor-pointer w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition text-white font-medium disabled:opacity-50"
      >
        Login
        {/* {loading ? "Logging in..." : "Login"} */}
      </button>
    </form>

  )

}

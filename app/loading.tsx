export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-slate-700 border-t-pink-400 border-r-purple-400 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-400 text-sm tracking-widest">LOADING</p>
      </div>
    </div>
  )
}


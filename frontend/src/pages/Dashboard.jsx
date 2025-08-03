import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900">
        <div className="spinner border-4 border-yellow-200 border-t-transparent h-12 w-12 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-richblack-800 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto h-full px-6 py-10 bg-richblack-800">
        <div className="mx-auto w-full max-w-[1100px] rounded-xl bg-richblack-900 shadow-lg px-8 py-6 transition-all duration-300">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

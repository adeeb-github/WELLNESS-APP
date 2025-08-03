import { useLocation, useNavigate } from 'react-router-dom';

const ViewSession = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const { sessionTitle, sessionTag, sessionDescription } = location.state || {};
  

  return (
    <div className="min-h-screen bg-richblack-700 text-white p-8 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-richblack-800 p-8 rounded-2xl shadow-2xl">
    
        <h1 className="text-4xl font-bold mb-4 text-yellow-100 text-center">{sessionTitle}</h1>

        <div className="mb-4 text-center items-center gap-x-4">
          <div className="flex flex-wrap gap-2 mb-2">
  {sessionTag && sessionTag.length > 0 ? (
    sessionTag.map((tag, index) => (
      <span
        key={index}
        className="bg-yellow-100 text-black text-xs px-2 py-1 rounded-full"
      >
        {tag}
      </span>
    ))
  ) : (
    <span className="text-sm text-yellow-100">No tags</span>
  )}
</div>

        </div>

        <div className="text-richblack-100 text-lg leading-relaxed  overflow-y-scroll max-h-[300px] ">
          {sessionDescription || "No description available."}
        </div>
      </div>
      <div>
        <button
        onClick={()=>navigate("/dashboard/all-sessions")}
        className=' p-4 m-3 bg-yellow-100  text-richblack-800 rounded-md '>
            Go Back To Sessions
        </button>
      </div>

    </div>
  );
};

export default ViewSession;

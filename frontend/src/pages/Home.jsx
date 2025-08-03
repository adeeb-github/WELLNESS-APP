import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="min-h-screen w-full bg-richblack-900 font-inter flex items-center justify-center px-6">
      <div className="max-w-6xl w-full p-6 rounded-3xl shadow-2xl bg-richblack-800 border border-richblack-600 flex flex-col md:flex-row items-center gap-10">
        
       
       

        
        <div className="w-full md:w-1/2 text-center space-y-6">
          <h1 className="text-5xl font-bold text-yellow-100">SoulNest</h1>

          <h2 className="text-2xl font-semibold text-richblue-25">
            Your sanctuary for stillness, movement, and mindful creation
          </h2>

          <p className="text-md font-medium text-richblack-100 leading-relaxed">
            Welcome to <span className=" text-yellow-100 font-semibold">SoulNest</span> — your personal haven for yoga, meditation, and inner peace.
            <br />
            Join a vibrant community grounded in calm, compassion, and conscious living.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <Link to="/login">
              <button className="rounded-full bg-yellow-100  hover:bg-yellow-25 text-richblack-900 px-6 py-3 text-md font-semibold transition duration-200 shadow-lg">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="rounded-full border border-caribbeangreen-100 text-caribbeangreen-100 hover:bg-richblack-700 px-6 py-3 text-md font-semibold transition duration-200 shadow-lg">
                Register
              </button>
            </Link>
          </div>
        </div>
         <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHkoHN3_L-U-NO3JVzm25drdQADYt_tMtfVQ&s"
            alt="Yoga Pose"
            className="rounded-2xl shadow-lg w-full max-w-sm object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

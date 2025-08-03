import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletesession, getMySessionData ,addsession} from '../../services/operations/SessionDetailsApi';
import ConfirmationModal from '../Common/ConfirmationModal';


const ViewmySessions = () => {
  const { user } = useSelector((state) => state.profile);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState(null)
  const dispatch=useDispatch();
  
  // const handledelete=async(sessionid)=>{

  //   const response=await deletesession(sessionid);

  // }

  useEffect(() => {
    if (!user || !user._id) return;

    (async () => {
      try {
        
        const response = await getMySessionData(user._id);
        console.log("response",response);

        const filteredSessions = response || [];
        console.log(filteredSessions);

        const sessionsWithDescriptions = await Promise.all(
          filteredSessions.map(async (session) => {
            try {
              const res = await fetch(session.json_file_url);
              const jsonData = await res.json();
              return {
                ...session,
                description: jsonData.description || 'No description available',
              };
            } catch (err) {
              return {
                ...session,
                description: 'Failed to load description',
              };
            }
          })
        );

        setSessions(sessionsWithDescriptions);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  console.log(sessions);

  return (
    <>
    <div className="min-h-screen bg-richblack-600 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your All Sessions</h1>

      {loading ? (
        <p className="text-center text-lg">Loading sessions...</p>
      ) : sessions.length === 0 ? (
        <p className="text-center text-lg">No sessions found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="bg-richblack-700 rounded-xl shadow-lg p-5 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <h2 className="text-xl font-semibold mb-2">{session.title}</h2>
             <div className="flex flex-wrap gap-2 mb-2">
  {session.tags && session.tags.length > 0 ? (
    session.tags.map((tag, index) => (
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

              <p className="text-sm text-richblack-100">{session.description}</p>
              
                <p className="text-sm text-yellow-100 font-medium mb-2">
                {session.status}
              </p>

              

              <div className="mt-4 flex gap-2">
  {session.status === "draft" && (
    <button 
     onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "The Session Will Be visible to Everyone",
                  btn1Text: "Publish",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(addsession(session._id)),
                  btn2Handler: () => setConfirmationModal(null),
                })
   }
    className="bg-yellow-100 px-3 py-1 rounded text-black  hover:bg-yellow-50">
      PUBLISH
    </button>
  )}

  <button
  
   onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "The Session Will Be Deleted Permanently",
                  btn1Text: "Delete",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(deletesession(session._id)),
                  btn2Handler: () => setConfirmationModal(null),
                })
   }
   className=" bg-yellow-100  text-richblack-800  px-3 py-1 rounded hover:bg-yellow-50">
    DELETE
  </button>
</div>

            </div>
          ))}
        </div>
      )}
    </div>
    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default ViewmySessions;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSessionData } from '../../services/operations/SessionDetailsApi';
import ConfirmationModal from '../Common/ConfirmationModal';
import { useNavigate } from 'react-router-dom';


const ViewSessions = () => {
  const { user } = useSelector((state) => state.profile);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const rawResponse = await getSessionData();

        const filteredSessions = rawResponse.filter(
          (session) => session.status === 'published'
        );

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
  }, []);

  return (
    <>
    <div className="min-h-screen bg-richblack-600 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Published Sessions</h1>

      {loading ? (
        <p className="text-center text-lg">Loading sessions...</p>
      ) : sessions.length === 0 ? (
        <p className="text-center text-lg">No sessions found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
           <div
  key={session._id}
  className="bg-richblack-700 rounded-xl shadow-lg p-5 transition-transform duration-300 hover:scale-105 hover:shadow-2xl
             h-80 flex flex-col justify-between"
>
  <div>
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


    <div className="text-sm text-richblack-100 overflow-y-auto max-h-32 pr-2">
      {session.description}
    </div>
  </div>
   <button
    
     onClick={() =>
                  setConfirmationModal({
                    text1: "View Session",
                    text2: "The Session Will be viewed",
                    btn1Text: "View",
                    btn2Text: "Cancel",
                    btn1Handler: () => navigate('/dashboard/all-sessions/dashboard/view', {
      state: {
        sessionTitle: session.title,
        sessionTag: session.tags,
        sessionDescription:session.description,
      },
    }),
                    btn2Handler: () => setConfirmationModal(null),
                  })
     }          
     className=" bg-yellow-100  text-richblack-800  px-3 py-1 rounded hover:bg-yellow-50">
      View
    </button>
</div>

          ))}
        </div>
      )}
    </div>
    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default ViewSessions;

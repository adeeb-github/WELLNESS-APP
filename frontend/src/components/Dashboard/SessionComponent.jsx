const SessionComponent = ({ title, tag, description }) => {
  return (
    <div className="p-4 rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-500">{tag}</p>
      <p className="mt-2 text-gray-700">{description}</p>
    </div>
  );
};

export default SessionComponent;

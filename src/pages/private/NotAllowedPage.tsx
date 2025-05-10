import { Link } from "react-router-dom";

const NotAllowedPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-500">
      <div className="p-5 flex flex-col bg-white rounded-md border">
        <h1 className="text-3xl font-bold mb-4">
          Wait for business verification
        </h1>
        <p className="text-lg mb-8">
          Please wait for your business to be verified by our team.
        </p>
        <Link to="/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go to login
          </button>
        </Link>
      </div>
    </div>
  );
};
export default NotAllowedPage;

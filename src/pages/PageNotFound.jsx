import { Link } from 'react-router-dom';

// react-icons
import { BsFillSignDeadEndFill } from "react-icons/bs";


const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-8">
            <BsFillSignDeadEndFill className="text-9xl text-red-500 mb-4" />
            <h1 className="text-9xl font-bold mb-2">404</h1>
            <h2 className="text-3xl font-semibold mb-6">Page not Found</h2>
            <p className="text-gray-600 text-center max-w-md mb-6">
                The page you are looking for doesn't exist or another error occurred.
                Go back, or head over to the home page by clicking on the button below.
            </p>

            <Link to="/">
                <button className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                    Go Back to the Home Page
                </button>
            </Link>

        </div>
    );
};

export default PageNotFound;
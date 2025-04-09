import { Link } from "react-router-dom";

const Navbar = () => {
  const linkClass =
    "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  return (
    <nav className="bg-red-500 border-b border-red-400 ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Link className="flex flex-shrink-0 items-center mr-4" to="/">
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                React Jobs
              </span>
            </Link>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <Link to="/" className={linkClass}>
                  Home
                </Link>
                <Link to="/verbs" className={linkClass}>
                  Verbs
                </Link>
                <Link to="/login" className={linkClass}>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

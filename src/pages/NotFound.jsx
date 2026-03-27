import { Link } from "react-router-dom";
import notFoundImg from "../assets/404 Error-bro.svg";

export default function NotFound() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 items-center gap-10 text-center md:text-left">
        
        {/* Left: Image */}
        <div className="flex justify-center md:justify-start">
          <img
            src={notFoundImg}
            alt="404 Not Found"
            className="w-full max-w-md rounded-2xl"
            data-aos="zoom-in"
          />
        </div>

        {/* Right: Text */}
        <div>
          <h1
            className="text-7xl md:text-8xl font-bold text-red-500"
            data-aos="fade-down"
          >
            404
          </h1>

          <h2 className="text-2xl font-semibold mt-4 mb-3" data-aos="fade-up">
            Oops! Page Not Found
          </h2>

          <p
            className="text-gray-500 mb-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            The page you are looking for doesn't exist or the link is broken.
          </p>

          <div
            className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Link to="/">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition">
                Go Back Home
              </button>
            </Link>

            <Link to="/products">
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl text-lg hover:bg-blue-600 hover:text-white transition">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
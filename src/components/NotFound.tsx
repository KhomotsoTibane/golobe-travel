import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import NotFoundImg from "@/assets/images/notfound.png";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center  text-center px-6 py-12 mt-24">
      <img src={NotFoundImg} alt="404 illustration" className="w-[300px] max-w-full mb-8" />
      <h1>404</h1>
      <p className="mb-6">Oops! This page doesn't exist.</p>

      <p className="max-w-md mb-6">
        We couldn’t find the page you’re looking for. Let’s take you back to safe territory.
      </p>

      <Button asChild>
        <Link to="/" className="bg-primary-500 rounded-lg shadow hover:bg-primary-600 transition">
          Go Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;

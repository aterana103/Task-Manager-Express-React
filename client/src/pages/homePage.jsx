import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="flex justify-center items-center">
      <header className="bg-zinc-800 p-10">
        <h1 className="text-5xl py-2 font-bold text-white">React Tasks</h1>
        <p className="text-md text-slate-400">
        Welcome to our personalized task management system! With our platform, you can efficiently organize your tasks. 
        Each user has their own personalized space where they can create and track their tasks.
        </p>
        <Link
          className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
          to="/register"
        >
        Get Started
        </Link>
      </header>
    </section>
  );
}

export default HomePage;
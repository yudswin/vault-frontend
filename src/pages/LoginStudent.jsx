import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginStudent = () => {
  const navigate = useNavigate()

  const handleCreate = (e) => {

  }

  const goToLecturer = () => {
    navigate('/lecturer')
}
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation
    if (username === "" || password === "") {
      setError("Username and Password are required");
      return;
    }

    // Placeholder for actual authentication logic
    if (username === "student" && password === "password123") {
      setError("");
      alert("Login successful!");
      // Add logic to redirect or update the state as needed
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="bg-pink-100 w-full h-full ">
      <div
        id="login"
        class="w-96 h-auto relative left-1/3 bg-fuchsia-100 shadow justify-center flex flex-col  p-3 items-center rounded-3xl mt-28"
      >
        <form onSubmit={handleLogin} class="text-slate-950">
          <fieldset class="border-4 border-dotted border-indigo-500 p-5">
            <legend class="px-2 italic font-bold -mx-2 ">E-Checking</legend>
            <label
              class="text-xs font-bold after:content-['*'] after:text-red-400"
              for="studentId"
            >
              Student ID
            </label>
            <input
              class="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2  rounded-2xl"
              type="text"
              id="studentId"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label
              class="text-xs font-bold after:content-['*'] after:text-red-400"
              for="password"
            >
              Password
            </label>
            <input
              class="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2  rounded-2xl"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <div className="error-message text-red-500 mb-2">{error}</div>
            )}
            <button
              onClick={handleCreate}
              class=" ml-20 mt-5 w-40 rounded bg-white text-slate-950 p-2 text-center font-bold hover:bg-indigo-400"
              type="submit"
            >
              Login
            </button>
            <div class="mt-5 text-center text-indigo-500"onClick={goToLecturer}>
              You aren't a student?{" "}
              <a href="" class="underline">
                Sign in as Lecturer
              </a>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default LoginStudent;

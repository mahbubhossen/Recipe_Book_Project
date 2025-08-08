import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config.js";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const passError = validatePassword(password);
    if (passError) {
      setPasswordError(passError);
      return;
    }
    setPasswordError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL,
      });
      await auth.currentUser.reload();
      toast.success("Registration successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Google Login successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 px-4 py-8">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="label block mb-1 text-gray-700">Name</label>
            <input
              type="text"
              className="input input-bordered w-full px-3 py-2 text-base sm:text-lg rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="label block mb-1 text-gray-700">Photo URL</label>
            <input
              type="url"
              className="input input-bordered w-full px-3 py-2 text-base sm:text-lg rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Link to your photo (optional)"
            />
          </div>

          <div>
            <label className="label block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              className="input input-bordered w-full px-3 py-2 text-base sm:text-lg rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Your email address"
            />
          </div>

          <div>
            <label className="label block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              className={`input input-bordered w-full px-3 py-2 text-base sm:text-lg rounded border ${
                passwordError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 ${
                passwordError ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a password"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full py-3 text-lg rounded">
            Register
          </button>
        </form>

        <div className="text-center mt-6 text-base sm:text-lg">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>

        <div className="divider my-6">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center justify-center gap-3 py-3 text-lg rounded"
        >
          <FcGoogle className="text-2xl" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Register;

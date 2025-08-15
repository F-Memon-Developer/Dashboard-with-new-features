import { useState, useContext } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      // 1. Login user from Firebase Auth
      const res = await signInWithEmailAndPassword(auth, email, password);

      // 2. Get user data from Firestore (optional)
      const docSnap = await getDoc(doc(db, "users", res.user.uid));
      if (docSnap.exists()) {
        console.log("User data:", docSnap.data());
      }

      // 3. Save in AuthContext
      dispatch({ type: "LOGIN", payload: res.user });

      // 4. Redirect to Home
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <span>Wrong email or password</span>}

        <p>
          Don't have an account? <Link to="/register" className="link">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

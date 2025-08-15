import { useState, useContext } from "react";
import "./register.scss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


const Register = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      // 1. Create user in Firebase Auth
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // 2. Update profile with displayName
      await updateProfile(res.user, { displayName });

      // 3. Save user in Firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        createdAt: serverTimestamp(),
      });

      // 4. Save in AuthContext
      dispatch({ type: "LOGIN", payload: res.user });

      // 5. Redirect to home
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Display Name"
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
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
        <button type="submit">Sign Up</button>
        {error && <span>Could not register. Please try again.</span>}
        <p>
          Already have an account! <Link to="/Login" className="link">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

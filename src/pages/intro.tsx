import { useAuthState } from "react-firebase-hooks/auth";
import useApp from "../assets/hooks/useApp";
import Login from "./login";
import DashBoard from "./dashboard";
import Navbar from "../components/widgets/navbar";

function Intro() {
  const { app, auth } = useApp();
  const [user] = useAuthState(auth);
  return (
    <div className="h-screen">
      <Navbar />
      <main className="w-full flex h-full">
        {user ? <DashBoard /> : <Login />}
      </main>
    </div>
  );
}

export default Intro;

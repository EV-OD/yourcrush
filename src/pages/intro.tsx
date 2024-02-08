import { useAuthState } from "react-firebase-hooks/auth";
import useApp from "../hooks/useApp";
import Login from "./login";
import DashBoard from "./dashboard";
import usePageStore from "../store/pageStore";
import HashPage from "./hashPage";
import ThankYouPage from "./thankyou";
import Modal from "../components/widgets/modal";
import { useCFirestore } from "../utils";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import Matched from "./matched";

function Intro() {
  const { auth } = useApp();
  const [user] = useAuthState(auth);
  const { currentPage, setCurrentPage } = usePageStore();
  const { isExceeded } = useCFirestore();
  useEffect(() => {
    (async () => {
      console.log(user);
      if (user) {
        let res = await isExceeded(user);
        if (res) {
          setCurrentPage("thankyou");
        }
      }
    })();
  }, [user]);

  return (
    <div className="h-screen">
      <Modal />
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <main className="w-full flex h-full">
                {user ? (
                  currentPage == "home" ? (
                    <DashBoard />
                  ) : currentPage == "hashPage" ? (
                    <HashPage />
                  ) : (
                    <ThankYouPage />
                  )
                ) : (
                  <Login />
                )}
              </main>
            }
          />
          <Route path="/match" element={<Matched />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default Intro;

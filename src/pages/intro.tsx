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
    </div>
  );
}

export default Intro;

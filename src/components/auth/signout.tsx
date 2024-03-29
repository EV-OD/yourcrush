import useApp from "../../hooks/useApp";

function SignOut() {
  const { auth } = useApp();
  return (
    auth.currentUser && (
      <button
        className="sign-out bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </button>
    )
  );
}

export default SignOut;

import React, { useState } from "react";
import Loading from "../widgets/loading";
import ConvertToHash, { useCFirestore } from "../../utils";
import { useAuthState } from "react-firebase-hooks/auth";
import useApp from "../../hooks/useApp";
import { User } from "firebase/auth";

const CrushRegistrationPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [program, setProgram] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const { addCrush } = useCFirestore();

  const { auth } = useApp();
  const [user] = useAuthState(auth);

  const programmeList = [
    { name: "Computer Engineering", value: "BCT" },
    { name: "Electrical Engineering", value: "EE" },
    { name: "Mechanical Engineering", value: "ME" },
    { name: "Chemical Engineering", value: "CHE" },
    { name: "Civil Engineering", value: "CE" },
    { name: "Architecture", value: "B.Arch" },
  ];
  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleProgramChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProgram(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (!firstName || !lastName || !program) {
      setWarning("All fields are required");
      return;
    } else {
      setWarning("");
      let hashed = ConvertToHash(user as User, {
        firstName,
        lastName,
        programme: program,
      });
      let res = await addCrush(user as User, hashed);
      if (res.error) {
        setWarning(res.error);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 min-w-[400px]"
        onSubmit={handleSubmit}
      >
        <div
          role="alert"
          className={
            "alert alert-warning my-3 py-2 " +
            (warning.length > 0 ? "visible" : "invisible")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Warning: {warning}</span>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="YourCrush FirstName"
          >
            First Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            type="text"
            placeholder="Enter your crush first name"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="YourCrush LastName"
          >
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            type="text"
            placeholder="Enter your crush last name"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="YourCrush Program"
          >
            Program
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="program"
            value={program}
            onChange={handleProgramChange}
          >
            <option value="">Select your crush program</option>
            {programmeList.map((programme) => (
              <option key={programme.value} value={programme.value}>
                {programme.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? <Loading /> : "Add Crush"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrushRegistrationPage;

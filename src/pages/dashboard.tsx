import React, { useEffect } from "react";
import useApp from "../assets/hooks/useApp";
import { useAuthState } from "react-firebase-hooks/auth";
import CrushRegistrationPage from "../components/auth/crush";
import { useCFirestore } from "../utils";

function DashBoard() {
  const { app, auth } = useApp();
  const [user] = useAuthState(auth);
  const { isCrushExceeded, crushList } = useCFirestore();
  const [crush, setCrush] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className="flex w-full md:flex-row flex-col">
      <div className="left md:w-1/2 w-full h-full">
        {isCrushExceeded || (crushList && crushList.length == 3) ? (
          <div className="h-full">
            <div className="bg-gray-300 h-full">
              <h1 className="text-lg text-center">Crush Exceeded</h1>
            </div>
          </div>
        ) : (
          <CrushRegistrationPage />
        )}
      </div>
      <div className="right md:w-1/2 w-full flex justify-center items-center bg-red-800">
        <div className="w-full h-60 p-4">
          <h1 className="text-lg font-bold">Crushes</h1>
          {isLoading ? (
            <h1>Loading</h1>
          ) : (
            <div className="flex flex-col">
              {crushList && (
                <>
                  {crushList.map((crush: any) => (
                    <div className="flex flex-row">
                      <h1 className="w-48 overflow-auto">{crush}</h1>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;

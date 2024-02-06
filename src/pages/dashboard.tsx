import useApp from "../hooks/useApp";
import topleft from "../assets/topleft.png";
import topright from "../assets/topright.png";
import bottomright from "../assets/bottomright.png";
import arrowman from "../assets/arrowman.png";
import { useState } from "react";
import SignOut from "../components/auth/signout";
import pumping from "../assets/pumping.gif";
import couple2 from "../assets/couple2.png";
import usePageStore from "../store/pageStore";
import useModalStore from "../store/modalStore";
import { set } from "firebase/database";

let years = ["076", "077", "078", "079", "080"];
let courses = ["BCT", "BEL", "BCE", "BAS", "BEI", "BAR", "BME", "BCH"];

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useApp();
  const [year, setYear] = useState("");
  const [course, setCourse] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [crushName, setCrushName] = useState("");
  const { setCurrentPage, setCrushDetail } = usePageStore();
  const { setModal, setModalData } = useModalStore();

  const handleFindPerson = async () => {
    setIsLoading(true);
    if (crushName.trim().length == 0) {
      setModal("opened");
      setModalData({
        title: "Error",
        content: "Please Enter Crush Name",
      });
      setIsLoading(false);
      return;
    }
    let res = await handleSearchPersonOnDb();
    if (res) {
      setCurrentPage("hashPage");
    }
    setIsLoading(false);
  };

  const showDialog = () => {
    let dialogBox = document.getElementById("my_modal_1") as HTMLDialogElement;
    if (dialogBox) {
      dialogBox.showModal();
    }
  };

  const handleSearchPersonOnDb = async () => {
    try {
      setIsLoading(true);
      let data = {
        name: crushName.toLowerCase(),
        year: year.toLowerCase(),
        course: course.toLowerCase(),
        roll_number: rollNumber.toLowerCase(),
      };

      // Remove empty fields from the data object
      Object.keys(data).forEach((key) => data[key] === "" && delete data[key]);

      let res = await fetch("https://v.anuj-paudel.com.np/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // If the primary API fails, try the alternative one
      if (res.status !== 200) {
        res = await fetch("https://pocolocojunior1.pythonanywhere.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      if (res.status === 200) {
        const responseData = await res.json();
        if (responseData.success) {
          if (responseData.success.name) {
            const rollNumber = responseData.success.roll_number;
            const year = rollNumber.slice(0, 2);
            const course = rollNumber.slice(2, 5);
            setCrushDetail({
              fullname: responseData.success.name,
              year,
              course,
              roll_number: rollNumber,
            });
            setCurrentPage("hashPage");
            return true;
          } else {
            const errorMessage =
              responseData.success === "Multiple Person Found"
                ? `${responseData.success} Please Enter More Detail to find the person.`
                : responseData.success;
            setModalData({
              title: "Error",
              content: errorMessage,
            });
            showDialog();
            return false;
          }
        } else {
          setModalData({
            title: "Error",
            content: "No Data Found",
          });
          showDialog();
          return false;
        }
      } else {
        setModalData({
          title: "Error",
          content: "Something went wrong",
        });
        showDialog();
        return false;
      }
    } catch (error) {
      setModalData({
        title: "Error",
        content: "Something went wrong",
      });
      showDialog();
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login w-full h-full flex justify-center items-center relative">
      <div className="decoration absolute inset-0 overflow-hidden">
        <img
          src={arrowman}
          alt="love"
          className="absolute md:bottom-0 -bottom-20 md:-right-24 -right-24 2xl:w-[550px] xl:w-[500px] md:w-[450px] w-[300px] md:-rotate-45 rotate-[30] z-10  "
        />
        <img
          src={topleft}
          alt="love"
          className="absolute object-cover top-0 left-0 w-56"
        />
        <img
          src={topright}
          alt="love"
          className=" absolute object-cover top-0 right-0 w-56 md:block hidden"
        />
        <img
          src={topright}
          alt="love"
          className="absolute object-cover bottom-0 left-0 w-56 scale-[-1] md:block hidden"
        />
        <img
          src={bottomright}
          alt="love"
          className="absolute object-cover bottom-0 right-0 w-56 md:block hidden z-20"
        />
        <img
          src={couple2}
          alt="love"
          className="absolute top-1/2 -translate-y-1/2 left-10 w-[200px] lg:block hidden"
        />
      </div>
      <div className="heroSection flex w-full z-20 flex-col items-center md:-translate-y-0 -translate-y-10">
        <div className="left flex flex-col md:text-center w-full justify-center">
          <h1 className="hero-text xl:text-9xl lg:text-8xl md:text-6xl text-5xl mb-3 text-center text-red-600 md:mx-0 mx-auto">
            Valentine's Day Special
          </h1>
        </div>
        <div className="right w-full flex flex-col realtive justify-center items-center z-20">
          <div className="input_area grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-1 2xl:w-[800px] xl:w-[700px] lg:w-[500px] sm:w-[350px] w-[300px] md:mt-10">
            <h1 className="md:text-6xl text-3xl font-bold text-red-700 font-newSun tracking-wider whitespace-nowrap">
              Crush Detail
              <br />
              <span className="text-[0.4em] font-normal italic font-sans">
                you can search crush with partial name also
              </span>
            </h1>
            <span></span>
            <label
              htmlFor="crush_name"
              className="text-red-600 text-lg font-semibold"
            >
              Crush Name <sup className="text-lg">*</sup>
            </label>
            <input
              type="text"
              id="Full Name"
              value={crushName}
              placeholder="eg. Anuj Pa"
              onChange={(e) => setCrushName(e.target.value)}
              className="bg-red-200 placeholder:font-light placeholder:text-gray-400 py-1 px-2 text-red-900 font-semibold"
            />

            <label
              htmlFor="Course"
              className="text-red-600 text-lg font-semibold"
            >
              Course <span className="text-xs">(Optional)</span>
            </label>
            <select
              name="course"
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="bg-red-200 py-1 px-2 text-red-900 font-semibold"
            >
              <option value="" disabled>
                Select Course
              </option>
              {courses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <label
              htmlFor="year"
              className="text-red-600 text-lg font-semibold"
            >
              Year <span className="text-xs">(Optional)</span>
            </label>
            <select
              name="year"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="bg-red-200 py-1 px-2 text-red-900 font-semibold"
            >
              <option value="" disabled>
                Select Year
              </option>
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <label
              htmlFor="roll_number"
              className="text-red-600 text-lg font-semibold "
            >
              Roll Number <span className="text-xs">(Optional)</span>
            </label>
            <input
              type="text"
              id="roll_number"
              value={rollNumber}
              placeholder="eg. 070"
              onChange={(e) => setRollNumber(e.target.value)}
              className="bg-red-200 py-1 px-2 text-red-900 font-semibold placeholder:font-light placeholder:text-gray-400"
            />
            <div className="flex gap-6">
              <button
                onClick={handleFindPerson}
                className="sign-out bg-pink-400 hover:bg-pink-500 text-white font-bold py-1 px-4 rounded text-base mt-3 flex items-center justify-center gap-4"
              >
                {isLoading ? (
                  <img src={pumping} alt="pumping" className="w-8 h-8" />
                ) : (
                  ""
                )}
                <span>Find Person</span>
              </button>
            </div>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

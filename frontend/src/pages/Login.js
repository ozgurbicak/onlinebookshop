import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { facebook, google } from "../assets/index";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/UserSlice";
import { toast } from "react-toastify"; // react-toastify ekleyin
import "react-toastify/dist/ReactToastify.css";
// import GoogleLogin from "react-google-login";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null); // State for error message
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login/", {
        email,
        password,
      });

      const data = JSON.parse(response.config.data);

      console.log(response);

      if (response.data.success) {
        console.log("Giriş başarılı!");

        dispatch(login(data));

        navigate("/");
      } else {
        setErrorMessage(response.data.message);
        alert(errorMessage);
        // Display error message from server
      }
    } catch (error) {
      console.error("Hata:", error);
      toast.error("Bir hata oluştu."); // Genel hata mesajını göster
    }
  };

  // const handleGoogleLogin = (response) => {
  //   axios
  //     .post("http://localhost:5000/google", { token: response.tokenId })
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // };

  // const handleGoogleLogin = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/auth/google/");
  //     console.log(response.data); // İsteğin yanıtı hakkında bilgi alabilirsiniz
  //     // İsteğin yanıtına göre gerekli işlemleri gerçekleştirin
  //   } catch (error) {
  //     console.error("Google Auth Error:", error);
  //     // Hata durumunda uygun şekilde işlem yapabilirsiniz
  //   }
  // };
  // checkGoogleLogin();

  const handleGoogleLogin = () => {
    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    window.open(
      "http://localhost:5000/auth/google",
      "_blank",
      `width=${width}, height=${height}, left=${left}, top=${top}`
    );
  };

  const handleFacebookLogin = () => {
    window.open("http://localhost:5000/auth/facebook");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center gap-10">
      <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmitLogin}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="col-span-2 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign in
        </button>
      </form>

      <div className="text-gray-600 text-sm">- OR -</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full h-12 px-4 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <img src={google} alt="Google icon" className="w-6 h-6 mr-2" />
          <span className="text-base font-medium">Sign in with Google</span>
        </button>
        {/* <h1 onClick={handleGoogleLogin}>homepage</h1>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLogin}
          cookiePolicy={"single_host_origin"}
        /> */}
        <button
          type="button"
          onClick={handleFacebookLogin}
          className="flex items-center justify-center w-full h-12 px-4 rounded-md text-gray-700 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
        >
          <img src={facebook} alt="Facebook icon" className="w-6 h-6 mr-2" />
          <span className="text-base font-medium text-white">
            Sign in with Facebook
          </span>
        </button>
      </div>

      <p className="text-gray-600 mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
}

export default Login;

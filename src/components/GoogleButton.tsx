import { auth, googleProvider } from "@/lib/firebaseConfig.js";
import { signInWithPopup } from "firebase/auth";

const GoogleLogin = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User Info:", result.user);
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  return (
    <button onClick={signInWithGoogle} className="w-full flex items-center justify-center gap-2.5 
               bg-white text-[#3c4043] text-sm font-medium 
               border border-[#dadce0] rounded px-5 py-2.5 
               cursor-pointer 
               transition duration-200 ease-in-out 
               hover:bg-[#f7f8f8] hover:shadow-sm">
      {" "}
      <img
      
        src="https://www.svgrepo.com/show/355037/google.svg"
        alt="Google"
        className="w-4 h-4"
      />
      <span className="google-text">Continue with Google</span>
    </button>
  );
};

export default GoogleLogin;

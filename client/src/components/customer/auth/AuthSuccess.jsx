import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleGoogleCallback } from "../../../services_hooks/customer/userAuthApi";

const AuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        console.log("Processing OAuth callback...");

        const result = await handleGoogleCallback(dispatch);

        if (result) {
          // Success - redirect to dashboard or home
          navigate("/dashboard"); // or wherever you want to redirect
        } else {
          // No callback data found, redirect to login
          navigate("/login");
        }
      } catch (error) {
        console.error("OAuth callback processing failed:", error);
        // Error already handled in handleGoogleCallback
        navigate("/login");
      }
    };

    processOAuthCallback();
  }, [dispatch, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthSuccess;

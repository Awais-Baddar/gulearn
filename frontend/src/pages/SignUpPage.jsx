import { useState } from "react";
import { BookOpen } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp.js";
import { useThemeStore } from "../Store/useThemeStore.js";

const SignUpPage = () => {
  const [signUpData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
const {theme} =useThemeStore()
const {isPending,error,signupMutation}=useSignUp();
  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signUpData);
    
  };
  return (
    <>
      <div
        className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
        data-theme={theme}
      >
        <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
          {/*   left area     */}

          <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
            {/* logo */}

            <div className="mb-4 flex items-start justify-start gap-2">
              <BookOpen className="size-9 text-primary" />

              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                GuLearn
              </span>
            </div>
{/* {Error Message} */}

{error&&(


<div className="alert alert-error mb-4">

  <span>{error.response.data.message}</span>


</div>

)}
            <div className="w-full">
              <form onSubmit={handleSignup}>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Create an Account{" "}
                    </h2>
                    <p className="text-sm opacity-70">
                      Join GuLearn and Start your journey towards Learning
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Full Name</span>
                      </label>
                      <input
                        type="text "
                        placeholder="John Doe"
                        className="input input-bordered w-full"
                        value={signUpData.fullName}
                        onChange={(e) =>
                          setSignupData({
                            ...signUpData,
                            fullName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        placeholder="JohnDoe@xyz.com"
                        className="input input-bordered w-full"
                        value={signUpData.email}
                        onChange={(e) =>
                          setSignupData({
                            ...signUpData,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Password</span>
                      </label>
                      <input
                        type="password"
                        placeholder="***********"
                        className="input input-bordered w-full"
                        value={signUpData.password}
                        onChange={(e) =>
                          setSignupData({
                            ...signUpData,
                            password: e.target.value,
                          })
                        }
                       
                      />
                      <p className="text-xs opacity-65 mt-1">
                        Select a valid Password with atleast 6 characters
                      </p>
                    </div>

                    <div className="form-control">
                      <label className="label cusrsor-pointer justify-start gap-2 ">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          required
                        />
                        <span className="text-xs leading-tight">
                          I agree to the {""}
                          <span className="text-primary hover:underline">
                            terms of service
                          </span>
                          and {""}
                          <span className="text-primary hover:underline">
                            privacy policy
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <button className="btn btn-primary w-full" type="submit">
                    {isPending ? (

                     <>
                     
                     
                     <span className="loading loading-spinner loading-xs"></span>
                      Loading</>
                    ): ("Create an Account")}
                  </button>
                  <div className="text-center mt-4">
                    <p className="text-sm">
                      Already have an account? {""}
                      <Link
                        to="/login"
                        className="text-primary hover:underline"
                      >
                        Sign In
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* right side area */}

          <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
            <div className="max-w-md p-8">
              {/* {illustration} */}

              <div className="relative aspect-square max-w-sm mx-auto">
                <img
                  src="/i.png"
                  alt="Learning Connection illustration"
                  className="w-full h-full"
                />
              </div>

              <div className="text-center space-y-3 mt-6">
                <h2 className="text-xl font-semibold">
                  Connect with Language Partners WorldWide
                </h2>
                <p className="opacity-70">
                  Practice Conversations , Pronouciations , make friends and
                  Improve Your Language Skills together
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;

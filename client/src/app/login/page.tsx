"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Particles from "../../components/ui/particles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    return regex.test(password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (id === "password") {
      setIsPasswordValid(validatePassword(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setShowLoader(false);

    try {
      await axios.post(
        "https://authapi-jqve.onrender.com/api/Auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Login successful!");
      setShowLoader(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Login failed:", err.response?.data);
        setError(err.response?.data?.message || "Login failed. Try again.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <Card className="w-full max-w-sm z-10">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Login into your trading account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <p
                  className={`text-sm ${
                    isPasswordValid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Minimum 6 characters, uppercase, lowercase, number & special character
                </p>
              </div>
            </div>

            {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}
            {success && <p className="text-green-600 mt-4 text-sm">{success}</p>}

            <Button type="submit" className="w-full mt-4">
              Login
            </Button>

            {showLoader && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-blue-600">
                <svg
                  className="animate-spin h-4 w-4 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Welcome back...
              </div>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <div className="flex gap-2 text-sm">
            Not a trader?
            <Link href="/signup" className="text-blue-500 underline">
              Sign Up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;



// "use client";

// import axios from "axios";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Particles from "../../components/ui/particles";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import Link from "next/link";

// const Login = () => {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [showLoader, setShowLoader] = useState(false);
//   const [isPasswordValid, setIsPasswordValid] = useState(false);

//   // Password validation function
//   const validatePassword = (password: string) => {
//     const regex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
//     return regex.test(password);
//   };

//   // Handle input change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));

//     if (id === "password") {
//       setIsPasswordValid(validatePassword(value));
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setShowLoader(false);

//     try {
//       const res = await axios.post(
//         "https://authapi-jqve.onrender.com/api/Auth/login",
//         {
//           email: formData.email,
//           password: formData.password,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setSuccess("Login successful!");
//       setShowLoader(true);

//       setTimeout(() => {
//         router.push("/dashboard");
//       }, 2000);
//     } catch (err: any) {
//       console.error("Login failed:", err.response?.data);
//       setError(err.response?.data?.message || "Login failed. Try again.");
//     }
//   };

//   return (
//     <div className="relative w-full h-[600px] flex items-center justify-center">
//       <div className="absolute inset-0 -z-10">
//         <Particles
//           particleColors={["#ffffff", "#ffffff"]}
//           particleCount={200}
//           particleSpread={10}
//           speed={0.1}
//           particleBaseSize={100}
//           moveParticlesOnHover={true}
//           alphaParticles={false}
//           disableRotation={false}
//         />
//       </div>

//       <Card className="w-full max-w-sm z-10">
//         <CardHeader>
//           <CardTitle>Welcome Back</CardTitle>
//           <CardDescription>Login into your trading account</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit}>
//             <div className="flex flex-col gap-6">
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="you@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//                 <p
//                   className={`text-sm ${
//                     isPasswordValid ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   Minimum 6 characters, uppercase, lowercase, number & special character
//                 </p>
//               </div>
//             </div>

//             {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}
//             {success && <p className="text-green-600 mt-4 text-sm">{success}</p>}

//             <Button type="submit" className="w-full mt-4">
//               Login
//             </Button>

//             {showLoader && (
//               <div className="mt-4 flex items-center justify-center gap-2 text-sm text-blue-600">
//                 <svg
//                   className="animate-spin h-4 w-4 text-blue-600"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   />
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v8H4z"
//                   />
//                 </svg>
//                 Welcome back...
//               </div>
//             )}
//           </form>
//         </CardContent>

//         <CardFooter className="flex-col gap-2">
//           <div className="flex gap-2 text-sm">
//             Not a trader?
//             <Link href="/signup" className="text-blue-500 underline">
//               Sign Up
//             </Link>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default Login;


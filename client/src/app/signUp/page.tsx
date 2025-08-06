"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Particles from "@/components/ui/particles";
import { Loader2, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

const RegisterPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirm = () => setShowConfirm((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isPasswordValid = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!isPasswordValid(formData.password)) {
      setError(
        "Password must be at least 6 characters and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    setLoading(true);

    try {
      await axios.post("https://authapi-jqve.onrender.com/api/Auth/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPaasword: formData.confirmPassword, // backend expects typo
      });

      setSuccess("Account created successfully!");
      setTimeout(() => router.push("/login"), 2500);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      console.error("Registration error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Account creation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center mt-7">
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
          <CardTitle>Join AbbyStores</CardTitle>
          <CardDescription>Create an account with us</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter Your First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter Your Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="awxbdcnx@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-[38px] text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <p
                className={`text-sm ${
                  formData.password
                    ? isPasswordValid(formData.password)
                      ? "text-green-600"
                      : "text-red-600"
                    : "text-gray-500"
                }`}
              >
                Minimum 6 characters, uppercase, lowercase, number, and special
                character.
              </p>
            </div>

            <div className="grid gap-2 relative">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={toggleConfirm}
                className="absolute right-3 top-[38px] text-gray-500"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <XCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle className="w-4 h-4" />
                {success}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" />
                  Registering...
                </span>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <CardContent className="flex gap-1 items-center justify-center">
            Already a trader?
            <Link href="/login">
              <Button variant="link" size="icon">
                Login
              </Button>
            </Link>
          </CardContent>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;






// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Particles from "../../components/ui/particles";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import { Loader2, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

// const RegisterPage = () => {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showSpinner, setShowSpinner] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const togglePassword = () => setShowPassword((prev) => !prev);
//   const toggleConfirm = () => setShowConfirm((prev) => !prev);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const isPasswordValid = (password: string) => {
//     const regex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/;
//     return regex.test(password);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     if (!isPasswordValid(formData.password)) {
//       setError(
//         "Password must be at least 6 characters and include uppercase, lowercase, number, and special character."
//       );
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "https://authapi-jqve.onrender.com/api/Auth/register",
//         {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           password: formData.password,
//           confirmPaasword: formData.confirmPassword, // API expects typo
//         }
//       );

//       setSuccess("Account created successfully!");
//       setShowSpinner(true);
//       setTimeout(() => {
//         router.push("/login");
//       }, 2500);
//     } catch (err: any) {
//       console.error("Registration error:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "Account creation failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative w-full h-[600px] flex items-center justify-center mt-7">
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
//           <CardTitle>Join AbbyStores</CardTitle>
//           <CardDescription>Create an account with us</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//             <div className="grid gap-2">
//               <Label htmlFor="firstName">First Name</Label>
//               <Input
//                 id="firstName"
//                 name="firstName"
//                 type="text"
//                 placeholder="Enter Your First Name"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="grid gap-2">
//               <Label htmlFor="lastName">Last Name</Label>
//               <Input
//                 id="lastName"
//                 name="lastName"
//                 type="text"
//                 placeholder="Enter Your Last Name"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
              
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="awxbdcnx@gmail.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="grid gap-2 relative">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={togglePassword}
//                 className="absolute right-3 top-[38px] text-gray-500"
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//               <p
//                 className={`text-sm ${
//                   formData.password
//                     ? isPasswordValid(formData.password)
//                       ? "text-green-600"
//                       : "text-red-600"
//                     : "text-gray-500"
//                 }`}
//               >
//                 Minimum 6 characters, uppercase, lowercase, number, and special
//                 character.
//               </p>
//             </div>

//             <div className="grid gap-2 relative">
//               <Label htmlFor="confirmPassword">Confirm Password</Label>
//               <Input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type={showConfirm ? "text" : "password"}
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={toggleConfirm}
//                 className="absolute right-3 top-[38px] text-gray-500"
//               >
//                 {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>

//             {/* Success / Error Messages */}
//             {error && (
//               <div className="flex items-center gap-2 text-red-600 text-sm">
//                 <XCircle className="w-4 h-4" />
//                 {error}
//               </div>
//             )}
//             {success && (
//               <div className="flex items-center gap-2 text-green-600 text-sm">
//                 <CheckCircle className="w-4 h-4" />
//                 {success}
//               </div>
//             )}

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "Registering..." : "Register"}
//             </Button>
//           </form>

//           {/* Spinner with "Welcome" */}
//           {showSpinner && (
//             <div className="flex justify-center items-center mt-4 gap-2 text-blue-500">
//               <Loader2 className="animate-spin h-5 w-5" />
//               <p>Welcome aboard, redirecting...</p>
//             </div>
//           )}
//         </CardContent>

//         <CardFooter className="flex-col gap-2">
//           <CardContent className="flex gap-1 items-center justify-center">
//             Already a trader?
//             <Link href="/login">
//               <Button variant="link" size="icon">
//                 Login
//               </Button>
//             </Link>
//           </CardContent>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default RegisterPage;

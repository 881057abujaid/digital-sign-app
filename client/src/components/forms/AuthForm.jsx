import { Mail, Lock, User, ArrowRight } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";

const AuthForm = ({ type = "login", onSubmit, register, errors, loading }) =>{
    const isRegister = type === "register";

    return (
        <form 
            onSubmit={onSubmit}
            className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white w-full max-w-md space-y-6"
        >
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-tr from-red-600 to-red-500 rounded-2xl shadow-lg flex items-center justify-center text-white mx-auto mb-4 scale-90 group-hover:scale-100 transition-transform">
                    <svg className="w-8 h-8 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    {isRegister ? "Create an account" : "Welcome back"}
                </h2>
                <p className="text-sm font-medium text-gray-500 mt-2">
                    {isRegister ? "Join SignFlow to start managing documents." : "Enter your details to access your account."}
                </p>
            </div>

            <div className="space-y-4">
                {isRegister && (
                    <Input
                        type="text"
                        placeholder="Full Name"
                        icon={User}
                        {...register("name")}
                        error={errors.name?.message}
                    />
                )}

                <Input
                    type="email"
                    placeholder="Email Address"
                    icon={Mail}
                    {...register("email")}
                    error={errors.email?.message}
                />

                <Input
                    type="password"
                    placeholder="Password"
                    icon={Lock}
                    {...register("password")}
                    error={errors.password?.message}
                />
            </div>

            <Button disabled={loading} className="w-full flex items-center justify-center gap-2 group py-3.5 shadow-md shadow-red-200/50" type="submit">
                <span>{loading ? "Please wait..." : (isRegister ? "Sign up" : "Sign in")}</span>
                {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </Button>
            
            <div className="text-center pt-2">
                <p className="text-sm font-medium text-gray-600">
                    {isRegister ? "Already have an account?" : "Don't have an account?"}
                    <a href={isRegister ? "/login" : "/register"} className="text-red-600 font-bold ml-1 hover:text-red-700 hover:underline">
                        {isRegister ? "Log in" : "Sign up"}
                    </a>
                </p>
            </div>
        </form>
    );
};
export default AuthForm;
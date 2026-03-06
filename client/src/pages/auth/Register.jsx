import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../../components/forms/AuthForm";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useState } from "react";

const schema = yup.object().shape({
    name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Register = () => {
    const { register: authRegister } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleRegister = async (data) => {
        try {
            setLoading(true);
            await authRegister(data.name, data.email, data.password);
            toast.success("Account created successfully!");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.message || "Registration failed. Email might already exist.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-gray-50 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[10%] -left-[5%] w-[500px] h-[500px] rounded-full bg-red-100/50 blur-3xl"></div>
                <div className="absolute bottom-[0%] -right-[10%] w-[600px] h-[600px] rounded-full bg-blue-50/50 blur-3xl"></div>
            </div>

            {/* Back Button */}
            <Link to="/" className="absolute top-8 left-8 z-10 hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 bg-white/50 backdrop-blur-md rounded-xl hover:bg-white hover:text-gray-900 border border-gray-200/50 border-transparent transition-all shadow-sm">
                <ArrowLeft size={16} />
                <span>Back to Home</span>
            </Link>

            {/* Form Container */}
            <div className="relative z-10 w-full px-4 flex justify-center auto-animate">
                <AuthForm 
                    type="register" 
                    onSubmit={handleSubmit(handleRegister)} 
                    register={register}
                    errors={errors}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default Register;
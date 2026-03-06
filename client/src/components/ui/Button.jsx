const Button = ({ children, variant = "primary", className = "", ...props }) => {
    const base = "px-6 py-3 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl";

    const variants = {
        primary: "bg-red-600 text-white hover:bg-red-700 border border-transparent",
        secondary: "bg-gray-900 text-white hover:bg-black border border-transparent",
        success: "bg-green-600 text-white hover:bg-green-700 border border-transparent",
        outline: "bg-white text-gray-800 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50",
    };

    return (
        <button className={`${base} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    )
}
export default Button;
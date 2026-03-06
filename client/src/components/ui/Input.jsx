import { forwardRef } from "react";

const Input = forwardRef(({
    type = "text",
    placeholder,
    icon: Icon,
    className = "",
    error,
    ...props
}, ref) => {
    return (
        <div className="relative mb-2">
            {Icon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                    <Icon size={18} />
                </div>
            )}
            <input
                type={type}
                placeholder={placeholder}
                ref={ref}
                {...props}
                className={`w-full bg-gray-50/50 border ${error ? 'border-red-500' : 'border-gray-200'} rounded-2xl ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3.5 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:font-normal placeholder:text-gray-400 relative z-0 ${className}`} 
            />
            {error && (
                <p className="text-red-500 text-xs font-semibold mt-1.5 ml-1 animate-in fade-in zoom-in slide-in-from-top-1 duration-200">{error}</p>
            )}
        </div>
    );
});

Input.displayName = "Input";
export default Input;
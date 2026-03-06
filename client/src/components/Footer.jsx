const Footer = () => {
    return (
        <footer className="bg-white py-12 px-4 border-t border-gray-100 relative">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white">
                        <svg className="w-4 h-4 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </div>
                    <span className="text-xl font-extrabold tracking-tight text-gray-900">SignFlow</span>
                </div>
                <p className="text-gray-500 font-medium text-sm">© {new Date().getFullYear()} SignFlow Inc. All rights reserved. Made with ❤️ by Abujaid Raja</p>
                <div className="flex gap-6 text-sm font-bold text-gray-600">
                    <a href="#" className="hover:text-red-600 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-red-600 transition-colors">Terms</a>
                    <a href="#" className="hover:text-red-600 transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

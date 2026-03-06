import Navbar from "../components/Navbar";

const MainLayout = ({ children }) =>{
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via white to-gray-100">
            <Navbar />
            <main className="py-10">
                {children}
            </main>
        </div>
    );
};
export default MainLayout;
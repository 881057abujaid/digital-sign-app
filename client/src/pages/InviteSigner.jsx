import MainLayout from "../layouts/MainLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import useInviteSigner from "../hooks/useInviteSigner";

const InviteSigner = () => {
    const {
        signers,
        loading,
        message,
        navigate,
        handleAddSigner,
        handleRemoveSigner,
        handleSignerChange,
        handleInvite
    } = useInviteSigner();

    return (
        <MainLayout>
            <div className="max-w-2xl mx-auto mt-4 sm:mt-12 bg-white p-5 sm:p-8 rounded-3xl shadow-xl">
                <h2 className="text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Invite Signers</h2>
                <p className="text-sm sm:text-base text-gray-500 mb-6">Enter the details of the people you want to invite to sign this document.</p>
                
                {message && (
                    <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleInvite}>
                    <div className="space-y-6 mb-6">
                        {signers.map((signer, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-4 items-start p-4 border rounded-xl bg-gray-50 relative">
                                <div className="flex-1 w-full">
                                    <Input 
                                        label={`Signer ${index + 1} Name`}
                                        type="text"
                                        placeholder="John Doe"
                                        value={signer.name}
                                        onChange={(e) => handleSignerChange(index, "name", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex-1 w-full">
                                    <Input 
                                        label={`Signer ${index + 1} Email`}
                                        type="email"
                                        placeholder="john@example.com"
                                        value={signer.email}
                                        onChange={(e) => handleSignerChange(index, "email", e.target.value)}
                                        required
                                    />
                                </div>
                                {signers.length > 1 && (
                                    <button 
                                        type="button"
                                        onClick={() => handleRemoveSigner(index)}
                                        className="mt-8 text-red-500 hover:text-red-700 font-bold px-2 py-2"
                                        title="Remove Signer"
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    <Button 
                        type="button" 
                        variant="secondary" 
                        className="w-full mb-6"
                        onClick={handleAddSigner}
                    >
                        + Add Another Signer
                    </Button>

                    <div className="flex gap-4 pt-4 border-t">
                        <Button 
                            type="button" 
                            variant="secondary" 
                            className="w-full bg-gray-200"
                            onClick={() => navigate('/')}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Invites"}
                        </Button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
};

export default InviteSigner;

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as signService from "../services/signService";

const useInviteSigner = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [signers, setSigners] = useState([{ name: "", email: "" }]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleAddSigner = () => {
        setSigners([...signers, { name: "", email: "" }]);
    };

    const handleRemoveSigner = (index) => {
        const newSigners = signers.filter((_, i) => i !== index);
        setSigners(newSigners);
    };

    const handleSignerChange = (index, field, value) => {
        const newSigners = [...signers];
        newSigners[index][field] = value;
        setSigners(newSigners);
    };

    const handleInvite = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const emails = signers.map(s => s.email).filter(e => e.trim() !== "");

        if(emails.length === 0){
            setMessage({ type: "error", text: "Please add at least one valid email." });
            setLoading(false);
            return;
        }

        try {
            const data = await signService.inviteSigners(id, emails);
            setMessage({ type: "success", text: data.message || "Signers invited successfully!" });
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Failed to invite signers";
            setMessage({ type: "error", text: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    return {
        signers,
        loading,
        message,
        navigate,
        handleAddSigner,
        handleRemoveSigner,
        handleSignerChange,
        handleInvite
    };
};

export default useInviteSigner;

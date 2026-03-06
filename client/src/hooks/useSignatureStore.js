import { useState } from "react";

const useSignatureStore = () =>{
    const [signatures, setSignatures] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const addSignature = (signature) =>{
        setSignatures((prev) => [...prev, signature]);
    };

    const updateSignature = (id, updates) =>{
        setSignatures((prev) =>
            prev.map((sig) => sig.id === id ? {...sig, ...updates} : sig)
        );
    };

    const deleteSignature = (id) =>{
        console.log(id);
        setSignatures((prev) =>
            prev.filter((sig) => sig.id !== id)
        );
        console.log("deleted");
    };

    return {
        addSignature,
        updateSignature,
        deleteSignature,
        signatures,
        setSignatures,
        selectedId,
        setSelectedId
    };
};
export default useSignatureStore;
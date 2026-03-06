import api from "./api";

export const getDocuments = async () =>{
    const { data } = await api.get("/documents");
    return data;
};

export const uploadDocument = async (formData) =>{
    const { data } = await api.post("/documents/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};

export const getInvitedDocuments = async () =>{
    const { data } = await api.get("/documents/invited");
    return data;
};

export const getActivity = async () =>{
    const { data } = await api.get("/documents/activity");
    return data;
};

export const deleteDocument = async (id) => {
    const { data } = await api.delete(`/documents/${id}`);
    return data;
};

export const declineDocument = async (token) => {
    const { data } = await api.post(`/sign/decline/${token}`);
    return data;
};
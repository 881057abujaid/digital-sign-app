import api from "./api";

export const inviteSigners = async (documentId, emails) => {
    const { data } = await api.post(`/documents/${documentId}/invite`, { emails });
    return data;
};

export const submitSignatures = async (token, signatures) => {
    const { data } = await api.post(`/sign/${token}`, { signatures });
    return data;
};

export const validateToken = async (token) => {
    const { data } = await api.get(`/sign/${token}`);
    return data;
};

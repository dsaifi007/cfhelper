import request from "./axios.instance";


export const fetchEntities = async (
    endPoint: string,
    params: object) => {
    const response = await request.get(endPoint, params);
    return response.data;
};

export const createEntity = async (
    endPoint: string,
    params: object
) => {
    const response = await request.post(endPoint, params);
    return response.data;
};

export const updateEntity = async (
    endPoint: string,
    params: object
) => {
    const response = await request.put(endPoint, params);
    return response.data;
};

export const deleteEntity = async (
    endPoint: string,
    params: object
) => {
    const response = await request.delete(endPoint, params);
    return response.data;
};

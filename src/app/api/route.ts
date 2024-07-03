import axios from 'axios';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const baseURL = 'https://api.cloudflare.com/client/v4/';

export async function OPTIONS() {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
    };
    return NextResponse.json({}, { headers });
}


// Handle POST requests
export async function POST(request: NextRequest) {
    try {
        let postData = await request.json();
        let baseUrl = baseURL + postData.endpoint;

        const { email, apiKey, endpoint, ...rest } = postData;

        const response = await axios.post(baseUrl, rest, {
            headers: {
                'X-Auth-Email': email,
                'X-Auth-Key': apiKey,
                'Content-Type': 'application/json',
            },
        });

        // Assuming response.data contains your API response
        return NextResponse.json(response.data);
    } catch (error: any) {

        if (error.response && error.response.data && error.response.data.errors) {
            const { errors } = error.response.data;
            const errorMessage = errors.map((err: any) => ({
                code: err.code,
                message: err.message,
            }));

            return NextResponse.json({
                success: false,
                errors: errorMessage,
                messages: [],
                result: null,
            });
        }

        // Default error response
        return NextResponse.json({
            success: false,
            errors: [{ code: error.response?.status, message: error.message }],
            messages: [],
            result: null,
        });
    }
}
export async function PATCH(request: NextRequest) {

    try {
        let postData = await request.json();
        //const { email: emails, apiKey: apiKeys } = postData;
        let baseUrl = baseURL + postData.endpoint;
        const { email, apiKey, endpoint, ...rest } = postData;
        const response = await axios.patch(baseUrl, rest, {
            headers: {
                'X-Auth-Email': postData.email,
                'X-Auth-Key': postData.apiKey,
                'Content-Type': 'application/json',
            },
        });
        // .then((res: any) => res).catch(async (err: any) => {
        //     throw new Error(`Request failed with status ${err}`);
        // });
        return NextResponse.json(response.data);
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.errors) {
            const { errors } = error.response.data;
            const errorMessage = errors.map((err: any) => ({
                code: err.code,
                message: err.message,
            }));

            return NextResponse.json({
                success: false,
                errors: errorMessage,
                messages: [],
                result: null,
            });
        }

        // Default error response
        return NextResponse.json({
            success: false,
            errors: [{ code: error.response?.status, message: error.message }],
            messages: [],
            result: null,
        });
    }
}

// Handle other HTTP methods if needed
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");
        const apiKey = searchParams.get("apiKey");
        const endpoint = searchParams.get("endpoint");

        //endpoint

        console.log("email", email);
        console.log("apikey", apiKey, baseURL + endpoint);

        if (!email || !apiKey) {
            return NextResponse.json({ error: 'Email and API Key are required' }, { status: 400 });
        }
        //'https://api.cloudflare.com/client/v4/accounts'
        const response = await axios.get(baseURL + endpoint, {
            headers: {
                'X-Auth-Email': email,
                'X-Auth-Key': apiKey,
                'Content-Type': 'application/json',
            }
        });
        return NextResponse.json(response.data);
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.errors) {
            const { errors } = error.response.data;
            const errorMessage = errors.map((err: any) => ({
                code: err.code,
                message: err.message,
            }));

            return NextResponse.json({
                success: false,
                errors: errorMessage,
                messages: [],
                result: null,
            });
        }

        // Default error response
        return NextResponse.json({
            success: false,
            errors: [{ code: error.response?.status, message: error.message }],
            messages: [],
            result: null,
        });
    }
}

// Handle other HTTP methods if needed
export async function DELETE(request: NextRequest) {
    try {
        let postData = await request.json();
        // const BASE_URL = baseURL;
        //const { email: emails, apiKey: apiKeys } = postData;
        let baseUrl1 = baseURL + postData.endpoint;
        //   const { email, apiKey, endpoint, ...rest } = postData;
        const headers = {
            'X-Auth-Email': postData.email,
            //'Authorization': postData.apiKey,
            'X-Auth-Key': postData.apiKey
            // 'Content-Type': 'application/json',
        }

        console.log("1234567898765", baseUrl1);

        const response = await axios.get(baseUrl1, { headers: headers });

        // const filterData = response.data.result.length > 0 ? :

        console.log("response", response.data.result);
        for (let i = 0; i < response.data.result.length; i++) {
            const deleteUrl = 'https://api.cloudflare.com/client/v4/' + "zones/" + postData.zoneId + "/dns_records/" + response.data.result[i].id;
            console.log("deleteUrl", deleteUrl)

            const response1 = await axios.delete(deleteUrl, { headers: headers });
        }
        return NextResponse.json({ ...response.data });
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.errors) {
            const { errors } = error.response.data;
            const errorMessage = errors.map((err: any) => ({
                code: err.code,
                message: err.message,
            }));

            return NextResponse.json({
                success: false,
                errors: errorMessage,
                messages: [],
                result: null,
            });
        }

        // Default error response
        return NextResponse.json({
            success: false,
            errors: [{ code: error.response?.status, message: error.message }],
            messages: [],
            result: null,
        });
    }
}

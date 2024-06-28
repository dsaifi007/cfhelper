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
        } catch (error:any) {

            if (error.response && error.response.data && error.response.data.errors) {
                const { errors } = error.response.data;
                const errorMessage = errors.map((err:any) => ({
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
        const response = await axios.post(baseUrl, rest, {
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
            const errorMessage = errors.map((err:any) => ({
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

        if (!email || !apiKey) {
            return NextResponse.json({ error: 'Email and API Key are required' }, { status: 400 });
        }

        const response = await axios.get('https://api.cloudflare.com/client/v4/accounts', {
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
            const errorMessage = errors.map((err:any) => ({
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
        //const { email: emails, apiKey: apiKeys } = postData;
        let baseUrl = baseURL + postData.endpoint;
        //   const { email, apiKey, endpoint, ...rest } = postData;
        const headers = {
            'X-Auth-Email': postData.email,
            'X-Auth-Key': postData.apiKey,
            'Content-Type': 'application/json',
        }
        const response = await axios.delete(baseUrl, { headers: headers });
        return NextResponse.json(response.data);
    } catch (error: any) {
       if (error.response && error.response.data && error.response.data.errors) {
            const { errors } = error.response.data;
            const errorMessage = errors.map((err:any) => ({
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

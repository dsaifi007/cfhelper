// lib/cors.js
export default function allowCors(handler: any) {
    return async (req: any, res: any) => {
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Origin', '*'); // Be specific in production
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
        res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
        res.setHeader('Access-Control-Max-Age', '86400');

        // Handle preflight requests
        if (req.method === 'OPTIONS') {
            res.status(200).end();
            return;
        }

        return await handler(req, res);
    };
}

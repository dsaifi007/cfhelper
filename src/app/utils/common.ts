"use client";

import { API_URL } from "./constant";

export const fetchBitcoinPrice = async () => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        const bitcoinPrice = data.bitcoin.usd;
        return bitcoinPrice;
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
        return null;
    }
}

export const BASE_URL = "http://127.0.0.1:8001/api";//"https://backend.dealsquad.pics/api";

// export const getPrice = () => {
//     if (typeof window !== 'undefined')
//         //ts-ignore;
//         return "$" + localStorage.getItem("total_price");

// }

// export const setPrice = (price: any) => {

//     if (typeof window !== 'undefined')
//         return localStorage.getItem("total_price") == null ? localStorage.setItem("total_price", price) : "1233";
// }

export const setUserName = (name: any) => {
    if (typeof window !== 'undefined')
        return localStorage.setItem("username", name);
}
export const getUserName = () => {
    if (typeof window !== 'undefined')
        return localStorage.getItem("username") != null ? localStorage.getItem("username") : "user-id81214223";
}

export const setCryptoCurrencyData = (currency_symbol: any, price: any) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem("currency_symbol", currency_symbol);
        localStorage.setItem("currency_price", price);
        localStorage.getItem("total_bitcoin") == null ? localStorage.setItem("total_bitcoin", "1.137621") : "";
    }

}





export const setBitcoin = (bitcoin: any) => {
    if (typeof window !== 'undefined')
        return localStorage.getItem("total_bitcoin") == null ? localStorage.setItem("total_bitcoin", bitcoin) : localStorage.getItem("total_bitcoin");
}

// export const getBitcoin = () => {
//     if (typeof window !== 'undefined')
//         return localStorage.getItem("total_bitcoin") != null ? localStorage.getItem("total_bitcoin") : 1.137621;
// }

export const getPriceWithAfterDis = () => {
    if (typeof window !== 'undefined') {
        let p: any = localStorage.getItem("total_price") != null ? localStorage.getItem("total_price") : 0;
        return (p - p * 0.12 / 100).toFixed(2);
    }

}
export const CRYPTO_ARRAY = ["BTC", "BCH", "ETH", "LTC", "DOGE", "XRP", "USDT", "SOL", "MATIC", "DOT", "BNB", "ADA"];

export const CRYPTO_IMAGES = [
    { code: "BTC", img: "bitcoin.png" },
    { code: "LTC", img: "bitcoin.png" },
    { code: "BCH", img: "bch.png" },
    { code: "ETH", img: "ethereum.png" },
    { code: "LTC", img: "litecoin.png" },
    { code: "DOGE", img: "doge.png" },
    { code: "XRP", img: "xrp.png" },
    { code: "USDT", img: "usdt.png" },
    { code: "SOL", img: "solana.png" },
    { code: "MATIC", img: "matic.png" },
    { code: "BNB", img: "bnb.png" },
    { code: "ADA", img: "ada.png" },
    { code: "DOT", img: "dot.png" },
]

export const formatedPrice = (v: any) => {
    return parseFloat(v).toFixed(2);
}

export const randomNames = [
    "Liam",
    "Olivia",
    "Noah",
    "Emma",
    "Oliver",
    "Ava",
    "Elijah",
    "Charlotte",
    "William",
    "Sophia",
    "James",
    "Amelia",
    "Benjamin",
    "Isabella",
    "Lucas",
    "Mia",
    "Henry",
    "Harper",
    "Alexander",
    "Evelyn",
    "Michael",
    "Abigail",
    "Ethan",
    "Emily",
    "Daniel",
    "Elizabeth",
    "Matthew",
    "Avery",
    "Jackson",
    "Sofia",
    "Sebastian",
    "Madison",
    "Joseph",
    "Scarlett",
    "Samuel",
    "Victoria",
    "David",
    "Aria",
    "Carter",
    "Grace",
    "Wyatt",
    "Chloe",
    "John",
    "Penelope",
    "Owen",
    "Lily",
    "Dylan",
    "Ella",
    "Luke",
    "Nora",
    'Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack',
    'Kate', 'Leo', 'Mia', 'Noah', 'Olivia', 'Paul', 'Quinn', 'Ryan', 'Sophia', 'Tom',
    'Uma', 'Vincent', 'Wendy', 'Xavier', 'Yara', 'Zach', 'Abby', 'Ben', 'Cara', 'Dylan',
    'Ella', 'Felix', 'Gina', 'Hank', 'Isabel', 'Jake', 'Katie', 'Liam', 'Molly', 'Nathan',
    'Oscar', 'Penny', 'Quincy', 'Rachel', 'Sam', 'Tina', 'Victor', 'Winnie', 'Xander', 'Yvonne', 'Zoe'
];

export const generateRandomTime = () => {
    const hour = Math.floor(Math.random() * 24).toString().padStart(2, '0');
    const minute = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    const ampm = Math.random() < 0.5 ? 'am' : 'pm';
    return `${hour}:${minute}${ampm}`;
};

export const generateHash = (code: any) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(code);
    return window.crypto.subtle.digest('SHA-256', data)
        .then(hash => {
            const hexString = Array.from(new Uint8Array(hash))
                .map(byte => byte.toString(16).padStart(2, '0'))
                .join('');

            return hexString;
        });
}

export const getTimeZone = () => {
    var offset = new Date().getTimezoneOffset(),
        o = Math.abs(offset);
    return (
        (offset < 0 ? "+" : "-") +
        ("00" + Math.floor(o / 60)).slice(-2) +
        ":" +
        ("00" + (o % 60)).slice(-2)
    );
};

export const MESSAGES = [
    "Currency conversion successfuly <b>completed</b>",
    "I am able to generate a receipt for your payment. The amount of <b>[price]</b> is ready to transfer.",
    "Please note the fund will be divided into two equal parts as the withdrawal  amount exceeds <b>[pay]</b>",
    "The payment will be sent to the details you provided.",
    "Please review these transfer receipts and confirm the withdrawal of funds",
    "Kindly follow  the instructions on the next page to receive your funds within <b>15 minutes</b>",
    "I am glad to I could assist you! To receive the full amount, Please follow the link below, review the transfer receipt, and receive the payment"
];

export const setNameinLS = (name: string) => {
    if (typeof window !== 'undefined')
        localStorage?.setItem("name", name);
}
export const setPhoneinLS = (phone: string) => {
    if (typeof window !== 'undefined')
        localStorage?.setItem("phone", phone);
}
export const setEmailinLS = (email: string) => {
    if (typeof window !== 'undefined')
        localStorage.setItem("email", email);
}

export const setStepinLS = (step: any) => {
    if (typeof window !== 'undefined')
        localStorage.setItem("step", step);
}

export const getName = () => {
    if (typeof window !== 'undefined')
        return localStorage.getItem("name")
}

export const updateQueryString = () => {
    if (typeof window !== 'undefined') {
        localStorage?.setItem("domain", window.location.origin);
        localStorage?.setItem("q", window.location.search.split("=")[1] != undefined ? window.location.search.split("=")[1] : "");
    }
}

export const getdomain = () => {
    if (typeof window !== 'undefined')
        return localStorage?.getItem("domain")
}

export const getqueryString = () => {
    if (typeof window !== 'undefined')
        return localStorage?.getItem("q")
}

export const getPhone = () => {
    if (typeof window !== 'undefined')
        return localStorage?.getItem("phone")
}
export const getEmail = () => {
    if (typeof window !== 'undefined')
        return localStorage?.getItem("email")
}
export const getStep = () => {
    if (typeof window !== 'undefined') {
        //@ts-ignore
        return parseInt(localStorage?.getItem("step") != undefined ? localStorage?.getItem("step") : 0) || 0
    }
    return 0;
}


export const updateStatictics = async (params: any) => {

    await fetch(API_URL + "/update-statistics", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log("success", responseJson)
        })
        .catch((error) => {
            console.error("error", error);
        });
    return true;
}
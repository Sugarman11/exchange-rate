export default class CbrService {
    async getResource(url) {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Coild not fetch ${url}` + 
                `, received ${res.status}`)
        };

        return await res.json()
        
    };


    getAllRate = async () => {
        const res = await this.getResource(`https://www.cbr-xml-daily.ru/daily_json.js`)
        return res.Valute;
    };

    getUSDRate = async () => {
        const res = await this.getResource(`https://www.cbr-xml-daily.ru/daily_json.js`)
        return res.Valute.USD;
    };

    getDate = async () => {
        const res = await this.getResource(`https://www.cbr-xml-daily.ru/daily_json.js`)
        return res.Date;
    };
};
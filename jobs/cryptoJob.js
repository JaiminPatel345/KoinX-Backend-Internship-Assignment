import axios from 'axios';
import Crypto from '../models/crypto.js';

const fetchCryptoData = async () => {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];

    try {
        const response = await axios.get(
            'https://api.coingecko.com/api/v3/simple/price',
            {
                params: {
                    ids: coins.join(','),
                    vs_currencies: 'usd',
                    include_market_cap: true,
                    include_24hr_change: true
                }
            }
        );

        for (const coin of coins) {
            const data = response.data[coin];
            await Crypto.create({
                coinId: coin,
                price: data.usd,
                marketCap: data.usd_market_cap,
                change24h: data.usd_24h_change
            });
        }
        console.log('Crypto data updated successfully');
    } catch (error) {
        console.error('Error updating crypto data:', error);
    }
};

export const startCryptoJob = () => {
    // Run immediately on start
    fetchCryptoData();

    // Then run every 2 hours
    setInterval(fetchCryptoData, 2 * 60 * 60 * 1000);
};

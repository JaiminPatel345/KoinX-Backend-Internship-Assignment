import Crypto from '../models/crypto.js';
import CalcStdDeviation from "../utilities/calcStdDeviation.js";

const getStats = async (req, res) => {
    try {
        const {coin} = req.query;
        if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
            return res.status(400).json({error: 'Invalid coin parameter'});
        }

        const latestData = await Crypto.findOne({coinId: coin})
        .sort({timestamp: -1});

        if (!latestData) {
            return res.status(404).json({error: 'No data found for this coin'});
        }

        return res.json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData.change24h
        });
    } catch (error) {
        res.status(500).json({error: error.message || "Unknown error"});
    }
}

const getDeviation = async (req, res) => {
    try {
        const {coin} = req.query;
        if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
            return res.status(400).json({error: 'Invalid coin parameter'});
        }

        const prices = await Crypto.find({coinId: coin})
        .sort({timestamp: -1})
        .limit(100)
        .select('price');

        if (prices.length === 0) {
            return res.status(404).json({error: 'No data found for this coin'});
        }
        const stdDev = CalcStdDeviation(prices)
        
        return res.json({
            deviation: stdDev
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export default {getStats, getDeviation};

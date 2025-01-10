import express from 'express';
import Crypto from '../models/crypto.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
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
        res.status(500).json({error: error.message});
    }
});

router.get('/deviation', async (req, res) => {
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

        const priceValues = prices.map(p => p.price);
        const mean = priceValues.reduce((a, b) => a + b) / priceValues.length;
        const squareDiffs = priceValues.map(price => {
            const diff = price - mean;
            return diff * diff;
        });
        const avgSquareDiff = squareDiffs.reduce((a, b) => a + b)
            / squareDiffs.length;
        const stdDev = Math.sqrt(avgSquareDiff);

        return res.json({
            deviation: Number(stdDev.toFixed(2))
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

export default router;

import express from 'express';
import CryptoController from "../controllers/cryptoController.js";

const router = express.Router();

router.get('/stats', CryptoController.getStats);
router.get('/deviation', CryptoController.getDeviation);

export default router;

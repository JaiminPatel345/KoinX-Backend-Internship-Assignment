const calculateStdDeviation = (prices) => {
    const priceValues = prices.map(p => p.price);
    const mean = priceValues.reduce((a, b) => a + b) / priceValues.length;
    const squareDiffs = priceValues.map(price => {
        const diff = price - mean;
        return diff * diff;
    });
    const avgSquareDiff = squareDiffs.reduce((a, b) => a + b)
        / squareDiffs.length;
    const stdDev = Math.sqrt(avgSquareDiff);
    return Number(stdDev.toFixed(2))
}

export default calculateStdDeviation;

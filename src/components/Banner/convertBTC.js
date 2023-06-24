export async function convertBitcoinToUSD(id) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
    );
    const data = await response.json();

    //console.log(data);
    const bitcoinPriceUSD = data[id].usd;

    return bitcoinPriceUSD;
    // You can use the bitcoinPriceUSD value in your application as needed
  } catch (error) {
    console.error("Error:", error);
  }
}

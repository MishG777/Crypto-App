import { useState, useEffect } from "react";
import { CryptoState } from "../context/CryptoContext";

function ConvertBtc({ priceId }) {
  const [price, setPrice] = useState(null);

  const { currency, symb } = CryptoState();

  useEffect(() => {
    async function fetchPrice() {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${priceId}&vs_currencies=${currency}`
        );
        const data = await response.json();

        let fetchedPrice = 0;
        if (currency === "eur") {
          fetchedPrice = data[priceId].eur;
        }
        if (currency === "usd") {
          fetchedPrice = data[priceId].usd;
        }

        setPrice(fetchedPrice);
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    }

    fetchPrice();
  }, [priceId, currency]);

  return (
    <div>
      {
        <p>
          {price?.toFixed(2) || 0}
          {symb}
        </p>
      }
    </div>
  );
}

export default ConvertBtc;

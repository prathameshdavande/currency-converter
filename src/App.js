import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useEffect, useState } from "react";

export default function App() {
  const [currency, setCurrency] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //`https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

  useEffect(
    function () {
      async function getCurrencyDetails() {
        setIsLoading(true);
        const res = await fetch(
          // `https://api.frankfurter.app/latest?amount=${currency}&from=${fromCurrency}&to=${toCurrency}`

          `https://api.frankfurter.app/latest?amount=${currency}&from=${fromCurrency}&to=${toCurrency}`
        );

        const data = await res.json();

        setConverted(data.rates[toCurrency]);
        setIsLoading(false);
      }
      if (fromCurrency === toCurrency) return setConverted(currency);

      getCurrencyDetails();
    },
    [currency, fromCurrency, toCurrency]
  );

  return (
    <div>
      <input
        type="text"
        value={currency}
        onChange={(e) => setCurrency(Number(e.target.value))}
        disabled={isLoading}
      />

      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="CAD">CAD</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="CAD">CAD</option>
      </select>
      <p>
        {isLoading ? <Loader /> : converted} {toCurrency}
      </p>
    </div>
  );
}

function Loader() {
  return (
    <div>
      <p>Converting...</p>
    </div>
  );
}

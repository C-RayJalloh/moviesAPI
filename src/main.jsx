/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

import Stars from './Star.jsx'
import TextExpander from './TextExpander.jsx'
import App from './App.jsx'
import './index.css'



function Test() {
  const [movieRating, setMovieRating] = useState(0)
 
  return (
    <div>
      <Stars color="blue" maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  )
}

function CurrencyConverter() {
  const [inputValue, setInputValue] = useState('');
  const [USD, setUSD] = useState("USD");
  const [EUR, setEUR] = useState("EUR");
  const [exRate, setExRate] = useState(null);
  const [error, setError] = useState(null);
  
  const host = 'api.frankfurter.app';

  useEffect(() => {
    async function fetchExchangeRate() {
      try {
        const res = await fetch(`https://${host}/latest?amount=${inputValue}&from=${USD}&to=${EUR}`);
        const data = await res.json();
        setExRate(data.rates[EUR]);
        setError(null); // Reset error if the fetch is successful
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
        setExRate(null);
        setError('Error fetching exchange rate. Please try again.'); // Set an error message
      }
    }

    fetchExchangeRate();
  }, [inputValue, USD, EUR]);

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleSelectChange1(e){
    setUSD(e.target.value);

  }
  
  function handleSelectChange2(e) {
    setEUR(e.target.value);
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <select value={USD} onChange={handleSelectChange1}>
        {/* Include the currency options based on your requirements */}
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={EUR} onChange={handleSelectChange2}>
        {/* Include the currency options based on your requirements */}
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        exRate && (
          <p>
            Currency conversion rate from {USD} to {EUR}: {exRate} {EUR}  <br />
            {exRate} {EUR}
          </p>
        )
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {/** 
 * 
  <Stars
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <Stars size={24} color="red" className="test" defaultRating={3} />
    <Test /> 
    <TextExpander />
     <CurrencyConverter />
  */}

    <App />
  </>
);

// App.js
import React, { useState, useEffect } from "react";
import "./App.css";

// Mock function to simulate API call
const fetchStockData = () => {
  return Promise.resolve([
    { symbol: "AAPL", price: 150.5 },
    { symbol: "GOOGL", price: 2725.8 },
    { symbol: "AMZN", price: 3450.3 },
  ]);
};

function App() {
  const [stocks, setStocks] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [balance, setBalance] = useState(10000); // User's initial balance

  useEffect(() => {
    // Fetch stock data when the component mounts
    fetchStockData().then((data) => setStocks(data));
  }, []);

  const handleBuy = (stock) => {
    const price = stock.price;
    if (balance >= price) {
      setBalance(balance - price);
      setHoldings([...holdings, stock]);
    } else {
      alert("Insufficient balance");
    }
  };

  const handleSell = (stock) => {
    const updatedHoldings = holdings.filter(
      (holding) => holding.symbol !== stock.symbol
    );
    setHoldings(updatedHoldings);
    setBalance(balance + stock.price);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Real-Time Stock Market App</h1>
      </header>
      <div className="dashboard">
        <h2>Balance: ${balance.toFixed(2)}</h2>
        <h3>Your Holdings:</h3>
        <ul className="holdings">
          {holdings.map((holding, index) => (
            <li key={index}>
              {holding.symbol}: ${holding.price.toFixed(2)}
              <button onClick={() => handleSell(holding)}>Sell</button>
            </li>
          ))}
        </ul>
        <h3>Available Stocks:</h3>
        <ul className="stock-list">
          {stocks.map((stock) => (
            <li key={stock.symbol}>
              {stock.symbol}: ${stock.price.toFixed(2)}
              <button onClick={() => handleBuy(stock)}>Buy</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

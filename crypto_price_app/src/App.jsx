import axios from "axios"
import React, { useEffect, useState } from "react"
import Coin from "./components/Coin";
import "./App.css"

const App = () => {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    axios.get("https://api.coinstats.app/public/v1/coins?skip=0&limit=100").then(
      (response) => {
        setListOfCoins(response.data.coins);
      }
    );
  }, []);

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  return (
    <div>
      <div className="cryptoHeader">
        <input
          type="text"
          placeholder="Coin Name..."
          onChange={(event) => {
            setSearchWord(event.target.value)
          }} />
      </div>
      <div className="cryptoDisplay">
        {filteredCoins.map((coin) => {
          return (
            <Coin
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
            />
          );
        })}
      </div>
    </div>
  )
}

export default App;
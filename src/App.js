import React from 'react';

import {
  useEffect,
  useState
} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,   
  useParams 
} from 'react-router-dom';


export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link exact to="/">Home</Link>
          </li>
          <li>
            <Link exact to="/about">About</Link>
          </li>
          <li>
            <Link exact to="/stocks">Stocks</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/stocks/:id">
            <Stock />
          </Route> 
          <Route path="/about">
            <About />
          </Route>
          <Route exact path="/stocks">
            <Stocks />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>Input a stock symbol or a list of symbols separated by a comma:</p>
        <form method="GET" action="/stocks">
          <input type="text" id="symbols" name="symbols" />      
          <button class="btn btn-primary" type="submit" id="submit">Submit</button>
        </form>
      <p>If you don&lsquo;t input at least a symbol you will be shown a default portfolio.</p>
      <p>Made by <a href="https://mariosanchez.org">Mario Sanchez Carrion</a> | <a href="https://mariosanchez.org">mariosanchez.org</a></p>
        <br />
    </div>
  );
}


function About() {
  return (
    <div>
      <h2>About</h2>
      <p>This is a demonstration of a stock fetching app using React Router and Hooks.</p>
    </div>
  );
}



function Stocks() {

  const PORTFOLIO = portfolioFromQueryParams() || 'GOOG,TWTR,FB,AMZN,AAPL';

// get the query parameters from the address bar and return the symbols
  function portfolioFromQueryParams() {
    if (!window.location.search) return;
    let companies = new URLSearchParams(window.location.search);
    return companies.get('symbols');
  }

  useEffect(() => {
    fetchStocks()}, []
  );

  const [stocks, setStocks] = useState([]);

  const fetchStocks = async () => {
    const res = await fetch(`https://api.worldtradingdata.com/api/v1/stock?symbol=${PORTFOLIO}&api_token=YourKeyHere`);
    const items = await res.json();
    setStocks(items.data);
  }

  return (
    <div>
      <h2>Stocks</h2>
      { 
      stocks.map((company, i) => <p><Link to={`/stocks/${company.symbol}`}>{company.name}</Link></p>)
      }
    </div>
  );

}


function Stock() {
  
  let {id} = useParams(); // you must use id if you used id in your switch statement in App 
  
  useEffect(() => {
  fetchStock(); 
  }, []
  );

  const [stock, setStock] = useState([]);

  const fetchStock = async () => {
    const res = await fetch(`https://api.worldtradingdata.com/api/v1/stock?symbol=${id}&api_token=onH6cZpUDVXChT9cbQ6jHuCkgoWPjCmBNRz0Sy5hs4icLbqds5ta1VF0pDpl`);
    const items = await res.json();  
    setStock(items.data[0]); // we only have one stock so it will be in location zero in the array
  }

  // helper function to format market cap
   function formatCap(marketCap) {
     if (marketCap === null) return '';
     let value, suffix;
     if (marketCap >= 1e12) {
       value = marketCap / 1e12;
       suffix = 'T';
     } else if (marketCap >= 1e9) {
       value = marketCap / 1e9;
       suffix = 'B';
     } else if (marketCap >= 1e6) {
       value = marketCap / 1e6;
       suffix = 'M';
     }
     else {
       value = marketCap / 1e3;
       suffix = 'K';
     }
     let digits = value < 10 ? 1 : 0;
     return '$' + value.toFixed(digits) + suffix;
   }

  let formattedCap = formatCap(stock.market_cap);


  return (
    <div>
      <h2>{`${stock.name} | ${stock.symbol}`}</h2>
      <ul>
        <li>{`Latest Price: $${stock.price} | ${stock.change_pct}%`}</li>
        <li>{`Market Cap: ${formattedCap}`}</li>
        <li>{`P/E: ${stock.pe}`}</li>
        <li>{`EPS: $${stock.eps}`}</li>
      </ul>        
    </div>
  );

}


























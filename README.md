This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Objective

To build a stock info fetching app using React.

## What do we want to do

We want to have a simple form that lets us input stock symbols. Upon submission, we want to be taken to a page listing the names of those companies linked to a page where we can look at some financials.

## How do we want to do it

We want to use React to render our HTML pages. We want to use a third party API for the stock info, that we can access via an AJAX call using fetch(). We want to use React routes and hooks and learn the new ways React offers to update state and run asynchronous functions.

## What did we learn

We can grab the query parameter values that display in the address bar after we submit our form with JavaScript's built in <code>URLSearchParams(window.location.search)</code> function.

We can then pass those parameter values to our API endpoint and use <code>fetch()</code> to get our info from the API. We then use the <code>json()</code> method to parse it.

We can then use React's new <code>useState</code> and <code>useEffect</code> functions to update our components and our state. We also use the <code>async</code> and <code>await</code> flags to make sure that our components won't render before we receive the information from the API. 

We will generate the Stocks and Stock pages dynamically, using the parameters in the query string.

**Note**

This project doesn't have a demo because that would have required that I posted my API key in the public repository. If you want to run this program clone it to your machine and get a free API key from [worldtradingdata.com](htttps://worldtradingdata.com). Then go to App.js and insert your key where it says "YourKeyHere".

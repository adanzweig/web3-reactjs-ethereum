// Importing necessary assets and modules
import './App.css';
import Web3 from 'web3';
import { useState, useEffect } from 'react';

// Main App component
function App() {
  // State to store user's Ethereum accounts
  const [accounts, setAccounts] = useState([]);

  // Effect hook to initialize and fetch user's Ethereum accounts when the component mounts
  useEffect(() => {
    // Checking if the browser has Ethereum provider injected by MetaMask or any other DApp browser
    if (typeof window.ethereum !== 'undefined') {
      // Initializing web3 instance using Ethereum provider
      const web3 = new Web3(window.ethereum);

      try {
        // Requesting access to user's Ethereum accounts
        window.ethereum.enable().then(async () => {
          // Fetching the Ethereum accounts
          const getAccounts = await web3.eth.getAccounts();
          // Updating the component's state with fetched accounts
          setAccounts(getAccounts);
        });
      } catch (error) {
        // Handling errors (for instance, if the user denies access)
        console.error('Error:', error);
      }
    } else if (typeof window.web3 !== 'undefined') {
      // For older DApp browsers, which provide web3 instance on window
      const web3 = new Web3(window.web3.currentProvider);
      const getAccounts = web3.eth.getAccounts();
      setAccounts(getAccounts);
    } else {
      // Logging message if no Ethereum wallet is detected
      console.log('There is no eth wallet installed in your browser');
    }
  }, []);

  // Effect hook to listen for changes in user's Ethereum accounts and update the state accordingly
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async (accChanged) => {
        // Update accounts in the state when they change
        setAccounts(accChanged);
      });
    }
  });

  // Render the user's Ethereum accounts
  return (
    <div className="App">
      <header className="App-header">
        <div>
          {accounts.map((acc, index) => (
            // Display each Ethereum account
            <div key={index}>Account: {acc}</div>
          ))}
        </div>
      </header>
    </div>
  );
}

// Exporting the App component to be used elsewhere in the application
export default App;

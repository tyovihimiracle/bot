const WebSocket = require('ws');

// Replace this with your Deriv API token
const apiToken = '54JRENGBlNdvrVh'; // Make sure this is a valid token

// Initialize WebSocket connection
const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');

// Log when the connection is established
ws.on('open', function open() {
  console.log('Connected to Deriv API');
  // Authorize the API connection
  ws.send(JSON.stringify({
    "authorize": apiToken
  }));
});

// Handle incoming messages from the WebSocket
ws.on('message', function incoming(data) {
  const response = JSON.parse(data);
  console.log('Response:', response);

  // Check if authorization was successful
  if (response.msg_type === 'authorize') {
    console.log('Authorized successfully');

    // Subscribe to ticks for a specific symbol (e.g., R_100)
    ws.send(JSON.stringify({
      "ticks": "R_100"
    }));
  }

  // Handle tick data (price updates)
  if (response.msg_type === 'tick') {
    const price = response.tick.quote;
    console.log('Price:', price);

    // Example: Buy contract if the price is below a certain value
    if (price < 500) {
      console.log('Buying contract...');
      ws.send(JSON.stringify({
        "buy": 1,
        "price": 1,  // Stake amount
        "parameters": {
          "contract_type": "CALL",  // Buy a "Rise" contract
          "symbol": "R_100",  // Symbol for the trade
          "duration": 5,  // Duration of the contract (5 ticks in this case)
          "duration_unit": "t",  // Duration unit (ticks)
          "basis": "stake"  // Specify stake basis
        }
      }));
    }
  }

  // Handle the response for buying a contract
  if (response.msg_type === 'buy') {
    console.log('Contract purchased successfully:', response);
  }
});

// Log WebSocket errors
ws.on('error', function error(err) {
  console.error('WebSocket error:', err);
});

// Close WebSocket connection when done
ws.on('close', function close() {
  console.log('Connection closed');
});

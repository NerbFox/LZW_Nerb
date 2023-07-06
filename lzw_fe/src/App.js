import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [asciiInput, setAsciiInput] = useState('');
  const [compressedInput, setCompressedInput] = useState('');
  const [binaryInput, setBinaryInput] = useState('');
  const [decompressedOutput, setDecompressedOutput] = useState('');
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState(''); // State to store success or error message
  const react_url = "http://localhost:5001"

  const fetchData = async () => {
    try {
      const response = await fetch(`${react_url}/LZW`);
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      setHistory(data); // Set data in History state
      setMessage('Success fetching data');
      setMessage('');
    } catch (error) {
      setMessage('Error fetching data');
    }
  };

  const addHistory = async (newHistory) => {
    try {
      const response = await fetch(`${react_url}/LZW`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHistory),
      });
      if (!response.ok) {
        throw new Error('Error adding data');
      }
      setMessage('Success adding data');
      setMessage('');
    } catch (error) {
      setMessage('Error adding data');
    }
  };


  useEffect(() => {
    setMessage('Loading histories...');
    fetchData();
  }, []);


  const handleAsciiInputChange = (event) => {
    setAsciiInput(event.target.value);
  };

  const handleCompressedInputChange = (event) => {
    setCompressedInput(event.target.value);
  };

  const handleBinaryInputChange = (event) => {
    setBinaryInput(event.target.value);
  };

  const compressAscii = () => {
    // Perform LZW compression on asciiInput
    // Set the compressed result in compressedInput state
    // implementation the LZW compression algorithm here

    // jika sudah ada di database, maka tidak perlu dihitung lagi
    if (asciiInput === '' || history.find(history => history.input === asciiInput)) {
      return;
    }

    var result = asciiInput+' compressed';

    setCompressedInput(result)
    // add to database and update history
    const newHistory = [
      ...history,
      { type: 'ascii', input: asciiInput, output: result },
    ];
    addHistory({ type: 'ascii', input: asciiInput, output: result });
    setHistory(newHistory);
    // fetchData();
  };

  const decompressBinary = () => {
    // Perform LZW decompression on binaryInput
    // Set the decompressed result in decompressedOutput state
    // implementation the LZW decompression algorithm here

    // jika sudah ada di database, maka tidak perlu dihitung lagi
    if (binaryInput === '' || history.find(history => history.input === binaryInput)) {
      return;
    }

    var result = binaryInput+' decompressed';
    
    setDecompressedOutput(result);
    // add to database and update history
    const newHistory = [
      ...history,
      { type: 'binary', input: binaryInput, output: result },
    ];
    addHistory({ type: 'binary', input: binaryInput, output: result });
    setHistory(newHistory);
  };

  const selectHistoryItem = (item) => {
    if (item.type === 'ascii') {
      setAsciiInput(item.input);
      setCompressedInput(item.output);
    } else if (item.type === 'binary') {
      setBinaryInput(item.input);
      setDecompressedOutput(item.output);
    }
  };

  return (
    <div className="container">
      <div className="history">
        <div className="ascii-history">
          <h2 className="title">ASCII History</h2>
          {history.map((item, index) => {
            if (item.type === 'ascii') {
              return (
                <div
                  className="history-item"
                  key={index}
                  onClick={() => selectHistoryItem(item)}
                >
                  <div className="history-input">
                    <span>Input:</span> {item.input}
                  </div>
                  <div className="history-output">
                    <span>Output:</span> {item.output}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="binary-history">
          <h2 className="title">Binary History</h2>
          {history.map((item, index) => {
            if (item.type === 'binary') {
              return (
                <div
                  className="history-item"
                  key={index}
                  onClick={() => selectHistoryItem(item)}
                >
                  <div className="history-input">
                    <span>Input:</span> {item.input}
                  </div>
                  <div className="history-output">
                    <span>Output:</span> {item.output}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      {/* <div className="history">
        <h2 className="title">History</h2>
        {history.map((item, index) => (
          <div
            className="history-item"
            key={index}
            onClick={() => selectHistoryItem(item)}
          >
            <div className="history-input">
              <span>Input:</span> {item.input}
            </div>
            <div className="history-output">
              <span>Output:</span> {item.output}
            </div>
          </div>
        ))}
      </div> */}
      <div className="content1">
        <h1 className="title">LZW Nerb App</h1>
        <div className="section">
          <h2>ASCII Input</h2>
          <textarea
            className="input-area"
            placeholder="Enter ASCII string..."
            value={asciiInput}
            onChange={handleAsciiInputChange}
          ></textarea>
          <br />
          <button className="button" onClick={compressAscii}>
            Compress
          </button>
          <h3>Compressed Result:</h3>
          <textarea
            className="output-area"
            readOnly
            value={compressedInput}
            onChange={handleCompressedInputChange}
          ></textarea>
        </div>
      <div/>
      </div>
      <div className="content2">
        <div className="section">
          <h2>Binary Input</h2>
          <textarea
            className="input-area"
            placeholder="Enter binary string..."
            value={binaryInput}
            onChange={handleBinaryInputChange}
          ></textarea>
          <br />
          <button className="button" onClick={decompressBinary}>
            Decompress
          </button>
          <h3>Decompressed Result:</h3>
          <textarea
            className="output-area"
            readOnly
            value={decompressedOutput}
          ></textarea>
          message: <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
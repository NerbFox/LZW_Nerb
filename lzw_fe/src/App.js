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
  const max_char_history = 29;

  const fetchData = async () => {
    try {
      const response = await fetch(`${react_url}/LZW`, 
        {
          method: 'GET',
          // body: JSON.stringify({type: 'ascii'}),  
        });
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

  const wait = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleAsciiInputChange = (event) => {
    setAsciiInput(event.target.value);
  };

  const handleCompressedInputChange = (event) => {
    setCompressedInput(event.target.value);
  };

  const handleBinaryInputChange = (event) => {
    setBinaryInput(event.target.value);
  };

  const deleteHistory = async (event, item) => {
    event.stopPropagation(); // Prevent the history item click event from firing
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        setMessage('Deleting data...');
        const response = await fetch(`${react_url}/LZW/${item._id}`, {
          method: 'DELETE',
        });
        if(response.ok){
          setMessage(`Success deleting data`);
          wait(5000);
          setMessage('');
        }else{
          setMessage('Error deleting data');
          throw new Error('Error deleting data');
        }
        const updatedHistory = history.filter((h) => h._id !== item._id);
        setHistory(updatedHistory);
      } catch (error) {
        setMessage('Error deleting data');
      }
    }
  };

  const deleteAllHistories = async () => {
    if (window.confirm('Are you sure you want to delete ALL items?')) {
      try {
        const response = await fetch(`${react_url}/LZW`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Error deleting data');
        }
        setMessage('Success deleting data');
        setMessage('');
        setHistory([]);
      } catch (error) {
        setMessage('Error deleting data');
      }
    }
  };

  const copyToClipboardC = () => {
    navigator.clipboard.writeText(compressedInput);
    // setMessage('Copied to clipboard');
  };

  const copyToClipboardD = () => {
    navigator.clipboard.writeText(decompressedOutput);
    // setMessage('Copied to clipboard');
  };

  const compressAscii = async () => {
    // Perform LZW compression on asciiInput
    // Set the compressed result in compressedInput state
    // implementation the LZW compression algorithm here

    // jika input kosong, maka tidak perlu dihitung
    if (asciiInput === '') {
      return;
    }

    // jika sudah ada di database, maka tidak perlu dihitung lagi langsung ambil dari database
    var found = false;
    history.forEach(history => {
      // pick from database
      if (history.input === asciiInput){
        setCompressedInput(history.output);
        found = true;
      }
    });
    if (found){
      return;
    }
    
    var result = asciiInput+' compressed';
    // get from backend
    try {
      const response = await fetch(`${react_url}/LZW/compress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({message: asciiInput}),
      });
      if (!response.ok) {
        throw new Error('Error compressing data');
      }
      const data = await response.json();
      setMessage('Success compressing data');
      setMessage('');
      result = data.message;
    } catch (error) {
      setMessage('Error compressing data');
    }

    setMessage(`data: ${result}`);
    // var result = asciiInput+' compressed';
    setCompressedInput(result);
    // add to database and update history
    const newHistory = [
      ...history,
      { type: 'ascii', input: asciiInput, output: result },
    ];
    setHistory(newHistory);
    addHistory({ type: 'ascii', input: asciiInput, output: result });
    // fetchData();
    // setMessage(`param: ${param.message}`);
  };

  const decompressBinary = async () => {
    // Perform LZW decompression on binaryInput
    // Set the decompressed result in decompressedOutput state
    // implementation the LZW decompression algorithm here

    // jika input kosong, maka tidak perlu dihitung
    if (binaryInput === '') {
      return;
    }

    // jika sudah ada di database, maka tidak perlu dihitung lagi
    var found = false;
    history.forEach(history => {
      // pick from database
      if (history.input === binaryInput){
        setDecompressedOutput(history.output);
        found = true;
      }
    });
    if (found){
      return;
    }

    var result = binaryInput+' decompressed';
    // get from backend
    try {
      const response = await fetch(`${react_url}/LZW/decompress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({message: binaryInput}),
      });
      if (!response.ok) {
        throw new Error('Error decompressing data');
      }
      const data = await response.json();
      setMessage('Success decompressing data');
      setMessage('');
      result = data.message;
    } catch (error) {
      setMessage('Error decompressing data');
    }

    setDecompressedOutput(result);
    // add to database and update history
    const newHistory = [
      ...history,
      { type: 'binary', input: binaryInput, output: result },
    ];
    setHistory(newHistory);
    addHistory({ type: 'binary', input: binaryInput, output: result });
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
        <h1 className="space">Space</h1>
          <h2 className="title">ASCII History</h2>
          <div className="ascii-history">
          {history.map((item, index) => {
            if (item.type === 'ascii') {
              return (
                <div
                  className="history-item"
                  key={index}
                  onClick={() => selectHistoryItem(item)}
                >
                  <div className="history-input">
                    {/* if the item input is too long, then show only the first max_char_history characters */}
                    <span>Input:</span> {item.input.length > max_char_history ? item.input.substring(0, max_char_history) + ' ...' : item.input}
                  </div>
                  <div className="history-output">
                    {/* if the item output is too long, then show only the first max_char_history characters */}
                    <span>Output:</span> {item.output.length > max_char_history ? item.output.substring(0, max_char_history) + ' ...' : item.output}
                  </div>
                  <button
                    className="button-delete"
                    onClick={(e) => deleteHistory(e, item)}
                  >
                    Delete
                  </button>
                </div>
              );
            }
            return null;
          })}
          </div>
          <h2 className="title">Binary History</h2>
          <div className="binary-history">
          {history.map((item, index) => {
            if (item.type === 'binary') {
              return (
                <div
                  className="history-item"
                  key={index}
                  onClick={() => selectHistoryItem(item)}
                >
                  <div className="history-input">
                    {/* if the item input is too long, then show only the first max_char_history characters */}
                    <span>Input:</span> {item.input.length > max_char_history ? item.input.substring(0, max_char_history) + ' ...' : item.input}
                  </div>
                  <div className="history-output">
                    {/* if the item output is too long, then show only the first max_char_history characters */}
                    <span>Output:</span> {item.output.length > max_char_history ? item.output.substring(0, max_char_history) + ' ...' : item.output}
                  </div>
                  <button
                    className="button-delete"
                    onClick={(e) => deleteHistory(e, item)}
                  >
                    Delete
                  </button>
                </div>
              );
            }
            return null;
          })}
        </div>
        <button className="button-delete-big" onClick={deleteAllHistories}>
            Delete All
        </button>
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
          <div className="button-group">
            <button className="button" onClick={compressAscii}>
              Compress
            </button>
            <div className="button-space"></div>
            <button className="button" onClick={copyToClipboardC}>
              Copy Result
            </button>
          </div>
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
        <h1 className="space">Space</h1>
        <div className="section">
          <h2>Binary Input</h2>
          <textarea
            className="input-area"
            placeholder="Enter binary string..."
            value={binaryInput}
            onChange={handleBinaryInputChange}
          ></textarea>
          <br />
          <div className="button-group">
            <button className="button" onClick={decompressBinary}>
              Decompress
            </button>
            <div className="button-space"></div>
            <button className="button" onClick={copyToClipboardD}>
              Copy Result
            </button>
          </div>
          <h3>Decompressed Result:</h3>
          <textarea
            className="output-area"
            readOnly
            value={decompressedOutput}
          ></textarea>
          <p> message: {message}</p> 
          {/* <p className="space">Space</p> */}
          <p2> author: Nigel Sahl </p2>
        </div>
      </div>
    </div>
  );
};

export default App;
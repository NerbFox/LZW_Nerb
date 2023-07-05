import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [asciiInput, setAsciiInput] = useState('');
  const [compressedInput, setCompressedInput] = useState('');
  const [binaryInput, setBinaryInput] = useState('');
  const [decompressedOutput, setDecompressedOutput] = useState('');
  const [history, setHistory] = useState([]);

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
    // You need to implement the LZW compression algorithm here

    // Update history with the compressed result
    const newHistory = [
      ...history,
      { type: 'ascii', input: asciiInput, output: compressedInput },
    ];
    setHistory(newHistory);
  };

  const decompressBinary = () => {
    // Perform LZW decompression on binaryInput
    // Set the decompressed result in decompressedOutput state
    // You need to implement the LZW decompression algorithm here

    // Update history with the decompressed result
    const newHistory = [
      ...history,
      { type: 'binary', input: binaryInput, output: decompressedOutput },
    ];
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
      </div>
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
        </div>
      </div>
    </div>
  );
};

export default App;

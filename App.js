import React, { useState } from "react";
import axios from "axios";

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedFilter, setSelectedFilter] = useState([]);

    const handleSubmit = async () => {
        try {
            const jsonData = JSON.parse(input);
            const res = await axios.post("http://localhost:5000/bfhl", jsonData);
            setResponse(res.data);
            setError('');
        } catch (err) {
            setError("Invalid JSON input");
            setResponse(null);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>BFHL Challenge</h1>
            <textarea 
                rows="4" cols="50" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder='Enter JSON (e.g. { "data": ["A", "1", "C"] })'
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {response && (
                <>
                    <h3>Response:</h3>
                    <select multiple onChange={(e) => {
                        setSelectedFilter([...e.target.selectedOptions].map(opt => opt.value));
                    }}>
                        <option value="numbers">Numbers</option>
                        <option value="alphabets">Alphabets</option>
                        <option value="highest_alphabet">Highest Alphabet</option>
                    </select>
                    <div>
                        {selectedFilter.includes("numbers") && <p>Numbers: {JSON.stringify(response.numbers)}</p>}
                        {selectedFilter.includes("alphabets") && <p>Alphabets: {JSON.stringify(response.alphabets)}</p>}
                        {selectedFilter.includes("highest_alphabet") && <p>Highest Alphabet: {JSON.stringify(response.highest_alphabet)}</p>}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;

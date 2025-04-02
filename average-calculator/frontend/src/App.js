import React, { useState } from "react";
import axios from "axios";

function App() {
    const [numbers, setNumbers] = useState("");
    const [average, setAverage] = useState(null);
    const [error, setError] = useState("");

    const calculateAverage = async () => {
        try {
            const numArray = numbers.split(",").map(Number);
            const response = await axios.post("http://localhost:3000/calculate-average", {
                numbers: numArray
            });
            setAverage(response.data.average);
            setError("");
        } catch (err) {
            setError("Invalid input. Please enter numbers separated by commas.");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Average Calculator</h1>
            <input
                type="text"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                placeholder="Enter numbers separated by commas"
            />
            <button onClick={calculateAverage}>Calculate</button>
            {average !== null && <h2>Average: {average}</h2>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default App;

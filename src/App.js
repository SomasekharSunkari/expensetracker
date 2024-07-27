import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [trans, setTrans] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("http://localhost:4041/api/gettransactions")
      .then((response) => response.json())
      .then((info) => {
        setTrans(info);
        console.log(info); // Log fetched data
      })
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  const addTransaction = (ev) => {
    ev.preventDefault();
    const price = parseFloat(title.split(" ")[0]); // Extract price and convert to number

    // Basic validation
    if (!title || !date || !description) {
      alert("Please fill in all fields.");
      return;
    }

    fetch("http://localhost:4041/api/transaction", {
      method: "POST", // Use uppercase for HTTP methods
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, description, price }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add transaction.");
        }
        return response.json();
      })
      .then((info) => {
        console.log("Transaction added:", info);
        // Optionally update transactions list after adding a new transaction
        setTrans((prevTrans) => [...prevTrans, info]);
        // Clear the input fields after successful submission
        setTitle("");
        setDescription("");
        setDate("");
      })
      .catch((error) => {
        console.error("Error:", error); // Error handling
        alert("Failed to add transaction.");
      });
  };

  // Calculate the total amount from transactions
  const totalAmount = trans.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="App">
      <h1>${totalAmount.toFixed(2)}</h1> {/* Display total amount */}
      <form onSubmit={addTransaction}>
        <div className="basics">
          <input
            type="text"
            placeholder="-200 buying a new Samsung TV"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)} // Corrected to onChange
          />
          <input
            type="datetime-local"
            value={date}
            onChange={(ev) => setDate(ev.target.value)} // Corrected to onChange
          />
        </div>
        <div className="description">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)} // Corrected to onChange
          />
        </div>
        <button type="submit">Add New Transaction</button>
      </form>
      <div className="transactions">
        {trans.length > 0 &&
          trans.map((item, index) => (
            <div className="transaction" key={index}>
              <div className="left">
                <div className="name">{item.title}</div>
                <div className="description">{item.description}</div>
              </div>
              <div className="right">
                <div className={"price " + (item.price > 0 ? "green" : "red")}>
                  ${item.price.toFixed(2)}
                </div> {/* Format price */}
                <div className="date">{new Date(item.date).toLocaleString()}</div> {/* Format date */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;

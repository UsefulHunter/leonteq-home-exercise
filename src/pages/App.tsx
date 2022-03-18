import { AxiosResponse } from "axios";
import { useState } from "react";
import { api } from "../services/api";
import "./App.css";

function App() {
  const [quoteArray, setQuoteArray] = useState<string[]>([]);
  const getQuote = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const response: AxiosResponse = await api.get("");
      setQuoteArray([...quoteArray, response.data.quote]);
    } catch (error: any) {
      if (error?.response) {
        console.error("Error: ", error.response);
      }
    }
  };

  const clearArray = () => {
    setQuoteArray([]);
  };

  const deleteArrayItem: (index: number) => void = (index: number) => {
    quoteArray.splice(index, 1);
    setQuoteArray([...quoteArray]);
  };

  return (
    <div className="App">
      <section className="button-container">
        <button onClick={(event) => getQuote(event)}>Get Quote</button>
        <button onClick={() => clearArray()}>Clear Array</button>
      </section>
      <br />
      <br />
      <br />
      <div className="list-container">
        <ul>
          {quoteArray.map((quote: string, index: number) => (
            <li key={index}>
              <span>
                {`"${quote}" `}
                <span className="span-author"> - West, Kanye</span>
              </span>
              <button
                onClick={() => deleteArrayItem(index)}
                className="button-quote"
              >
                Remove Quote
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

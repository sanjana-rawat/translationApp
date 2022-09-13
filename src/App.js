import "./styles.css";
import "./App.css";

import { useEffect, useState } from "react";
const axios = require("axios").default;

export default function App() {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const translate = () => {
    const params = new URLSearchParams();
    params.append("q", input);
    params.append("source", from);
    params.append("target", to);
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
    axios
      .post("https://libretranslate.de/translate", params, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then((res) => {
        console.log(res.data);
        setOutput(res.data.translatedText);
      });
  };

  useEffect(() => {
    axios
      .get("https://libretranslate.com/languages", {
        headers: { accept: "application/json" }
      })
      .then((res) => {
        console.log(res);
        setOptions(res.data);
      });
  }, []);

  // curl -X GET "https://libretranslate.com/languages" -H  "accept: application/json"

  return (
    <div
      className="App"
      style={{
        backgroundColor: "lightblue",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
    >
      <div className="heading">welcome to translation app</div>
      <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgqHGhlOVR0Wq0Va8rQ610Ep5qIg_YUXe6OQ&usqp=CAU" />
      </div>
      From({from}):
      <select onChange={(e) => setFrom(e.target.value)}>
        {options.map((opt) => (
          <option key={opt.code} value={opt.code}>
            {opt.name}
          </option>
        ))}
      </select>
      {/* <button onClick={(e) => translate()}>  </button> */}
      To({to}):
      <select onChange={(e) => setTo(e.target.value)}>
        {options.map((opt) => (
          <option key={opt.code} value={opt.code}>
            {opt.name}
          </option>
        ))}
      </select>
      <div>
        <textarea
          cols="50"
          rows="8"
          placeholder="enter your text"
          onInput={(e) => setInput(e.target.value)}
        ></textarea>
      </div>
      <div>
        <textarea
          cols="50"
          rows="8"
          placeholder="The translated text is:"
          value={output}
        ></textarea>
      </div>
      <div>
        <button onClick={(e) => translate()}>Translate</button>
      </div>
    </div>
  );
}

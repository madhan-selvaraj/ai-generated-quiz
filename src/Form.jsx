import { useState } from "react";
import options from "./quizOptions.json";

const Form = () => {
  const [domain, setDomain] = useState(Object.keys(options)[0]);
  const [apiKey, setApiKey] = useState(
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_OPENAI_API_KEY
      : ""
  );
  const topics = options[domain] ?? [];
  return (
    <form action=".">
      <div>
        <select
          name="domain"
          id="domain"
          required="required"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        >
          {Object.keys(options).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select name="topic" id="topic" required="required">
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="openai_api_key" required="required">
          OpenAI API key
        </label>
        <input
          type="text"
          name="openai_api_key"
          id="openai_api_key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>

      <button type="submit">Generate quiz</button>
    </form>
  );
};

export default Form;

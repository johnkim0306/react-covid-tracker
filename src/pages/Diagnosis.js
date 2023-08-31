
import React, { useState } from "react";

const Diagnosis = () => {
    const [question, setQuestion] = useState("");
    const handleInputChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(question);
        setQuestion("");
      };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter your question"
                value={question}
                onChange={handleInputChange}
            />
            <select>
                <option value="someOption">Some option</option>
                <option value="otherOption">Other option</option>
            </select>
            <button type="submit">Save Question</button>
        </form>
    );
};

export default Diagnosis; // Export the component as the default export
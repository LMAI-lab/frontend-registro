import React, { useState } from 'react';

const QUESTIONS = [
  "Mi sento calmo.",
  "Mi sento sicuro.",
  "Sono nervoso.",
  "Mi sento a disagio.",
  "Sono rilassato.",
  "Mi sento inquieto.",
  "Mi sento soddisfatto.",
  "Mi sento preoccupato.",
];

const Questionnaire = ({ onComplete }) => {
  const [responses, setResponses] = useState(Array(QUESTIONS.length).fill(0));

  const handleChange = (index, value) => {
    const updated = [...responses];
    updated[index] = value;
    setResponses(updated);
  };

  const handleSubmit = async () => {
    // invia al backend
    const res = await fetch("http://localhost:4000/save-questionnaire", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ responses }),
    });

    if (res.ok) {
      alert("Risposte salvate su Google Drive.");
      onComplete();
    } else {
      alert("Errore nel salvataggio.");
    }
  };

  return (
    <div className="p-4 rounded shadow-lg bg-white max-w-xl mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-4">Questionario STAI-Y</h2>
      <form className="space-y-4">
        {QUESTIONS.map((question, i) => (
          <div key={i} className="flex flex-col">
            <label className="mb-2">{question}</label>
            <select
              value={responses[i]}
              onChange={(e) => handleChange(i, parseInt(e.target.value))}
              className="border border-gray-300 rounded p-2"
            >
              <option value={0}>Seleziona...</option>
              <option value={1}>Per niente</option>
              <option value={2}>Un po'</option>
              <option value={3}>Abbastanza</option>
              <option value={4}>Molto</option>
            </select>
          </div>
        ))}
      </form>
      <button
        onClick={handleSubmit}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Invia Risposte
      </button>
    </div>
  );
};

export default Questionnaire;
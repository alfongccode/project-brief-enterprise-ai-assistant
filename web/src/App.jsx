import { useCallback, useState } from 'react'
import { make_query } from './providers'
import './App.css'

function App() {

  const hadleSubmitQuery = useCallback(async (ev) => {
    const response = await make_query({ text: ev.target.value });
    console.log(response);
  }, []);

  return (
    <div className="query-container">
      <input className="query-input" type="text" placeholder="ask a question" />
      <button onClick={hadleSubmitQuery}>Submit</button>
      <textarea className="query-response" rows="20" />
    </div>
  )
}

export default App

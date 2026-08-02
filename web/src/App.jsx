import { useCallback, useRef, useState } from 'react'
import { make_query } from './providers'
import './App.css'

function App() {
  const inputRef = useRef(null);
  const textAreaRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const hadleSubmitQuery = useCallback(async (ev) => {
    ev.preventDefault();
    const controller = new AbortController();
    setIsLoading(true);
    try {
      const response = await make_query(inputRef.current.value, { signal: controller?.signal });
      textAreaRef.current.value = response;
    } finally {
      setIsLoading(false);
    }
    return () => controller.abort()
  }, []);

  const handleClear = useCallback(() => {
    inputRef.current.value = '';
    textAreaRef.current.value = '';
    inputRef.current.focus();
  }, []);

  return (
    <div className="page">
      <div className="query-container">
        <header className="query-header">
          <h1>Enterprise AI Assistant</h1>
          <p>Ask a question about your organization's documents</p>
        </header>

        <form className="query-form" onSubmit={hadleSubmitQuery}>
          <label className="query-label" htmlFor="query-input">Question</label>
          <input
            id="query-input"
            ref={inputRef}
            className="query-input"
            type="text"
            placeholder="Ask a question"
          />

          <div className="query-toolbar">
            <button type="button" className="btn btn-secondary" onClick={handleClear}>
              Clear
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Submitting…' : 'Submit'}
            </button>
          </div>
        </form>

        <div className="query-result">
          <label className="query-label" htmlFor="query-response">Response</label>
          <textarea
            id="query-response"
            ref={textAreaRef}
            className="query-response"
            rows="16"
            readOnly
            placeholder="The answer will appear here"
          />
        </div>
      </div>
    </div>
  )
}

export default App

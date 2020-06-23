import React, { useState } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import Lister from './components/Lister';

function App() {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React microblog
        </p>
      </header>

      <section className="App-body">
        <form onSubmit={e => { e.preventDefault() }}>
          <input autoFocus type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </form>

        <Lister searchTerm={searchTerm} />
      </section>

    </div>
  );
}

export default App;

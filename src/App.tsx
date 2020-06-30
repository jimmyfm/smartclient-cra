import React from 'react';
import logo from './logo.svg';
import './App.css';

/**
 * The following import has a syntax error:
 * 
 * SyntaxError: C:\Users\lpolvani\Desktop\smartclient-cra\src\isomorphic\smartclient.d.ts: Binding 'eval' in strict mode (1125:9)
 * > 1125 | function eval(expression:string):any;
 *        |          ^
 * 
 * This makes impossible to use SC TS definitions in this CRA project.
 */ 
// import './isomorphic/smartclient.d.ts'

/**
 * Cross test to check that TS definitions can be used and they work correctly both with "npm start" and VSC auto completion.
 */
import './example.d.ts'

var x : ExampleTSDefinition = {} as ExampleTSDefinition;
x.exampleField = 42;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

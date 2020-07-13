import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import './isomorphic/smartclient.d.ts'
const ISC: any = window['isc'];
ISC.RPCManager.allowCrossDomainCalls = true;

/*
// This works, no CORS issues
fetch('https://api.collegefootballdata.com/conferences?testing=cors')
  .then(r => r.json())
  .then(j => console.log(`testing remote fetch`, j));
*/

function App() {

  useEffect(() => {
    let conferencesDS = ISC.DataSource.create({
      dataFormat: "json",
      dataURL: "https://api.collegefootballdata.com/conferences",
      fields: [
        { title: "ID", name: "id" },
        { title: "Name", name: "name" },
        { title: "Abbreviation", name: "abbreviation" },
        { title: "Short Name", name: "short_name" },
      ]
    }) as isc.DataSource;

    let conferencesGrid = ISC.ListGrid.create({
      width: "100%",
      height: 150,
      dataSource: conferencesDS,
      autoFetchData: true,
    }) as isc.ListGrid;

    conferencesGrid.rowClick = (record: isc.ListGridRecord, recordNum: number, fieldNum: number, keyboardGenerated?: boolean | undefined) => {
      console.log(`rowClick`, recordNum, fieldNum, keyboardGenerated, record);
      return true;
    };
  }, [])

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

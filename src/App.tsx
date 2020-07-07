import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { countryData } from "./dataSource";
import './isomorphic/smartclient.d.ts'

function App() {
  const ISC: any = window['isc'];

  useEffect(() => {
    let grid = ISC.ListGrid.create({
      ID: "countryList",
      width: 500, height: 224, alternateRecordStyles: true,
      data: countryData,
      fields: [
        { name: "countryCode", title: "Flag", width: 50, type: "image", imageURLPrefix: "flags/16/", imageURLSuffix: ".png" },
        { name: "countryName", title: "Country" },
        { name: "population", title: "Population", format: ",0" },
        { name: "area", title: "Area (km&sup2;)", format: ",0" }
      ],
      // initial sort on Population, high-to-low
      sortField: 2,
      sortDirection: "descending"
    }) as isc.ListGrid;

    console.log(`grid`, grid);

    grid.click = () => {
      console.log(`grid.click`);
      return true;
    }
  }, [ISC])

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

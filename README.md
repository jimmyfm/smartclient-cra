# SmartClient + create-react-app

This is part of a project aimed to evaluate and compare different react ui framework. 
Will take part in this evaluation SmartClient, ExtReact and AntDesign.

Criterias for thie evaluation are:

1. Completeness widgets offerend, with Grids and Dashboards being the focus. 
1. Ease of development and the tools provided by the framework are the other focus of this evaluation
1. Ability to access rest endpoints independently from the server technology used (For the evaluation we will use the endpoints provided by https://api.collegefootballdata.com)

## Running the app

1. Check out the code
1. `npm install`
1. `npm start`

## Issues

### Broken TS Definitions

Compiling with `smartclient.d.ts` causes the following error:
```
./src/isomorphic/smartclient.d.ts
SyntaxError: C:\git\smartclient-cra\src\isomorphic\smartclient.d.ts: Binding 'eval' in strict mode (1125:9)

  1123 | * @param {string} Expression to evaluate
  1124 | */
> 1125 | function eval(expression:string):any;
       |          ^
  1126 | /**
  1127 | *  Shorthand for new Date().getTime();, this returns a timeStamp - a large number
  1128 | *  which is incremented by 1 every millisecond. Can be used to generate unique identifiers,
  ```

It can be mitigated by manually commenting line 1125, but this approach is unfit with a CI/CD workflow.

To replicate: Uncomment line in ts file

### TS definition does not compile in CI mode

Trying to build the application in a CI/CD environment we see a failure caused by the TS definifion file.

[https://github.com/jimmyfm/smartclient-cra/runs/845824483](https://github.com/jimmyfm/smartclient-cra/runs/845824483)

To replicate: [https://create-react-app.dev/docs/running-tests/#on-your-own-environment](https://create-react-app.dev/docs/running-tests/#on-your-own-environment)

### ISC can't be of type isc

Trying to import isc while associating to it the correct type as showsn below results in the following error `Cannot use namespace 'isc' as a type.ts(2709)`.

`const ISC: isc = window['isc'];`

This also makes necessary to cast each single component to its type in order to use TS with it (ex: ` let grid = ISC.ListGrid.create({...}) as isc.ListGrid;`).

We need to define isc as `any` which defeats the utility of a TS definition.

To replicate: Change line 5 in App.tsx

### Cors call not working

Despite enabling cross domain calls with `ISC.RPCManager.allowCrossDomainCalls = true;` and testing that the remote API can be reached with the snippet below
```
// This works, no CORS issues
fetch('https://api.collegefootballdata.com/conferences?testing=cors')
  .then(r => r.json())
  .then(j => console.log(`testing remote fetch`, j));
```
Trying to change the dataURL from `dataURL: "/conferences",` to `dataURL: "https://api.collegefootballdata.com/conferences",` will cause the datasource to not load and throw the following error
```
Server returned TRANSPORT_ERROR with no error message performing operation 'isc_DataSource_0_fetch'
````

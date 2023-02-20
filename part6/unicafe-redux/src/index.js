import React from 'react';
import ReactDOM from 'react-dom/client';
import reducer from './reducer' 


import { createStore } from 'redux'


const store = createStore(reducer)

const App = () => {
    return (
      <div className="App">
        <button onClick={e => store.dispatch({ type: 'GOOD' })}>good</button>
        <button onClick={e => store.dispatch({ type: 'OK' })}>ok</button>
        <button onClick={e => store.dispatch({ type: 'BAD' })}>bad</button>
        <button onClick={e => store.dispatch({ type: 'ZERO' })}>reset states</button>
        <div>
            good {store.getState().good}
            <br/>
            bad {store.getState().bad}
            <br/>
            ok {store.getState().ok}
        </div>
      </div>
    );
  }

  const root = ReactDOM.createRoot(document.getElementById('root'))

  const renderApp = () => {
    root.render(<App />)
  }
  
  renderApp()
  store.subscribe(renderApp)
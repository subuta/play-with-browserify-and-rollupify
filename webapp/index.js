import React from 'react'
import ReactDOM from 'react-dom'

import {
  compose,
  withState,
  withHandlers
} from 'recompose'

import debounceHandler from '@hocs/debounce-handler';

const enhance = compose(
  withState('value', 'setValue', ''),
  withHandlers({
    handleOnInput: ({setValue}) => (e) => {
      setValue(e.target.value)
    }
  }),
  debounceHandler('handleOnInput', 1000)
)

const App = enhance(({value, handleOnInput}) => {
  return (
    <div>
      <input type="text" onInput={handleOnInput}/>
      <p>you typed: {value}</p>
      <h1>fuga</h1>
    </div>
  )
})

let render = () => {
  const appNode = document.getElementById('app')
  ReactDOM.render(<App />, appNode)
}

// Native
// Check if the DOMContentLoaded has already been completed
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  render()
} else {
  document.addEventListener('DOMContentLoaded', render)
}

// make browserify-hmr work.
if (module.hot) {
  module.hot.accept()
}

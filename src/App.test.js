import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('Se renderiza sin fallar', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

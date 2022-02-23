// Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider, QueryClient } from 'react-query';

// Components
import App from './App';

// States
import UIState from './contexts/UIContext';

// Styles
import 'animate.css';
import './styles/index.css';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <AppState />
  </React.StrictMode>,
  document.getElementById('root')
);

function AppState () {
  return (
    <QueryClientProvider client={queryClient}>
      <UIState>
        <App />
      </UIState>
      {/* <ReactQueryDevtools 
        initialIsOpen={false} 
        position='bottom-right'
      /> */}
    </QueryClientProvider>
  )
}
// Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider, QueryClient } from 'react-query';

// @ts-ignore
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';

// Components
import App from './App';

// States
import UIState from './contexts/UIContext';

// Styles
import 'animate.css';
import './styles/index.css';
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';

registerLocale('es', es);

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
      <ReactQueryDevtools 
        initialIsOpen={false} 
        position='bottom-right'
      />
    </QueryClientProvider>
  )
}
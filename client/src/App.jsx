import React from 'react';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import Namespaces from './components/Namespaces/index';

const queryClient = new QueryClient()

function App(){
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <Namespaces />
      </div>
    </QueryClientProvider>
  );
}

export default App;
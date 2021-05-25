import React from 'react';
import { useQuery } from "react-query";
import NamespacesTable from './components/NamespacesTable';
import NewNamespace from './components/NewNamespace';


function Namespaces(){
    const { isLoading, data } = useQuery("AllNamespaces", () =>
    fetch(
      "http://localhost:4000/api/v1/namespaces"
    ).then((res) => res.json()), {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="container">
      <NewNamespace />
      {(isLoading) && 'loading...' || (data && <NamespacesTable data={data} />)}
    </div>
  );
}

export default Namespaces;
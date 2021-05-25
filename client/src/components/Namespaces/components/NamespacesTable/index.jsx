import React from 'react';
import NamespaceRow from './components/NamespaceRow';

function NamespacesTable({ data }){
  if (!data) return false;
  return (
    <table className="container">
      <tbody>
      {
        data.map(item => item && (<NamespaceRow key={item._id} {...item} />))
      }
      </tbody>
    </table>
  );
}

export default NamespacesTable;
import React from 'react';
import NamespaceNameCell from './components/NamespaceNameCell';
import NamespaceItemsCountCell from './components/NamespaceItemsCountCell';

function NamespaceRow({ name, items }){
  return (
    <tr className="tr">
      <NamespaceNameCell name={name} />
      <NamespaceItemsCountCell items={items} />
    </tr>
  );
}

export default NamespaceRow;
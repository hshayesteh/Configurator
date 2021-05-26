import React from 'react';

function NamespaceItemsCountCell({ items }){
  return (
    <td className="td">
      {items && items.length}
    </td>
  );
}

export default NamespaceItemsCountCell;
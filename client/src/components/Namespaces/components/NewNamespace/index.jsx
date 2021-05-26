import React, { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

function NewNamespace(){
  const [name, setName] = useState('');
  const queryClient = useQueryClient();
  const { mutate: createNamespace, data } = useMutation(params => (
      axios.post('http://localhost:4000/api/v1/namespaces', {
        name: params.name,
      })
    ), {
      onSuccess: (...args) => {
        queryClient.refetchQueries(['AllNamespaces']);
        setName('');
      },
    });

  const handleSave = async e => {
    e.preventDefault();
    if (name) {
      try {
        await createNamespace({ name })
      } catch (error) {
        //@TODO handle error
      }
    }
  }

  return (
   <div className="flex-row" style={{ padding: 8 }}>
       <div><input style={{ marginRight: 8 }} className="input" value={name} onChange={(e) => setName(e.target.value)} /></div>
       <div><button onClick={handleSave}>Save</button></div>
   </div>
  );
}

export default NewNamespace
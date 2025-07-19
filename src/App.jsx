import React, { useState } from 'react';
import './App.css';
import UserForm from './components/userForm/UserForm'
import UserList from './components/userList/UserList';
import UserSearch from './components/userSearch/UserSearch';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const handleSubmit = (usuario) => {
    if (usuarioEditando) {
     
      setUsuarios(usuarios.map(u => u.id === usuarioEditando.id ? usuario : u));
    } else {

      setUsuarios([...usuarios, { ...usuario, id: Date.now() }]);
    }
    setUsuarioEditando(null);
  };

  const handleDelete = (id) => {
    setUsuarios(usuarios.filter(usuario => usuario.id !== id));
  };

  const handleEdit = (usuario) => {
    setUsuarioEditando(usuario);
  };

  return (
    <div className="app-container">
      <h1>CRUD en React de Usuarios</h1>
      
      <div className="app-content">
        <div className="form-section">
          <UserForm 
            onSubmit={handleSubmit} 
            usuarioEditando={usuarioEditando}
            onCancel={() => setUsuarioEditando(null)}
          />
        </div>
        
        <div className="search-section">
          <UserSearch onSearch={setBusqueda} />
        </div>
        
        <div className="list-section">
          <UserList 
            usuarios={usuarios} 
            busqueda={busqueda} 
            onDelete={handleDelete} 
            onEdit={handleEdit} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
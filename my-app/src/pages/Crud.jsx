import { useState } from "react";
import "../styling/Crud.css"
import InputField from "../components/InputField";


function App() {
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);

  // ➕ CREATE
  const handleAdd = () => {
    if (!nama || !jabatan) return;

    const newData = {
      id: Date.now(),
      nama,
      jabatan
    };

    setList([...list, newData]);
    setNama("");
    setJabatan("");
  };

  // ❌ DELETE
  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  // ✏️ EDIT (isi input)
  const handleEdit = (item) => {
    setNama(item.nama);
    setJabatan(item.jabatan);
    setEditId(item.id);
  };

  // 🔄 UPDATE
  const handleUpdate = () => {
    const updated = list.map((item) =>
      item.id === editId
        ? { ...item, nama, jabatan }
        : item
    );

    setList(updated);
    setEditId(null);
    setNama("");
    setJabatan("");
  };

  return (
    <div className="container-crud">
      <h1>CRUD Karyawan</h1>
    <div className="crud-content">

      {/* FORM */}
      <div className="crud-form">
      <InputField
        placeholder="Nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />

      <InputField
        placeholder="Jabatan"
        value={jabatan}
        onChange={(e) => setJabatan(e.target.value)}
      />

      <button onClick={editId ? handleUpdate : handleAdd}>
        {editId ? "Update" : "Tambah"}
      </button>
      </div>
      {/* LIST */}
      <div className="list-data">
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.nama} - {item.jabatan}

            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Hapus</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
    </div>
  );
}

export default App;
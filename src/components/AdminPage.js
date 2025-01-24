import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [ticketsAvailable, setticketsAvailable] = useState(0);
  const [msg, setMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [events, setEvents] = useState([]); // State untuk menyimpan daftar event
  const [showForm, setShowForm] = useState(true); // State untuk mengontrol tampilan form
  const [editingEvent, setEditingEvent] = useState(null); // State untuk menyimpan event yang sedang diedit
  const [showModal, setShowModal] = useState(false); // State untuk mengontrol tampilan modal
  const [eventToDelete, setEventToDelete] = useState(null); // State untuk menyimpan event yang akan dihapus
  const navigate = useNavigate();

  // Ambil data event ketika komponen dimuat
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/event"); // Ganti dengan endpoint yang sesuai
        setEvents(response.data);
      } catch (error) {
        console.error("Gagal mengambil data event", error);
      }
    };

    fetchEvents();
  }, []); // Menjalankan sekali ketika komponen pertama kali dirender

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!name) {
      setMsg("Masukkan nama event !");
      return;
    }

    if (!date) {
      setMsg("Masukkan tanggal event !");
      return;
    }

    if (!location) {
      setMsg("Masukkan lokasi event !");
    }

    if (!description) {
      setMsg("Masukkan deskripsi event !");
    }

    const ticket = parseInt(ticketsAvailable, 10);
    if (isNaN(ticket) || ticket <= 0) {
      setMsg("Jumlah tiket harus berupa angka dan lebih dari 0");
      return;
    }

    try {
      if (editingEvent) {
        // Update event yang sudah ada
        await axios.put(`http://localhost:5000/event/${editingEvent.id}`, {
          name,
          date,
          location,
          description,
          ticketsAvailable,
        });
        setSuccessMsg("Event berhasil diperbarui");
      } else {
        // Tambah event baru
        await axios.post("http://localhost:5000/event", {
          name,
          date,
          location,
          description,
          ticketsAvailable,
        });
        setSuccessMsg("Event berhasil ditambahkan");
      }
      setMsg("");
      setShowForm(false); // Menyembunyikan form setelah berhasil menambahkan atau memperbarui event
      setEditingEvent(null); // Reset event yang sedang diedit
    } catch (error) {
      console.error(error);
      if (error.response) {
        setMsg(error.response.data.Message);
      }
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event); // Set event yang dipilih untuk diedit
    setName(event.name);
    setDate(event.date);
    setLocation(event.location);
    setDescription(event.description);
    setticketsAvailable(event.ticketsAvailable);
    setShowForm(true); // Menampilkan form untuk mengedit
  };

  const handleDeleteEvent = (eventId) => {
    setEventToDelete(eventId);
    setShowModal(true); // Menampilkan modal konfirmasi
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/event/${eventToDelete}`);
      setEvents(events.filter((event) => event.id !== eventToDelete)); // Menghapus event dari daftar
      setShowModal(false); // Menutup modal setelah event dihapus
    } catch (error) {
      console.error(error);
      console.error("Gagal menghapus event", error);
      setShowModal(false); // Menutup modal jika ada error
    }
  };

  return (
    <div className="container mt-5">
      <h1>Halaman Admin</h1>
      <hr />
      <button
        type="button"
        className="btn btn-success"
        onClick={() => {
          setShowForm(true);
          setEditingEvent(null); // Reset editing event saat tambah event
        }}
      >
        Tambah Event
      </button>
      <button
        type="button"
        className="btn btn-info ms-2"
        onClick={() => setShowForm(false)}
      >
        Daftar Event
      </button>

      {msg && (
        <div className="alert alert-danger mt-3" role="alert">
          {msg}
        </div>
      )}
      {successMsg && (
        <div className="alert alert-success mt-3" role="alert">
          {successMsg}
        </div>
      )}

      {/* Jika showForm true, tampilkan form tambah event */}
      {showForm ? (
        <form onSubmit={handleAddEvent}>
          <h3>{editingEvent ? "Edit Event" : "Tambah Event"}</h3>
          <div className="mb-3">
            <label htmlFor="event" className="form-label">
              Nama Event
            </label>
            <input
              type="text"
              id="event"
              className="form-control"
              placeholder="Masukkan Nama Event"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tanggalevent" className="form-label">
              Tanggal Event
            </label>
            <input
              type="date"
              id="tanggalevent"
              className="form-control"
              placeholder="Masukkan Tanggal Event"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lokasi" className="form-label">
              Lokasi
            </label>
            <input
              type="text"
              id="lokasi"
              className="form-control"
              placeholder="Masukkan Lokasi"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="deskripsi" className="form-label">
              Deskripsi Event
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Masukkan Deskripsi Event"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tiket" className="form-label">
              Tiket
            </label>
            <input
              type="number"
              id="tiket"
              className="form-control"
              placeholder="Masukkan Jumlah Tiket"
              value={ticketsAvailable}
              onChange={(e) => setticketsAvailable(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-5">
            {editingEvent ? "Update Event" : "Tambah Event"}
          </button>
        </form>
      ) : (
        // Jika showForm false, tampilkan daftar event
        <div>
          <h3>Daftar Event</h3>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Nama Event</th>
                <th>Tanggal</th>
                <th>Lokasi</th>
                <th>Deskripsi</th>
                <th>Tiket Tersedia</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{new Date(event.date).toLocaleDateString("en-GB")}</td>
                  <td>{event.location}</td>
                  <td>{event.description}</td>
                  <td>{event.ticketsAvailable}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => handleEditEvent(event)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Konfirmasi Hapus Event
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              Apakah Anda yakin ingin menghapus event {events.find(event => event.id === eventToDelete)?.name} ini?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Tidak
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmDelete}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

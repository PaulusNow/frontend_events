import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [id, setId] = useState(""); // ID dinamis
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [token, setToken] = useState(""); // Untuk menyimpan token
    const navigate = useNavigate();

    // Fungsi untuk mendapatkan token dan mendekode informasi pengguna
    const getUserInfo = async () => {
      try {
        const response = await axios.get("acceptable-fulfillment-production.up.railway.app/token");
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setId(decoded.userId);
        console.log(decoded)
      } catch (error) {
        if (error.response) {
          navigate("/");
        }
      }
    };

    useEffect(() => {
      getUserInfo();
    }, []);

    // Fungsi untuk handle booking event
    const handleCreateEvent = async (eventId) => {
      try {
        if (!id) {
          alert('Anda harus login terlebih dahulu!');
          return;
        }
        const quantity = 1;
    
        const response = await axios.post(
          'acceptable-fulfillment-production.up.railway.app/booking',
          { eventId, userId: id, quantity }, // Gunakan ID yang diambil dari token
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gunakan token yang ada
            }
          }
        );
    
        // Mengupdate state events setelah berhasil booking
        alert('Pendaftaran event berhasil!');
        
      } catch (error) {
        console.error(error);
        alert('Gagal mendaftar event.');
      }
    };
    
    // useEffect untuk mendengarkan perubahan tiket
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await axios.get('acceptable-fulfillment-production.up.railway.app/event');
          setEvents(response.data);
          setLoading(false);
        } catch (error) {
          setError("Gagal mengambil data event");
          setLoading(false);
        }
      };
    
      fetchEvents();
    
      // Remove WebSocket listener
      // socket.on('ticketUpdated', (data) => {
      //     setEvents((prevEvents) => 
      //         prevEvents.map(event => 
      //             event.id === data.eventId 
      //             ? { ...event, ticketsAvailable: data.ticketsAvailable } 
      //             : event
      //         )
      //     );
      // });
    
      // Cleanup saat komponen dibersihkan
      // return () => {
      //     socket.off('ticketUpdated');
      // };
    }, []);  // Hanya sekali render saat mount

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1>Event yang sedang berlangsung</h1>
            <hr />

            <ul className="list-group">
                {events.map((event) => (
                    <li key={event.id} className="list-group-item mb-5">
                        <h5>{event.name}</h5>
                        <p>{event.description}</p>
                        <p><strong>Lokasi:</strong> {event.location}</p>
                        <p><strong>Tanggal:</strong> {new Date(event.date).toLocaleDateString("en-GB")}</p>
                        <p><strong>Tiket Tersedia:</strong> {event.ticketsAvailable}</p>
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={() => handleCreateEvent(event.id)}>
                            Daftar Event
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Connect to the Socket.IO server

function EventDetails() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Listen for booking updates
    socket.on('bookingUpdated', (data) => {
      console.log(data.message);
      // Update the bookings state or fetch the latest bookings
      fetchBookings();
    });

    // Cleanup on unmount
    return () => {
      socket.off('bookingUpdated');
    };
  }, []);

  const fetchBookings = async () => {
    const response = await fetch('/api/bookings'); // Adjust the endpoint as necessary
    const data = await response.json();
    setBookings(data);
  };

  const handleBooking = async () => {
    const bookingData = { /* Your booking data here */ };
    await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
  };

  return (
    <div>
      <div className="container mt-5">
        <h1>Event yang diikuti</h1>
        <hr />
        <ul className="list-group">
          {/* {events.map((event) => (
            <li key={event.id} className="list-group-item mb-5">
              <h5>{event.name}</h5>
              <p>{event.description}</p>
              <p><strong>Lokasi:</strong> {event.location}</p>
              <p><strong>Tanggal:</strong> {new Date(event.date).toLocaleDateString("en-GB")} </p>
              <p><strong>Tiket Tersedia:</strong> {event.ticketsAvailable}</p>
              <button onClick={handleBooking}>Book Now</button>
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
}

export default EventDetails;

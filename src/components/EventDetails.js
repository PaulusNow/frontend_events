import React, { useEffect, useState } from 'react';

function EventDetails() {
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

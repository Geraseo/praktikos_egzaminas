import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";

const EventCards = ({ user }) => {
  const eventsRef = firestore.collection("events");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);

  useEffect(() => {
    const unsubscribe = eventsRef.onSnapshot((snapshot) => {
      const eventsData = snapshot.docs.map((doc) => ({
        eventId: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    });

    return () => unsubscribe();
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await eventsRef.doc(eventId).delete();
    } catch (error) {
      console.log(error);
      // Handle error if necessary
    }
  };

  const handleEditEvent = (event) => {
    setEditedEvent(event);
    setEditMode(true);
  };

  const handleSaveEvent = async () => {
    try {
      await eventsRef.doc(editedEvent.eventId).update(editedEvent);

      setEditMode(false);
      setEditedEvent(null);
    } catch (error) {
      console.log(error);
      // Handle error if necessary
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedEvent(null);
  };

  const handleChangeEvent = (field, value) => {
    setEditedEvent((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {events.map((event) => (
        <div
          key={event.eventId}
          className="bg-white p-4 rounded shadow cursor-pointer h-full"
          onClick={() => openModal(event)}
        >
          <h2 className="text-lg font-semibold mb-2">{event.eventName}</h2>
          <img
            src={event.imageLink}
            alt="Event Thumbnail"
            className="w-full h-48 object-cover rounded mb-2"
          />
          <p className="mb-2">
            <span className="font-semibold">Date:</span> {event.date}
          </p>
          {(user?.isAdmin || (user && event.creatorId === user.uid)) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditEvent(event);
              }}
              className="bg-green-500 hover:bg-green-700 text-white rounded px-4 py-2"
            >
              Edit
            </button>
          )}
          {(user?.isAdmin || (user && event.creatorId === user.uid)) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteEvent(event.eventId);
              }}
              className="bg-red-500 hover:bg-red-700 text-white rounded px-4 py-2 ml-2"
            >
              Delete
            </button>
          )}
        </div>
      ))}

      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow max-w-md">
            {!editMode && (
              <>
                <h2 className="text-lg font-semibold mb-4">
                  {selectedEvent.eventName}
                </h2>
                <img
                  src={selectedEvent.imageLink}
                  alt="Event"
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <p className="mb-2">
                  <span className="font-semibold">Location:</span>{" "}
                  {selectedEvent.location}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Category:</span>{" "}
                  {selectedEvent.category}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Date:</span>{" "}
                  {selectedEvent.date}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Description:</span>{" "}
                  {selectedEvent.description}
                </p>
                <button
                  onClick={closeModal}
                  className="bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-2 w-full"
                >
                  Close
                </button>
              </>
            )}

            {editMode && editedEvent && (
              <>
                <h2 className="text-lg font-semibold mb-4">Edit Event</h2>
                <input
                  type="text"
                  value={editedEvent.eventName}
                  onChange={(e) =>
                    handleChangeEvent("eventName", e.target.value)
                  }
                  className="border border-gray-300 rounded px-2 py-1 mb-2"
                />
                <input
                  type="text"
                  value={editedEvent.location}
                  onChange={(e) =>
                    handleChangeEvent("location", e.target.value)
                  }
                  className="border border-gray-300 rounded px-2 py-1 mb-2"
                />

                <input
                  type="text"
                  value={editedEvent.date}
                  onChange={(e) => handleChangeEvent("date", e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 mb-2"
                />
                <input
                  type="text"
                  value={editedEvent.description}
                  onChange={(e) =>
                    handleChangeEvent("description", e.target.value)
                  }
                  className="border border-gray-300 rounded px-2 py-1 mb-2"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveEvent}
                    className="bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500 hover:bg-gray-700 text-white rounded px-4 py-2 ml-2"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCards;

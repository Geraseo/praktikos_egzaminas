import React, { useState } from "react";
import { firestore } from "../firebase";

const EventRegistrationModal = ({ closeNewEventModal }) => {
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      // Perform event registration logic here
      // For example, create a document in the "events" collection in Firestore

      const eventRef = firestore.collection("events").doc();
      const eventId = eventRef.id; // Generate a unique event ID

      await eventRef.set({
        eventId: eventId,
        eventName: eventName,
        location: location,
        category: category,
        imageLink: imageLink,
        date: date,
        description: description,
      });

      // Close the modal
      closeNewEventModal();
    } catch (error) {
      console.log(error);
      setErrorMessage("Event registration failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow w-64">
        <h2 className="text-lg font-semibold mb-4">Event Registration</h2>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}

        <div className="mb-2">
          <label
            htmlFor="eventName"
            className="block mb-1"
          >
            Event Name:
          </label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="border border-gray-300 rounded p-1 w-full"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="location"
            className="block mb-1"
          >
            Location:
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 rounded p-1 w-full"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="category"
            className="block mb-1"
          >
            Category:
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded p-1 w-full"
          >
            <option
              value=""
              disabled
            >
              Select a category
            </option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Concert">Concert</option>
            <option value="Festival">Food</option>
            <option value="Competition">Competition</option>
          </select>
        </div>

        <div className="mb-2">
          <label
            htmlFor="imageLink"
            className="block mb-1"
          >
            Image Link:
          </label>
          <input
            type="text"
            id="imageLink"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            className="border border-gray-300 rounded p-1 w-full"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="date"
            className="block mb-1"
          >
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded p-1 w-full"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="description"
            className="block mb-1"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded p-1 w-full"
          ></textarea>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleRegistration}
            className="bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-2 w-1/2 mr-2"
          >
            Register Event
          </button>
          <button
            onClick={closeNewEventModal}
            className="bg-gray-500 hover:bg-gray-700 text-white rounded px-4 py-2 w-1/2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationModal;

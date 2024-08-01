import React, { useState } from "react";

// APIs
import { createRoom } from "../../shared/api/api";

import { useNavigate } from "react-router-dom";

const RoomCreation = () => {
  const [roomTitle, setRoomTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    try {
      const roomId = await createRoom(roomTitle);
      setError(null);
      if (roomId) {
        navigate(`/rooms/${roomId}`);
      }
    } catch (error) {
      console.error("Error creating room:", error);
      setError("Failed to create room. Please try again.");
    }
  };

  return (
    <div className="room-creation flex flex-col p-6 bg-background rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Room</h2>
      <input
        type="text"
        value={roomTitle}
        onChange={(e) => setRoomTitle(e.target.value)}
        placeholder="Enter room title"
        className="input input-primary mb-4"
      />
      <button
        onClick={handleCreateRoom}
        className="btn btn-primary cursor-pointer"
      >
        Create Room
      </button>
      {error && (
        <div className="mt-4 text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default RoomCreation;

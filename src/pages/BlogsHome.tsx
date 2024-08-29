import { useEffect, useState } from "react";
import { getRooms } from "../shared/api/api";
import { Room } from "../shared/type/room";
import { useNavigate } from "react-router-dom";

export default function BlogsHome() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await getRooms();
        setRooms(rooms);
      } catch (error: any) {
        console.error("Failed to fetch rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleViewRoom = (roomId: string) => {
    navigate(`/rooms/${roomId}`);
  };

  return (
    <div className="blogs-home p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <div
            key={room.roomId}
            className="bg-white dark:bg-dark p-4 rounded-lg shadow-md"
          >
            <h2 className="text-lg font-semibold mb-2">{room.roomTitle}</h2>
            {/* <p className="text-sm text-gray-600 dark:text-gray-300">
              {room.description}
            </p> */}
            <div className="mt-4">
              <button
                className="btn btn-primary w-full cursor-pointer"
                onClick={() => handleViewRoom(room.roomId)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

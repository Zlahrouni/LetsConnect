import "./Sidebar.css";
import { SidebarBlock, User } from "../../types/types.tsx";
import { useEffect, useState } from "react";

const Sidebar = ({ socket }: SidebarBlock) => {
  const [users, setUsers] = useState<User[]>([]);

  // Effect for getting the list of users from the server
  useEffect(() => {
    socket.emit("getUsers");

    socket.on("users", (receivedUsers) => {
      setUsers(receivedUsers);
    });

    // Cleanup function to stop listening for the users event
    return () => {
      socket.off("users");
    };
  }, 
  // Depend on the socket so the effect runs again if the socket changes
  [socket]);

  return (
    <div className="sideBar d-flex flex-column align-items-center">
      <h2> Users</h2>
      {users.map((user) => (
        <div key={user.username} className="row sideBar-body">
          <div className="col sideBar-name">
            <span className="name">{user.username}</span>
          </div>
          <div className="col d-flex align-items-center justify-content-end">
            {/* Display a green dot if the user is online, and a red dot if they're offline */}
            <div
              className={`dot ${user.online ? "bg-success" : "bg-danger"}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;

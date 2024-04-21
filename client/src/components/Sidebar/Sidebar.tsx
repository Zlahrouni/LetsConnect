import "./Sidebar.css";
import { SidebarBlock, User } from "../../types/types.tsx";
import { useEffect, useState } from "react";

const Sidebar = ({ socket }: SidebarBlock) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.emit("getUsers");

    socket.on("users", (receivedUsers) => {
      setUsers(receivedUsers);
    });

    return () => {
      socket.off("users");
    };
  }, [socket]);

  return (
    <div className="sideBar d-flex flex-column align-items-center">
      <h2> Users</h2>
      {users.map((user) => (
        <div key={user.username} className="row sideBar-body">
          <div className="col sideBar-name">
            <span className="name">{user.username}</span>
          </div>
          <div className="col d-flex align-items-center justify-content-end">
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

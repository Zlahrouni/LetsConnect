import "./Sidebar.css";
import { SidebarBlock, User } from "../../types/types.tsx";
import { useEffect, useState } from "react";

const Sidebar = ({ socket }: SidebarBlock) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.emit("getUsers");

    socket.on("users", (receivedUsers) => {
      // console.log("Users received:", receivedUsers);
      setUsers(receivedUsers);
    });

    return () => {
      socket.off("users");
    };
  }, [socket]);

  return (
    <div className="row sideBar">
      {users.map((user) => (
        <div key={user.username} className="row sideBar-body">
          <div className="col-sm-9 col-xs-9 sideBar-main">
            <div className="row">
              <div className="col-sm-8 col-xs-8 sideBar-name">
                <span className="name-meta">{user.username}</span>
              </div>
              <div className="col-sm-4 col-xs-4 pull-right sideBar-connection">
                <span className="connection-dot">
                  <span
                    className={`dot ${
                      user.online ? "bg-success" : "bg-danger"
                    }`}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;

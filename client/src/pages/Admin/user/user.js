import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
function User() {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    await fetch("http://localhost:3003/admin/getUsers", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.ACCESS_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setUsers(json);
        console.log(json);
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = async (email) => {
    if (!window.confirm("Are you sure you want to delete this user")) {
      return;
    } else {
      await fetch(`http://localhost:3003/admin/deleteUser/${email}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.ACCESS_TOKEN}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          // setStocks(json);
          if (json.status === false) {
            alert(json.msg);
          } else {
            alert("Product Deleted Successfully!!");
            fetchUsers();
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <div class="content-wrapper">
        <div class="container-fluid">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">Users</li>
          </ol>
          <div>
            <h1 class="text-start">Users</h1>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.username || "NA"}</td>
                      <td>{item?.email || "NA"}</td>
                      <td className="actions">
                        <Link
                          to="/admin/user/update"
                          state={{ data: item }}
                          className="mr-2"
                        >
                          Edit
                        </Link>
                        <a onClick={() => deleteUser(item.email)}>Delete</a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default User;

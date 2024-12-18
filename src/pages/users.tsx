import { useEffect, useState } from 'react';

interface User {
  username: string;
  password: string;
  created_at: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <strong>Username:</strong> {user.username} | <strong>Password:</strong> {user.password} |{' '}
            <strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

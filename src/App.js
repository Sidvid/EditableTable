import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [data, setData] = useState('');
  const [input, setInput] = useState({
    name: '',
    email: '',
    username: '',
  });
  const [isEdit, setIsEdit] = useState(null);
  useEffect(() => {
    (async () => {
      let response = await fetch('https://jsonplaceholder.typicode.com/users');
      let responseJSON = await response.json();
      // console.log(responseJSON);
      setData(responseJSON);
    })();
  }, []);

  const changeHandle = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setInput({
      ...input,
      [name]: value,
    });
  };
  console.log(input);
  return (
    <div>
      <form>
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Action</th>
          </tr>

          {data &&
            data.map((data) => {
              return (
                <>
                  <tr>
                    {isEdit === data.id ? (
                      <>
                        {' '}
                        <td>
                          {' '}
                          <input
                            onChange={changeHandle}
                            value={input.name}
                            name="name"
                            type="text"
                          />{' '}
                        </td>
                        <td>
                          {' '}
                          <input
                            onChange={changeHandle}
                            value={input.email}
                            name="email"
                            type="text"
                          />{' '}
                        </td>
                        <td>
                          {' '}
                          <input
                            onChange={changeHandle}
                            value={input.username}
                            name="username"
                            type="text"
                          />{' '}
                        </td>{' '}
                      </>
                    ) : (
                      <>
                        {' '}
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.username}</td>
                      </>
                    )}

                    <td>
                      {isEdit === data.id ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEdit();
                          }}
                        >
                          Confirm
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEdit(data.id);
                            console.log('=>', e.target.value);
                            setInput({
                              ...input,
                              name: data.name,
                              email: data.email,
                              username: data.username,
                            });
                          }}
                        >
                          Edit
                        </button>
                      )}{' '}
                    </td>
                  </tr>
                </>
              );
            })}
        </table>
      </form>
    </div>
  );
}

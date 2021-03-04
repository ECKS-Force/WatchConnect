import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(res => {
        if (res.err) setErrMessage(res.err);
        console.log(res);
      })
      .catch(err => {
        console.log('Error:', err);
      });
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={(e) => { setUsername(e.target.value) }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => { setPassword(e.target.value) }}
      />
      <input type="submit" value="Log In" />
      {errMessage !== undefined &&
        <div>{errMessage}</div>
      }
    </form>
  );
};

export default Login;
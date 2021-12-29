import React, { useState, useContext } from 'react';
import AuthContext, { AuthConsumer } from '../context/auth-context';
import './Auth.css'


const Auth = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [isLogin, setIsLogin] = useState(true)
  
  const authContext = useContext(AuthContext)

  const submitHandler = async (e) => {
    e.preventDefault()

    if(email.trim().length === 0 || password.trim().length === 0 ) {

    }
    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    if (!isLogin) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      };
    }

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        authContext.login(
          resData.data.login.token,
          resData.data.login.userId,
          resData.data.login.tokenExpiration
        )
      })
      .catch(err => {
        console.log(err);
      });
  
  }


  return ( 

    <form className="auth-form" onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Create An Account" : "Already Account"}</button>
        </div>
      </form>
    

   );
}
 
export default Auth;
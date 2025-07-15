import React, { createContext, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState(1);
  const [categoryName, setCategoryName] = useState("ALL");
  const [error, setError] = useState(null);

  const login = async (email, password) => {

      const response = await axios.post('http://localhost:9090/user/login', {
        email,
        password,
      });

      if (response.data.startsWith("error")) {
        setError(response)
        console.log('====================================');
        console.log(response);
        console.log('====================================');
        return false ;
      } else {
        const token = response.data;
        console.log(response.data.message); // Log the result (e.g., the token)
        console.log(token);
        setAuthToken(token);
        setUser({ email });

        localStorage.setItem('authToken', token);
        return true ;
      }

  };

  const SignUp = async (name ,email, phoneNumber ,password) => {

    const response = await axios.post('http://localhost:9090/user/createClient', {
      name,
      email,
      phoneNumber,
      password,
    });
      if (response.data.status == "BAD_REQUEST") {
        setError(response.data.bundleMessage)
        return false ;
      }
      else if (response.data.message_en = "The client has been registered successfully  "){
        const token = response.data;
        console.log(response.data); // Log the result (e.g., the token)
        setAuthToken(token);
        setUser({ email });
        setError(null)
        localStorage.setItem('authToken', token);
        return true ;

      }

};

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout ,  setCategory , category , categoryName , setCategoryName , setAuthToken , SignUp , error}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

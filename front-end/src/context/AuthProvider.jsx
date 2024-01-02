import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";


const AuthContext = createContext();
const baseUrl = "http://localhost:8080/api"

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState("");
    const [loading] = useState();
    const token = localStorage.getItem("token")

    async function signup(name, email, password, password_confirmation) {
        const header = {
            "Content-Type": "application/json"
        }

        const signupCredential = {
            "name": name,
            "email": email,
            "password": password,
            "password_confirmation": password_confirmation
        }

        try {
            const response = await axios.post(`${baseUrl}/signup`, signupCredential, header);
            return response.data;
        }
        catch(e){
            console.error(e);
        }
    }

    async function login(email, password) {
        const header = {
            "Content-Type": "application/json"
        }

        const loginCredential = {
            "email": email,
            "password": password
        }
        try {
            const response = await axios.post(`${baseUrl}/login`, loginCredential, header);

            localStorage.setItem('token', response.data.token);
            setCurrentUser(response.data.user)
            console.log(response.data)

        } catch (e) {
            console.error(e)
        }
    }
    async function logout() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.defaults.headers.common['Content-Type'] = "application/json"

        try {
            const response = await axios.post(`${baseUrl}/logout`)
            console.log(response.data.message)
            localStorage.removeItem("token")
            setCurrentUser()
        } catch (e) {
            console.error(e)
        }
    }

    async function getCurrentUser(){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.defaults.headers.common['Content-Type'] = "application/json"

        try {
            const response = await axios.get(`${baseUrl}/user`)
            if(response.ok){
                setCurrentUser(response.data.user)
                console.log(currentUser)
            }

        } catch (e) {
            localStorage.removeItem("token")
            return <Navigate to="/login" />
        }
    }

    const value = {
        currentUser,
        error,
        setError,
        login,
        signup,
        logout,
        getCurrentUser
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}
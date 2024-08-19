import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(Cookies.get('username') || "");

    useEffect(() => {
        // Check if user is available
        if (!user) {
            setLoading(false); // No need to load if there's no user
            setError("No user found. Please log in.");
            return;
        }

        // Fetch data if user exists
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://alex-suciu.homebuddy.ro/resumee-builder/php/fetchData.php?user=${user}`);
                setData(response.data);
            } catch (err) {
                setError(err.message || "An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    // Function to update the user
    const updateUser = (newUser) => {
        setUser(newUser);
        Cookies.set('username', newUser, { expires: 365 });
    };

    // Provide context value
    const contextValue = {
        data,
        loading,
        error,
        user,
        setUser: updateUser, // Expose a way to update the user
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;

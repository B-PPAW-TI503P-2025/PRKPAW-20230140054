import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserData, removeToken } from '../utils/auth'; 

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = getUserData();
        if (userData) {
            setUser(userData);
        }
    }, []);

    const handleLogout = () => {
        removeToken(); 
        setUser(null);
        navigate('/login');
    };

    if (!user) {
        return null; 
    }

    const isAdmin = user.role === 'admin'; 

    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl">Presensi App</div>
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                    <Link to="/presensi" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Presensi</Link>
                    
                    {isAdmin && (
                        <Link to="/reports" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Laporan Admin
                        </Link>
                    )}

                    <span className="text-white px-3 py-2 text-sm font-medium">
                        Halo, {user.nama}
                    </span>
                    
                    <button
                        onClick={handleLogout}
                        className="py-2 px-3 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 text-sm"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
import { jwtDecode } from 'jwt-decode';

export const setToken = (token) => {
    /** Menyimpan token setelah login berhasil. */
    localStorage.setItem('token', token);
};

export const getToken = () => {
    /** Mengambil token dari localStorage. */
    return localStorage.getItem('token');
};

export const removeToken = () => {
    /** Menghapus token saat logout. */
    localStorage.removeItem('token');
};

/**
 * Mendekode token JWT dan mengembalikan data user (id, nama, role, exp).
 */
export const getUserData = () => {
    const token = getToken();
    if (!token) {
        return null;
    }
    try {
        // Menggunakan 'jwt-decode' untuk membaca payload token
        const decoded = jwtDecode(token); 
        // Mengembalikan data yang diperlukan oleh Navbar dan AdminRoute
        return {
            id: decoded.id, 
            nama: decoded.nama, 
            role: decoded.role,  
            exp: decoded.exp
        };
    } catch (error) {
        // Jika token rusak atau tidak valid
        console.error("Error decoding JWT:", error);
        return null;
    }
};

/**
 * Memeriksa apakah user sudah terotentikasi (token ada dan belum kedaluwarsa).
 */
export const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;
    
    // Cek kedaluwarsa token (sangat penting untuk keamanan)
    const user = getUserData();
    // Jika token ada, tetapi kedaluwarsa (exp * 1000 < waktu sekarang)
    if (user && user.exp && (user.exp * 1000 < Date.now())) {
        removeToken();
        return false;
    }
    return true;
};
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaMapMarkerAlt, FaEnvelope, FaPen, FaSave, FaSignOutAlt, FaCalendar } from "react-icons/fa";
import PhoneInput from "../components/PhoneInput";
import HomeButton from "../components/HomeButton";

const UserProfile = () => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: "",
        phone: "",
        place: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/auth");
                return;
            }

            const config = { headers: { Authorization: `Bearer ${token}` } };

            const userRes = await axios.get(`${API_URL}/api/auth/me`, config);
            setUser(userRes.data);
            setEditForm({
                name: userRes.data.name,
                phone: userRes.data.phone,
                place: userRes.data.place
            });

            // Assuming we have a bookings endpoint. If not, this part will just be empty or we need to add it.
            // Based on previous plan, we didn't explicitly check booking fetching, but bookingController has getUserBookings.
            const bookingRes = await axios.get(`${API_URL}/api/booking/${userRes.data._id}`, config);
            setBookings(bookingRes.data);

            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            if (error.response?.status === 401) {
                handleLogout();
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const res = await axios.put(`${API_URL}/api/auth/profile`, editForm, config);
            setUser(prev => ({ ...prev, ...res.data })); // Merge updates
            setIsEditing(false);
            localStorage.setItem("user", JSON.stringify(res.data)); // Update local storage too
        } catch (error) {
            alert("Failed to update profile");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-green-main">Loading profile...</div>;

    return (
        <div className="min-h-screen bg-cream-main pt-24 px-4 pb-12">
            <HomeButton />
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Profile Header Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-main/10 relative">
                    <div className="bg-gradient-to-r from-green-main to-teal-700 h-32 md:h-40"></div>
                    <div className="px-8 pb-8">
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <div className="bg-white p-2 rounded-full shadow-lg">
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-orange-100 rounded-full flex items-center justify-center text-orange-main text-4xl md:text-5xl font-bold border-4 border-white">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-red-50 text-red-600 px-4 py-2 rounded-xl flex items-center gap-2 font-semibold hover:bg-red-100 transition shadow-sm mb-2"
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>

                        <div className="flex justify-between items-start flex-wrap gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-green-main">{user?.name}</h1>
                                <p className="text-gray-500 flex items-center gap-2 mt-1"><FaEnvelope className="text-orange-main" /> {user?.email}</p>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="text-green-main hover:text-orange-main font-semibold flex items-center gap-2 transition"
                            >
                                {isEditing ? "Cancel" : <><FaPen /> Edit Profile</>}
                            </button>
                        </div>

                        {isEditing ? (
                            <form onSubmit={handleUpdate} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl">
                                <div>
                                    <label className="text-sm font-semibold text-gray-500 mb-1 block">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-main/50"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-500 mb-1 block">Phone Number</label>
                                    <PhoneInput
                                        value={editForm.phone}
                                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-500 mb-1 block">Location</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-main/50"
                                        value={editForm.place}
                                        onChange={(e) => setEditForm({ ...editForm, place: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-end">
                                    <button type="submit" className="bg-green-main text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition w-full justify-center">
                                        <FaSave /> Save Changes
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-orange-main shadow-sm"><FaPhone /></div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Phone</p>
                                        <p className="text-green-main font-medium">{user?.phone || "Not set"}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-orange-main shadow-sm"><FaMapMarkerAlt /></div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Location</p>
                                        <p className="text-green-main font-medium">{user?.place || "Not set"}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bookings Section */}
                <div>
                    <h2 className="text-2xl font-bold text-green-main mb-6 px-2">Your Sessions</h2>
                    {bookings.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {bookings.map((booking) => (
                                <div key={booking._id} className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-orange-main flex justify-between items-center transition hover:shadow-lg">
                                    <div>
                                        <h3 className="font-bold text-lg text-green-main mb-1">{booking.session?.title || "Yoga Session"}</h3>
                                        <p className="text-gray-500 text-sm flex items-center gap-2"><FaCalendar className="text-orange-main/70" /> {new Date(booking.date).toLocaleDateString()}</p>
                                        <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {booking.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-300">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300 text-2xl">
                                <FaCalendar />
                            </div>
                            <p className="text-gray-500">No bookings yet.</p>
                            <button onClick={() => navigate("/pricing")} className="mt-4 text-orange-main font-bold hover:underline">Book a Session</button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default UserProfile;

const API = "http://localhost:3001/api";

const getToken = () => localStorage.getItem("tripmate_token");

export const getUserTrips = async () => {
    try {
        const res = await fetch(`${API}/trips`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        });
        const data = await res.json();
        if (!res.ok) return [];
        return data;
    } catch (error) {
        return [];
    }
};

export const saveUserTrip = async (trip) => {
    try {
        if (trip._id) {
            const res = await fetch(`${API}/trips/${trip._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({
                    name: trip.name,
                    destination: trip.city || trip.destination,
                    duration: trip.days || trip.duration,
                    itinerary: trip.itinerary,
                    members: trip.members,
                }),
            });
            return await res.json();
        }
        const res = await fetch(`${API}/trips`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify({
                name: trip.name,
                destination: trip.city || trip.destination,
                duration: trip.days || trip.duration,
                itinerary: trip.itinerary,
                members: trip.members,
            }),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return null;
    }
};

export const deleteUserTrip = async (tripId) => {
    try {
        await fetch(`${API}/trips/${tripId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${getToken()}` },
        });
    } catch (error) {
        console.error(error);
    }
};
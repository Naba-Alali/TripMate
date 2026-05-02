import React, { useState, useEffect } from "react";
import '../../styles/CityTabs.css';

const API = "https://tripmate-ctqk.onrender.com/api";

function CityTabs({ selected, onSelect }) {
    const [cities, setCities] = useState([{ id: "All", label: "All" }]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const res = await fetch(`https://tripmate-ctqk.onrender.com/api/admin/cities-list`);
const data = await res.json();
if (Array.isArray(data)) {
    const cityList = [
        { id: "All", label: "All" },
        ...data.map(c => ({ id: c.name, label: c.name }))
    ];
    setCities(cityList);
}
            } catch {
                setCities([{ id: "All", label: "All" }]);
            }
        };
        fetchCities();
    }, []);

    return (
        <div className="city-tabs">
            {cities.map((city) => (
                <button
                    key={city.id}
                    onClick={() => onSelect(city.id)}
                    className={`city-tabs__btn ${selected === city.id ? "city-tabs__btn--active" : ""}`}
                >
                    {city.label}
                </button>
            ))}
        </div>
    );
}

export default CityTabs;
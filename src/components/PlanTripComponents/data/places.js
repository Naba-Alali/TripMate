import jabalAlQara from '../../../assets/imgs/Jabal-Alqara.jpg';
import flavorsRestaurant from '../../../assets/imgs/flavors-restaurant.jpg';
import qaisariahSouq from '../../../assets/imgs/Qaisariah.jpg';
import uqairBeach from '../../../assets/imgs/Uqair.jpg';
import redSeaMall from '../../../assets/imgs/RedSea.jpg';
import albalad from '../../../assets/imgs/Albalad.jpg';
import jeddahCorniche from '../../../assets/imgs/Jeddah-Corniche.jpg';
import artStreet from '../../../assets/imgs/Art-Street.webp';
import rijalAlmaa from '../../../assets/imgs/RijalAlmaa.jpg';
import twentyFourRestaurant from '../../../assets/imgs/24.jpg';

const places = [
    {
        id: 1,
        city: "AlHassa",
        name: "Jabal Al-Qara",
        description: "Ancient limestone mountain with caves and tunnels",
        category: "nature",
        rating: 4.8,
        image: jabalAlQara   // we'll add a real image later
    },
    {
        id: 2,
        city: "AlHassa",
        name: "Flavors restaurant",
        description: "A popular dining spot in Al Hassa serving a wide variety of delicious local and international dishes.",
        category: "food", 
        rating: 4.6,
        image: flavorsRestaurant
    },
    {
        id: 3,
        city: "AlHassa",
        name: "Qaisariah Souq",
        description: "One of the oldest historic markets in Saudi Arabia, famous for its traditional architecture and handmade goods.",
        category: "landmark", 
        rating: 4.8,
        image: qaisariahSouq
    },
    {
        id: 4,
        city: "AlHassa",
        name: "Uqair Beach",
        description: "A beautiful and quiet coastline known for its clear blue waters and the historic port nearby.",
        category: "nature", 
        rating: 4.3,
        image: uqairBeach
    },
    {
        id: 5,
        city: "Jeddah",
        name: "Red Sea Mall",
        description: "One of the biggest shopping centers in Jeddah with international brands",
        category: "shopping", 
        rating: 4.9,
        image: redSeaMall
    },
    {
        id: 6,
        city: "Jeddah",
        name: "Albalad",
        description: "The historic center of Jeddah, famous for its ancient coral-stone houses and traditional markets.",
        category: "landmark", 
        rating: 4.8,
        image:albalad
    },
    {
        id: 7,
        city: "Jeddah",
        name: "Jeddah Corniche",
        description: "A beautiful coastal resort area featuring a long walkway, parks, and stunning views of the Red Sea.",
        category: "nature", 
        rating: 4.6,
        image: jeddahCorniche
    },
    {
        id: 8,
        city: "Jeddah",
        name: "Twenty four restaurant",
        description: "A modern dining destination offering a unique menu with a focus on fresh, local ingredients.",
        category: "food", 
        rating: 4.5,
        image: twentyFourRestaurant
    },
    {
        id: 9,
        city: "Abha",
        name: "Art Street",
        description: "A vibrant walkway lined with purple Jacaranda trees, colorful art installations, and cozy cafes.",
        category: "nature", 
        rating: 4.4,
        image: artStreet
    },
    {
        id: 10,
        city: "Abha",
        name: "Rijal Alma'a",
        description: "A famous heritage village known for its unique stone architecture and deep cultural history.",
        category:  "nature", 
        rating: 4.9,
        image: rijalAlmaa
    },
];

export default places;
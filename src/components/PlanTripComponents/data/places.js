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
import elephantRock from '../../../assets/imgs/ElephantRock.jpg';
import archi from '../../../assets/imgs/archi.webp';
import marayeh from '../../../assets/imgs/maraya.jpg';
import harrat from '../../../assets/imgs/harrat.jpg';
import someWhere from '../../../assets/imgs/somewhereResturant.jpg';
import marayehSocial from '../../../assets/imgs/MarayaSocial.webp';

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
    {
        id: 11,
        city: "AlUla",
        name: "Elephant Rock",
        description: "A massive, natural sandstone formation that resembles an elephant rising from the desert sands.",
        category:  "nature", 
        rating: 4.9,
        image: elephantRock
    },
    {
        id: 12,
        city: "AlUla",
        name: "Archi",
        description: "A stunning outdoor cafe nestled against AlUla's ancient mountains, offering specialty coffee in a serene, mud-brick setting.",
        category:  "food", 
        rating: 4.5,
        image: archi
    },
    {
        id: 13,
        city: "AlUla",
        name: "Marayeh",
        description: "The world's largest mirrored building, reflecting the breathtaking beauty of the surrounding desert canyon.",
        category:  "landmark", 
        rating: 4.9,
        image: marayeh
    },
    {
        id: 14,
        city: "AlUla",
        name: "Harrat Overview",
        description: "An incredible lookout over the oasis, offering a bird's-eye view of the city and the black volcanic rock fields.",
        category:  "nature", 
        rating: 4.5,
        image: harrat
    },
    {
        id: 15,
        city: "AlUla",
        name: "SomeWhere",
        description: "A popular restaurant known for its unique Mediterranean-inspired dishes and beautiful outdoor seating.",
        category:  "food", 
        rating: 4.6,
        image: someWhere
    },
    {
        id: 16,
        city: "AlUla",
        name: "Marayeh social",
        description: "Located on the rooftop of the Maraya building, offering a menu created by a Michelin-starred chef.",
        category:  "food", 
        rating: 4.8,
        image: marayehSocial
    },
];

export default places;
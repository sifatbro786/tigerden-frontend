export const tourPackages = {
    domestic: [
        {
            id: 1,
            title: "Cox's Bazar & Inani Beach Escape",
            shortTitle: "Cox's Bazar",
            location: "Cox's Bazar, Bangladesh",
            region: "Chittagong Division",
            category: "Beach Holiday",
            duration: "4 Days / 3 Nights",
            originalPrice: 12999,
            discountedPrice: 9499,
            discountPercentage: 27,
            currency: "BDT",
            pricePerPerson: true,
            minGroupSize: 2,
            maxGroupSize: 20,
            startDate: "2026-08-05",
            endDate: "2026-08-08",
            availableDates: ["2026-08-05", "2026-08-12", "2026-08-19", "2026-08-26"],
            rating: 4.8,
            reviewCount: 342,
            image: "https://images.pexels.com/photos/33947949/pexels-photo-33947949.jpeg",
            gallery: [
                "https://images.pexels.com/photos/33684437/pexels-photo-33684437.jpeg",
                "https://images.pexels.com/photos/28940410/pexels-photo-28940410.jpeg",
                "https://images.pexels.com/photos/34984159/pexels-photo-34984159.jpeg",
                "https://images.pexels.com/photos/4024132/pexels-photo-4024132.jpeg",
            ],
            coverVideo:
                "https://www.pexels.com/video/serene-cox-s-bazar-beach-daytime-scene-33558392/",
            isFavorited: true,
            featured: true,
            tags: ["Beach", "Family Friendly", "Honeymoon", "Adventure"],

            // Detailed Information
            shortDescription:
                "Experience the world's longest natural sea beach with crystal clear waters and stunning sunsets at Cox's Bazar and the pristine Inani Beach.",
            fullDescription: `Discover the breathtaking beauty of Cox's Bazar, home to the world's longest unbroken sea beach stretching 120km along the Bay of Bengal. This carefully curated 4-day package combines relaxation on golden sands with exploration of local culture and cuisine.

Your journey includes visits to the serene Inani Beach, known for its coral stones and crystal-clear waters, and the vibrant Burmese Market for authentic souvenirs. Watch spectacular sunrises and sunsets, enjoy fresh seafood at beachside restaurants, and experience the warm hospitality of coastal Bangladesh.

Perfect for families, couples, and solo travelers seeking a peaceful beach getaway with a touch of adventure.`,

            itinerary: [
                {
                    day: 1,
                    title: "Arrival & Beach Exploration",
                    activities: [
                        "Pick-up from Cox's Bazar Airport/Bus Terminal",
                        "Hotel check-in and welcome drink",
                        "Evening beach walk and sunset viewing at Laboni Point",
                        "Dinner at Mermaid Beach Cafe (fresh seafood)",
                        "Overnight stay at Ocean Paradise Hotel",
                    ],
                    meals: ["Dinner"],
                },
                {
                    day: 2,
                    title: "Inani Beach & Himchori",
                    activities: [
                        "Early morning sunrise at Inani Beach",
                        "Breakfast at hotel",
                        "Visit Himchori Waterfall and Eco Park",
                        "Lunch at local restaurant",
                        "Afternoon exploration of Inani Beach coral stones",
                        "Visit Radiant Fish World aquarium",
                        "Evening free for beach activities",
                        "Overnight at Ocean Paradise Hotel",
                    ],
                    meals: ["Breakfast", "Lunch"],
                },
                {
                    day: 3,
                    title: "Maheshkhali Island & Cultural Tour",
                    activities: [
                        "Breakfast at hotel",
                        "Boat trip to Maheshkhali Island",
                        "Visit Adinath Temple and Buddhist Pagoda",
                        "Explore local salt fields and fishing villages",
                        "Lunch on the island",
                        "Return to Cox's Bazar",
                        "Visit Burmese Market for shopping",
                        "Beachside BBQ dinner",
                        "Overnight at Ocean Paradise Hotel",
                    ],
                    meals: ["Breakfast", "Lunch", "Dinner"],
                },
                {
                    day: 4,
                    title: "Departure",
                    activities: [
                        "Breakfast at hotel",
                        "Morning beach walk",
                        "Visit local dried fish market",
                        "Check-out from hotel",
                        "Drop-off at Cox's Bazar Airport/Bus Terminal",
                    ],
                    meals: ["Breakfast"],
                },
            ],

            facilities: {
                accommodation: {
                    hotelName: "Ocean Paradise Hotel & Resort",
                    hotelRating: 4,
                    roomType: "Deluxe Sea View Room",
                    amenities: [
                        "Air Conditioning",
                        "Free WiFi",
                        "LED TV",
                        "Mini Bar",
                        "Private Balcony",
                        "Hot Water",
                        "Room Service",
                    ],
                },
                transportation: ["AC Bus", "Private Car", "CNG Rickshaw", "Boat Transfer"],
                meals: ["3 Breakfasts", "2 Lunches", "2 Dinners"],
                guides: ["English Speaking Tour Guide", "Local Cultural Expert"],
                included: [
                    "All accommodation on twin sharing basis",
                    "All meals as per itinerary",
                    "All transfers and sightseeing by private AC vehicle",
                    "Professional English-speaking guide",
                    "Entry fees to all attractions",
                    "Boat ride to Maheshkhali",
                    "All applicable taxes",
                ],
                excluded: [
                    "Air/Train fare to Cox's Bazar",
                    "Personal expenses (laundry, telephone, etc.)",
                    "Tips and gratuities",
                    "Travel insurance",
                    "Anything not mentioned in inclusions",
                ],
            },

            nearbyAttractions: [
                {
                    name: "Himchori Waterfall",
                    distance: "12 km",
                    duration: "30 min drive",
                    description: "Scenic waterfall and eco-park with hiking trails",
                    image: "https://example.com/himchori.jpg",
                },
                {
                    name: "Maheshkhali Island",
                    distance: "15 km",
                    duration: "45 min boat ride",
                    description: "Historic island with temples and fishing villages",
                    image: "https://example.com/maheshkhali.jpg",
                },
                {
                    name: "Ramu Buddhist Village",
                    distance: "16 km",
                    duration: "40 min drive",
                    description: "Ancient Buddhist temples and monasteries",
                    image: "https://example.com/ramu.jpg",
                },
                {
                    name: "Sonadia Island",
                    distance: "7 km",
                    duration: "30 min boat",
                    description: "Migratory bird sanctuary and mangrove forest",
                    image: "https://example.com/sonadia.jpg",
                },
            ],

            pointOfContact: {
                tourManager: {
                    name: "Md. Rafiqul Islam",
                    phone: "+8801712-345678",
                    email: "rafiqul.tours@bdtravel.com",
                    whatsapp: "+8801712-345678",
                    languages: ["Bengali", "English", "Hindi"],
                },
                emergencyContact: {
                    name: "24/7 Helpline",
                    phone: "+8801612-345678",
                    availableHours: "24/7",
                },
                office: {
                    address: "House 12, Road 5, Kolatoli Square, Cox's Bazar",
                    phone: "+880341-62456",
                    email: "coxsbazar@bdtravel.com",
                },
            },

            locationMap: {
                coordinates: {
                    lat: 21.4272,
                    lng: 91.9774,
                },
                mapEmbedUrl:
                    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.8701394234!2d91.9774!3d21.4272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30aad4e9b6b1f3c3%3A0x1c1c1c1c1c1c1c1c!2sCox's%20Bazar!5e0!3m2!1sen!2sbd!4v1234567890",
            },

            travelTips: {
                bestTime: "November to March",
                weather: "Tropical monsoon climate. Warm year-round with temperatures 25-35°C.",
                packing: [
                    "Light cotton clothes",
                    "Swimwear",
                    "Sunscreen",
                    "Hat",
                    "Sunglasses",
                    "Beach sandals",
                    "Camera",
                ],
                health: "Carry mosquito repellent. Drink bottled water.",
                cultural: "Dress modestly when visiting religious sites.",
            },

            cancellationPolicy: {
                before30Days: "Full refund minus 5% processing fee",
                before15Days: "75% refund",
                before7Days: "50% refund",
                before3Days: "25% refund",
                within3Days: "No refund",
            },

            reviews: [
                {
                    user: "Rahman Family",
                    rating: 5,
                    date: "2026-07-15",
                    comment:
                        "Amazing experience! The hotel was beautiful and the guide was very knowledgeable.",
                },
                {
                    user: "Sarah Ahmed",
                    rating: 4.5,
                    date: "2026-07-10",
                    comment: "Inani Beach was stunning. Great value for money.",
                },
            ],
        },

        {
            id: 2,
            title: "Sundarbans Mangrove Wildlife Expedition",
            shortTitle: "Sundarbans",
            location: "Khulna, Bangladesh",
            region: "Khulna Division",
            category: "Wildlife & Nature",
            duration: "4 Days / 3 Nights",
            originalPrice: 15500,
            discountedPrice: 11999,
            discountPercentage: 23,
            currency: "BDT",
            pricePerPerson: true,
            minGroupSize: 4,
            maxGroupSize: 12,
            startDate: "2026-09-10",
            endDate: "2026-09-13",
            availableDates: ["2026-09-10", "2026-09-17", "2026-09-24", "2026-10-01"],
            rating: 4.9,
            reviewCount: 256,
            image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=600&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=600&q=80",
                "https://images.unsplash.com/photo-1551103782-5e4c2f1b6c2e?w=600&q=80",
                "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
                "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&q=80",
            ],
            isFavorited: false,
            featured: true,
            tags: ["Wildlife", "UNESCO Heritage", "Adventure", "Photography"],

            shortDescription:
                "Explore the world's largest mangrove forest, home to the majestic Royal Bengal Tiger, spotted deer, and diverse bird species.",
            fullDescription: `Embark on an unforgettable journey into the heart of the Sundarbans, a UNESCO World Heritage Site and the world's largest mangrove ecosystem. This 4-day expedition offers a rare opportunity to witness the magnificent Royal Bengal Tiger in its natural habitat, along with a rich diversity of wildlife including spotted deer, crocodiles, dolphins, and over 300 bird species.

Your adventure includes comfortable accommodation on a specially equipped boat, expert naturalist guides, and carefully planned excursions through narrow creeks and channels where wildlife sightings are most frequent. Experience the unique ecosystem where land and water merge, creating one of the planet's most fascinating and biodiverse environments.`,

            itinerary: [
                {
                    day: 1,
                    title: "Journey to the Mangroves",
                    activities: [
                        "Pick-up from Khulna Railway Station",
                        "Transfer to Mongla Port",
                        "Board luxury houseboat",
                        "Safety briefing and introduction to crew",
                        "Cruise through Pashur River",
                        "Visit Harbaria Eco-Tourism Center",
                        "Evening wildlife watching",
                        "Overnight on boat at Kotka Wildlife Sanctuary",
                    ],
                    meals: ["Lunch", "Dinner"],
                },
                {
                    day: 2,
                    title: "Wildlife Safari & Forest Walks",
                    activities: [
                        "Early morning boat safari for tiger spotting",
                        "Guided forest walk at Kotka",
                        "Visit Jamtola Beach",
                        "Watchtower visit for panoramic views",
                        "Afternoon cruise through narrow creeks",
                        "Dolphin watching at Kachikhali",
                        "Evening cultural program with local fishermen",
                        "Overnight on boat at Kachikhali",
                    ],
                    meals: ["Breakfast", "Lunch", "Dinner"],
                },
                {
                    day: 3,
                    title: "Deep Forest Exploration",
                    activities: [
                        "Sunrise photography session",
                        "Boat safari to Katka Tiger Point",
                        "Visit Dublar Char Island",
                        "Lunch at fisherman's village",
                        "Afternoon cruise through Andharmanik Channel",
                        "Bird watching session",
                        "Evening BBQ on boat",
                        "Overnight on boat near Mongla",
                    ],
                    meals: ["Breakfast", "Lunch", "Dinner"],
                },
                {
                    day: 4,
                    title: "Return & Farewell",
                    activities: [
                        "Breakfast on boat",
                        "Morning cruise back to Mongla",
                        "Visit Mongla Port area",
                        "Check-out from boat",
                        "Transfer to Khulna Railway Station",
                        "Drop-off and farewell",
                    ],
                    meals: ["Breakfast"],
                },
            ],

            facilities: {
                accommodation: {
                    hotelName: "M.V. Bawali Luxury Houseboat",
                    hotelRating: 4,
                    roomType: "Private Cabin with AC",
                    amenities: [
                        "Air Conditioning",
                        "Attached Bathroom",
                        "Western Toilet",
                        "Hot Water",
                        "Observation Deck",
                        "24/7 Crew Service",
                    ],
                },
                transportation: ["AC Bus", "Luxury Houseboat", "Country Boat"],
                meals: ["3 Breakfasts", "3 Lunches", "3 Dinners", "Evening Snacks", "BBQ Dinner"],
                guides: [
                    "Forest Department Guide",
                    "Wildlife Expert",
                    "English Speaking Naturalist",
                ],
                included: [
                    "All accommodation on twin sharing basis in houseboat",
                    "All meals as per itinerary",
                    "Forest entry permits and fees",
                    "Professional naturalist guide",
                    "Armed forest guard escort",
                    "All boat cruises and safaris",
                    "Cultural program",
                    "All applicable taxes",
                ],
                excluded: [
                    "Travel to/from Khulna",
                    "Personal expenses",
                    "Tips and gratuities",
                    "Travel insurance",
                    "Alcoholic beverages",
                    "Camera fees",
                ],
            },

            nearbyAttractions: [
                {
                    name: "Karamjal Wildlife Center",
                    distance: "8 km",
                    duration: "1 hour boat",
                    description: "Deer breeding center and crocodile park",
                    image: "https://example.com/karamjal.jpg",
                },
                {
                    name: "Hiron Point",
                    distance: "45 km",
                    duration: "4 hours boat",
                    description: "Famous tiger spotting point with watchtower",
                    image: "https://example.com/hironpoint.jpg",
                },
                {
                    name: "Dublar Char",
                    distance: "60 km",
                    duration: "5 hours boat",
                    description: "Fishing village and Rash Mela festival site",
                    image: "https://example.com/dublarchar.jpg",
                },
            ],

            pointOfContact: {
                tourManager: {
                    name: "Md. Kamrul Hasan",
                    phone: "+8801812-345678",
                    email: "kamrul.sundarbans@bdtravel.com",
                    whatsapp: "+8801812-345678",
                    languages: ["Bengali", "English"],
                },
                emergencyContact: {
                    name: "Forest Department Emergency",
                    phone: "+8801715-345678",
                    availableHours: "24/7",
                },
                office: {
                    address: "23 KDA Avenue, Khulna",
                    phone: "+88041-723456",
                    email: "sundarbans@bdtravel.com",
                },
            },

            locationMap: {
                coordinates: {
                    lat: 21.9497,
                    lng: 89.1833,
                },
                mapEmbedUrl:
                    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.1234567890!2d89.1833!3d21.9497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30aad4e9b6b1f3c3%3A0x1c1c1c1c1c1c1c1c!2sSundarbans!5e0!3m2!1sen!2sbd!4v1234567890",
            },

            travelTips: {
                bestTime: "October to March",
                weather:
                    "Tropical climate. Cool and dry in winter (Nov-Feb), hot and humid in summer.",
                packing: [
                    "Light cotton clothes",
                    "Earth-toned clothing for wildlife viewing",
                    "Binoculars",
                    "Camera with zoom lens",
                    "Sunscreen",
                    "Insect repellent",
                    "Hat",
                    "Comfortable walking shoes",
                ],
                health: "Carry prescribed medications. Anti-malarial precautions recommended.",
                cultural: "Respect wildlife. Maintain silence during safaris. No littering.",
            },

            cancellationPolicy: {
                before30Days: "Full refund minus 5% processing fee",
                before15Days: "75% refund",
                before7Days: "50% refund",
                before3Days: "25% refund",
                within3Days: "No refund",
            },

            reviews: [
                {
                    user: "Dr. Ahmed Hasan",
                    rating: 5,
                    date: "2026-07-20",
                    comment:
                        "Saw a tiger on the second day! Unforgettable experience. The crew was excellent.",
                },
                {
                    user: "Wildlife Photographers BD",
                    rating: 4.8,
                    date: "2026-07-12",
                    comment:
                        "Perfect for photography enthusiasts. Great boat and knowledgeable guides.",
                },
            ],
        },

        {
            id: 3,
            title: "Sylhet Tea Garden & Rainforest Retreat",
            shortTitle: "Sylhet",
            location: "Sylhet, Bangladesh",
            region: "Sylhet Division",
            category: "Nature & Wellness",
            duration: "3 Days / 2 Nights",
            originalPrice: 8500,
            discountedPrice: 6499,
            discountPercentage: 24,
            currency: "BDT",
            pricePerPerson: true,
            minGroupSize: 2,
            maxGroupSize: 15,
            startDate: "2026-10-15",
            endDate: "2026-10-17",
            availableDates: ["2026-10-15", "2026-10-22", "2026-10-29", "2026-11-05"],
            rating: 4.7,
            reviewCount: 189,
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
                "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&q=80",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
            ],
            isFavorited: false,
            featured: false,
            tags: ["Tea Garden", "Nature", "Relaxation", "Photography"],

            shortDescription:
                "Immerse yourself in the lush green tea gardens of Sylhet, visit Jaflong's stone collection sites, and explore the pristine Lawachara Rainforest.",
            fullDescription: `Discover the emerald beauty of Sylhet, Bangladesh's tea capital, where endless stretches of manicured tea gardens create a mesmerizing landscape. This 3-day retreat takes you through the iconic tea estates of Srimangal, the stone-laden river of Jaflong, and the biodiversity-rich Lawachara National Park.

Walk through tea plantations, taste the famous 7-layer tea, spot the endangered Hoolock Gibbons in their natural habitat, and experience the unique culture of the Khasi and Manipuri tribal communities. This package offers the perfect blend of nature, culture, and relaxation in the serene landscapes of northeastern Bangladesh.`,

            itinerary: [
                {
                    day: 1,
                    title: "Tea Garden Exploration",
                    activities: [
                        "Pick-up from Sylhet Airport/Railway Station",
                        "Transfer to Srimangal (1.5 hours)",
                        "Check-in at Tea Resort",
                        "Visit Bangladesh Tea Research Institute",
                        "Explore Finlays Tea Estate",
                        "Sunset walk through tea gardens",
                        "7-layer tea tasting at Nilkantha Tea Cabin",
                        "Overnight at Grand Sultan Tea Resort",
                    ],
                    meals: ["Lunch", "Dinner"],
                },
                {
                    day: 2,
                    title: "Rainforest & Tribal Villages",
                    activities: [
                        "Early breakfast at resort",
                        "Trek through Lawachara National Park",
                        "Hoolock Gibbon spotting",
                        "Visit Khasi Tribal Village",
                        "Lunch at local restaurant",
                        "Visit Manipuri Tribal Village",
                        "Traditional Manipuri dance performance",
                        "Visit Madhabpur Lake",
                        "Overnight at Grand Sultan Tea Resort",
                    ],
                    meals: ["Breakfast", "Lunch", "Dinner"],
                },
                {
                    day: 3,
                    title: "Jaflong & Departure",
                    activities: [
                        "Early breakfast",
                        "Drive to Jaflong Zero Point",
                        "Visit stone collection activities",
                        "View of Meghalaya Hills from Bangladesh border",
                        "Visit Piain River",
                        "Lunch at Jaflong",
                        "Return to Sylhet",
                        "Visit Shah Jalal Mazar Sharif",
                        "Drop-off at Sylhet Airport/Railway Station",
                    ],
                    meals: ["Breakfast", "Lunch"],
                },
            ],

            facilities: {
                accommodation: {
                    hotelName: "Grand Sultan Tea Resort & Golf",
                    hotelRating: 5,
                    roomType: "Deluxe Garden View Room",
                    amenities: [
                        "Air Conditioning",
                        "Free WiFi",
                        "LED TV",
                        "Mini Bar",
                        "Swimming Pool",
                        "Spa",
                        "Golf Course Access",
                        "Room Service",
                    ],
                },
                transportation: ["AC Microbus", "CNG Auto-rickshaw"],
                meals: ["2 Breakfasts", "3 Lunches", "2 Dinners"],
                guides: ["English Speaking Guide", "Forest Department Guide", "Tea Expert"],
                included: [
                    "All accommodation on twin sharing basis",
                    "All meals as per itinerary",
                    "Private AC vehicle for all transfers",
                    "Professional guide",
                    "Forest entry permits",
                    "7-layer tea tasting",
                    "Cultural performance",
                    "All applicable taxes",
                ],
                excluded: [
                    "Air/Train fare to Sylhet",
                    "Personal expenses",
                    "Tips and gratuities",
                    "Golf course fees",
                    "Spa treatments",
                    "Travel insurance",
                ],
            },

            nearbyAttractions: [
                {
                    name: "Bisnakandi",
                    distance: "35 km",
                    duration: "1.5 hour drive",
                    description: "Scenic spot with crystal clear water and stone quarries",
                    image: "https://example.com/bisnakandi.jpg",
                },
                {
                    name: "Ratargul Swamp Forest",
                    distance: "26 km",
                    duration: "1 hour drive",
                    description: "Freshwater swamp forest, boat ride through submerged trees",
                    image: "https://example.com/ratargul.jpg",
                },
                {
                    name: "Lalakhal",
                    distance: "40 km",
                    duration: "1.5 hour drive",
                    description: "Turquoise blue river between Meghalaya hills",
                    image: "https://example.com/lalakhal.jpg",
                },
                {
                    name: "Baikka Beel Wetland",
                    distance: "20 km",
                    duration: "45 min drive",
                    description: "Bird sanctuary with migratory birds (Nov-Feb)",
                    image: "https://example.com/baikkabeel.jpg",
                },
            ],

            pointOfContact: {
                tourManager: {
                    name: "Sharmin Akter",
                    phone: "+8801912-345678",
                    email: "sharmin.sylhet@bdtravel.com",
                    whatsapp: "+8801912-345678",
                    languages: ["Bengali", "English"],
                },
                emergencyContact: {
                    name: "24/7 Sylhet Support",
                    phone: "+8801713-456789",
                    availableHours: "24/7",
                },
                office: {
                    address: "45 Amberkhana, Sylhet",
                    phone: "+880821-712345",
                    email: "sylhet@bdtravel.com",
                },
            },

            locationMap: {
                coordinates: {
                    lat: 24.3636,
                    lng: 91.7862,
                },
                mapEmbedUrl:
                    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.1234567890!2d91.7862!3d24.3636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3750c6b9b9b9b9b9%3A0x1c1c1c1c1c1c1c1c!2sSrimangal!5e0!3m2!1sen!2sbd!4v1234567890",
            },

            travelTips: {
                bestTime: "October to March",
                weather: "Subtropical monsoon. Pleasant winter (15-25°C), hot summer (25-35°C).",
                packing: [
                    "Light cotton clothes",
                    "Light jacket for winter evenings",
                    "Comfortable walking shoes",
                    "Raincoat/Umbrella",
                    "Camera",
                    "Binoculars",
                ],
                health: "Mosquito repellent recommended for forest areas.",
                cultural: "Respect tribal customs. Ask permission before photographing locals.",
            },

            cancellationPolicy: {
                before30Days: "Full refund minus 5% processing fee",
                before15Days: "75% refund",
                before7Days: "50% refund",
                before3Days: "25% refund",
                within3Days: "No refund",
            },

            reviews: [
                {
                    user: "Tanvir Hassan",
                    rating: 5,
                    date: "2026-07-18",
                    comment:
                        "The 7-layer tea was amazing! Lawachara forest trek was the highlight.",
                },
                {
                    user: "Nusrat Jahan",
                    rating: 4.5,
                    date: "2026-07-05",
                    comment: "Beautiful tea gardens and great hospitality at the resort.",
                },
            ],
        },
    ],

    international: [
        {
            id: 4,
            title: "Bali Paradise: Beaches, Temples & Culture",
            shortTitle: "Bali",
            location: "Bali, Indonesia",
            region: "Southeast Asia",
            category: "Beach & Culture",
            duration: "6 Days / 5 Nights",
            originalPrice: 85000,
            discountedPrice: 64999,
            discountPercentage: 24,
            currency: "BDT",
            pricePerPerson: true,
            minGroupSize: 2,
            maxGroupSize: 16,
            startDate: "2026-08-15",
            endDate: "2026-08-20",
            availableDates: ["2026-08-15", "2026-09-05", "2026-09-19", "2026-10-03"],
            rating: 4.9,
            reviewCount: 523,
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
                "https://images.unsplash.com/photo-1544644181-1484b7b2d5c3?w=600&q=80",
                "https://images.unsplash.com/photo-1518548419970-58e3b2a1952d?w=600&q=80",
                "https://images.unsplash.com/photo-1558005137-d9610a3b4b2a?w=600&q=80",
            ],
            isFavorited: true,
            featured: true,
            tags: ["Beach", "Honeymoon", "Culture", "Adventure"],
            visaRequired: true,
            visaOnArrival: true,
            passportValidity: "6 months minimum",

            shortDescription:
                "Experience the magic of Bali with stunning beaches, ancient temples, lush rice terraces, and vibrant cultural performances on the Island of Gods.",
            fullDescription: `Discover why Bali is called the Island of Gods on this comprehensive 6-day journey through Indonesia's most beloved destination. From the spiritual ambiance of Uluwatu Temple to the artistic heart of Ubud, this package showcases Bali's diverse attractions.

Watch the sun rise over Mount Batur, surf the waves at Kuta Beach, explore the iconic Tegallalang Rice Terraces, and immerse yourself in Balinese Hindu culture at ancient temples. Savor authentic Indonesian cuisine, witness traditional Kecak fire dances, and relax with a traditional Balinese massage. Perfect for honeymooners, culture enthusiasts, and beach lovers alike.`,

            itinerary: [
                {
                    day: 1,
                    title: "Arrival in Paradise",
                    activities: [
                        "Arrival at Ngurah Rai International Airport",
                        "Traditional welcome with flower garlands",
                        "Transfer to Kuta hotel",
                        "Check-in and freshen up",
                        "Sunset at Kuta Beach",
                        "Welcome dinner at beachfront restaurant",
                        "Free time to explore Legian Street",
                        "Overnight at The Anvaya Beach Resort",
                    ],
                    meals: ["Dinner"],
                },
                {
                    day: 2,
                    title: "South Bali Temple Tour",
                    activities: [
                        "Breakfast at hotel",
                        "Visit Tanah Lot Temple (sea temple)",
                        "Explore Taman Ayun Royal Temple",
                        "Lunch at local restaurant",
                        "Visit Uluwatu Temple on cliff edge",
                        "Watch Kecak Fire Dance at sunset",
                        "Seafood dinner at Jimbaran Bay",
                        "Overnight at The Anvaya Beach Resort",
                    ],
                    meals: ["Breakfast", "Lunch", "Dinner"],
                },
                {
                    day: 3,
                    title: "Ubud Cultural Heart",
                    activities: [
                        "Breakfast at hotel",
                        "Check-out from Kuta hotel",
                        "Visit Batubulan Village for Barong Dance",
                        "Explore Celuk Silver Village",
                        "Visit Mas Wood Carving Village",
                        "Lunch overlooking rice terraces",
                        "Check-in at Ubud resort",
                        "Visit Ubud Monkey Forest",
                        "Explore Ubud Art Market",
                        "Overnight at Komaneka at Rasa Sayang",
                    ],
                    meals: ["Breakfast", "Lunch"],
                },
                {
                    day: 4,
                    title: "Rice Terraces & Volcano",
                    activities: [
                        "Early breakfast",
                        "Visit Tegallalang Rice Terraces",
                        "Photo stop at Mount Batur viewpoint",
                        "Visit Tirta Empul Holy Spring Temple",
                        "Lunch with volcano view",
                        "Coffee plantation tour and tasting",
                        "Visit Tegenungan Waterfall",
                        "Return to Ubud",
                        "Traditional Balinese massage (1 hour)",
                        "Overnight at Komaneka at Rasa Sayang",
                    ],
                    meals: ["Breakfast", "Lunch"],
                },
                {
                    day: 5,
                    title: "Nusa Dua Beach Day",
                    activities: [
                        "Breakfast at hotel",
                        "Check-out from Ubud",
                        "Transfer to Nusa Dua",
                        "Visit Water Blow natural phenomenon",
                        "Lunch at beach club",
                        "Free time for water sports (optional)",
                        "Check-in at Nusa Dua hotel",
                        "Sunset dinner cruise (optional)",
                        "Overnight at Melia Bali",
                    ],
                    meals: ["Breakfast", "Lunch", "Dinner"],
                },
                {
                    day: 6,
                    title: "Departure",
                    activities: [
                        "Breakfast at hotel",
                        "Morning at leisure on beach",
                        "Last-minute souvenir shopping",
                        "Check-out from hotel",
                        "Transfer to airport",
                        "Departure from Bali",
                    ],
                    meals: ["Breakfast"],
                },
            ],

            facilities: {
                accommodation: [
                    {
                        nights: "2 Nights",
                        hotelName: "The Anvaya Beach Resort",
                        hotelRating: 5,
                        location: "Kuta",
                        roomType: "Deluxe Room",
                        amenities: [
                            "Swimming Pool",
                            "Beach Access",
                            "Spa",
                            "Fitness Center",
                            "Free WiFi",
                        ],
                    },
                    {
                        nights: "2 Nights",
                        hotelName: "Komaneka at Rasa Sayang",
                        hotelRating: 4,
                        location: "Ubud",
                        roomType: "Deluxe Room with Rice Field View",
                        amenities: [
                            "Infinity Pool",
                            "Spa",
                            "Yoga Classes",
                            "Restaurant",
                            "Free WiFi",
                        ],
                    },
                    {
                        nights: "1 Night",
                        hotelName: "Melia Bali",
                        hotelRating: 5,
                        location: "Nusa Dua",
                        roomType: "Premium Garden Room",
                        amenities: [
                            "Beachfront",
                            "5 Swimming Pools",
                            "Spa",
                            "Tennis Court",
                            "Free WiFi",
                        ],
                    },
                ],
                transportation: ["AC Private Car", "English Speaking Driver"],
                meals: ["5 Breakfasts", "4 Lunches", "4 Dinners"],
                guides: ["English Speaking Tour Guide", "Local Temple Guide"],
                included: [
                    "5 nights accommodation with breakfast",
                    "All meals as per itinerary",
                    "Private AC transportation",
                    "Professional English-speaking guide",
                    "All entrance fees and temple donations",
                    "Kecak Dance performance tickets",
                    "1-hour traditional Balinese massage",
                    "Airport transfers",
                    "All applicable taxes",
                ],
                excluded: [
                    "International airfare",
                    "Indonesia Visa on Arrival fee (approx $35)",
                    "Travel insurance (mandatory)",
                    "Personal expenses",
                    "Optional water sports activities",
                    "Tips and gratuities",
                    "Anything not mentioned in inclusions",
                ],
            },

            nearbyAttractions: [
                {
                    name: "Nusa Penida Island",
                    distance: "45 min boat",
                    duration: "Day trip",
                    description: "Famous for Kelingking Beach and Diamond Beach",
                    image: "https://example.com/nusapenida.jpg",
                },
                {
                    name: "Mount Batur Sunrise Trek",
                    distance: "35 km",
                    duration: "2 hour drive",
                    description: "Popular sunrise trek to active volcano",
                    image: "https://example.com/mountbatur.jpg",
                },
                {
                    name: "Garuda Wisnu Kencana",
                    distance: "15 km",
                    duration: "30 min drive",
                    description: "Iconic 121m tall statue and cultural park",
                    image: "https://example.com/gwk.jpg",
                },
                {
                    name: "Seminyak",
                    distance: "5 km",
                    duration: "15 min drive",
                    description: "Upscale beach area with trendy cafes and boutiques",
                    image: "https://example.com/seminyak.jpg",
                },
            ],

            pointOfContact: {
                tourManager: {
                    name: "Wayan Sudirman",
                    phone: "+6281234567890",
                    email: "wayan.bali@bdtravel.com",
                    whatsapp: "+6281234567890",
                    languages: ["English", "Indonesian", "Balinese"],
                },
                emergencyContact: {
                    name: "24/7 Bali Operations",
                    phone: "+6281234567891",
                    availableHours: "24/7",
                },
                office: {
                    address: "Jl. Sunset Road No. 88, Kuta, Bali",
                    phone: "+62361456789",
                    email: "bali@bdtravel.com",
                },
                embassyContact: {
                    country: "Bangladesh Embassy Jakarta",
                    phone: "+62215219874",
                    address: "Jl. Denpasar Raya No. 3, Jakarta",
                },
            },

            locationMap: {
                coordinates: {
                    lat: -8.4095,
                    lng: 115.1889,
                },
                mapEmbedUrl:
                    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.1234567890!2d115.1889!3d-8.4095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd22f7520e5ab4d%3A0x1c1c1c1c1c1c1c1c!2sBali!5e0!3m2!1sen!2sid!4v1234567890",
            },

            travelTips: {
                bestTime: "April to October (Dry Season)",
                weather:
                    "Tropical climate. Dry season (Apr-Oct): 26-32°C. Rainy season (Nov-Mar): 25-30°C with short showers.",
                currency: "Indonesian Rupiah (IDR)",
                language: "Bahasa Indonesia, English widely spoken in tourist areas",
                packing: [
                    "Light cotton clothes",
                    "Swimwear",
                    "Sunscreen",
                    "Hat",
                    "Sunglasses",
                    "Modest clothing for temples",
                    "Rain jacket (rainy season)",
                    "Power adapter (Type C/F, 230V)",
                ],
                health: "Bottled water recommended. Mosquito repellent advised.",
                cultural:
                    "Cover shoulders and knees when visiting temples. Remove shoes before entering. Don't touch people's heads. Use right hand for giving/receiving.",
                connectivity:
                    "Local SIM cards available at airport. Free WiFi in most hotels and cafes.",
            },

            cancellationPolicy: {
                before45Days: "Full refund minus 10% processing fee",
                before30Days: "75% refund",
                before15Days: "50% refund",
                before7Days: "25% refund",
                within7Days: "No refund",
            },

            reviews: [
                {
                    user: "Farhana & Rashed (Honeymoon)",
                    rating: 5,
                    date: "2026-07-10",
                    comment:
                        "Perfect honeymoon! The hotel upgrades were amazing. Wayan was an excellent guide.",
                },
                {
                    user: "Ahmed Family",
                    rating: 4.8,
                    date: "2026-06-28",
                    comment: "Great mix of culture and relaxation. Kids loved the Monkey Forest!",
                },
            ],
        },

        {
            id: 5,
            title: "Dubai: Desert Safari & City of Gold",
            shortTitle: "Dubai",
            location: "Dubai, United Arab Emirates",
            region: "Middle East",
            category: "Luxury & Adventure",
            duration: "5 Days / 4 Nights",
            originalPrice: 98000,
            discountedPrice: 75999,
            discountPercentage: 22,
            currency: "BDT",
            pricePerPerson: true,
            minGroupSize: 2,
            maxGroupSize: 12,
            startDate: "2026-09-10",
            endDate: "2026-09-14",
            availableDates: ["2026-09-10", "2026-09-24", "2026-10-08", "2026-10-22"],
            rating: 4.8,
            reviewCount: 412,
            image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
                "https://images.unsplash.com/photo-1526495124232-a0a7f80d8e2c?w=600&q=80",
                "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
                "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80",
            ],
            isFavorited: false,
            featured: true,
            tags: ["Luxury", "Shopping", "Desert Safari", "City Tour"],
            visaRequired: true,
            visaProcessing: "7-10 working days",
            passportValidity: "6 months minimum",

            shortDescription:
                "Experience the glitz and glamour of Dubai with Burj Khalifa views, thrilling desert safari, traditional souks, and world-class shopping.",
            fullDescription: `Discover the extraordinary city of Dubai, where futuristic skyscrapers meet ancient traditions in the heart of the Arabian Desert. This 5-day journey takes you from the dizzying heights of Burj Khalifa to the golden dunes of the Arabian Desert for an unforgettable safari experience.

Marvel at the Palm Jumeirah, shop at the world's largest mall, cruise along Dubai Creek in a traditional dhow, and immerse yourself in the aromatic spice and glittering gold souks. Experience Emirati hospitality with authentic Arabic cuisine, witness spectacular fountain shows, and capture stunning photos at the iconic Burj Al Arab. Whether you're seeking luxury shopping, cultural experiences, or desert adventures, Dubai promises an extraordinary escape.`,

            itinerary: [
                {
                    day: 1,
                    title: "Arrival & Dubai Marina",
                    activities: [
                        "Arrival at Dubai International Airport (DXB)",
                        "Meet and greet with visa assistance",
                        "Transfer to hotel",
                        "Check-in and rest",
                        "Evening visit to Dubai Marina Walk",
                        "Dinner at Marina waterfront restaurant",
                        "View of Ain Dubai (world's largest observation wheel)",
                        "Overnight at Crowne Plaza Dubai Marina",
                    ],
                    meals: ["Dinner"],
                },
                {
                    day: 2,
                    title: "Modern Dubai & Burj Khalifa",
                    activities: [
                        "Breakfast at hotel",
                        "Visit Palm Jumeirah and photo stop at Atlantis",
                        "Explore Souk Madinat Jumeirah",
                        "Photo stop at Burj Al Arab",
                        "Lunch at Dubai Mall",
                        "Visit Dubai Aquarium & Underwater Zoo",
                        "Burj Khalifa - At The Top (124th & 125th floors)",
                        "Watch Dubai Fountain Show",
                        "Dinner with fountain view",
                        "Overnight at Crowne Plaza Dubai Marina",
                    ],
                    meals: ["Breakfast", "Lunch", "Dinner"],
                },
                {
                    day: 3,
                    title: "Desert Safari Adventure",
                    activities: [
                        "Leisurely breakfast",
                        "Morning at leisure (pool or shopping)",
                        "Lunch at hotel",
                        "Afternoon pickup for Desert Safari",
                        "Dune bashing in 4x4 vehicle",
                        "Sunset photography in desert",
                        "Arrival at Bedouin-style camp",
                        "Camel riding",
                        "Henna painting",
                        "Traditional Tanoura and Belly dance performances",
                        "BBQ dinner under the stars",
                        "Shisha smoking (optional)",
                        "Return to hotel for overnight",
                    ],
                    meals: ["Breakfast", "Lunch", "Dinner"],
                },
                {
                    day: 4,
                    title: "Old Dubai & Cultural Heritage",
                    activities: [
                        "Breakfast at hotel",
                        "Visit Dubai Frame for city views",
                        "Explore Al Fahidi Historical District",
                        "Visit Dubai Museum at Al Fahidi Fort",
                        "Abra (water taxi) ride across Dubai Creek",
                        "Explore Gold Souk and Spice Souk",
                        "Lunch at traditional Arabic restaurant",
                        "Visit Jumeirah Mosque (photo stop)",
                        "Evening Dhow Cruise with dinner on Dubai Creek",
                        "Overnight at Crowne Plaza Dubai Marina",
                    ],
                    meals: ["Breakfast", "Lunch", "Dinner"],
                },
                {
                    day: 5,
                    title: "Departure",
                    activities: [
                        "Breakfast at hotel",
                        "Morning at leisure for last-minute shopping",
                        "Check-out from hotel",
                        "Transfer to Dubai International Airport",
                        "Departure",
                    ],
                    meals: ["Breakfast"],
                },
            ],

            facilities: {
                accommodation: {
                    hotelName: "Crowne Plaza Dubai Marina",
                    hotelRating: 4,
                    roomType: "Marina View Room",
                    amenities: [
                        "Swimming Pool",
                        "Fitness Center",
                        "Spa",
                        "Multiple Restaurants",
                        "Free WiFi",
                        "Marina View",
                    ],
                },
                transportation: ["AC Private Vehicle", "4x4 for Desert Safari"],
                meals: ["4 Breakfasts", "3 Lunches", "4 Dinners"],
                guides: ["English Speaking Tour Guide", "Desert Safari Guide"],
                included: [
                    "4 nights accommodation with breakfast",
                    "All meals as per itinerary",
                    "Private AC transportation",
                    "Professional English-speaking guide",
                    "Burj Khalifa tickets (124th & 125th floors)",
                    "Desert Safari with BBQ dinner",
                    "Dhow Cruise with dinner",
                    "Dubai Aquarium tickets",
                    "Dubai Frame tickets",
                    "Airport transfers",
                    "All applicable taxes",
                ],
                excluded: [
                    "International airfare",
                    "UAE Visa fee (BDT 8,500 approx)",
                    "Travel insurance (mandatory)",
                    "Personal shopping expenses",
                    "Optional activities not mentioned",
                    "Tips and gratuities",
                    "Tourism Dirham fee (paid at hotel)",
                ],
            },

            nearbyAttractions: [
                {
                    name: "Global Village",
                    distance: "25 km",
                    duration: "30 min drive",
                    description: "Multicultural festival park (seasonal: Oct-Apr)",
                    image: "https://example.com/globalvillage.jpg",
                },
                {
                    name: "IMG Worlds of Adventure",
                    distance: "30 km",
                    duration: "35 min drive",
                    description: "World's largest indoor theme park",
                    image: "https://example.com/imgworlds.jpg",
                },
                {
                    name: "Miracle Garden",
                    distance: "28 km",
                    duration: "35 min drive",
                    description: "World's largest natural flower garden (seasonal: Nov-May)",
                    image: "https://example.com/miraclegarden.jpg",
                },
                {
                    name: "Abu Dhabi Day Trip",
                    distance: "140 km",
                    duration: "1.5 hour drive",
                    description: "Visit Sheikh Zayed Grand Mosque and Louvre Abu Dhabi",
                    image: "https://example.com/abudhabi.jpg",
                },
            ],

            pointOfContact: {
                tourManager: {
                    name: "Mohammed Al Falasi",
                    phone: "+971501234567",
                    email: "mohammed.dubai@bdtravel.com",
                    whatsapp: "+971501234567",
                    languages: ["English", "Arabic", "Hindi", "Urdu"],
                },
                emergencyContact: {
                    name: "24/7 Dubai Operations",
                    phone: "+971501234568",
                    availableHours: "24/7",
                },
                office: {
                    address: "Office 405, Al Attar Tower, Sheikh Zayed Road, Dubai",
                    phone: "+97143987654",
                    email: "dubai@bdtravel.com",
                },
                embassyContact: {
                    country: "Bangladesh Consulate Dubai",
                    phone: "+97143982345",
                    address: "Villa 36, Al Muteena Street, Deira, Dubai",
                },
            },

            locationMap: {
                coordinates: {
                    lat: 25.2048,
                    lng: 55.2708,
                },
                mapEmbedUrl:
                    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1234567890!2d55.2708!3d25.2048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0x1c1c1c1c1c1c1c1c!2sDubai!5e0!3m2!1sen!2sae!4v1234567890",
            },

            travelTips: {
                bestTime: "November to March (Pleasant Weather)",
                weather: "Desert climate. Winter (Nov-Mar): 14-28°C. Summer (Jun-Sep): 30-48°C.",
                currency: "UAE Dirham (AED)",
                language: "Arabic, English widely spoken",
                packing: [
                    "Light cotton clothes",
                    "Modest clothing for religious sites",
                    "Sunglasses",
                    "Sunscreen",
                    "Light jacket (for indoor AC)",
                    "Power adapter (Type G, 230V)",
                ],
                health: "Stay hydrated. Bottled water recommended.",
                cultural:
                    "Dress modestly in public areas. No public display of affection. No eating/drinking in public during Ramadan.",
                connectivity: "Free WiFi in most hotels and malls. Local SIM cards available.",
                shopping:
                    "Dubai Mall, Mall of Emirates, Gold Souk for jewelry, Spice Souk for authentic spices.",
            },

            cancellationPolicy: {
                before45Days: "Full refund minus 10% processing fee",
                before30Days: "75% refund",
                before15Days: "50% refund",
                before7Days: "25% refund",
                within7Days: "No refund",
            },

            reviews: [
                {
                    user: "Rafsan Jani",
                    rating: 5,
                    date: "2026-07-22",
                    comment:
                        "Amazing experience! Desert safari was the highlight. Perfect for families.",
                },
                {
                    user: "Sabrina Chowdhury",
                    rating: 4.7,
                    date: "2026-07-08",
                    comment: "Great value package. Burj Khalifa views were breathtaking.",
                },
            ],
        },

        {
            id: 6,
            title: "Thailand Discovery: Bangkok & Pattaya",
            shortTitle: "Thailand",
            location: "Bangkok & Pattaya, Thailand",
            region: "Southeast Asia",
            category: "Culture & Beach",
            duration: "6 Days / 5 Nights",
            originalPrice: 65000,
            discountedPrice: 48999,
            discountPercentage: 25,
            currency: "BDT",
            pricePerPerson: true,
            minGroupSize: 2,
            maxGroupSize: 20,
            startDate: "2026-10-05",
            endDate: "2026-10-10",
            availableDates: ["2026-10-05", "2026-10-19", "2026-11-02", "2026-11-16"],
            rating: 4.7,
            reviewCount: 678,
            image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=600&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=600&q=80",
                "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80",
                "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80",
                "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80",
            ],
            isFavorited: true,
            featured: true,
            tags: ["Shopping", "Beach", "Temples", "Nightlife"],
            visaRequired: true,
            visaOnArrival: true,
            passportValidity: "6 months minimum",

            shortDescription:
                "Explore the vibrant streets of Bangkok, ancient temples, floating markets, and the beautiful beaches of Pattaya with exciting water activities.",
            fullDescription: `Experience the best of Thailand with this perfectly balanced 6-day journey through bustling Bangkok and beachside Pattaya. From the glittering Grand Palace and sacred temples of Bangkok to the sun-soaked beaches and vibrant nightlife of Pattaya, this package offers a complete Thai experience.

Marvel at the reclining Buddha at Wat Pho, shop till you drop at Bangkok's famous markets, cruise the Chao Phraya River, and experience the unique Damnoen Saduak Floating Market. Then escape to Pattaya for beach relaxation, visit the stunning Sanctuary of Truth, enjoy the famous Alcazar Cabaret Show, and explore Coral Island's crystal-clear waters. With delicious Thai cuisine, warm hospitality, and endless entertainment, this journey promises memories to last a lifetime.`,

            itinerary: [
                {
                    day: 1,
                    title: "Arrival in Bangkok",
                    activities: [
                        "Arrival at Suvarnabhumi Airport (BKK)",
                        "Meet and greet with visa assistance",
                        "Transfer to Bangkok hotel",
                        "Check-in and freshen up",
                        "Evening visit to Asiatique The Riverfront",
                        "Dinner at riverside restaurant",
                        "Optional: Chao Phraya River dinner cruise",
                        "Overnight at Century Park Hotel",
                    ],
                    meals: ["Dinner"],
                },
                {
                    day: 2,
                    title: "Bangkok Temple & City Tour",
                    activities: [
                        "Breakfast at hotel",
                        "Visit Grand Palace & Emerald Buddha Temple",
                        "Explore Wat Pho (Reclining Buddha)",
                        "Visit Wat Arun (Temple of Dawn)",
                        "Lunch at local Thai restaurant",
                        "Shopping at MBK Center or Platinum Mall",
                        "Evening visit to Baiyoke Sky Tower observation deck",
                        "Dinner at hotel or local restaurant",
                        "Overnight at Century Park Hotel",
                    ],
                    meals: ["Breakfast", "Lunch"],
                },
                {
                    day: 3,
                    title: "Floating Market & Pattaya Transfer",
                    activities: [
                        "Early breakfast at hotel",
                        "Check-out from Bangkok hotel",
                        "Visit Damnoen Saduak Floating Market",
                        "Boat ride through canals",
                        "Experience local trading on water",
                        "Lunch en route",
                        "Drive to Pattaya (2.5 hours)",
                        "Check-in at Pattaya hotel",
                        "Visit Pattaya Walking Street",
                        "Dinner at hotel or local restaurant",
                        "Overnight at A-One The Royal Cruise Hotel",
                    ],
                    meals: ["Breakfast", "Lunch", "Dinner"],
                },
                {
                    day: 4,
                    title: "Coral Island Adventure",
                    activities: [
                        "Breakfast at hotel",
                        "Transfer to Bali Hai Pier",
                        "Speedboat to Coral Island (Koh Larn)",
                        "Water activities (Parasailing, Banana Boat, Snorkeling - optional)",
                        "Swimming and beach relaxation",
                        "Lunch on the island",
                        "Return to Pattaya",
                        "Visit Sanctuary of Truth (wooden temple)",
                        "Alcazar Cabaret Show in evening",
                        "Dinner at hotel",
                        "Overnight at A-One The Royal Cruise Hotel",
                    ],
                    meals: ["Breakfast", "Lunch", "Dinner"],
                },
                {
                    day: 5,
                    title: "Pattaya Highlights & Return to Bangkok",
                    activities: [
                        "Breakfast at hotel",
                        "Check-out from Pattaya hotel",
                        "Visit Pattaya Viewpoint (Khao Pattaya)",
                        "Photo stop at Big Buddha Hill",
                        "Visit Gems Gallery (world's largest jewelry store)",
                        "Lunch en route",
                        "Return drive to Bangkok",
                        "Check-in at Bangkok hotel",
                        "Free time for shopping at Pratunam Market",
                        "Farewell Thai dinner",
                        "Overnight at Century Park Hotel",
                    ],
                    meals: ["Breakfast", "Lunch", "Dinner"],
                },
                {
                    day: 6,
                    title: "Departure",
                    activities: [
                        "Breakfast at hotel",
                        "Morning at leisure for last-minute shopping",
                        "Check-out from hotel",
                        "Transfer to Suvarnabhumi Airport",
                        "Departure from Bangkok",
                    ],
                    meals: ["Breakfast"],
                },
            ],

            facilities: {
                accommodation: [
                    {
                        nights: "3 Nights",
                        hotelName: "Century Park Hotel",
                        hotelRating: 4,
                        location: "Bangkok",
                        roomType: "Deluxe Room",
                        amenities: [
                            "Swimming Pool",
                            "Fitness Center",
                            "Spa",
                            "Restaurant",
                            "Free WiFi",
                        ],
                    },
                    {
                        nights: "2 Nights",
                        hotelName: "A-One The Royal Cruise Hotel",
                        hotelRating: 4,
                        location: "Pattaya",
                        roomType: "Superior Sea View Room",
                        amenities: [
                            "Beach Access",
                            "Swimming Pool",
                            "Spa",
                            "Restaurant",
                            "Free WiFi",
                        ],
                    },
                ],
                transportation: ["AC Private Coach", "Speedboat"],
                meals: ["5 Breakfasts", "4 Lunches", "4 Dinners"],
                guides: ["English Speaking Thai Guide"],
                included: [
                    "5 nights accommodation with breakfast",
                    "All meals as per itinerary",
                    "Private AC transportation",
                    "Professional English-speaking guide",
                    "All temple entrance fees",
                    "Floating Market boat ride",
                    "Alcazar Cabaret Show tickets",
                    "Coral Island speedboat transfer",
                    "Airport transfers",
                    "All applicable taxes",
                ],
                excluded: [
                    "International airfare",
                    "Thailand Visa on Arrival fee (2,000 THB approx)",
                    "Travel insurance (mandatory)",
                    "Water sports activities at Coral Island",
                    "Personal shopping expenses",
                    "Tips and gratuities",
                    "Anything not mentioned in inclusions",
                ],
            },

            nearbyAttractions: [
                {
                    name: "Safari World & Marine Park",
                    distance: "40 km",
                    duration: "1 hour drive",
                    description: "Popular zoo and marine park with dolphin shows",
                    image: "https://example.com/safariworld.jpg",
                },
                {
                    name: "Nong Nooch Tropical Garden",
                    distance: "15 km",
                    duration: "25 min drive",
                    description: "Beautiful botanical garden with cultural shows",
                    image: "https://example.com/nongnooch.jpg",
                },
                {
                    name: "Chatuchak Weekend Market",
                    distance: "10 km",
                    duration: "20 min drive",
                    description: "World's largest weekend market with 15,000+ stalls",
                    image: "https://example.com/chatuchak.jpg",
                },
                {
                    name: "Ayutthaya Historical Park",
                    distance: "80 km",
                    duration: "1.5 hour drive",
                    description: "UNESCO World Heritage ancient capital",
                    image: "https://example.com/ayutthaya.jpg",
                },
            ],

            pointOfContact: {
                tourManager: {
                    name: "Somchai Wongsuwan",
                    phone: "+66812345678",
                    email: "somchai.thailand@bdtravel.com",
                    whatsapp: "+66812345678",
                    languages: ["Thai", "English"],
                },
                emergencyContact: {
                    name: "24/7 Thailand Operations",
                    phone: "+66812345679",
                    availableHours: "24/7",
                },
                office: {
                    address: "888 Sukhumvit Road, Klongtoey, Bangkok 10110",
                    phone: "+6621234567",
                    email: "thailand@bdtravel.com",
                },
                embassyContact: {
                    country: "Bangladesh Embassy Bangkok",
                    phone: "+6623923435",
                    address: "727 Sukhumvit Soi 55, Bangkok",
                },
            },

            locationMap: {
                coordinates: {
                    lat: 13.7563,
                    lng: 100.5018,
                },
                mapEmbedUrl:
                    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.1234567890!2d100.5018!3d13.7563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ee2d2d2d2d2%3A0x1c1c1c1c1c1c1c1c!2sBangkok!5e0!3m2!1sen!2sth!4v1234567890",
            },

            travelTips: {
                bestTime: "November to February (Cool Season)",
                weather:
                    "Tropical climate. Cool season (Nov-Feb): 22-32°C. Hot season (Mar-May): 28-38°C. Rainy season (Jun-Oct): 25-33°C with showers.",
                currency: "Thai Baht (THB)",
                language: "Thai, English spoken in tourist areas",
                packing: [
                    "Light cotton clothes",
                    "Modest clothing for temples",
                    "Swimwear",
                    "Sunscreen",
                    "Hat",
                    "Umbrella/Raincoat (rainy season)",
                    "Power adapter (Type A/B/C, 220V)",
                ],
                health: "Drink bottled water. Street food is safe but choose busy stalls.",
                cultural:
                    "Cover shoulders and knees when visiting temples. Remove shoes before entering temples. Don't touch people's heads. Respect the Royal Family.",
                connectivity:
                    "Local SIM cards available at airport and 7-Eleven stores. Free WiFi in hotels.",
                shopping:
                    "Bargaining is expected at markets. 7-Eleven stores are everywhere for essentials.",
            },

            cancellationPolicy: {
                before45Days: "Full refund minus 10% processing fee",
                before30Days: "75% refund",
                before15Days: "50% refund",
                before7Days: "25% refund",
                within7Days: "No refund",
            },

            reviews: [
                {
                    user: "Mahmud Hasan",
                    rating: 4.8,
                    date: "2026-07-14",
                    comment:
                        "Great value for money! Pattaya beach was beautiful. Guide was very helpful.",
                },
                {
                    user: "Ritu Ahmed",
                    rating: 5,
                    date: "2026-06-30",
                    comment:
                        "Perfect family trip. The cabaret show was amazing. Shopping was great too!",
                },
            ],
        },
    ],
};

import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Camera, Check, Calendar, X, ChevronLeft, ChevronRight, Globe, Menu, Clock, MapIcon, Plane, Waves } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    numberOfPeople: string;
    tripTerm: string;
    discountCode: string;
    message: string;
    gdprConsent: boolean;
}

interface DayProgram {
    day: number;
    title: string;
    description: string;
    highlights: string[];
    type: 'travel' | 'sightseeing' | 'safari' | 'adventure' | 'departure' | 'ocean';
}

interface Translations {
    [key: string]: {
        cs: string;
        en: string;
    };
}

const MoreASafari: React.FC = () => {
    // Language state with localStorage persistence
    const [language, setLanguage] = useState<string>('en');
    const [isClient, setIsClient] = useState<boolean>(false);

    // Initialize client-side state after hydration
    useEffect(() => {
        setIsClient(true);
        const savedLanguage = localStorage.getItem('addotours-language') || 'en';
        setLanguage(savedLanguage);
    }, []);

    // Save language preference to localStorage
    useEffect(() => {
        if (isClient) {
            localStorage.setItem('addotours-language', language);
        }
    }, [language, isClient]);

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        numberOfPeople: '',
        tripTerm: '',
        discountCode: '',
        message: '',
        gdprConsent: false
    });

    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [showGallery, setShowGallery] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [currentGalleryImages, setCurrentGalleryImages] = useState<string[]>([]);
    const [showProgram, setShowProgram] = useState<boolean>(false);
    const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());
    const [discountCodeError, setDiscountCodeError] = useState<boolean>(false);

    // Translation object
    const translations: Translations = {
        // Navigation
        'nav.flowerPath': { cs: 'KVĚTINOVÁ CESTA A SAFARI', en: 'FLOWER ROUTE & SAFARI' },
        'nav.oceanSafari': { cs: 'MOŘE A SAFARI', en: 'OCEAN & SAFARI' },
        'nav.capeTown': { cs: 'KAPSKÉ MĚSTO A OKOLÍ', en: 'CAPE TOWN & SURROUNDINGS' },
        'nav.accommodation': { cs: 'UBYTOVÁNÍ', en: 'ACCOMMODATION' },
        'nav.contact': { cs: 'KONTAKT', en: 'CONTACT' },

        // Hero section
        'hero.title': { cs: 'Moře a safari', en: 'Ocean & Safari' },
        'hero.subtitle': { cs: '10denní zájezd do Jihoafrické republiky', en: '10-day trip to South Africa' },
        'hero.description': {
            cs: 'Dokonalá kombinace oceánských zážitků a africké divočiny. Safari na farmách, Indický oceán a nezapomenutelné dobrodružství v Port Elizabeth oblasti',
            en: 'Perfect combination of ocean experiences and African wilderness. Farm safaris, Indian Ocean and unforgettable adventure in the Port Elizabeth area'
        },
        'hero.reserveTrip': { cs: 'Rezervovat zájezd', en: 'Reserve Trip' },
        'hero.viewPhotos': { cs: 'Prohlédnout fotky', en: 'View Photos' },

        // Program section
        'program.title': { cs: 'Program zájezdu', en: 'Trip Program' },
        'program.subtitle': { cs: '10denní dobrodružství kombinující oceánské zážitky s africaním safari', en: '10-day adventure combining ocean experiences with African safari' },
        'program.safariExpeditions': { cs: '3 Safari expedice', en: '3 Safari Expeditions' },
        'program.indianOcean': { cs: 'Indický oceán', en: 'Indian Ocean' },
        'program.intensiveDays': { cs: '10 intenzivních dní', en: '10 Intensive Days' },
        'program.portElizabethRegion': { cs: 'Port Elizabeth region', en: 'Port Elizabeth Region' },
        'program.overview': {
            cs: 'Kompaktní 10denní zájezd navržený pro milovníky přírody a oceánu. Začínáte na farmě Fijnbosch u Indického oceánu, objevujete krásy Jeffreys Bay, zažíváte adrenelin v Tsitsikama parku a korunujete pobyt safari v nejlepších rezervacích JAR.',
            en: 'Compact 10-day trip designed for nature and ocean lovers. Starting at Fijnbosch farm by the Indian Ocean, discovering the beauty of Jeffreys Bay, experiencing adrenaline in Tsitsikama park and crowning your stay with safari in South Africa\'s best reserves.'
        },
        'program.oceanExperiences': { cs: 'Oceánské zážitky', en: 'Ocean Experiences' },
        'program.oceanDescription': { cs: 'Jeffreys Bay, Paradise Beach, Ocean Safari', en: 'Jeffreys Bay, Paradise Beach, Ocean Safari' },
        'program.safariNature': { cs: 'Safari & Příroda', en: 'Safari & Nature' },
        'program.safariDescription': { cs: 'Sibuya, Addo Park, farmy Fijnbosch & Mayabana', en: 'Sibuya, Addo Park, Fijnbosch & Mayabana farms' },
        'program.adventure': { cs: 'Dobrodružství', en: 'Adventure' },
        'program.adventureDescription': { cs: 'Tsitsikama park, bungee jumping, Monkey Land', en: 'Tsitsikama park, bungee jumping, Monkey Land' },
        'program.showDetailed': { cs: 'Zobrazit detailní program', en: 'Show Detailed Program' },
        'program.hideDetailed': { cs: 'Skrýt detailní program', en: 'Hide Detailed Program' },
        'program.clickToShow': { cs: 'Klikněte pro zobrazení dne po dni programu s detailními aktivitami', en: 'Click to show day-by-day program with detailed activities' },
        'program.expandAll': { cs: 'Rozbalit vše', en: 'Expand All' },
        'program.collapseAll': { cs: 'Sbalit vše', en: 'Collapse All' },
        'program.day': { cs: 'den', en: 'day' },
        'program.activities': { cs: 'aktivit', en: 'activities' },
        'program.note': { cs: 'Poznámka k programu:', en: 'Program Note:' },
        'program.noteText': {
            cs: 'Jednotlivé naplánované aktivity mohou být individuálně měněny po dohodě s průvodcem a zároveň mohou být přeloženy z důvodu nepříznivých klimatických podmínek.',
            en: 'Individual planned activities may be changed individually in agreement with the guide and may also be postponed due to unfavorable weather conditions.'
        },
        'program.readyQuestion': { cs: 'Připraveni na oceán a safari?', en: 'Ready for Ocean and Safari?' },
        'program.readyDescription': { cs: 'Tento kompaktní program vám nabídne to nejlepší z JAR za 10 intenzivních dní.', en: 'This compact program offers you the best of South Africa in 10 intensive days.' },
        'program.reserveThis': { cs: 'Rezervovat tento zájezd', en: 'Reserve This Trip' },

        // Statistics
        'stats.title': { cs: 'Váš zájezd v číslech', en: 'Your Trip in Numbers' },
        'stats.subtitle': { cs: 'Co vás čeká během 10 dní dobrodružství', en: 'What awaits you during 10 days of adventure' },
        'stats.safariExpeditions': { cs: 'Safari expedic', en: 'Safari Expeditions' },
        'stats.nationalParks': { cs: 'Národní parky', en: 'National Parks' },
        'stats.oceanDays': { cs: 'Oceánské dny', en: 'Ocean Days' },
        'stats.intensiveExperience': { cs: 'Intenzivní zážitek', en: 'Intensive Experience' },

        // Gallery
        'gallery.title': { cs: 'Fotogalerie zájezdu', en: 'Trip Photo Gallery' },
        'gallery.description': { cs: 'Podívejte se na fotky z našich předchozích zájezdů Moře a safari', en: 'Take a look at photos from our previous Ocean and Safari trips' },
        'gallery.viewAll': { cs: 'Zobrazit celou galerii', en: 'View Full Gallery' },

        // Pricing
        'pricing.title': { cs: 'Co zahrnuje cena', en: 'What the Price Includes' },
        'pricing.subtitle': { cs: 'Transparentní přehled toho, co je a není zahrnuto v ceně zájezdu', en: 'Transparent overview of what is and isn\'t included in the trip price' },
        'pricing.includes': { cs: 'Cena zahrnuje', en: 'Price Includes' },
        'pricing.excludes': { cs: 'Cena nezahrnuje', en: 'Price Excludes' },

        // Contact form
        'contact.title': { cs: 'Rezervace zájezdu', en: 'Trip Reservation' },
        'contact.subtitle': { cs: 'Vyplňte formulář a my vám připravíme nezávaznou nabídku na míru', en: 'Fill out the form and we\'ll prepare a non-binding custom offer for you' },
        'contact.form.name': { cs: 'Jméno a příjmení', en: 'Name and Surname' },
        'contact.form.email': { cs: 'Email', en: 'Email' },
        'contact.form.destination': { cs: 'Destinace', en: 'Destination' },
        'contact.form.message': { cs: 'Vaše zpráva', en: 'Your Message' },
        'contact.form.placeholder': { cs: 'Máte nějaké speciální požadavky nebo dotazy k tomuto zájezdu?', en: 'Do you have any special requirements or questions about this trip?' },
        'contact.form.submit': { cs: 'Odeslat poptávku', en: 'Send Inquiry' },

        // Footer
        'footer.description': { cs: 'Profesionální zájezdy do Jihoafrické republiky od roku 2008. Vytváříme nezapomenutelné zážitky na míru.', en: 'Professional trips to South Africa since 2008. We create unforgettable custom experiences.' },
        'footer.quickContact': { cs: 'Rychlý kontakt', en: 'Quick Contact' },
        'footer.quickLinks': { cs: 'Rychlé odkazy', en: 'Quick Links' },
        'footer.homepage': { cs: 'HLAVNÍ STRÁNKA', en: 'HOMEPAGE' },
        'footer.flowerRoute': { cs: 'KVĚTINOVÁ CESTA A SAFARI', en: 'FLOWER ROUTE & SAFARI' },
        'footer.capeTownArea': { cs: 'KAPSKÉ MĚSTO A OKOLÍ', en: 'CAPE TOWN & SURROUNDINGS' },
        'footer.accommodation': { cs: 'UBYTOVÁNÍ', en: 'ACCOMMODATION' },
        'footer.contact': { cs: 'KONTAKT', en: 'CONTACT' },
        'footer.rights': { cs: '© 2024 AddoTours. Všechna práva vyhrazena.', en: '© 2024 AddoTours. All rights reserved.' },

        // Types and labels
        'type.safari': { cs: 'SAFARI', en: 'SAFARI' },
        'type.ocean': { cs: 'OCEÁN', en: 'OCEAN' },
        'type.adventure': { cs: 'ADVENTURE', en: 'ADVENTURE' }
    };

    // Translation helper function
    const t = (key: string): string => {
        return translations[key]?.[language as 'cs' | 'en'] || key;
    };

    // Toggle language and persist to localStorage
    const toggleLanguage = () => {
        const newLanguage = language === 'cs' ? 'en' : 'cs';
        setLanguage(newLanguage);
    };

    // Program data with translations
    const getProgramData = (): DayProgram[] => {
        if (language === 'en') {
            return [
                {
                    day: 1,
                    title: 'Departure from Prague',
                    description: 'Departure from Prague (PRG) to Port Elizabeth (PLZ)',
                    highlights: ['Departure from Václav Havel Airport', 'Flight to Port Elizabeth', 'Direct connection to South Africa'],
                    type: 'travel'
                },
                {
                    day: 2,
                    title: 'Arrival and Fijnbosch Farm',
                    description: 'Arrival in Port Elizabeth, transfer to our Fijnbosch farm near the Indian Ocean, afternoon safari on the farm, African dinner.',
                    highlights: ['Arrival in Port Elizabeth', 'Transfer to Fijnbosch farm', 'First safari on the farm', 'African dinner', 'Accommodation by the Indian Ocean'],
                    type: 'safari'
                },
                {
                    day: 3,
                    title: 'Jeffreys Bay Activities',
                    description: 'Activities around Jeffreys Bay (walks through Jeffreys Bay, Paradise Beach, Marina Martinique - stay by the Indian Ocean).',
                    highlights: ['Walks through Jeffreys Bay', 'Paradise Beach', 'Marina Martinique', 'Stay by the Indian Ocean', 'Local culture and atmosphere'],
                    type: 'ocean'
                },
                {
                    day: 4,
                    title: 'Free Activities Jeffreys Bay',
                    description: 'Full-day activities around Jeffreys Bay according to individual agreement with the delegate. Possibility of ocean safari, horse riding, fishing, shopping, beach time, etc.',
                    highlights: ['Ocean safari (optional)', 'Horse riding', 'Fishing', 'Shopping', 'Beach time', 'Individual program'],
                    type: 'adventure'
                },
                {
                    day: 5,
                    title: 'Tsitsikamma National Park',
                    description: 'Full-day trip to Tsitsikamma National Park with visit to elephant rescue station, Monkey Land monkey park, Tsitsikamma bungee jumping, dinner in Jeffreys Bay.',
                    highlights: ['Elephant rescue station', 'Monkey Land park', 'Tsitsikamma bungee jumping', 'Tsitsikamma National Park', 'Dinner in Jeffreys Bay'],
                    type: 'adventure'
                },
                {
                    day: 6,
                    title: 'Sibuya Game Reserve',
                    description: 'Early breakfast, departure for full-day safari to SIBUYA GAME RESERVE.',
                    highlights: ['Early breakfast', 'Full-day safari', 'Sibuya Game Reserve', 'Big Five observation', 'Professional guide'],
                    type: 'safari'
                },
                {
                    day: 7,
                    title: 'Addo Elephant Park and Schotia',
                    description: 'Early breakfast, tour of ADDO ELEPHANT NATIONAL PARK and afternoon safari in private Schotia reserve with stylish dinner.',
                    highlights: ['Addo Elephant National Park', 'Elephant observation in the wild', 'Safari in Schotia reserve', 'Stylish dinner', 'Private reserve'],
                    type: 'safari'
                },
                {
                    day: 8,
                    title: 'Mayabana Farm',
                    description: 'Breakfast, transfer to Mayabana farm, lunch on Mayabana farm, farm tour, dinner in true African nature',
                    highlights: ['Transfer to Mayabana farm', 'Lunch on the farm', 'Farm tour', 'Dinner in African nature', 'Authentic African experience'],
                    type: 'safari'
                },
                {
                    day: 9,
                    title: 'Departure from South Africa',
                    description: 'Breakfast on Fijnbosch farm, departure to airport, flight Port Elizabeth (PLZ) to Prague (PRG)',
                    highlights: ['Breakfast on Fijnbosch farm', 'Departure to airport', 'Flight from Port Elizabeth', 'Return to Prague'],
                    type: 'departure'
                },
                {
                    day: 10,
                    title: 'Arrival in Czech Republic',
                    description: 'Arrival in Czech Republic.',
                    highlights: ['Arrival in Prague', 'End of trip', 'Return home with unforgettable experiences'],
                    type: 'travel'
                }
            ];
        }

        // Czech version (default)
        return [
            {
                day: 1,
                title: 'Odlet z Prahy',
                description: 'Odlet z Prahy (PRG) do Port Elizabeth (PLZ)',
                highlights: ['Odlet z letiště Václava Havla', 'Let do Port Elizabeth', 'Přímé spojení do JAR'],
                type: 'travel'
            },
            {
                day: 2,
                title: 'Přílet a farma Fijnbosch',
                description: 'Přílet do Port Elizabeth, přejezd na naší farmu Fijnbosch v blízkosti Indického oceánu, odpolední safari na farmě, africká večeře.',
                highlights: ['Přílet do Port Elizabeth', 'Přejezd na farmu Fijnbosch', 'První safari na farmě', 'Africká večeře', 'Ubytování u Indického oceánu'],
                type: 'safari'
            },
            {
                day: 3,
                title: 'Jeffreys Bay aktivity',
                description: 'Aktivity v okolí města Jeffreys Bay (procházky po městě Jeffreys Bay, Paradise Beach, Marina Martinique - pobyt u Indického oceánu).',
                highlights: ['Procházky po Jeffreys Bay', 'Paradise Beach', 'Marina Martinique', 'Pobyt u Indického oceánu', 'Místní kultura a atmosféra'],
                type: 'ocean'
            },
            {
                day: 4,
                title: 'Volné aktivity Jeffreys Bay',
                description: 'Celodenní aktivity v okolí města Jeffreys Bay dle individuální dohody s delegátem. Možnost ocean safari, jízdy na koních, rybaření, nakupování, pobyt na pláži apod.',
                highlights: ['Ocean safari (možnost)', 'Jízdy na koních', 'Rybaření', 'Nakupování', 'Pobyt na pláži', 'Individuální program'],
                type: 'adventure'
            },
            {
                day: 5,
                title: 'Tsitsikama národní park',
                description: 'Celodenní výlet do Tsitsikama národního parku s návštěvou záchranné stanice slonů, opičího parku Monkey land, Tsitsikama bungee jumping, večeře v městě Jeffreys Bay.',
                highlights: ['Záchranná stanice slonů', 'Opičí park Monkey Land', 'Tsitsikama bungee jumping', 'Národní park Tsitsikama', 'Večeře v Jeffreys Bay'],
                type: 'adventure'
            },
            {
                day: 6,
                title: 'Sibuya Game Reserve',
                description: 'Brzká snídaně, odjezd na celodenní safari do rezervace SIBUYA GAME RESERVE.',
                highlights: ['Brzká snídaně', 'Celodenní safari', 'Rezervace Sibuya Game Reserve', 'Pozorování Big Five', 'Profesionální průvodce'],
                type: 'safari'
            },
            {
                day: 7,
                title: 'Addo Elephant Park a Schotia',
                description: 'Brzká snídaně, prohlídka sloního parku ADDO ELEPHANT NATIONAL PARK a odpolední safari v soukromé rezervaci Schotia se stylovou večeří.',
                highlights: ['Addo Elephant National Park', 'Pozorování slonů ve volné přírodě', 'Safari v rezervaci Schotia', 'Stylová večeře', 'Soukromá rezervace'],
                type: 'safari'
            },
            {
                day: 8,
                title: 'Farma Mayabana',
                description: 'Snídaně, přejezd na farmu Mayabana, oběd na farmě Mayabana, projížďka po farmě, večeře v pravé africké přírodě',
                highlights: ['Přejezd na farmu Mayabana', 'Oběd na farmě', 'Projížďka po farmě', 'Večeře v africké přírodě', 'Autentický africký zážitek'],
                type: 'safari'
            },
            {
                day: 9,
                title: 'Odlet z JAR',
                description: 'Snídaně na farmě Fijnbosch, odjezd na letiště, odlet Port Elizabeth (PLZ) do Prahy (PRG)',
                highlights: ['Snídaně na farmě Fijnbosch', 'Odjezd na letiště', 'Odlet z Port Elizabeth', 'Návrat do Prahy'],
                type: 'departure'
            },
            {
                day: 10,
                title: 'Přílet do ČR',
                description: 'Přílet do ČR.',
                highlights: ['Přílet do Prahy', 'Ukončení zájezdu', 'Návrat domů s nezapomenutelnými zážitky'],
                type: 'travel'
            }
        ];
    };

    const getIncludedItems = () => {
        if (language === 'en') {
            return [
                'Accommodation throughout the stay',
                'All transfers and transportation',
                'VIP guide 24/7',
                'Half board on the farm',
                'Safari on Fijnbosch farm',
                'Safari on Mayabana farm'
            ];
        }
        return [
            'Ubytování po celou dobu pobytu',
            'Veškeré transfery a doprava',
            'VIP průvodce 24/7',
            'Polopenzi na farmě',
            'Safari na farmě Fijnbosch',
            'Safari na farmě Mayabana'
        ];
    };

    const getExcludedItems = () => {
        if (language === 'en') {
            return [
                'Flights Prague - Port Elizabeth',
                'Health insurance',
                'Park and attraction entrance fees',
                'Meals outside the farm',
                'Alcoholic beverages',
                'Personal expenses and souvenirs'
            ];
        }
        return [
            'Letenky Praha - Port Elizabeth',
            'Zdravotní pojištění',
            'Vstupné do parků a atrakcí',
            'Stravování mimo farmu',
            'Alkoholické nápoje',
            'Osobní výdaje a suvenýry'
        ];
    };

    // Navigation items with translations
    const navItems = [
        { id: 'kvetinovacesta', label: t('nav.flowerPath'), href: '/kvetinova-cesta' },
        { id: 'moreasafari', label: t('nav.oceanSafari'), href: '/more-a-safari' },
        { id: 'kapskemestoaokoli', label: t('nav.capeTown'), href: '/kapske-mesto-a-okoli' },
        { id: 'ubytovani', label: t('nav.accommodation'), href: '/ubytovani' },
        { id: 'kontakt', label: t('nav.contact'), href: '/kontakt' }
    ];

    // Scroll effect for navigation
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Program interaction functions
    const toggleProgram = () => {
        if (!showProgram) {
            setShowProgram(true);
            setExpandedDays(new Set(getProgramData().map(day => day.day)));
        } else {
            setShowProgram(false);
            setExpandedDays(new Set());
        }
    };

    const toggleDay = (dayNumber: number) => {
        setExpandedDays(prev => {
            const newSet = new Set(prev);
            if (newSet.has(dayNumber)) {
                newSet.delete(dayNumber);
            } else {
                newSet.add(dayNumber);
            }
            return newSet;
        });
    };

    const expandAllDays = () => {
        setExpandedDays(new Set(getProgramData().map(day => day.day)));
    };

    const collapseAllDays = () => {
        setExpandedDays(new Set());
    };

    const handleNavigation = (href: string) => {
        window.location.href = href;
        setIsMenuOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const target = e.target as HTMLInputElement;
            const checked = target.checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        // Validate discount code
        if (name === 'discountCode') {
            const validDiscountCodes = ['LETO2025', 'PODZIM2025', 'SLEVA10'];
            setDiscountCodeError(value !== '' && !validDiscountCodes.includes(value.toUpperCase()));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        // Let the form submit naturally, but check discount code first
        if (formData.discountCode && discountCodeError) {
            e.preventDefault();
            alert(language === 'cs' ? 'Prosím zadejte platný slevový kód' : 'Please enter a valid discount code');
        }
    };

    // Gallery functions
    const tripGallery = [
        '/kvetinova-photo/animals.jpg',
        '/kvetinova-photo/capegira.jpg',
        '/kvetinova-photo/capeview.jpg',
        '/kvetinova-photo/addoslon.jpeg',
        '/kvetinova-photo/girkvet.webp',
        '/kvetinova-photo/whaleskvet.jpg',
        '/kvetinova-photo/boat.jpg'
    ];

    const openGallery = (images: string[], startIndex: number = 0) => {
        setCurrentGalleryImages(images);
        setCurrentImageIndex(startIndex);
        setShowGallery(true);
        document.body.style.overflow = 'hidden';
    };

    const closeGallery = () => {
        setShowGallery(false);
        document.body.style.overflow = 'unset';
    };

    const nextImage = () => {
        setCurrentImageIndex((prev: number) =>
            prev === currentGalleryImages.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev: number) =>
            prev === 0 ? currentGalleryImages.length - 1 : prev - 1
        );
    };

    const goToImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    // Handle keyboard navigation
    React.useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!showGallery) return;

            if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'Escape') {
                closeGallery();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [showGallery]);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'travel': return <Plane className="w-6 h-6" />;
            case 'safari': return <Camera className="w-6 h-6" />;
            case 'adventure': return <MapIcon className="w-6 h-6" />;
            case 'sightseeing': return <MapPin className="w-6 h-6" />;
            case 'ocean': return <Waves className="w-6 h-6" />;
            case 'departure': return <Plane className="w-6 h-6" />;
            default: return <Calendar className="w-6 h-6" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'travel': return 'bg-blue-500';
            case 'safari': return 'bg-green-500';
            case 'adventure': return 'bg-orange-500';
            case 'sightseeing': return 'bg-purple-500';
            case 'ocean': return 'bg-cyan-500';
            case 'departure': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    // Gallery Modal Component
    const GalleryModal: React.FC = () => {
        if (!showGallery) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-95 z-[100] flex items-center justify-center">
                <button
                    onClick={closeGallery}
                    className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2 transition-colors"
                >
                    <X size={24} />
                </button>

                <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-3 transition-colors"
                >
                    <ChevronLeft size={32} />
                </button>

                <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-3 transition-colors"
                >
                    <ChevronRight size={32} />
                </button>

                <div className="max-w-7xl max-h-full mx-4">
                    <img
                        src={currentGalleryImages[currentImageIndex]}
                        alt={`Gallery image ${currentImageIndex + 1}`}
                        className="max-w-full max-h-[80vh] object-contain"
                    />
                </div>

                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full">
                    {currentImageIndex + 1} / {currentGalleryImages.length}
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto px-4">
                    {currentGalleryImages.map((img: string, index: number) => (
                        <button
                            key={index}
                            onClick={() => goToImage(index)}
                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                                index === currentImageIndex
                                    ? 'border-cyan-400'
                                    : 'border-transparent hover:border-white'
                            }`}
                        >
                            <img
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-stone-50 font-sans">
            {/* Navigation */}
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                    isScrolled ? 'bg-stone-50/95 backdrop-blur-md shadow-lg' : ''
                }`}
                style={!isScrolled ? { backgroundColor: '#c4b7a5' } : {}}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <button
                                onClick={() => window.location.href = '/'}
                                className="w-16 h-16 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                            >
                                <img src="addotourslogo.png" alt="AddoTours logo" className="w-full h-full object-cover" />
                            </button>
                        </div>

                        <div className="hidden md:flex space-x-8">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigation(item.href)}
                                    className={`font-semibold transition-colors tracking-wide ${
                                        item.id === 'moreasafari'
                                            ? (isScrolled ? 'text-emerald-600' : 'text-amber-200')
                                            : (isScrolled ? 'text-stone-700 hover:text-green-700' : 'text-black hover:text-amber-200')
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <button
                                    onClick={toggleLanguage}
                                    className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                                        isScrolled
                                            ? 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                                            : 'bg-stone-500 text-white hover:bg-white/30'
                                    }`}
                                >
                                    <Globe size={16} />
                                    <span className="text-sm font-medium">{language.toUpperCase()}</span>
                                </button>
                            </div>

                            <button
                                className={`md:hidden transition-colors ${isScrolled ? 'text-stone-700' : 'text-black'}`}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {isMenuOpen && (
                    <div
                        className={`md:hidden border-t ${
                            isScrolled ? 'bg-stone-50/95 backdrop-blur-md' : ''
                        }`}
                        style={!isScrolled ? { backgroundColor: '#c4b7a5', color: 'black' } : {}}
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigation(item.href)}
                                    className={`block px-3 py-2 w-full text-left transition-colors ${
                                        item.id === 'moreasafari'
                                            ? (isScrolled ? 'text-emerald-600' : 'text-amber-200')
                                            : (isScrolled ? 'text-stone-700 hover:text-green-700' : 'text-black hover:text-amber-200')
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="hero" className="pt-16 relative overflow-hidden h-[70vh] flex items-center">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="africabgvid.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/30"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 lg:mb-6 leading-tight">
                            {t('hero.title')}
                        </h1>
                        <p className="text-lg sm:text-xl lg:text-2xl text-cyan-100 mb-3 lg:mb-4">
                            {t('hero.subtitle')}
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg text-cyan-200 max-w-3xl mx-auto mb-8 lg:mb-12 leading-relaxed px-2">
                            {t('hero.description')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
                            <button
                                onClick={() => {
                                    const element = document.getElementById('contact-form');
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="w-full sm:w-auto bg-cyan-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
                            >
                                {t('hero.reserveTrip')}
                            </button>
                            <button
                                onClick={() => openGallery(tripGallery, 0)}
                                className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white hover:text-cyan-800 transition-all duration-300 text-sm sm:text-base"
                            >
                                {t('hero.viewPhotos')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Program Section */}
            <section
                id="program"
                className="py-20 relative"
                style={{
                    backgroundImage: "url('background-main2.png')",
                    backgroundSize: 'auto',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat'
                }}
            >
                <div className="absolute inset-0 bg-white/85"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-stone-800 mb-6">
                            {t('program.title')}
                        </h2>
                        <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-8">
                            {t('program.subtitle')}
                        </p>

                        {/* Marketing highlights */}
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <div className="bg-green-100 text-green-800 px-6 py-3 rounded-full text-sm font-semibold flex items-center space-x-2">
                                <Camera size={18} />
                                <span>{t('program.safariExpeditions')}</span>
                            </div>
                            <div className="bg-cyan-100 text-cyan-800 px-6 py-3 rounded-full text-sm font-semibold flex items-center space-x-2">
                                <Waves size={18} />
                                <span>{t('program.indianOcean')}</span>
                            </div>
                            <div className="bg-purple-100 text-purple-800 px-6 py-3 rounded-full text-sm font-semibold flex items-center space-x-2">
                                <Clock size={18} />
                                <span>{t('program.intensiveDays')}</span>
                            </div>
                            <div className="bg-orange-100 text-orange-800 px-6 py-3 rounded-full text-sm font-semibold flex items-center space-x-2">
                                <MapIcon size={18} />
                                <span>{t('program.portElizabethRegion')}</span>
                            </div>
                        </div>

                        {/* Program overview text */}
                        <div className="max-w-4xl mx-auto text-center mb-10">
                            <div className="bg-gradient-to-br from-stone-50 to-cyan-50 rounded-2xl p-8 shadow-lg border border-stone-200">
                                <p className="text-lg text-stone-700 leading-relaxed mb-4">
                                    {t('program.overview')}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div className="bg-white/60 rounded-lg p-4">
                                        <div className="font-semibold text-cyan-700 mb-2">{t('program.oceanExperiences')}</div>
                                        <div className="text-stone-600">{t('program.oceanDescription')}</div>
                                    </div>
                                    <div className="bg-white/60 rounded-lg p-4">
                                        <div className="font-semibold text-green-700 mb-2">{t('program.safariNature')}</div>
                                        <div className="text-stone-600">{t('program.safariDescription')}</div>
                                    </div>
                                    <div className="bg-white/60 rounded-lg p-4">
                                        <div className="font-semibold text-orange-700 mb-2">{t('program.adventure')}</div>
                                        <div className="text-stone-600">{t('program.adventureDescription')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main program toggle button */}
                        <div className="text-center mb-8">
                            <button
                                onClick={toggleProgram}
                                className={`bg-gradient-to-r from-cyan-600 to-green-600 text-white px-10 py-5 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-lg flex items-center space-x-3 mx-auto ${
                                    showProgram ? 'from-stone-600 to-stone-700' : ''
                                }`}
                            >
                                <Calendar size={24} />
                                <span>{showProgram ? t('program.hideDetailed') : t('program.showDetailed')}</span>
                                <div className={`transition-transform duration-300 ${showProgram ? 'rotate-180' : ''}`}>
                                    <ChevronLeft className="rotate-90" size={20} />
                                </div>
                            </button>
                            <p className="text-stone-500 mt-3 text-sm">
                                {t('program.clickToShow')}
                            </p>
                        </div>
                    </div>

                    {/* Program content - collapsible */}
                    <div className={`transition-all duration-700 overflow-hidden ${
                        showProgram ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                        {/* View controls - only show when program is visible */}
                        {showProgram && (
                            <div className="flex justify-center space-x-4 mb-8">
                                <button
                                    onClick={expandAllDays}
                                    className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors text-sm font-medium"
                                >
                                    {t('program.expandAll')}
                                </button>
                                <button
                                    onClick={collapseAllDays}
                                    className="bg-stone-600 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors text-sm font-medium"
                                >
                                    {t('program.collapseAll')}
                                </button>
                            </div>
                        )}

                        {/* Timeline */}
                        <div className="max-w-5xl mx-auto">
                            {getProgramData().map((day, index) => (
                                <div key={day.day} className="relative flex items-start mb-8 last:mb-0">
                                    {/* Timeline line */}
                                    {index < getProgramData().length - 1 && (
                                        <div className="absolute left-6 top-28 w-0.5 h-16 bg-stone-300"></div>
                                    )}

                                    {/* Day number and icon */}
                                    <div className="flex-shrink-0 mr-6">
                                        <div className={`w-12 h-12 ${getTypeColor(day.type)} rounded-full flex items-center justify-center text-white mb-2 shadow-lg transition-all duration-300 ${
                                            expandedDays.has(day.day) ? 'scale-110 shadow-xl' : ''
                                        }`}>
                                            {getTypeIcon(day.type)}
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xl font-bold text-stone-800">{day.day}</div>
                                            <div className="text-xs text-stone-500">{t('program.day')}</div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className={`flex-grow bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200 transition-all duration-500 hover:shadow-xl cursor-pointer ${
                                        expandedDays.has(day.day) ? 'bg-gradient-to-br from-white to-cyan-50/50 border-cyan-200' : ''
                                    }`}
                                         onClick={() => toggleDay(day.day)}
                                    >
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-xl font-bold text-stone-800 flex items-center space-x-3">
                                                    <span>{day.title}</span>
                                                    {day.type === 'safari' && (
                                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                                                            {t('type.safari')}
                                                        </span>
                                                    )}
                                                    {day.type === 'ocean' && (
                                                        <span className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full font-semibold">
                                                            {t('type.ocean')}
                                                        </span>
                                                    )}
                                                    {day.type === 'adventure' && (
                                                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-semibold">
                                                            {t('type.adventure')}
                                                        </span>
                                                    )}
                                                </h3>
                                                <div className={`transition-transform duration-300 ${
                                                    expandedDays.has(day.day) ? 'rotate-180' : ''
                                                }`}>
                                                    <ChevronLeft className="rotate-90" size={20} />
                                                </div>
                                            </div>

                                            {/* Always visible preview */}
                                            <div className="flex items-center space-x-4 mb-4">
                                                <div className="text-sm text-stone-500">
                                                    {day.highlights.length} {t('program.activities')}
                                                </div>
                                                <div className="flex space-x-1">
                                                    {day.highlights.slice(0, 2).map((_, idx) => (
                                                        <div key={idx} className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                                    ))}
                                                    {day.highlights.length > 2 && (
                                                        <div className="text-cyan-600 text-xs">+{day.highlights.length - 2}</div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Expandable content */}
                                            <div className={`overflow-hidden transition-all duration-500 ${
                                                expandedDays.has(day.day) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}>
                                                <p className="text-stone-600 mb-4 leading-relaxed text-sm">{day.description}</p>

                                                {/* Highlights */}
                                                <div className="grid md:grid-cols-2 gap-2">
                                                    {day.highlights.map((highlight, highlightIndex) => (
                                                        <div key={highlightIndex} className={`flex items-center space-x-2 transition-all duration-300 delay-${highlightIndex * 50}`}
                                                             style={{ transitionDelay: `${highlightIndex * 50}ms` }}>
                                                            <Check size={14} className="text-cyan-600 flex-shrink-0" />
                                                            <span className="text-xs text-stone-700">{highlight}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Day-specific call-to-action */}
                                                {(day.type === 'safari' || day.type === 'ocean' || day.day === 2) && (
                                                    <div className="mt-4 p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                                                        <div className="text-xs text-cyan-800 font-medium">
                                                            {day.type === 'safari' ?
                                                                (language === 'en' ? 'Trip highlight! Safari with professional guide' : 'Vrchol zájezdu! Safari s profesionálním průvodcem') :
                                                                day.type === 'ocean' ?
                                                                    (language === 'en' ? 'Ocean experience by the Indian Ocean' : 'Oceánský zážitek u Indického oceánu') :
                                                                    (language === 'en' ? 'Start of adventure on African farm' : 'Začátek dobrodružství na africké farmě')}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Important Note */}
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mt-8">
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white text-sm font-bold">!</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-amber-800 mb-2">{t('program.note')}</h4>
                                    <p className="text-amber-700 text-sm leading-relaxed">
                                        {t('program.noteText')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA at the end of program */}
                        <div className="text-center mt-12">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-200 max-w-2xl mx-auto">
                                <h3 className="text-2xl font-bold text-stone-800 mb-4">{t('program.readyQuestion')}</h3>
                                <p className="text-stone-600 mb-6">
                                    {t('program.readyDescription')}
                                </p>
                                <button
                                    onClick={() => {
                                        const element = document.getElementById('contact-form');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                    className="bg-gradient-to-r from-cyan-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    {t('program.reserveThis')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Statistics summary */}
                    <div className="bg-gradient-to-r from-cyan-600 to-green-600 rounded-2xl p-8 mt-16 text-white">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold mb-2">{t('stats.title')}</h3>
                            <p className="text-cyan-100">{t('stats.subtitle')}</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">3</div>
                                <div className="text-sm text-cyan-100">{t('stats.safariExpeditions')}</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">2</div>
                                <div className="text-sm text-cyan-100">{t('stats.nationalParks')}</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">4</div>
                                <div className="text-sm text-cyan-100">{t('stats.oceanDays')}</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">100%</div>
                                <div className="text-sm text-cyan-100">{t('stats.intensiveExperience')}</div>
                            </div>
                        </div>
                    </div>

                    {/* Photo gallery */}
                    <div className="mb-12 mt-16">
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-stone-800 mb-4">{t('gallery.title')}</h3>
                            <p className="text-stone-600 max-w-2xl mx-auto">
                                {t('gallery.description')}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {tripGallery.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                    onClick={() => openGallery(tripGallery, index)}
                                >
                                    <img
                                        src={image}
                                        alt={`Gallery image ${index + 1}`}
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
                                            <Camera className="text-white" size={24} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <button
                                onClick={() => openGallery(tripGallery, 0)}
                                className="bg-cyan-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-cyan-700 transition-colors shadow-lg flex items-center space-x-2 mx-auto"
                            >
                                <Camera size={20} />
                                <span>{t('gallery.viewAll')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section
                className="py-20 relative"
                style={{
                    backgroundImage: "url('background-main2.png')",
                    backgroundSize: 'auto',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat'
                }}
            >
                <div className="absolute inset-0 bg-white/85"></div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-stone-800 mb-6">{t('pricing.title')}</h2>
                        <p className="text-xl text-stone-600">{t('pricing.subtitle')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Includes */}
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                                    <Check className="text-white" size={20} />
                                </div>
                                <h3 className="text-2xl font-bold text-green-800">{t('pricing.includes')}</h3>
                            </div>

                            <div className="space-y-3">
                                {getIncludedItems().map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <Check size={16} className="text-green-600 flex-shrink-0" />
                                        <span className="text-green-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Excludes */}
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                                    <X className="text-white" size={20} />
                                </div>
                                <h3 className="text-2xl font-bold text-red-800">{t('pricing.excludes')}</h3>
                            </div>

                            <div className="space-y-3">
                                {getExcludedItems().map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <X size={16} className="text-red-600 flex-shrink-0" />
                                        <span className="text-red-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Price Section */}
                    <div className="max-w-md mx-auto mt-12">
                        {/* Price Card */}
                        <div className="relative bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
                            {/* Best Value Badge */}
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg">
                                    <div className="w-4 h-4 bg-cyan-300 rounded-full"></div>
                                    <span>{language === 'cs' ? 'Nejlepší hodnota' : 'Best value'}</span>
                                </div>
                            </div>

                            {/* Price Section */}
                            <div className="text-center mb-6 mt-4">
                                <div className="text-lg font-semibold text-cyan-800 mb-2">
                                    {language === 'cs' ? 'Cena zájezdu' : 'Trip price'}
                                </div>
                                <div className="flex items-baseline justify-center space-x-2">
                                    <span className="text-5xl font-bold text-stone-800">29 000</span>
                                    <span className="text-xl text-stone-600">Kč</span>
                                </div>
                                <div className="flex items-center justify-center space-x-2 mt-2">
                                    <span className="text-sm text-cyan-700 font-medium">
                                        {language === 'cs' ? 'za osobu' : 'per person'}
                                    </span>
                                </div>
                            </div>

                            {/* Included Note */}
                            <div className="text-center mb-6">
                                <div className="bg-white/60 rounded-lg px-4 py-3 border border-cyan-200">
                                    <p className="text-sm text-cyan-800 font-medium">
                                        {language === 'cs' ? 'Zahrnuje vše uvedené výše' : 'Includes everything listed above'}
                                    </p>
                                </div>
                            </div>

                            {/* Book Button */}
                            <button
                                onClick={() => {
                                    const element = document.getElementById('contact-form');
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-3"
                            >
                                <span>{language === 'cs' ? 'Rezervovat nyní' : 'Book now'}</span>
                            </button>

                            {/* Subtle decoration */}
                            <div className="absolute bottom-2 right-2 opacity-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full"></div>
                            </div>
                            <div className="absolute top-2 left-2 opacity-5">
                                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full"></div>
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="text-center mt-4">
                            <p className="text-xs text-stone-500">
                                {language === 'cs'
                                    ? 'Nezávazná rezervace'
                                    : 'Non-binding reservation'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section
                id="contact-form"
                className="py-20 relative"
                style={{
                    backgroundImage: "url('background-main2.png')",
                    backgroundSize: 'auto',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat'
                }}
            >
                <div className="absolute inset-0 bg-white/80"></div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-stone-800 mb-4">{t('contact.title')}</h2>
                        <p className="text-xl text-stone-600">
                            {t('contact.subtitle')}
                        </p>
                    </div>

                    {/* Updated form without calendar with discount code */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-200 relative">
                        <form
                            action="https://formsubmit.co/expertflo51@gmail.com"
                            method="POST"
                            className="space-y-6"
                            onSubmit={handleSubmit}
                        >
                            {/* FormSubmit hidden fields for configuration */}
                            <input type="hidden" name="_subject" value="Nová poptávka z webu AddoTours" />
                            <input type="hidden" name="_next" value="https://adotours.vercel.app/dekujeme" />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_template" value="table" />

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                                    {t('contact.form.name')} *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-stone-700"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                                    {t('contact.form.email')} *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder={language === 'cs' ? 'Zadejte váš email' : 'Enter your email'}
                                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-stone-700"
                                />
                            </div>

                            <div>
                                <label htmlFor="destination" className="block text-sm font-medium text-stone-700 mb-2">
                                    {t('contact.form.destination')}
                                </label>
                                <input
                                    type="text"
                                    id="destination"
                                    name="destination"
                                    value={language === 'cs' ? 'MOŘE A SAFARI' : 'OCEAN & SAFARI'}
                                    readOnly
                                    className="w-full px-4 py-3 border border-stone-300 rounded-lg bg-gray-50 text-stone-700 cursor-not-allowed"
                                />
                                <input type="hidden" name="destination" value="more-a-safari" />
                            </div>

                            {/* Number of people */}
                            <div>
                                <label htmlFor="numberOfPeople" className="block text-sm font-medium text-stone-700 mb-2">
                                    {language === 'cs' ? 'Počet osob *' : 'Number of people *'}
                                </label>
                                <input
                                    type="number"
                                    id="numberOfPeople"
                                    name="numberOfPeople"
                                    value={formData.numberOfPeople}
                                    onChange={handleInputChange}
                                    min="1"
                                    max="50"
                                    required
                                    placeholder={language === 'cs' ? 'Zadejte počet osob' : 'Enter number of people'}
                                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-stone-700"
                                />
                            </div>

                            {/* Trip term - dropdown instead of calendar */}
                            <div>
                                <label htmlFor="tripTerm" className="block text-sm font-medium text-stone-700 mb-2">
                                    {language === 'cs' ? 'Termín zájezdu' : 'Trip term'}
                                </label>
                                <select
                                    id="tripTerm"
                                    name="tripTerm"
                                    value={formData.tripTerm}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-stone-700"
                                >
                                    <option value="">{language === 'cs' ? 'Vyberte termín' : 'Select term'}</option>
                                    <option value="jaro-2025">{language === 'cs' ? 'Jaro 2025 (březen - květen)' : 'Spring 2025 (March - May)'}</option>
                                    <option value="leto-2025">{language === 'cs' ? 'Léto 2025 (červen - srpen)' : 'Summer 2025 (June - August)'}</option>
                                    <option value="podzim-2025">{language === 'cs' ? 'Podzim 2025 (září - listopad)' : 'Autumn 2025 (September - November)'}</option>
                                </select>
                            </div>

                            {/* Discount code */}
                            <div>
                                <label htmlFor="discountCode" className="block text-sm font-medium text-stone-700 mb-2">
                                    {language === 'cs' ? 'Slevový kód (nepovinné)' : 'Discount code (optional)'}
                                </label>
                                <input
                                    type="text"
                                    id="discountCode"
                                    name="discountCode"
                                    value={formData.discountCode}
                                    onChange={handleInputChange}
                                    placeholder={language === 'cs' ? 'Zadejte slevový kód' : 'Enter discount code'}
                                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-stone-700"
                                />
                                {discountCodeError && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {language === 'cs' ? 'Slevový kód neexistuje' : 'Discount code does not exist'}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                                    {t('contact.form.message')}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-stone-700"
                                    placeholder={t('contact.form.placeholder')}
                                />
                            </div>

                            {/* GDPR consent */}
                            <div className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    id="gdprConsent"
                                    name="gdprConsent"
                                    checked={formData.gdprConsent}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 h-4 w-4 text-green-700 focus:ring-green-700 border-stone-300 rounded"
                                />
                                <label htmlFor="gdprConsent" className="text-sm text-stone-700">
                                    {language === 'cs'
                                        ? 'Souhlasím se zpracováním osobních údajů *'
                                        : 'I agree to the processing of personal data *'
                                    }
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={!formData.gdprConsent || discountCodeError}
                                className={`w-full px-8 py-3 rounded-lg font-semibold transition-colors ${
                                    formData.gdprConsent && !discountCodeError
                                        ? 'bg-green-700 text-white hover:bg-green-800'
                                        : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                                }`}
                            >
                                {t('contact.form.submit')}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white text-stone-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div>
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 rounded-xl overflow-hidden p-2" style={{ backgroundColor: '#c4b7a5' }}>
                                    <img src="addotourslogo.png" alt="AddoTours" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-2xl font-bold text-stone-800">AddoTours</span>
                            </div>
                            <p className="text-stone-600 mb-6 leading-relaxed">
                                {t('footer.description')}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-6 text-stone-800">{t('footer.quickContact')}</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 group">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}>
                                        <Phone size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="text-stone-800">+420 602 256 246</div>
                                        <div className="text-stone-600 text-sm">Ing. Petr Havel</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 group">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}>
                                        <Mail size={18} className="text-white" />
                                    </div>
                                    <span className="text-stone-800">addotours@email.cz</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-6 text-stone-800">{t('footer.quickLinks')}</h3>
                            <ul className="space-y-3">
                                <li>
                                    <button
                                        onClick={() => window.location.href = '/'}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group w-full text-left"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t('footer.homepage')}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => window.location.href = '/kvetinova-cesta'}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group w-full text-left"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t('footer.flowerRoute')}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => window.location.href = '/kapske-mesto-a-okoli'}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group w-full text-left"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t('footer.capeTownArea')}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => window.location.href = '/ubytovani'}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group w-full text-left"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t('footer.accommodation')}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => window.location.href = '/kontakt'}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group w-full text-left"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t('footer.contact')}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-stone-200 mt-12 pt-8 text-center">
                        <p className="text-stone-500">
                            {t('footer.rights')}
                        </p>
                    </div>
                </div>
            </footer>

            {/* Gallery Modal */}
            <GalleryModal />
        </div>
    );
};

export default MoreASafari;
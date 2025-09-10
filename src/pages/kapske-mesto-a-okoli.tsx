import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Camera, Check, Calendar, X, ChevronLeft, ChevronRight, Globe, Menu, MapIcon, Plane, Wine, Binoculars } from 'lucide-react';

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
    type: 'travel' | 'sightseeing' | 'safari' | 'adventure' | 'departure' | 'wine' | 'whale' | 'city';
}

// Translation object
const translations = {
    cs: {
        // Navigation
        nav: {
            flowerRoute: 'KVĚTINOVÁ CESTA A SAFARI',
            seaSafari: 'MOŘE A SAFARI',
            capeTown: 'KAPSKÉ MĚSTO A OKOLÍ',
            accommodation: 'UBYTOVÁNÍ',
            contact: 'KONTAKT'
        },
        // Hero section
        hero: {
            title: 'Kapské město a okolí',
            subtitle: '10denní zájezd do srdce Jihoafrické republiky',
            description: 'Objevte krásy Kapského města, ochutnejte nejlepší vína světa, pozorujte velryby v Hermanus a zažijte nezapomenutelné safari v soukromé rezervaci Aquila',
            reserveBtn: 'Rezervovat zájezd',
            galleryBtn: 'Prohlédnout fotky'
        },
        // Program section
        program: {
            title: 'Program zájezdu',
            subtitle: '10denní poznávací zájezd po nejkrásnějších místech Kapska a okolí',
            highlights: {
                capeTown: 'Kapské město',
                wine: 'Vinařské oblasti',
                whales: 'Pozorování velryb',
                safari: 'Aquila safari'
            },
            overview: 'Kompletní poznávací zájezd Kapským městem a jeho okolím. Ubytování v luxusním prostředí Alphen, návštěva ikonických míst jako je Stolová hora, Mys Dobré naděje, světoznámé vinařské oblasti Stellenbosch a Franschhoek, pozorování velryb v Hermanus a vrcholné safari v Aquila rezervaci.',
            attractions: {
                city: 'Městské atrakce',
                cityDesc: 'Waterfront, Stolová hora, Robben Island',
                wineRegions: 'Vinařské oblasti',
                wineDesc: 'Constantia, Stellenbosch, Franschhoek',
                nature: 'Příroda & Safari',
                natureDesc: 'Mys Dobré naděje, velryby, Aquila safari'
            },
            showDetails: 'Zobrazit detailní program',
            hideDetails: 'Skrýt detailní program',
            clickToShow: 'Klikněte pro zobrazení dne po dni programu s detailními aktivitami',
            expandAll: 'Rozbalit vše',
            collapseAll: 'Sbalit vše',
            day: 'den',
            activities: 'aktivit',
            note: 'Poznámka k programu:',
            noteText: 'Jednotlivé naplánované aktivity mohou být individuálně měněny po dohodě s průvodcem a zároveň mohou být přeloženy z důvodu nepříznivých klimatických podmínek.',
            ready: 'Připraveni objevit Kapsko?',
            readyText: 'Tento kompletní program vám ukáže to nejlepší z Kapského města a okolí za 10 nezapomenutelných dní.',
            reserveTrip: 'Rezervovat tento zájezd'
        },
        // Statistics
        stats: {
            title: 'Váš zájezd v číslech',
            subtitle: 'Co vás čeká během 10 dní poznávání Kapska',
            wineRegions: 'Vinařských oblastí',
            safariExpeditions: 'Safari expedice',
            mainAttractions: 'Hlavních atrakcí',
            luxuryExperience: 'Luxusní zážitek'
        },
        // Gallery
        gallery: {
            title: 'Fotogalerie zájezdu',
            subtitle: 'Podívejte se na fotky z našich předchozích zájezdů Kapským městem a okolím',
            showFull: 'Zobrazit celou galerii'
        },
        // Pricing
        pricing: {
            title: 'Co zahrnuje cena',
            subtitle: 'Transparentní přehled toho, co je a není zahrnuto v ceně zájezdu',
            included: 'Cena zahrnuje',
            notIncluded: 'Cena nezahrnuje',
            includedItems: [
                'Ubytování v luxusním zařízení',
                'Snídaně po celou dobu pobytu',
                'Veškeré transfery luxusním mikrobusem',
                'VIP průvodce 24/7',
                'Služby delegáta',
                'Základní program a aktivity'
            ],
            notIncludedItems: [
                'Letenky Praha - Cape Town',
                'Obědy a večeře',
                'Zdravotní pojištění',
                'Vstupné do atrakcí a parků',
                'Alkoholické nápoje',
                'Osobní výdaje a suvenýry'
            ]
        },
        // Contact form
        contact: {
            title: 'Rezervace zájezdu',
            subtitle: 'Vyplňte formulář a my vám připravíme nezávaznou nabídku na míru',
            name: 'Jméno a příjmení',
            email: 'Email',
            numberOfPeople: 'Počet osob',
            dateFrom: 'Preferovaný termín od',
            dateTo: 'Preferovaný termín do',
            selectDate: 'Vyberte datum',
            message: 'Vaše zpráva',
            messagePlaceholder: 'Máte nějaké speciální požadavky nebo dotazy k tomuto zájezdu?',
            gdprConsent: 'Souhlasím se zpracováním osobních údajů pro účely této rezervace',
            submit: 'Odeslat rezervaci',
            cancel: 'Zrušit'
        },
        // Calendar
        calendar: {
            months: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'],
            days: ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']
        },
        // Footer
        footer: {
            description: 'Profesionální zájezdy do Jihoafrické republiky od roku 2008. Vytváříme nezapomenutelné zážitky na míru.',
            quickContact: 'Rychlý kontakt',
            quickLinks: 'Rychlé odkazy',
            mainPage: 'HLAVNÍ STRÁNKA',
            seaSafari: 'MOŘE A SAFARI',
            flowerRoute: 'KVĚTINOVÁ CESTA A SAFARI',
            accommodation: 'UBYTOVÁNÍ',
            contact: 'KONTAKT',
            rights: '© 2024 AddoTours. Všechna práva vyhrazena.'
        },
        // Program days
        programDays: [
            {
                title: 'Odlet z Prahy',
                description: 'Odlet z Prahy (PRG) do Cape Town (CPT)',
                highlights: ['Odlet z letiště Václava Havla', 'Let do Cape Town', 'Přímé spojení do JAR']
            },
            {
                title: 'Přílet a ubytování',
                description: 'Přílet do CPT a přesun s delegátem do našeho ubytování v rezidenční části Kapského města Alphen. Po ubytování návštěva předměstí a pláže Camps Bay, procházka přístavem v centru města Victoria Wharf Waterfront, návštěva mořského akvária. Večeře.',
                highlights: ['Přílet do Cape Town', 'Ubytování v Alphen', 'Pláž Camps Bay', 'Victoria Wharf Waterfront', 'Mořské akvárium', 'Večeře']
            },
            {
                title: 'Hout Bay a Mys Dobré naděje',
                description: 'Snídaně, celodenní výlet mikrobusem s návštěvou přístavu Hout Bay, Seal Cruise, předměstí Simon\'s Town s velkou kolonií tučňáků, Mysu Dobré naděje, trhu s africkými suvenýry, večeře.',
                highlights: ['Přístav Hout Bay', 'Seal Cruise - plavba za tuleni', 'Simon\'s Town', 'Kolonie tučňáků', 'Mys Dobré naděje', 'Africký trh se suvenýry']
            },
            {
                title: 'Kirstenbosh a Stolová hora',
                description: 'Snídaně, celodenní program, který zahrnuje prohlídku botanické zahrady Kirstenbosh National Botanical Garden, návštěva vinařské oblasti Constantia a prohlídka Stolové hory. Večeře v zážitkové restauraci.',
                highlights: ['Kirstenbosh botanická zahrada', 'Vinařská oblast Constantia', 'Stolová hora - Table Mountain', 'Zážitková restaurace', 'UNESCO památka']
            },
            {
                title: 'Kapské město a volné aktivity',
                description: 'Snídaně, celodenní program, který zahrnuje prohlídku Kapského města, Waterfront a Signální hory. Možnost dalších aktivit jako např. golf, vyhlídkový let vrtulníkem, výlet lodí, plavba katamaránem v okolí Kapského města, prohlídka Robben Island atd. Večeře v restauraci.',
                highlights: ['Prohlídka centra Cape Town', 'Waterfront', 'Signální hora', 'Golf (možnost)', 'Vyhlídkový let vrtulníkem (možnost)', 'Robben Island (možnost)']
            },
            {
                title: 'Hermanus - velryby a víno',
                description: 'Snídaně, výlet mikrobusem do zátoky Hermanus s ochutnávkou vín a pozorováním velryb nebo možnost celodenního pobytu na golfovém hřišti nebo potápění se žraloky, možnost výletu lodí. Večeře v restauraci.',
                highlights: ['Zátoka Hermanus', 'Pozorování velryb', 'Ochutnávka vín', 'Golf (možnost)', 'Potápění se žraloky (možnost)', 'Výlet lodí']
            },
            {
                title: 'Stellenbosch a Franschhoek',
                description: 'Snídaně, přejezd a návštěva vinařské oblasti. Ochutnávky vín a specialit ve vyhlášené celosvětově známé vinařské oblasti Stellenbosch a Franschhoek, večeře v jedné z vinařských oblastí, návrat do Cape Town ve večerních hodinách.',
                highlights: ['Vinařská oblast Stellenbosch', 'Franschhoek - francouzské dědictví', 'Ochutnávky vín', 'Gastronomické speciality', 'Večeře ve vinařství', 'Světoznámé vinařské oblasti']
            },
            {
                title: 'Aquila Safari',
                description: 'Celodenní safari v soukromé rezervaci Aquila Private Game Reserve.',
                highlights: ['Aquila Private Game Reserve', 'Celodenní safari', 'Big Five pozorování', 'Soukromá rezervace', 'Profesionální průvodci']
            },
            {
                title: 'Odlet z Cape Town',
                description: 'Odlet z Cape Town (CPT) do Prahy (PRG).',
                highlights: ['Odlet z Cape Town', 'Let do Prahy', 'Ukončení zájezdu']
            },
            {
                title: 'Přílet do ČR',
                description: 'Návrat do ČR.',
                highlights: ['Přílet do Prahy', 'Ukončení zájezdu', 'Návrat domů s nezapomenutelnými zážitky']
            }
        ]
    },
    en: {
        // Navigation
        nav: {
            flowerRoute: 'FLOWER ROUTE & SAFARI',
            seaSafari: 'SEA & SAFARI',
            capeTown: 'CAPE TOWN & SURROUNDINGS',
            accommodation: 'ACCOMMODATION',
            contact: 'CONTACT'
        },
        // Hero section
        hero: {
            title: 'Cape Town & Surroundings',
            subtitle: '10-day tour to the heart of South Africa',
            description: 'Discover the beauty of Cape Town, taste the world\'s finest wines, watch whales in Hermanus and experience unforgettable safari at the private Aquila Reserve',
            reserveBtn: 'Book Tour',
            galleryBtn: 'View Photos'
        },
        // Program section
        program: {
            title: 'Tour Program',
            subtitle: '10-day discovery tour of the most beautiful places in Cape Town and surroundings',
            highlights: {
                capeTown: 'Cape Town',
                wine: 'Wine Regions',
                whales: 'Whale Watching',
                safari: 'Aquila Safari'
            },
            overview: 'Complete discovery tour of Cape Town and its surroundings. Accommodation in the luxurious Alphen environment, visits to iconic places like Table Mountain, Cape of Good Hope, world-famous wine regions Stellenbosch and Franschhoek, whale watching in Hermanus and ultimate safari at Aquila reserve.',
            attractions: {
                city: 'City Attractions',
                cityDesc: 'Waterfront, Table Mountain, Robben Island',
                wineRegions: 'Wine Regions',
                wineDesc: 'Constantia, Stellenbosch, Franschhoek',
                nature: 'Nature & Safari',
                natureDesc: 'Cape of Good Hope, whales, Aquila safari'
            },
            showDetails: 'Show detailed program',
            hideDetails: 'Hide detailed program',
            clickToShow: 'Click to view day-by-day program with detailed activities',
            expandAll: 'Expand All',
            collapseAll: 'Collapse All',
            day: 'day',
            activities: 'activities',
            note: 'Program Note:',
            noteText: 'Individual planned activities may be changed individually in agreement with the guide and may also be postponed due to unfavorable weather conditions.',
            ready: 'Ready to discover Cape Town?',
            readyText: 'This complete program will show you the best of Cape Town and surroundings in 10 unforgettable days.',
            reserveTrip: 'Book this tour'
        },
        // Statistics
        stats: {
            title: 'Your tour in numbers',
            subtitle: 'What awaits you during 10 days of exploring Cape Town',
            wineRegions: 'Wine regions',
            safariExpeditions: 'Safari expedition',
            mainAttractions: 'Main attractions',
            luxuryExperience: 'Luxury experience'
        },
        // Gallery
        gallery: {
            title: 'Tour Photo Gallery',
            subtitle: 'Take a look at photos from our previous Cape Town and surroundings tours',
            showFull: 'View full gallery'
        },
        // Pricing
        pricing: {
            title: 'What the price includes',
            subtitle: 'Transparent overview of what is and isn\'t included in the tour price',
            included: 'Price includes',
            notIncluded: 'Price does not include',
            includedItems: [
                'Accommodation in luxury facility',
                'Breakfast throughout the stay',
                'All transfers by luxury minibus',
                'VIP guide 24/7',
                'Delegate services',
                'Basic program and activities'
            ],
            notIncludedItems: [
                'Flights Prague - Cape Town',
                'Lunches and dinners',
                'Health insurance',
                'Entrance fees to attractions and parks',
                'Alcoholic beverages',
                'Personal expenses and souvenirs'
            ]
        },
        // Contact form
        contact: {
            title: 'Tour Reservation',
            subtitle: 'Fill out the form and we\'ll prepare a non-binding customized offer',
            name: 'Name and surname',
            email: 'Email',
            numberOfPeople: 'Number of people',
            dateFrom: 'Preferred date from',
            dateTo: 'Preferred date to',
            selectDate: 'Select date',
            message: 'Your message',
            messagePlaceholder: 'Do you have any special requirements or questions about this tour?',
            gdprConsent: 'I agree to the processing of personal data for the purposes of this reservation',
            submit: 'Send reservation',
            cancel: 'Cancel'
        },
        // Calendar
        calendar: {
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        // Footer
        footer: {
            description: 'Professional tours to South Africa since 2008. We create unforgettable customized experiences.',
            quickContact: 'Quick Contact',
            quickLinks: 'Quick Links',
            mainPage: 'HOMEPAGE',
            seaSafari: 'SEA & SAFARI',
            flowerRoute: 'FLOWER ROUTE & SAFARI',
            accommodation: 'ACCOMMODATION',
            contact: 'CONTACT',
            rights: '© 2024 AddoTours. All rights reserved.'
        },
        // Program days
        programDays: [
            {
                title: 'Departure from Prague',
                description: 'Departure from Prague (PRG) to Cape Town (CPT)',
                highlights: ['Departure from Václav Havel Airport', 'Flight to Cape Town', 'Direct connection to South Africa']
            },
            {
                title: 'Arrival and accommodation',
                description: 'Arrival in CPT and transfer with delegate to our accommodation in the residential part of Cape Town Alphen. After accommodation, visit to suburbs and Camps Bay beach, walk through the port in the city center Victoria Wharf Waterfront, visit to the marine aquarium. Dinner.',
                highlights: ['Arrival in Cape Town', 'Accommodation in Alphen', 'Camps Bay Beach', 'Victoria Wharf Waterfront', 'Marine Aquarium', 'Dinner']
            },
            {
                title: 'Hout Bay and Cape of Good Hope',
                description: 'Breakfast, full-day minibus trip with visit to Hout Bay port, Seal Cruise, Simon\'s Town suburb with large penguin colony, Cape of Good Hope, African souvenir market, dinner.',
                highlights: ['Hout Bay Port', 'Seal Cruise - seal watching trip', 'Simon\'s Town', 'Penguin Colony', 'Cape of Good Hope', 'African souvenir market']
            },
            {
                title: 'Kirstenbosch and Table Mountain',
                description: 'Breakfast, full-day program including tour of Kirstenbosch National Botanical Garden, visit to Constantia wine region and Table Mountain tour. Dinner at an experience restaurant.',
                highlights: ['Kirstenbosch Botanical Garden', 'Constantia wine region', 'Table Mountain', 'Experience restaurant', 'UNESCO heritage site']
            },
            {
                title: 'Cape Town and free activities',
                description: 'Breakfast, full-day program including Cape Town city tour, Waterfront and Signal Hill. Possibility of additional activities such as golf, helicopter sightseeing flight, boat trip, catamaran cruise around Cape Town, Robben Island tour, etc. Dinner at restaurant.',
                highlights: ['Cape Town city center tour', 'Waterfront', 'Signal Hill', 'Golf (optional)', 'Helicopter sightseeing flight (optional)', 'Robben Island (optional)']
            },
            {
                title: 'Hermanus - whales and wine',
                description: 'Breakfast, minibus trip to Hermanus Bay with wine tasting and whale watching or possibility of full-day golf course stay or shark diving, boat trip possibility. Dinner at restaurant.',
                highlights: ['Hermanus Bay', 'Whale watching', 'Wine tasting', 'Golf (optional)', 'Shark diving (optional)', 'Boat trip']
            },
            {
                title: 'Stellenbosch and Franschhoek',
                description: 'Breakfast, transfer and visit to wine region. Wine and specialty tastings in the renowned world-famous wine region Stellenbosch and Franschhoek, dinner in one of the wine regions, return to Cape Town in the evening.',
                highlights: ['Stellenbosch wine region', 'Franschhoek - French heritage', 'Wine tastings', 'Gastronomic specialties', 'Dinner at winery', 'World-famous wine regions']
            },
            {
                title: 'Aquila Safari',
                description: 'Full-day safari at Aquila Private Game Reserve.',
                highlights: ['Aquila Private Game Reserve', 'Full-day safari', 'Big Five watching', 'Private reserve', 'Professional guides']
            },
            {
                title: 'Departure from Cape Town',
                description: 'Departure from Cape Town (CPT) to Prague (PRG).',
                highlights: ['Departure from Cape Town', 'Flight to Prague', 'End of tour']
            },
            {
                title: 'Arrival in Czech Republic',
                description: 'Return to Czech Republic.',
                highlights: ['Arrival in Prague', 'End of tour', 'Return home with unforgettable memories']
            }
        ]
    }
};

const KapskeMestoAOkoli: React.FC = () => {
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
    const [language, setLanguage] = useState<string>('en');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [showGallery, setShowGallery] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [currentGalleryImages, setCurrentGalleryImages] = useState<string[]>([]);
    const [showProgram, setShowProgram] = useState<boolean>(false);
    const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());

    // Initialize language from localStorage or URL parameter
    useEffect(() => {
        // Check URL parameter first
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');

        // Check localStorage
        const savedLang = localStorage.getItem('addotours-language');

        if (urlLang && (urlLang === 'cs' || urlLang === 'en')) {
            setLanguage(urlLang);
            localStorage.setItem('addotours-language', urlLang);
        } else if (savedLang && (savedLang === 'cs' || savedLang === 'en')) {
            setLanguage(savedLang);
        }
    }, []);

    // Update URL and localStorage when language changes
    const handleLanguageChange = (newLang: string) => {
        setLanguage(newLang);
        localStorage.setItem('addotours-language', newLang);

        // Update URL parameter
        const url = new URL(window.location.href);
        url.searchParams.set('lang', newLang);
        window.history.replaceState({}, '', url.toString());
    };

    // Get current translations
    const t = translations[language as 'cs' | 'en'];

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
            setExpandedDays(new Set(program.map(day => day.day))); // Expand all days when showing program
        } else {
            setShowProgram(false);
            setExpandedDays(new Set()); // Collapse all days when hiding program
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
        setExpandedDays(new Set(program.map(day => day.day)));
    };

    const collapseAllDays = () => {
        setExpandedDays(new Set());
    };

    const navItems = [
        { id: 'kvetinovacesta', label: t.nav.flowerRoute, href: `/kvetinova-cesta?lang=${language}` },
        { id: 'moreasafari', label: t.nav.seaSafari, href: `/more-a-safari?lang=${language}` },
        { id: 'kapskemestoaokoli', label: t.nav.capeTown, href: `/kapske-mesto-a-okoli?lang=${language}` },
        { id: 'ubytovani', label: t.nav.accommodation, href: `/ubytovani?lang=${language}` },
        { id: 'kontakt', label: t.nav.contact, href: `/kontakt?lang=${language}` }
    ];

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

    // Program zájezdu - Kapské město a okolí 10 dní
    const program: DayProgram[] = t.programDays.map((day, index) => ({
        day: index + 1,
        title: day.title,
        description: day.description,
        highlights: day.highlights,
        type: (['travel', 'city', 'sightseeing', 'sightseeing', 'city', 'whale', 'wine', 'safari', 'departure', 'travel'] as const)[index] as DayProgram['type']
    }));

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'travel': return <Plane className="w-6 h-6" />;
            case 'safari': return <Camera className="w-6 h-6" />;
            case 'adventure': return <MapIcon className="w-6 h-6" />;
            case 'sightseeing': return <MapPin className="w-6 h-6" />;
            case 'city': return <MapPin className="w-6 h-6" />;
            case 'wine': return <Wine className="w-6 h-6" />;
            case 'whale': return <Binoculars className="w-6 h-6" />;
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
            case 'city': return 'bg-indigo-500';
            case 'wine': return 'bg-red-500';
            case 'whale': return 'bg-teal-500';
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
                        src={`/${currentGalleryImages[currentImageIndex]}`}
                        alt={`Gallery image ${currentImageIndex + 1}`}
                        className="max-w-full max-h-[80vh] object-contain"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                </div>

                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full">
                    {currentImageIndex + 1} / {currentGalleryImages.length}
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto px-4">
                    {currentGalleryImages.map((img: string, imgIndex: number) => (
                        <button
                            key={imgIndex}
                            onClick={() => goToImage(imgIndex)}
                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                                imgIndex === currentImageIndex
                                    ? 'border-cyan-400'
                                    : 'border-transparent hover:border-white'
                            }`}
                        >
                            <img
                                src={`/${img}`}
                                alt={`Thumbnail ${imgIndex + 1}`}
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
                                onClick={() => window.location.href = `/?lang=${language}`}
                                className="w-16 h-16 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                            >
                                <img
                                    src="/addotourslogo.png"
                                    alt="AddoTours logo"
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        </div>

                        <div className="hidden md:flex space-x-8">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigation(item.href)}
                                    className={`font-semibold transition-colors tracking-wide ${
                                        item.id === 'kapskemestoaokoli'
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
                                    onClick={() => handleLanguageChange(language === 'cs' ? 'en' : 'cs')}
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
                                        item.id === 'kapskemestoaokoli'
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
                            <span className="block sm:hidden">{t.hero.title.split(' ').slice(0, 2).join(' ')}<br />{t.hero.title.split(' ').slice(2).join(' ')}</span>
                            <span className="hidden sm:block">{t.hero.title}</span>
                        </h1>
                        <p className="text-lg sm:text-xl lg:text-2xl text-cyan-100 mb-3 lg:mb-4">
                            {t.hero.subtitle}
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg text-cyan-200 max-w-3xl mx-auto mb-8 lg:mb-12 leading-relaxed px-2">
                            {t.hero.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
                            <button
                                onClick={() => {
                                    const element = document.getElementById('contact-form');
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="w-full sm:w-auto bg-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
                            >
                                {t.hero.reserveBtn}
                            </button>
                            <button
                                onClick={() => openGallery(tripGallery, 0)}
                                className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white hover:text-cyan-800 transition-all duration-300 text-sm sm:text-base"
                            >
                                {t.hero.galleryBtn}
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
                            {t.program.title}
                        </h2>
                        <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-8">
                            {t.program.subtitle}
                        </p>

                        {/* Marketing highlights */}
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <div className="bg-purple-100 text-purple-800 px-6 py-3 rounded-full text-sm font-semibold flex items-center space-x-2">
                                <MapPin size={18} />
                                <span>{t.program.highlights.capeTown}</span>
                            </div>
                            <div className="bg-red-100 text-red-800 px-6 py-3 rounded-full text-sm font-semibold flex items-center space-x-2">
                                <Wine size={18} />
                                <span>{t.program.highlights.wine}</span>
                            </div>
                            <div className="bg-teal-100 text-teal-800 px-6 py-3 rounded-full text-sm font-semibold flex items-center space-x-2">
                                <Binoculars size={18} />
                                <span>{t.program.highlights.whales}</span>
                            </div>
                            <div className="bg-green-100 text-green-800 px-6 py-3 rounded-full text-sm font-semibold flex items-center space-x-2">
                                <Camera size={18} />
                                <span>{t.program.highlights.safari}</span>
                            </div>
                        </div>

                        {/* Program overview text */}
                        <div className="max-w-4xl mx-auto text-center mb-10">
                            <div className="bg-gradient-to-br from-stone-50 to-cyan-50 rounded-2xl p-8 shadow-lg border border-stone-200">
                                <p className="text-lg text-stone-700 leading-relaxed mb-4">
                                    {t.program.overview}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div className="bg-white/60 rounded-lg p-4">
                                        <div className="font-semibold text-purple-700 mb-2">{t.program.attractions.city}</div>
                                        <div className="text-stone-600">{t.program.attractions.cityDesc}</div>
                                    </div>
                                    <div className="bg-white/60 rounded-lg p-4">
                                        <div className="font-semibold text-red-700 mb-2">{t.program.attractions.wineRegions}</div>
                                        <div className="text-stone-600">{t.program.attractions.wineDesc}</div>
                                    </div>
                                    <div className="bg-white/60 rounded-lg p-4">
                                        <div className="font-semibold text-green-700 mb-2">{t.program.attractions.nature}</div>
                                        <div className="text-stone-600">{t.program.attractions.natureDesc}</div>
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
                                <span>{showProgram ? t.program.hideDetails : t.program.showDetails}</span>
                                <div className={`transition-transform duration-300 ${showProgram ? 'rotate-180' : ''}`}>
                                    <ChevronLeft className="rotate-90" size={20} />
                                </div>
                            </button>
                            <p className="text-stone-500 mt-3 text-sm">
                                {t.program.clickToShow}
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
                                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                                >
                                    {t.program.expandAll}
                                </button>
                                <button
                                    onClick={collapseAllDays}
                                    className="bg-stone-600 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors text-sm font-medium"
                                >
                                    {t.program.collapseAll}
                                </button>
                            </div>
                        )}

                        {/* Timeline */}
                        <div className="max-w-5xl mx-auto">
                            {program.map((day, dayIndex) => (
                                <div key={day.day} className="relative flex items-start mb-8 last:mb-0">
                                    {/* Timeline line */}
                                    {dayIndex < program.length - 1 && (
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
                                            <div className="text-xs text-stone-500">{t.program.day}</div>
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
                                                            SAFARI
                                                        </span>
                                                    )}
                                                    {day.type === 'wine' && (
                                                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
                                                            {language === 'cs' ? 'VÍNO' : 'WINE'}
                                                        </span>
                                                    )}
                                                    {day.type === 'whale' && (
                                                        <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full font-semibold">
                                                            {language === 'cs' ? 'VELRYBY' : 'WHALES'}
                                                        </span>
                                                    )}
                                                    {day.type === 'city' && (
                                                        <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-semibold">
                                                            {language === 'cs' ? 'MĚSTO' : 'CITY'}
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
                                                    {day.highlights.length} {t.program.activities}
                                                </div>
                                                <div className="flex space-x-1">
                                                    {day.highlights.slice(0, 2).map((_, idx) => (
                                                        <div key={idx} className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                                                    ))}
                                                    {day.highlights.length > 2 && (
                                                        <div className="text-emerald-600 text-xs">+{day.highlights.length - 2}</div>
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
                                                            <Check size={14} className="text-emerald-600 flex-shrink-0" />
                                                            <span className="text-xs text-stone-700">{highlight}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Day-specific call-to-action */}
                                                {(day.type === 'safari' || day.type === 'wine' || day.type === 'whale' || day.day === 2) && (
                                                    <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                                        <div className="text-xs text-emerald-800 font-medium">
                                                            {day.type === 'safari' ? (language === 'cs' ? 'Vrchol zájezdu! Safari v Aquila Private Game Reserve' : 'Trip highlight! Safari at Aquila Private Game Reserve') :
                                                                day.type === 'wine' ? (language === 'cs' ? 'Světoznámé vinařské oblasti Stellenbosch a Franschhoek' : 'World-famous wine regions Stellenbosch and Franschhoek') :
                                                                    day.type === 'whale' ? (language === 'cs' ? 'Hermanus - nejlepší místo na světě pro pozorování velryb' : 'Hermanus - the best place in the world for whale watching') :
                                                                        (language === 'cs' ? 'Začátek dobrodružství v Kapském městě' : 'Beginning of the adventure in Cape Town')}
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
                                    <h4 className="font-semibold text-amber-800 mb-2">{t.program.note}</h4>
                                    <p className="text-amber-700 text-sm leading-relaxed">
                                        {t.program.noteText}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA at the end of program */}
                        <div className="text-center mt-12">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-200 max-w-2xl mx-auto">
                                <h3 className="text-2xl font-bold text-stone-800 mb-4">{t.program.ready}</h3>
                                <p className="text-stone-600 mb-6">
                                    {t.program.readyText}
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
                                    {t.program.reserveTrip}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Statistics summary */}
                    <div className="bg-gradient-to-r from-cyan-600 to-green-600 rounded-2xl p-8 mt-16 text-white">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold mb-2">{t.stats.title}</h3>
                            <p className="text-cyan-100">{t.stats.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">5</div>
                                <div className="text-sm text-cyan-100">{t.stats.wineRegions}</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">1</div>
                                <div className="text-sm text-cyan-100">{t.stats.safariExpeditions}</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">7</div>
                                <div className="text-sm text-cyan-100">{t.stats.mainAttractions}</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">100%</div>
                                <div className="text-sm text-cyan-100">{t.stats.luxuryExperience}</div>
                            </div>
                        </div>
                    </div>

                    {/* Fotogalerie zájezdu - nyní jako samostatná sekce */}
                    <div className="mb-12 mt-16">
                        <div className="mb-12">
                            <div className="text-center mb-8">
                                <h3 className="text-3xl font-bold text-stone-800 mb-4">{t.gallery.title}</h3>
                                <p className="text-stone-600 max-w-2xl mx-auto">
                                    {t.gallery.subtitle}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {tripGallery.map((image, galleryIndex) => (
                                    <div
                                        key={galleryIndex}
                                        className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                        onClick={() => openGallery(tripGallery, galleryIndex)}
                                    >
                                        <img
                                            src={`/${image}`}
                                            alt={`Gallery image ${galleryIndex + 1}`}
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
                                    className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg flex items-center space-x-2 mx-auto"
                                >
                                    <Camera size={20} />
                                    <span>{t.gallery.showFull}</span>
                                </button>
                            </div>
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
                        <h2 className="text-4xl font-bold text-stone-800 mb-6">{t.pricing.title}</h2>
                        <p className="text-xl text-stone-600">{t.pricing.subtitle}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Zahrnuje */}
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                                    <Check className="text-white" size={20} />
                                </div>
                                <h3 className="text-2xl font-bold text-green-800">{t.pricing.included}</h3>
                            </div>

                            <div className="space-y-3">
                                {t.pricing.includedItems.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex items-center space-x-3">
                                        <Check size={16} className="text-green-600 flex-shrink-0" />
                                        <span className="text-green-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Nezahrnuje */}
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                                    <X className="text-white" size={20} />
                                </div>
                                <h3 className="text-2xl font-bold text-red-800">{t.pricing.notIncluded}</h3>
                            </div>

                            <div className="space-y-3">
                                {t.pricing.notIncludedItems.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex items-center space-x-3">
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
                        <div className="relative bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
                            {/* Best Value Badge */}
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg">
                                    <div className="w-4 h-4 bg-green-300 rounded-full"></div>
                                    <span>{language === 'cs' ? 'Nejlepší hodnota' : 'Best value'}</span>
                                </div>
                            </div>

                            {/* Price Section */}
                            <div className="text-center mb-6 mt-4">
                                <div className="text-lg font-semibold text-emerald-800 mb-2">
                                    {language === 'cs' ? 'Cena zájezdu' : 'Trip price'}
                                </div>
                                <div className="flex items-baseline justify-center space-x-2">
                                    <span className="text-5xl font-bold text-stone-800">49 900</span>
                                    <span className="text-xl text-stone-600">Kč</span>
                                </div>
                                <div className="flex items-center justify-center space-x-2 mt-2">
                                    <span className="text-sm text-emerald-700 font-medium">
                                        {language === 'cs' ? 'za osobu' : 'per person'}
                                    </span>
                                </div>
                            </div>

                            {/* Included Note */}
                            <div className="text-center mb-6">
                                <div className="bg-white/60 rounded-lg px-4 py-3 border border-emerald-200">
                                    <p className="text-sm text-emerald-800 font-medium">
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
                                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-3"
                            >
                                <span>{language === 'cs' ? 'Rezervovat nyní' : 'Book now'}</span>
                            </button>

                            {/* Subtle decoration */}
                            <div className="absolute bottom-2 right-2 opacity-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-400 rounded-full"></div>
                            </div>
                            <div className="absolute top-2 left-2 opacity-5">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-400 rounded-full"></div>
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="text-center mt-4">
                            <p className="text-xs text-stone-500">
                                {language === 'cs'
                                    ? ' Nezávazná rezervace'
                                    : ' Non-binding reservation'
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
                        <h2 className="text-4xl font-bold text-stone-800 mb-4">{t.contact.title}</h2>
                        <p className="text-xl text-stone-600">
                            {t.contact.subtitle}
                        </p>
                    </div>

                    {/* Upravený formulář bez kalendáře se slevovým kódem */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-200 relative">
                        <form
                            action="https://formsubmit.co/expertflo51@gmail.com"
                            method="POST"
                            className="space-y-6"
                        >
                            {/* FormSubmit skryté pole pro konfiguraci */}
                            <input type="hidden" name="_subject" value="Nová poptávka z webu AddoTours" />
                            <input type="hidden" name="_next" value="https://adotours.vercel.app/dekujeme" />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_template" value="table" />

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                                    {t.contact.name} *
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
                                    {t.contact.email} *
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
                                    {language === 'cs' ? 'Destinace' : 'Destination'}
                                </label>
                                <input
                                    type="text"
                                    id="destination"
                                    name="destination"
                                    value={`${t.nav.capeTown}`}
                                    readOnly
                                    className="w-full px-4 py-3 border border-stone-300 rounded-lg bg-gray-50 text-stone-700 cursor-not-allowed"
                                />
                                <input type="hidden" name="destination" value="kapske-mesto-a-okoli" />
                            </div>

                            {/* Počet osob */}
                            <div>
                                <label htmlFor="numberOfPeople" className="block text-sm font-medium text-stone-700 mb-2">
                                    {t.contact.numberOfPeople} *
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

                            {/* Termín zájezdu - dropdown místo kalendáře */}
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

                            {/* Slevový kód */}
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
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                                    {t.contact.message}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-stone-700"
                                    placeholder={t.contact.messagePlaceholder}
                                />
                            </div>

                            {/* GDPR souhlas */}
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
                                    {t.contact.gdprConsent} *
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={!formData.gdprConsent}
                                className={`w-full px-8 py-3 rounded-lg font-semibold transition-colors ${
                                    formData.gdprConsent
                                        ? 'bg-green-700 text-white hover:bg-green-800'
                                        : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                                }`}
                            >
                                {t.contact.submit}
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
                                    <img
                                        src="/addotourslogo.png"
                                        alt="AddoTours"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="text-2xl font-bold text-stone-800">AddoTours</span>
                            </div>
                            <p className="text-stone-600 mb-6 leading-relaxed">
                                {t.footer.description}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-6 text-stone-800">{t.footer.quickContact}</h3>
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
                            <h3 className="text-xl font-semibold mb-6 text-stone-800">{t.footer.quickLinks}</h3>
                            <ul className="space-y-3">
                                <li>
                                    <button
                                        onClick={() => window.location.href = `/?lang=${language}`}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t.footer.mainPage}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => window.location.href = `/more-a-safari?lang=${language}`}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t.footer.seaSafari}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => window.location.href = `/kvetinova-cesta?lang=${language}`}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t.footer.flowerRoute}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => window.location.href = `/ubytovani?lang=${language}`}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t.footer.accommodation}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => window.location.href = `/kontakt?lang=${language}`}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t.footer.contact}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-stone-200 mt-12 pt-8 text-center">
                        <p className="text-stone-500">
                            {t.footer.rights}
                        </p>
                    </div>
                </div>
            </footer>

            {/* Gallery Modal */}
            <GalleryModal />
        </div>
    );
};

export default KapskeMestoAOkoli;
import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Camera, Check, Calendar, X, ChevronLeft, ChevronRight, Globe, Menu, Clock, MapIcon, Plane } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    destination: string;
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
    type: 'travel' | 'sightseeing' | 'safari' | 'adventure' | 'departure';
}

interface Translations {
    [key: string]: {
        cs: string;
        en: string;
    };
}

const KvetinovaCestaSafari: React.FC = () => {
    // Language state with proper SSR handling
    const [language, setLanguage] = useState<string>('en');
    const [isClient, setIsClient] = useState<boolean>(false);

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        destination: '',
        numberOfPeople: '',
        tripTerm: '',
        discountCode: '',
        message: '',
        gdprConsent: false
    });

    const [discountCodeError, setDiscountCodeError] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [showGallery, setShowGallery] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [currentGalleryImages, setCurrentGalleryImages] = useState<string[]>([]);
    const [showProgram, setShowProgram] = useState<boolean>(false);
    const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());

    // Translation object
    const translations: Translations = {
        // Navigation
        'nav.flowerRoadSafari': { cs: 'KVĚTINOVÁ CESTA A SAFARI', en: 'FLOWER ROUTE & SAFARI' },
        'nav.seaSafari': { cs: 'MOŘE A SAFARI', en: 'SEA & SAFARI' },
        'nav.capeTown': { cs: 'KAPSKÉ MĚSTO A OKOLÍ', en: 'CAPE TOWN & SURROUNDINGS' },
        'nav.accommodation': { cs: 'UBYTOVÁNÍ', en: 'ACCOMMODATION' },
        'nav.contact': { cs: 'KONTAKT', en: 'CONTACT' },

        // Hero section
        'hero.title': { cs: 'Květinová cesta a safari', en: 'Flower Route & Safari' },
        'hero.subtitle': { cs: '14denní zájezd do Jihoafrické republiky', en: '14-day trip to South Africa' },
        'hero.description': { cs: 'Objevte krásu JAR na našem nejoblíbenějším zájezdu kombinujícím Kapské město, safari na farmách a nezapomenutelné zážitky v africké přírodě', en: 'Discover the beauty of South Africa on our most popular trip combining Cape Town, farm safaris, and unforgettable experiences in African nature' },
        'hero.bookTrip': { cs: 'Rezervovat zájezd', en: 'Book Trip' },
        'hero.viewPhotos': { cs: 'Prohlédnout fotky', en: 'View Photos' },

        // Program section
        'program.title': { cs: 'Program zájezdu', en: 'Trip Program' },
        'program.subtitle': { cs: '14denní dobrodružství plné nezapomenutelných zážitků v Jihoafrické republice', en: '14-day adventure full of unforgettable experiences in South Africa' },
        'program.safariExpeditions': { cs: '5+ Safari expedic', en: '5+ Safari expeditions' },
        'program.destinations': { cs: '12 destinací', en: '12 destinations' },
        'program.days': { cs: '14 nezapomenutelných dní', en: '14 unforgettable days' },
        'program.capeAndSafari': { cs: 'Kapské město + Safari', en: 'Cape Town + Safari' },
        'program.description': { cs: 'Náš nejoblíbenější 14denní zájezd vás zavede od pulzujícího Kapského města přes dechberoucí vinařské oblasti až na soukromé farmy s autentickým africkým safari. Užijete si pozorování zvířat ve volné přírodě, ochutnávky místních specialit, návštěvy národních parků a nezapomenutelné zážitky u Indického oceánu.', en: 'Our most popular 14-day trip takes you from vibrant Cape Town through breathtaking wine regions to private farms with authentic African safari. You\'ll enjoy wildlife watching in the wild, tasting local specialties, visiting national parks, and unforgettable experiences by the Indian Ocean.' },
        'program.capeSection': { cs: 'Kapské město', en: 'Cape Town' },
        'program.capeDescription': { cs: 'Stolová hora, Victoria Waterfront, Mys Dobré naděje', en: 'Table Mountain, Victoria Waterfront, Cape of Good Hope' },
        'program.safariSection': { cs: 'Safari & Příroda', en: 'Safari & Nature' },
        'program.safariDescription': { cs: 'Sibuya, Addo Park, farmy Fijnbosch & Mayabana', en: 'Sibuya, Addo Park, Fijnbosch & Mayabana farms' },
        'program.experiencesSection': { cs: 'Zážitky', en: 'Experiences' },
        'program.experiencesDescription': { cs: 'Vinařské oblasti, tučňáci, bungee jumping', en: 'Wine regions, penguins, bungee jumping' },
        'program.showDetailedProgram': { cs: 'Zobrazit detailní program', en: 'Show detailed program' },
        'program.hideDetailedProgram': { cs: 'Skrýt detailní program', en: 'Hide detailed program' },
        'program.clickForDetails': { cs: 'Klikněte pro zobrazení dne po dni programu s detailními aktivitami', en: 'Click to show day-by-day program with detailed activities' },
        'program.expandAll': { cs: 'Rozbalit vše', en: 'Expand all' },
        'program.collapseAll': { cs: 'Sbalit vše', en: 'Collapse all' },
        'program.activities': { cs: 'aktivit', en: 'activities' },
        'program.day': { cs: 'den', en: 'day' },
        'program.note': { cs: 'Poznámka k programu:', en: 'Program note:' },
        'program.noteText': { cs: 'Jednotlivé naplánované aktivity, zejména výlety lanovkou, lodí atd. lze individuálně měnit po dohodě s průvodcem a zároveň mohou být přeloženy průvodcem z důvodu nepříznivých klimatických podmínek.', en: 'Individual planned activities, especially cable car trips, boat trips, etc. can be individually changed by agreement with the guide and may also be postponed by the guide due to unfavorable weather conditions.' },
        'program.readyForAdventure': { cs: 'Připraveni na dobrodružství?', en: 'Ready for adventure?' },
        'program.adventureText': { cs: 'Tento program je pouze začátek. Každý den přinese nové objevy a nezapomenutelné zážitky.', en: 'This program is just the beginning. Each day will bring new discoveries and unforgettable experiences.' },
        'program.bookThisTrip': { cs: 'Rezervovat tento zájezd', en: 'Book this trip' },

        // Statistics
        'stats.title': { cs: 'Váš zájezd v číslech', en: 'Your trip in numbers' },
        'stats.subtitle': { cs: 'Co vás čeká během 14 dní dobrodružství', en: 'What awaits you during 14 days of adventure' },
        'stats.safariExpeditions': { cs: 'Safari expedic', en: 'Safari expeditions' },
        'stats.nationalParks': { cs: 'Národní parky', en: 'National parks' },
        'stats.destinations': { cs: 'Destinací', en: 'Destinations' },
        'stats.unforgettable': { cs: 'Nezapomenutelné', en: 'Unforgettable' },

        // Gallery
        'gallery.title': { cs: 'Fotogalerie zájezdu', en: 'Trip photo gallery' },
        'gallery.description': { cs: 'Podívejte se na fotky z našich předchozích zájezdů a nechte se inspirovat krásami Jihoafrické republiky', en: 'Check out photos from our previous trips and be inspired by the beauty of South Africa' },
        'gallery.viewAll': { cs: 'Zobrazit celou galerii', en: 'View full gallery' },

        // Pricing
        'pricing.title': { cs: 'Co zahrnuje cena', en: 'What\'s included in the price' },
        'pricing.subtitle': { cs: 'Transparentní přehled toho, co je a není zahrnuto v ceně zájezdu', en: 'Transparent overview of what is and isn\'t included in the trip price' },
        'pricing.included': { cs: 'Cena zahrnuje', en: 'Price includes' },
        'pricing.notIncluded': { cs: 'Cena nezahrnuje', en: 'Price does not include' },

        // Contact form
        'contact.title': { cs: 'Rezervace zájezdu', en: 'Trip reservation' },
        'contact.subtitle': { cs: 'Vyplňte formulář a my vám připravíme nezávaznou nabídku na míru', en: 'Fill out the form and we\'ll prepare a non-binding offer tailored for you' },
        'contact.name': { cs: 'Jméno a příjmení', en: 'Full name' },
        'contact.email': { cs: 'Email', en: 'Email' },
        'contact.message': { cs: 'Vaše zpráva', en: 'Your message' },
        'contact.messagePlaceholder': { cs: 'Máte nějaké speciální požadavky nebo dotazy k tomuto zájezdu?', en: 'Do you have any special requirements or questions about this trip?' },
        'contact.gdprConsent': { cs: 'Souhlasím se zpracováním osobních údajů pro účely této rezervace', en: 'I agree to the processing of personal data for the purposes of this reservation' },
        'contact.submit': { cs: 'Odeslat rezervaci', en: 'Submit reservation' },
        'contact.cancel': { cs: 'Zrušit', en: 'Cancel' },

        // New form translations
        'contact.form.name': { cs: 'Jméno a příjmení', en: 'Full name' },
        'contact.form.email': { cs: 'Email', en: 'Email' },
        'contact.form.destination': { cs: 'Typ zájezdu', en: 'Trip type' },
        'contact.form.selectDestination': { cs: 'Vyberte typ zájezdu', en: 'Select trip type' },
        'contact.form.message': { cs: 'Zpráva', en: 'Message' },
        'contact.form.placeholder': { cs: 'Napište nám své požadavky nebo dotazy...', en: 'Write your requirements or questions...' },
        'contact.form.submit': { cs: 'Odeslat poptávku', en: 'Send inquiry' },

        // Destinations
        'destinations.pobytove.title': { cs: 'Pobytové zájezdy', en: 'Stay trips' },
        'destinations.program.title': { cs: 'Programové zájezdy', en: 'Program trips' },
        'destinations.individualni.title': { cs: 'Individuální zájezdy', en: 'Individual trips' },

        // Footer
        'footer.description': { cs: 'Profesionální zájezdy do Jihoafrické republiky od roku 2008. Vytváříme nezapomenutelné zážitky na míru.', en: 'Professional trips to South Africa since 2008. We create unforgettable tailor-made experiences.' },
        'footer.quickContact': { cs: 'Rychlý kontakt', en: 'Quick contact' },
        'footer.quickLinks': { cs: 'Rychlé odkazy', en: 'Quick links' },
        'footer.homepage': { cs: 'HLAVNÍ STRÁNKA', en: 'HOMEPAGE' },
        'footer.copyright': { cs: '© 2024 AddoTours. Všechna práva vyhrazena.', en: '© 2024 AddoTours. All rights reserved.' }
    };

    // Valid discount codes
    const validDiscountCodes = ['EARLY2025', 'FIRSTTRIP', 'ADVENTURE10'];

    // Helper function to get translation
    const t = (key: string): string => {
        return translations[key]?.[language as 'cs' | 'en'] || key;
    };

    // Client-side initialization effect
    useEffect(() => {
        setIsClient(true);
        const savedLanguage = localStorage.getItem('addotours-language') || 'cs';
        setLanguage(savedLanguage);
    }, []);

    // Save language preference to localStorage
    useEffect(() => {
        if (isClient) {
            localStorage.setItem('addotours-language', language);
        }
    }, [language, isClient]);

    // Toggle language function
    const toggleLanguage = () => {
        setLanguage(prev => prev === 'cs' ? 'en' : 'cs');
    };

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
            setExpandedDays(new Set(program.map(day => day.day)));
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
        setExpandedDays(new Set(program.map(day => day.day)));
    };

    const collapseAllDays = () => {
        setExpandedDays(new Set());
    };

    const navItems = [
        { id: 'kvetinovacesta', label: t('nav.flowerRoadSafari'), href: '/kvetinova-cesta' },
        { id: 'moreasafari', label: t('nav.seaSafari'), href: '/more-a-safari' },
        { id: 'kapskemestoaokoli', label: t('nav.capeTown'), href: '/kapske-mesto-a-okoli' },
        { id: 'ubytovani', label: t('nav.accommodation'), href: '/ubytovani' },
        { id: 'kontakt', label: t('nav.contact'), href: '/kontakt' }
    ];

    const handleNavigation = (href: string) => {
        if (isClient) {
            const url = new URL(href, window.location.origin);
            url.searchParams.set('lang', language);
            window.location.href = url.toString();
        }
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

            // Check discount code validity
            if (name === 'discountCode') {
                if (value && !validDiscountCodes.includes(value.toUpperCase())) {
                    setDiscountCodeError(true);
                } else {
                    setDiscountCodeError(false);
                }
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        if (discountCodeError) {
            e.preventDefault();
            return false;
        }
        // Form will submit normally via FormSubmit
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
        if (isClient) {
            document.body.style.overflow = 'hidden';
        }
    };

    const closeGallery = () => {
        setShowGallery(false);
        if (isClient) {
            document.body.style.overflow = 'unset';
        }
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

        if (isClient) {
            document.addEventListener('keydown', handleKeyPress);
            return () => document.removeEventListener('keydown', handleKeyPress);
        }
    }, [showGallery, isClient]);

    // Program data with translations
    const programData = {
        cs: [
            {
                day: 1,
                title: 'Odlet z Prahy',
                description: 'Odlet z Prahy (PRG) do Cape Town (CPT)',
                highlights: ['Odlet z letiště Václava Havla', 'Přestup v mezinárodním uzlu', 'Let do Jihoafrické republiky'],
                type: 'travel' as const
            },
            {
                day: 2,
                title: 'Přílet do CPT',
                description: 'Přílet do CPT a přesun s delegátem na ubytování. Návštěva předměstí a pláže Camps Bay, výlet lanovkou na Stolovou horu, procházka přístavem s možností nákupů v centru Victoria Wharf Waterfront. Večeře.',
                highlights: ['Přílet a přesun na ubytování', 'Camps Bay pláž', 'Lanovka na Stolovou horu', 'Victoria Wharf Waterfront', 'Večeře'],
                type: 'sightseeing' as const
            },
            {
                day: 3,
                title: 'Hout Bay a Mys Dobré naděje',
                description: 'Snídaně, Hout Bay – přístav, Seal Cruise, návštěva předměstí Simon\'s Town s velkou kolonií tučňáků, Mys Dobré naděje, trh s africkými suvenýry, večeře.',
                highlights: ['Hout Bay přístav', 'Seal Cruise', 'Kolonie tučňáků v Simon\'s Town', 'Mys Dobré naděje', 'Africký trh se suvenýry'],
                type: 'adventure' as const
            },
            {
                day: 4,
                title: 'Botanická zahrada a akvárium',
                description: 'Snídaně, celodenní program, který zahrnuje prohlídku botanické zahrady Kirstenbosh National Botanical Garden, Camps Bay, Signální horu, Waterfront, mořské akvárium. Večeře v zážitkové restauraci.',
                highlights: ['Kirstenbosh National Botanical Garden', 'Camps Bay', 'Signální hora', 'Waterfront', 'Mořské akvárium'],
                type: 'sightseeing' as const
            },
            {
                day: 5,
                title: 'Vinařské oblasti',
                description: 'Snídaně, přejezd a návštěva vinařské oblasti. Ochutnávky vín a specialit v oblasti Stellenbosch a Franchhoek, večeře Stellenbosch, návrat do Cape Town ve večerních hodinách.',
                highlights: ['Stellenbosch vinařská oblast', 'Ochutnávky vín a specialit', 'Franschhoek oblast', 'Večeře ve Stellenbosch'],
                type: 'sightseeing' as const
            },
            {
                day: 6,
                title: 'Přelet na farmu Fijnbosch',
                description: 'Snídaně a přelet v dopoledních hodinách z Cape Town do Port Elizabeth, přejezd na naší farmu Fijnbosch v blízkosti Indického oceánu, odpolední safari na farmě, africká večeře.',
                highlights: ['Přelet z Cape Town do Port Elizabeth', 'Příjezd na farmu Fijnbosch', 'Odpolední safari na farmě', 'Africká večeře'],
                type: 'safari' as const
            },
            {
                day: 7,
                title: 'Jeffreys Bay aktivity',
                description: 'Aktivity v okolí města Jeffreys Bay (procházky po městě Jeffreys Bay, Paradise Beach, Marina Martinique - pobyt u Indického oceánu).',
                highlights: ['Procházky po Jeffreys Bay', 'Paradise Beach', 'Marina Martinique', 'Pobyt u Indického oceánu'],
                type: 'adventure' as const
            },
            {
                day: 8,
                title: 'Volné aktivity Jeffreys Bay',
                description: 'Celodenní aktivity v okolí města Jeffreys Bay dle individuální dohody s delegátem. Možnost ocean safari, jízdy na koních, rybaření, nakupování, pobyt na pláži apod.',
                highlights: ['Ocean safari (možnost)', 'Jízdy na koních', 'Rybaření', 'Nakupování', 'Pobyt na pláži'],
                type: 'adventure' as const
            },
            {
                day: 9,
                title: 'Tsitsikama národní park',
                description: 'Celodenní výlet do Tsitsikama národního parku s návštěvou záchranné stanice slonů, opičího parku Monkey land, Tsitsikama bungee jumping, večeře v městě Jeffreys Bay.',
                highlights: ['Záchranná stanice slonů', 'Opičí park Monkey Land', 'Tsitsikama bungee jumping', 'Večeře v Jeffreys Bay'],
                type: 'adventure' as const
            },
            {
                day: 10,
                title: 'Sibuya Game Reserve',
                description: 'Brzká snídaně, odjezd na celodenní safari do rezervace SIBUYA GAME RESERVE.',
                highlights: ['Brzká snídaně', 'Celodenní safari', 'Rezervace Sibuya Game Reserve', 'Pozorování zvířat'],
                type: 'safari' as const
            },
            {
                day: 11,
                title: 'Addo Elephant Park a Schotia',
                description: 'Brzká snídaně, prohlídka sloního parku ADDO ELEPHANT NATIONAL PARK a odpolední safari v soukromé rezervaci Schotia se stylovou večeří.',
                highlights: ['Addo Elephant National Park', 'Pozorování slonů', 'Safari v rezervaci Schotia', 'Stylová večeře'],
                type: 'safari' as const
            },
            {
                day: 12,
                title: 'Farma Mayabana',
                description: 'Snídaně, přejezd na farmu Mayabana, oběd na farmě Mayabana, projížďka po farmě, večeře v pravé africké přírodě',
                highlights: ['Přejezd na farmu Mayabana', 'Oběd na farmě', 'Projížďka po farmě', 'Večeře v africké přírodě'],
                type: 'safari' as const
            },
            {
                day: 13,
                title: 'Odlet z JAR',
                description: 'Snídaně na farmě Fijnbosch, odjezd na letiště, odlet z Cape Town nebo Port Elizabeth',
                highlights: ['Snídaně na farmě Fijnbosch', 'Odjezd na letiště', 'Odlet z Cape Town nebo Port Elizabeth'],
                type: 'departure' as const
            },
            {
                day: 14,
                title: 'Přílet do ČR',
                description: 'Přílet do ČR.',
                highlights: ['Přílet do Prahy', 'Ukončení zájezdu'],
                type: 'travel' as const
            }
        ],
        en: [
            {
                day: 1,
                title: 'Departure from Prague',
                description: 'Departure from Prague (PRG) to Cape Town (CPT)',
                highlights: ['Departure from Václav Havel Airport', 'Transfer at international hub', 'Flight to South Africa'],
                type: 'travel' as const
            },
            {
                day: 2,
                title: 'Arrival in CPT',
                description: 'Arrival in CPT and transfer with delegate to accommodation. Visit to suburbs and Camps Bay beach, cable car trip to Table Mountain, harbor walk with shopping opportunities at Victoria Wharf Waterfront center. Dinner.',
                highlights: ['Arrival and transfer to accommodation', 'Camps Bay beach', 'Cable car to Table Mountain', 'Victoria Wharf Waterfront', 'Dinner'],
                type: 'sightseeing' as const
            },
            {
                day: 3,
                title: 'Hout Bay and Cape of Good Hope',
                description: 'Breakfast, Hout Bay – harbor, Seal Cruise, visit to Simon\'s Town suburb with large penguin colony, Cape of Good Hope, African souvenir market, dinner.',
                highlights: ['Hout Bay harbor', 'Seal Cruise', 'Penguin colony in Simon\'s Town', 'Cape of Good Hope', 'African souvenir market'],
                type: 'adventure' as const
            },
            {
                day: 4,
                title: 'Botanical Garden and Aquarium',
                description: 'Breakfast, full-day program including visit to Kirstenbosch National Botanical Garden, Camps Bay, Signal Hill, Waterfront, marine aquarium. Dinner at an experience restaurant.',
                highlights: ['Kirstenbosch National Botanical Garden', 'Camps Bay', 'Signal Hill', 'Waterfront', 'Marine aquarium'],
                type: 'sightseeing' as const
            },
            {
                day: 5,
                title: 'Wine Regions',
                description: 'Breakfast, transfer and visit to wine regions. Wine and specialty tastings in Stellenbosch and Franschhoek areas, dinner in Stellenbosch, return to Cape Town in the evening.',
                highlights: ['Stellenbosch wine region', 'Wine and specialty tastings', 'Franschhoek area', 'Dinner in Stellenbosch'],
                type: 'sightseeing' as const
            },
            {
                day: 6,
                title: 'Flight to Fijnbosch Farm',
                description: 'Breakfast and morning flight from Cape Town to Port Elizabeth, transfer to our Fijnbosch farm near the Indian Ocean, afternoon safari on the farm, African dinner.',
                highlights: ['Flight from Cape Town to Port Elizabeth', 'Arrival at Fijnbosch farm', 'Afternoon farm safari', 'African dinner'],
                type: 'safari' as const
            },
            {
                day: 7,
                title: 'Jeffreys Bay Activities',
                description: 'Activities around Jeffreys Bay (walks through Jeffreys Bay town, Paradise Beach, Marina Martinique - stay by the Indian Ocean).',
                highlights: ['Jeffreys Bay town walks', 'Paradise Beach', 'Marina Martinique', 'Indian Ocean stay'],
                type: 'adventure' as const
            },
            {
                day: 8,
                title: 'Free Activities Jeffreys Bay',
                description: 'Full-day activities around Jeffreys Bay according to individual agreement with delegate. Possibility of ocean safari, horseback riding, fishing, shopping, beach time, etc.',
                highlights: ['Ocean safari (option)', 'Horseback riding', 'Fishing', 'Shopping', 'Beach time'],
                type: 'adventure' as const
            },
            {
                day: 9,
                title: 'Tsitsikamma National Park',
                description: 'Full-day trip to Tsitsikamma National Park with visit to elephant rescue station, Monkey Land monkey park, Tsitsikamma bungee jumping, dinner in Jeffreys Bay.',
                highlights: ['Elephant rescue station', 'Monkey Land park', 'Tsitsikamma bungee jumping', 'Dinner in Jeffreys Bay'],
                type: 'adventure' as const
            },
            {
                day: 10,
                title: 'Sibuya Game Reserve',
                description: 'Early breakfast, departure for full-day safari to SIBUYA GAME RESERVE.',
                highlights: ['Early breakfast', 'Full-day safari', 'Sibuya Game Reserve', 'Wildlife observation'],
                type: 'safari' as const
            },
            {
                day: 11,
                title: 'Addo Elephant Park and Schotia',
                description: 'Early breakfast, tour of ADDO ELEPHANT NATIONAL PARK and afternoon safari in private Schotia reserve with stylish dinner.',
                highlights: ['Addo Elephant National Park', 'Elephant observation', 'Schotia reserve safari', 'Stylish dinner'],
                type: 'safari' as const
            },
            {
                day: 12,
                title: 'Mayabana Farm',
                description: 'Breakfast, transfer to Mayabana farm, lunch at Mayabana farm, farm tour, dinner in authentic African nature.',
                highlights: ['Transfer to Mayabana farm', 'Farm lunch', 'Farm tour', 'Dinner in African nature'],
                type: 'safari' as const
            },
            {
                day: 13,
                title: 'Departure from South Africa',
                description: 'Breakfast at Fijnbosch farm, departure to airport, flight from Cape Town or Port Elizabeth.',
                highlights: ['Breakfast at Fijnbosch farm', 'Departure to airport', 'Flight from Cape Town or Port Elizabeth'],
                type: 'departure' as const
            },
            {
                day: 14,
                title: 'Arrival in Czech Republic',
                description: 'Arrival in Czech Republic.',
                highlights: ['Arrival in Prague', 'End of trip'],
                type: 'travel' as const
            }
        ]
    };

    const program: DayProgram[] = programData[language as 'cs' | 'en'] || programData.cs;

    const pricingIncluded = {
        cs: [
            'Ubytování po celou dobu pobytu',
            'Veškeré transfery a doprava',
            'VIP průvodce 24/7',
            'Snídaně každý den',
            'Polopenzi na farmě',
            'Safari na farmě Fijnbosch',
            'Safari na farmě Mayabana',
            'Všechny uvedené výlety'
        ],
        en: [
            'Accommodation throughout the stay',
            'All transfers and transportation',
            'VIP guide 24/7',
            'Breakfast every day',
            'Half board on the farm',
            'Safari at Fijnbosch farm',
            'Safari at Mayabana farm',
            'All mentioned excursions'
        ]
    };

    const pricingNotIncluded = {
        cs: [
            'Letenky Praha - Kapské město',
            'Zdravotní pojištění',
            'Vstupné do muzeí a atrakcí',
            'Obědy a večeře mimo farmu',
            'Alkoholické nápoje',
            'Osobní výdaje a suvenýry',
            'Spropitné',
            'Volitelné aktivity'
        ],
        en: [
            'Prague - Cape Town flights',
            'Health insurance',
            'Museum and attraction entrance fees',
            'Lunches and dinners outside the farm',
            'Alcoholic beverages',
            'Personal expenses and souvenirs',
            'Tips',
            'Optional activities'
        ]
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'travel': return <Plane className="w-6 h-6" />;
            case 'safari': return <Camera className="w-6 h-6" />;
            case 'adventure': return <MapIcon className="w-6 h-6" />;
            case 'sightseeing': return <MapPin className="w-6 h-6" />;
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
                                    ? 'border-emerald-400'
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
                                onClick={() => isClient && (window.location.href = '/')}
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
                                        item.id === 'kvetinovacesta'
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
                                        item.id === 'kvetinovacesta'
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
                                className="w-full sm:w-auto bg-amber-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
                            >
                                {t('hero.bookTrip')}
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
                            <div className="bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full text-sm font-semibold flex items-center space-x-2">
                                <Camera size={18} />
                                <span>{t('program.safariExpeditions')}</span>
                            </div>
                            <div className="bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold flex items-center space-x-2">
                                <MapPin size={18} />
                                <span>{t('program.destinations')}</span>
                            </div>
                            <div className="bg-purple-100 text-purple-800 px-6 py-3 rounded-full text-sm font-semibold flex items-center space-x-2">
                                <Clock size={18} />
                                <span>{t('program.days')}</span>
                            </div>
                            <div className="bg-orange-100 text-orange-800 px-6 py-3 rounded-full text-sm font-semibold flex items-center space-x-2">
                                <Plane size={18} />
                                <span>{t('program.capeAndSafari')}</span>
                            </div>
                        </div>

                        {/* Program overview text */}
                        <div className="max-w-4xl mx-auto text-center mb-10">
                            <div className="bg-gradient-to-br from-stone-50 to-emerald-50 rounded-2xl p-8 shadow-lg border border-stone-200">
                                <p className="text-lg text-stone-700 leading-relaxed mb-4">
                                    {t('program.description')}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div className="bg-white/60 rounded-lg p-4">
                                        <div className="font-semibold text-emerald-700 mb-2">{t('program.capeSection')}</div>
                                        <div className="text-stone-600">{t('program.capeDescription')}</div>
                                    </div>
                                    <div className="bg-white/60 rounded-lg p-4">
                                        <div className="font-semibold text-blue-700 mb-2">{t('program.safariSection')}</div>
                                        <div className="text-stone-600">{t('program.safariDescription')}</div>
                                    </div>
                                    <div className="bg-white/60 rounded-lg p-4">
                                        <div className="font-semibold text-purple-700 mb-2">{t('program.experiencesSection')}</div>
                                        <div className="text-stone-600">{t('program.experiencesDescription')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main program toggle button */}
                        <div className="text-center mb-8">
                            <button
                                onClick={toggleProgram}
                                className={`bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-10 py-5 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-lg flex items-center space-x-3 mx-auto ${
                                    showProgram ? 'from-stone-600 to-stone-700' : ''
                                }`}
                            >
                                <Calendar size={24} />
                                <span>{showProgram ? t('program.hideDetailedProgram') : t('program.showDetailedProgram')}</span>
                                <div className={`transition-transform duration-300 ${showProgram ? 'rotate-180' : ''}`}>
                                    <ChevronLeft className="rotate-90" size={20} />
                                </div>
                            </button>
                            <p className="text-stone-500 mt-3 text-sm">
                                {t('program.clickForDetails')}
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
                                    className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium"
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
                            {program.map((day, index) => (
                                <div key={day.day} className="relative flex items-start mb-8 last:mb-0">
                                    {/* Timeline line */}
                                    {index < program.length - 1 && (
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
                                        expandedDays.has(day.day) ? 'bg-gradient-to-br from-white to-emerald-50/50 border-stone-50' : ''
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
                                                    {day.type === 'adventure' && (
                                                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-semibold">
                                                            ADVENTURE
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
                                                        <div key={idx} className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                                    ))}
                                                    {day.highlights.length > 2 && (
                                                        <div className="text-amber-500 text-xs">+{day.highlights.length - 2}</div>
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
                                                            <Check size={14} className="text-amber-500 flex-shrink-0" />
                                                            <span className="text-xs text-stone-700">{highlight}</span>
                                                        </div>
                                                    ))}
                                                </div>
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
                                <h3 className="text-2xl font-bold text-stone-800 mb-4">{t('program.readyForAdventure')}</h3>
                                <p className="text-stone-600 mb-6">
                                    {t('program.adventureText')}
                                </p>
                                <button
                                    onClick={() => {
                                        const element = document.getElementById('contact-form');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                    className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    {t('program.bookThisTrip')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Statistics summary - always visible */}
                    <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 mt-16 text-white">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold mb-2">{t('stats.title')}</h3>
                            <p className="text-emerald-100">{t('stats.subtitle')}</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">5+</div>
                                <div className="text-sm text-emerald-100">{t('stats.safariExpeditions')}</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">3</div>
                                <div className="text-sm text-emerald-100">{t('stats.nationalParks')}</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">12</div>
                                <div className="text-sm text-emerald-100">{t('stats.destinations')}</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">100%</div>
                                <div className="text-sm text-emerald-100">{t('stats.unforgettable')}</div>
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
                                className="bg-amber-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors shadow-lg flex items-center space-x-2 mx-auto"
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
                        {/* Included */}
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                                    <Check className="text-white" size={20} />
                                </div>
                                <h3 className="text-2xl font-bold text-green-800">{t('pricing.included')}</h3>
                            </div>

                            <div className="space-y-3">
                                {pricingIncluded[language as 'cs' | 'en'].map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <Check size={16} className="text-green-600 flex-shrink-0" />
                                        <span className="text-green-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Not included */}
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                                    <X className="text-white" size={20} />
                                </div>
                                <h3 className="text-2xl font-bold text-red-800">{t('pricing.notIncluded')}</h3>
                            </div>

                            <div className="space-y-3">
                                {pricingNotIncluded[language as 'cs' | 'en'].map((item, index) => (
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
                        <div className="relative bg-gradient-to-br from-amber-50 to-amber-50 border-2 border-amber-200 rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
                            {/* Best Value Badge */}
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg">
                                    <div className="w-4 h-4 bg-amber-300 rounded-full"></div>
                                    <span>{language === 'cs' ? 'Nejlepší hodnota' : 'Best value'}</span>
                                </div>
                            </div>

                            {/* Price Section */}
                            <div className="text-center mb-6 mt-4">
                                <div className="text-lg font-semibold text-amber-800 mb-2">
                                    {language === 'cs' ? 'Cena zájezdu' : 'Trip price'}
                                </div>
                                <div className="flex items-baseline justify-center space-x-2">
                                    <span className="text-5xl font-bold text-stone-800">49 900</span>
                                    <span className="text-xl text-stone-600">Kč</span>
                                </div>
                                <div className="flex items-center justify-center space-x-2 mt-2">
                                    <span className="text-sm text-amber-700 font-medium">
                                        {language === 'cs' ? 'za osobu' : 'per person'}
                                    </span>
                                </div>
                            </div>

                            {/* Included Note */}
                            <div className="text-center mb-6">
                                <div className="bg-white/60 rounded-lg px-4 py-3 border border-amber-200">
                                    <p className="text-sm text-amber-800 font-medium">
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
                                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-3"
                            >
                                <span>{language === 'cs' ? 'Rezervovat nyní' : 'Book now'}</span>
                            </button>

                            {/* Subtle decoration */}
                            <div className="absolute bottom-2 right-2 opacity-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-400 rounded-full"></div>
                            </div>
                            <div className="absolute top-2 left-2 opacity-5">
                                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-400 rounded-full"></div>
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
                        <h2 className="text-4xl font-bold text-stone-800 mb-4">{t('contact.title')}</h2>
                        <p className="text-xl text-stone-600">
                            {t('contact.subtitle')}
                        </p>
                    </div>

                    {/* Upravený formulář bez kalendáře se slevovým kódem */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-200 relative">
                        <form
                            action="https://formsubmit.co/expertflo51@gmail.com"
                            method="POST"
                            className="space-y-6"
                            onSubmit={handleSubmit}
                        >
                            {/* FormSubmit skryté pole pro konfiguraci */}
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
                                    value={language === 'cs' ? 'KVĚTINOVÁ CESTA A SAFARI' : 'FLOWER ROUTE & SAFARI'}
                                    readOnly
                                    className="w-full px-4 py-3 border border-stone-300 rounded-lg bg-gray-50 text-stone-700 cursor-not-allowed"
                                />
                                <input type="hidden" name="destination" value="kvetinova-cesta-safari" />
                            </div>

                            {/* Počet osob */}
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
                                        onClick={() => handleNavigation('/')}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t('footer.homepage')}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleNavigation('/more-a-safari')}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t('nav.seaSafari')}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleNavigation('/kapske-mesto-a-okoli')}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t('nav.capeTown')}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleNavigation('/ubytovani')}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t('nav.accommodation')}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleNavigation('/kontakt')}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t('nav.contact')}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-stone-200 mt-12 pt-8 text-center">
                        <p className="text-stone-500">
                            {t('footer.copyright')}
                        </p>
                    </div>
                </div>
            </footer>

            {/* Gallery Modal */}
            <GalleryModal />
        </div>
    );
};

export default KvetinovaCestaSafari;
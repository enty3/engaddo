import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Mail, MapPin, Clock, Star, Users, Award, Shield, Target, Globe } from 'lucide-react';

// Komponenta pro animované číslo
const AnimatedNumber = ({ target, suffix = '', duration = 2000, startAnimation }) => {
    const [current, setCurrent] = useState(0);
    const startTime = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!startAnimation) return;

        const animate = (timestamp) => {
            if (!startTime.current) startTime.current = timestamp;

            const elapsed = timestamp - startTime.current;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function pro smooth animaci
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            const currentValue = Math.floor(target * easeOutQuart);
            setCurrent(currentValue);

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [target, duration, startAnimation]);

    return (
        <span>
            {current}
            {suffix}
        </span>
    );
};

// Hook pro detekci visibility
const useIntersectionObserver = (options = {}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasBeenVisible, setHasBeenVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !hasBeenVisible) {
                setIsVisible(true);
                setHasBeenVisible(true);
            }
        }, {
            threshold: 0.3,
            ...options
        });

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [hasBeenVisible, options]);

    return [elementRef, isVisible];
};

// Jazykové konstanty
const translations = {
    cs: {
        nav: {
            pobytove: 'POBYTOVÉ ZÁJEZDY',
            individualni: 'INDIVIDUÁLNÍ ZÁJEZDY',
            program: 'ZÁJEZDY S PROGRAMEM',
            kontakt: 'KONTAKT'
        },
        hero: {
            title: 'Nezapomenutelné zájezdy do',
            titleHighlight: 'Jihoafrické republiky',
            subtitle: 'Objevte krásy Afriky s důvěryhodným partnerem. Více než 10 let zkušeností s organizací prémiových safari a kulturních zájezdů.',
            getOffer: 'Získat nabídku',
            viewTrips: 'Prohlédnout zájezdy',
            stats: {
                clients: 'Spokojených klientů',
                experience: 'Let zkušeností',
                satisfaction: 'Spokojenost'
            }
        },
        destinations: {
            title: 'Naše nejoblíbenější destinace',
            subtitle: 'Připravili jsme pro vás výběr nejlepších míst v Jihoafrické republice. Každý zájezd lze přizpůsobit vašim požadavkům.',
            learnMore: 'Zjistit více',
            pobytove: {
                title: 'Pobytové zájezdy',
                description: 'Zajistíme pro Vás v Jihoafrické republice exkluzivní pobyty na farmách v blízkosti měst Kimberley nebo Port Elizabeth s autentickou atmosférou africké přírody, v resortu Marina Sands s rekreačními domky na břehu Indického oceánu, nebo v luxusních apartmánech v Kapském městě s výhledem na oceán.',
                price: 'Od 65 000 Kč',
                duration: '7 dní / 6 nocí'
            },
            program: {
                title: 'Zájezdy s programem',
                description: 'Připravili jsme pro Vás pestrý 14denní zájezd kombinující nejkrásnější město JAR Cape Town s jeho pravou atmosférou přístavního města, autentické safari v národních parcích i na soukromých farmách Fijnbosch a Mayabana, plus relaxaci na břehu Indického oceánu pro dokonalé africké dobrodružství.',
                price: 'Od 55 000 Kč',
                duration: '6 dní / 5 nocí'
            },
            individualni: {
                title: 'Individuální zájezdy',
                description: 'Rádi vám dále sestavíme individuální zájezd podle vašich přání – od pracovních teambuildinových cest s konferenčním servisem a svateb včetně hostiny, přes forfaitové a golfové zájezdy, až po surfařské zájezdy s možností výuky, cesty za vínem a vinařstvím nebo safari dle vašich představ.',
                price: 'Od 48 000 Kč',
                duration: '8 dní / 7 nocí'
            }
        },
        contact: {
            title: 'Kontaktujte nás',
            subtitle: 'Rádi s vámi prodiskutujeme vaše představy o dokonalé dovolené v Jihoafrické republice',
            getOffer: 'Získejte nezávaznou nabídku',
            form: {
                name: 'Jméno a příjmení',
                email: 'Email',
                phone: 'Telefon',
                destination: 'Zajímá vás',
                message: 'Zpráva',
                submit: 'Odeslat poptávku',
                placeholder: 'Popište vaše představy o dovolené...',
                selectDestination: 'Vyberte destinaci',
                numberOfPeople: 'Počet osob',
                tripDateFrom: 'Termín zájezdu od',
                tripDateTo: 'Termín zájezdu do',
                gdprConsent: 'Souhlasím se zpracováním osobních údajů'
            }
        },
        footer: {
            description: 'Profesionální zájezdy do Jihoafrické republiky od roku 2008',
            copyright: '© 2024 AddoTours. Všechna práva vyhrazena.'
        }
    },
    en: {
        nav: {
            pobytove: 'ACCOMMODATION TOURS',
            individualni: 'INDIVIDUAL TOURS',
            program: 'PROGRAM TOURS',
            kontakt: 'CONTACT'
        },
        hero: {
            title: 'Unforgettable trips to',
            titleHighlight: 'South Africa',
            subtitle: 'Discover the beauty of Africa with a trusted partner. More than 10 years of experience organizing premium safari and cultural tours.',
            getOffer: 'Get Offer',
            viewTrips: 'View Tours',
            stats: {
                clients: 'Satisfied Clients',
                experience: 'Years of Experience',
                satisfaction: 'Satisfaction'
            }
        },
        destinations: {
            title: 'Our Most Popular Destinations',
            subtitle: 'We have prepared a selection of the best places in South Africa for you. Each tour can be customized to your requirements.',
            learnMore: 'Learn More',
            pobytove: {
                title: 'Accommodation Tours',
                description: 'We will arrange exclusive stays on farms near Kimberley or Port Elizabeth with authentic African nature atmosphere.',
                price: 'From 65,000 CZK',
                duration: '7 days / 6 nights'
            },
            program: {
                title: 'Program Tours',
                description: 'We have prepared a varied 14-day tour combining the most beautiful city of SA, Cape Town, with its true port city atmosphere.',
                price: 'From 55,000 CZK',
                duration: '6 days / 5 nights'
            },
            individualni: {
                title: 'Individual Tours',
                description: 'We will gladly create an individual tour according to your wishes - from corporate team building trips to surfing tours.',
                price: 'From 48,000 CZK',
                duration: '8 days / 7 nights'
            }
        },
        contact: {
            title: 'Contact Us',
            subtitle: 'We would be happy to discuss your ideas for the perfect vacation in South Africa',
            getOffer: 'Get a non-binding offer',
            form: {
                name: 'Name and Surname',
                email: 'Email',
                phone: 'Phone',
                destination: 'You are interested in',
                message: 'Message',
                submit: 'Send Inquiry',
                placeholder: 'Describe your vacation ideas...',
                selectDestination: 'Select destination',
                numberOfPeople: 'Number of people',
                tripDateFrom: 'Trip date from',
                tripDateTo: 'Trip date to',
                gdprConsent: 'I agree to the processing of personal data'
            }
        },
        footer: {
            description: 'Professional trips to South Africa since 2008',
            copyright: '© 2024 AddoTours. All rights reserved.'
        }
    }
};

interface Destination {
    id: string;
    title: string;
    description: string;
    features: string[];
    price: string;
    duration: string;
    gradient: string;
    tagColor: string;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    destination: string;
    message: string;
    numberOfPeople: string;
    tripDateFrom: string;
    tripDateTo: string;
    gdprConsent: boolean;
}

const AddoTours: React.FC = () => {
    const [language, setLanguage] = useState<'cs' | 'en'>('cs');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        destination: '',
        message: '',
        numberOfPeople: '',
        tripDateFrom: '',
        tripDateTo: '',
        gdprConsent: false
    });

    // Kalendář state
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDateType, setSelectedDateType] = useState(''); // 'from' nebo 'to'

    // Hook pro animované statistiky
    const [statsRef, isStatsVisible] = useIntersectionObserver();

    // Zkratka pro přístup k překladům
    const t = translations[language];

    useEffect(() => {
        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const backgroundImages = [
        'backgroundmain.jpg',
        'backgroundmain2.jpg',
        'backgroundmain3.jpg',
        'backgroundmain4.jpg'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [backgroundImages.length]);

    const scrollToSection = (sectionId: string): void => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    const handleNavigation = (section: string): void => {
        if (section === 'contact') {
            scrollToSection('contact');
        } else {
            switch (section) {
                case 'pobytove-zajezdy':
                    window.location.href = '/pobytove-zajezdy';
                    break;
                case 'individualni-zajezdy':
                    window.location.href = '/individualni-zajezdy';
                    break;
                case 'zajezdy-s-programem':
                    window.location.href = '/zajezdy-s-programem';
                    break;
                default:
                    scrollToSection(section);
            }
        }
        setIsMenuOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Kalendářové funkce
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return firstDay === 0 ? 6 : firstDay - 1; // Pondělí = 0
    };

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const handleDateSelect = (day) => {
        const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const formattedDate = formatDate(selectedDate);

        if (selectedDateType === 'from') {
            setFormData(prev => ({
                ...prev,
                tripDateFrom: formattedDate
            }));
        } else if (selectedDateType === 'to') {
            setFormData(prev => ({
                ...prev,
                tripDateTo: formattedDate
            }));
        }

        setShowCalendar(false);
    };

    const openCalendar = (dateType) => {
        setSelectedDateType(dateType);
        setShowCalendar(true);
    };

    const navigateMonth = (direction) => {
        setCurrentMonth(prev => {
            const newMonth = new Date(prev);
            newMonth.setMonth(prev.getMonth() + direction);
            return newMonth;
        });
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDay = getFirstDayOfMonth(currentMonth);
        const days = [];

        // Prázdné buňky pro dny před začátkem měsíce
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="p-2"></div>);
        }

        // Dny měsíce
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = new Date().toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString();
            days.push(
                <button
                    key={day}
                    type="button"
                    onClick={() => handleDateSelect(day)}
                    className={`p-2 text-sm rounded hover:bg-green-100 transition-colors ${
                        isToday ? 'bg-green-200 font-semibold' : 'hover:bg-stone-100'
                    }`}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    const monthNames = [
        'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
        'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
    ];

    const dayNames = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];

    const navItems = [
        { id: '1', label: t.nav.pobytove, section: 'pobytove-zajezdy' },
        { id: '2', label: t.nav.individualni, section: 'individualni-zajezdy' },
        { id: '3', label: t.nav.program, section: 'zajezdy-s-programem' },
        { id: '4', label: t.nav.kontakt, section: 'contact' }
    ];

    const destinations: Destination[] = [
        {
            id: '1',
            title: t.destinations.pobytove.title,
            description: t.destinations.pobytove.description,
            features: ['Safari', 'Luxury Lodge', 'Vymyslet'],
            price: t.destinations.pobytove.price,
            duration: t.destinations.pobytove.duration,
            gradient: 'from-green-700 to-green-900',
            tagColor: 'bg-amber-100 text-amber-800'
        },
        {
            id: '2',
            title: t.destinations.program.title,
            description: t.destinations.program.description,
            features: ['Wine Tasting', 'Gourmet', 'Adventure'],
            price: t.destinations.program.price,
            duration: t.destinations.program.duration,
            gradient: 'from-amber-600 to-amber-800',
            tagColor: 'bg-green-100 text-green-800'
        },
        {
            id: '3',
            title: t.destinations.individualni.title,
            description: t.destinations.individualni.description,
            features: ['Hunting', 'Scenic Route', 'Wildlife'],
            price: t.destinations.individualni.price,
            duration: t.destinations.individualni.duration,
            gradient: 'from-stone-600 to-stone-800',
            tagColor: 'bg-green-100 text-green-800'
        }
    ];

    const destinationImages = {
        '1': ['klubovna.png', 'pobytbeach.jpg', 'beach.jpg'],
        '2': ['wprogrammain.jpg', 'wprogrambridge.jpg', 'wprogramrides.jpg'],
        '3': ['indivimain.jpg', 'indiviwedding.jpg', 'indivigolf.jpg']
    };

    const [destinationImageIndexes, setDestinationImageIndexes] = useState<{[key: string]: number}>({
        '1': 0, '2': 0, '3': 0
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setDestinationImageIndexes(prev => ({
                '1': (prev['1'] + 1) % destinationImages['1'].length,
                '2': (prev['2'] + 1) % destinationImages['2'].length,
                '3': (prev['3'] + 1) % destinationImages['3'].length,
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Animované statistiky s číselnými hodnotami
    const stats = [
        { number: 500, suffix: '+', label: t.hero.stats.clients },
        { number: 14, suffix: '', label: t.hero.stats.experience },
        { number: 98, suffix: '%', label: t.hero.stats.satisfaction }
    ];

    return (
        <div className="min-h-screen bg-stone-50 font-sans">
            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isScrolled ? 'bg-stone-50/95 backdrop-blur-md shadow-lg' : 'bg-green-800'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <div className="w-16 h-16 overflow-hidden">
                                <img src="addotourslogo.png" alt="AddoTours logo" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <div className="hidden md:flex space-x-8">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigation(item.section)}
                                    className={`font-semibold transition-colors tracking-wide ${
                                        isScrolled ? 'text-stone-700 hover:text-green-700' : 'text-white hover:text-amber-200'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        {/* Language Switcher */}
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <button
                                    onClick={() => setLanguage(language === 'cs' ? 'en' : 'cs')}
                                    className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                                        isScrolled
                                            ? 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                                >
                                    <Globe size={16} />
                                    <span className="text-sm font-medium">{language.toUpperCase()}</span>
                                </button>
                            </div>

                            <button
                                className={`md:hidden transition-colors ${isScrolled ? 'text-stone-700' : 'text-white'}`}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className={`md:hidden border-t ${
                        isScrolled ? 'bg-stone-50/95 backdrop-blur-md' : 'bg-green-800'
                    }`}>
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigation(item.section)}
                                    className={`block px-3 py-2 w-full text-left transition-colors ${
                                        isScrolled ? 'text-stone-700 hover:text-green-700' : 'text-white hover:text-amber-200'
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
            <section
                id="home"
                className="pt-16 relative min-h-screen flex items-center overflow-hidden"
            >
                {/* Fade animace pro pozadí */}
                <div className="absolute inset-0">
                    {backgroundImages.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{
                                backgroundImage: `linear-gradient(rgba(45, 45, 45, 0.6), rgba(45, 45, 45, 0.4)), url('${image}')`
                            }}
                        />
                    ))}
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                {t.hero.title} <span className="text-amber-400">{t.hero.titleHighlight}</span>
                            </h1>
                            <p className="text-xl text-stone-200 mb-8 leading-relaxed font-light">
                                {t.hero.subtitle}
                            </p>

                            {/* Animované statistiky */}
                            <div
                                ref={statsRef}
                                className="grid grid-cols-3 gap-8 mb-8"
                            >
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="text-center transform transition-all duration-500"
                                        style={{
                                            transitionDelay: `${index * 200}ms`,
                                            opacity: isStatsVisible ? 1 : 0,
                                            transform: isStatsVisible ? 'translateY(0)' : 'translateY(20px)'
                                        }}
                                    >
                                        <div className="text-3xl font-bold text-amber-400">
                                            <AnimatedNumber
                                                target={stat.number}
                                                suffix={stat.suffix}
                                                duration={2000 + (index * 300)}
                                                startAnimation={isStatsVisible}
                                            />
                                        </div>
                                        <div className="text-sm text-stone-300 uppercase tracking-wide">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => scrollToSection('contact')}
                                    className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors shadow-lg"
                                >
                                    {t.hero.getOffer}
                                </button>
                                <button
                                    onClick={() => scrollToSection('destinations')}
                                    className="border-2 border-amber-400 text-amber-400 px-8 py-3 rounded-lg font-semibold hover:bg-amber-400 hover:text-stone-900 transition-colors"
                                >
                                    {t.hero.viewTrips}
                                </button>
                            </div>
                        </div>

                        <div className="relative lg:block hidden">
                            <div className="w-full h-96 bg-gradient-to-br from-green-700/20 to-amber-600/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center text-white text-8xl shadow-2xl">
                                🌍
                            </div>
                        </div>
                    </div>

                    {/* Image indicators */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {backgroundImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                    index === currentImageIndex ? 'bg-amber-400' : 'bg-white/50 hover:bg-white/70'
                                }`}
                                aria-label={`Přejít na obrázek ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Destinations Section */}
            <section
                id="destinations"
                className="py-20 relative"
                style={{
                    backgroundImage: `url('background-main2.png')`, // Váš obrázek zde
                    backgroundRepeat: 'repeat',
                    backgroundSize: '400px 400px', // Upravte podle velikosti vzoru
                    backgroundAttachment: 'fixed' // Paralax efekt (volitelné)
                }}
            >
                {/* Překryvná vrstva pro lepší čitelnost */}
                <div className="absolute inset-0 bg-stone-50/85"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-stone-800 mb-4">
                            {t.destinations.title}
                        </h2>
                        <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                            {t.destinations.subtitle}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {destinations.map((destination) => (
                            <div
                                key={destination.id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-stone-200 group hover:scale-105 cursor-pointer relative"
                            >
                                <div className="h-64 relative overflow-hidden">
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out"
                                        style={{
                                            backgroundImage: `url('${destinationImages[destination.id as keyof typeof destinationImages][destinationImageIndexes[destination.id]]}')`
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-black/20"></div>
                                    </div>

                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                                        {destinationImages[destination.id as keyof typeof destinationImages].map((_, index) => (
                                            <div
                                                key={index}
                                                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                                    index === destinationImageIndexes[destination.id] ? 'bg-white' : 'bg-white/50'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="p-6 group-hover:bg-stone-50 transition-colors duration-300 relative">
                                    <h3 className="text-xl font-semibold text-stone-800 mb-2 group-hover:text-green-700 transition-colors duration-300">
                                        {destination.title}
                                    </h3>
                                    <p className="text-stone-600 mb-4 group-hover:text-stone-700 transition-colors duration-300">
                                        {destination.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {destination.features.map((feature, featureIndex) => (
                                            <span
                                                key={featureIndex}
                                                className={`${destination.tagColor} px-3 py-1 rounded-full text-sm font-medium group-hover:scale-105 transition-transform duration-300`}
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="text-2xl font-bold text-green-700 group-hover:text-green-800 transition-colors duration-300">
                                            {destination.price}
                                        </div>
                                        <div className="text-stone-500 text-sm group-hover:text-stone-600 transition-colors duration-300">
                                            {destination.duration}
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                                        <button
                                            onClick={() => {
                                                if (destination.id === '1') window.location.href = '/pobytove-zajezdy';
                                                else if (destination.id === '2') window.location.href = '/zajezdy-s-programem';
                                                else if (destination.id === '3') window.location.href = '/individualni-zajezdy';
                                            }}
                                            className="w-full bg-green-700 text-white py-2 font-semibold hover:bg-green-800 transition-colors duration-200"
                                        >
                                            {t.destinations.learnMore}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section
                id="contact"
                className="py-20 relative"
                style={{
                    backgroundImage: `url('background-main2.png')`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '300px 300px',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="absolute inset-0 bg-stone-50/85"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-stone-800 mb-4">
                            {t.contact.title}
                        </h2>
                        <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                            {t.contact.subtitle}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-semibold text-stone-800 mb-8">
                                {t.contact.getOffer}
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-stone-800">Telefon:</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-stone-800">Email:</div>
                                        <div className="text-stone-600">info@addotours.cz</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rozšířený formulář */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-200 relative">
                            <form
                                action="https://formsubmit.co/expertflo51@gmail.com"
                                method="POST"
                                className="space-y-6"
                            >
                                {/* FormSubmit skryté pole pro konfiguraci */}
                                <input type="hidden" name="_subject" value="Nová poptávka z webu AddoTours" />
                                <input type="hidden" name="_next" value="/dekujeme" />
                                <input type="hidden" name="_captcha" value="false" />
                                <input type="hidden" name="_template" value="table" />

                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                                        {t.contact.form.name} *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                                        {t.contact.form.email} *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="destination" className="block text-sm font-medium text-stone-700 mb-2">
                                        {t.contact.form.destination}
                                    </label>
                                    <select
                                        id="destination"
                                        name="destination"
                                        value={formData.destination}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent"
                                    >
                                        <option value="">{t.contact.form.selectDestination}</option>
                                        <option value="pobytove">{t.destinations.pobytove.title}</option>
                                        <option value="individualni">{t.destinations.individualni.title}</option>
                                        <option value="program">{t.destinations.program.title}</option>
                                    </select>
                                </div>

                                {/* Nové pole: Počet osob */}
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
                                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent"
                                    />
                                </div>

                                {/* Termín zájezdu od-do s kalendářem */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="tripDateFrom" className="block text-sm font-medium text-stone-700 mb-2">
                                            {language === 'cs' ? 'Termín zájezdu od' : 'Trip date from'}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="tripDateFrom"
                                                name="tripDateFrom"
                                                value={formData.tripDateFrom}
                                                readOnly
                                                placeholder={language === 'cs' ? 'Vyberte datum' : 'Select date'}
                                                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent cursor-pointer"
                                                onClick={() => openCalendar('from')}
                                            />
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400">
                                                📅
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="tripDateTo" className="block text-sm font-medium text-stone-700 mb-2">
                                            {language === 'cs' ? 'Termín zájezdu do' : 'Trip date to'}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="tripDateTo"
                                                name="tripDateTo"
                                                value={formData.tripDateTo}
                                                readOnly
                                                placeholder={language === 'cs' ? 'Vyberte datum' : 'Select date'}
                                                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent cursor-pointer"
                                                onClick={() => openCalendar('to')}
                                            />
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400">
                                                📅
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                                        {t.contact.form.message}
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent"
                                        placeholder={t.contact.form.placeholder}
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
                                    disabled={!formData.gdprConsent}
                                    className={`w-full px-8 py-3 rounded-lg font-semibold transition-colors ${
                                        formData.gdprConsent
                                            ? 'bg-green-700 text-white hover:bg-green-800'
                                            : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                                    }`}
                                >
                                    {t.contact.form.submit}
                                </button>
                            </form>

                            {/* Kalendář overlay */}
                            {showCalendar && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <button
                                                type="button"
                                                onClick={() => navigateMonth(-1)}
                                                className="p-2 hover:bg-stone-100 rounded"
                                            >
                                                ←
                                            </button>
                                            <h3 className="text-lg font-semibold">
                                                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() => navigateMonth(1)}
                                                className="p-2 hover:bg-stone-100 rounded"
                                            >
                                                →
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-7 gap-1 mb-2">
                                            {dayNames.map(day => (
                                                <div key={day} className="p-2 text-center text-sm font-medium text-stone-600">
                                                    {day}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-7 gap-1">
                                            {renderCalendar()}
                                        </div>

                                        <div className="flex justify-end mt-4 space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => setShowCalendar(false)}
                                                className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded"
                                            >
                                                {language === 'cs' ? 'Zrušit' : 'Cancel'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-green-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 overflow-hidden">
                            <img
                                src="addotourslogo.png"
                                alt="AddoTours logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <p className="text-green-100 mb-4">
                        {language === 'cs'
                            ? 'Profesionální zájezdy do Jihoafrické republiky od roku 2008'
                            : 'Professional trips to South Africa since 2008'
                        }
                    </p>
                    <p className="text-stone-300 text-sm">
                        {language === 'cs'
                            ? '© 2024 AddoTours. Všechna práva vyhrazena.'
                            : '© 2024 AddoTours. All rights reserved.'
                        }
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default AddoTours;
import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Camera, Check, Calendar, X, ChevronLeft, ChevronRight, Globe, Menu, Clock, MapIcon, Plane } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    numberOfPeople: string;
    tripDateFrom: string;
    tripDateTo: string;
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

const KvetinovaCestaSafari: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        numberOfPeople: '',
        tripDateFrom: '',
        tripDateTo: '',
        message: '',
        gdprConsent: false
    });

    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [selectedDateType, setSelectedDateType] = useState<string>('');
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>('cs');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [showGallery, setShowGallery] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [currentGalleryImages, setCurrentGalleryImages] = useState<string[]>([]);
    const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1, 2])); // First two days expanded by default

    // Scroll effect for navigation
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Program interaction functions
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
        { id: 'pobytove', label: 'POBYTOVÉ ZÁJEZDY', href: '/pobytove-zajezdy' },
        { id: 'individualni', label: 'INDIVIDUÁLNÍ ZÁJEZDY', href: '/individualni-zajezdy' },
        { id: 'programem', label: 'ZÁJEZDY S PROGRAMEM', href: '/zajezdy-s-programem' },
        { id: 'kontakt', label: 'KONTAKT', href: '/kontakt' }
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
        'bgafrica.png',
        'beach.jpg',
        'klubovna.png',
        'pobytbeach.jpg',
        'pensioncapetown.jpg',
        'background-main2.png'
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

    // Calendar functions
    const getDaysInMonth = (date: Date): number => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date): number => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return firstDay === 0 ? 6 : firstDay - 1;
    };

    const formatDate = (date: Date): string => {
        return date.toISOString().split('T')[0];
    };

    const handleDateSelect = (day: number) => {
        const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const formattedDate = formatDate(selectedDate);

        if (selectedDateType === 'from') {
            setFormData(prev => ({ ...prev, tripDateFrom: formattedDate }));
        } else if (selectedDateType === 'to') {
            setFormData(prev => ({ ...prev, tripDateTo: formattedDate }));
        }

        setShowCalendar(false);
    };

    const openCalendar = (dateType: string) => {
        setSelectedDateType(dateType);
        setShowCalendar(true);
    };

    const navigateMonth = (direction: number) => {
        setCurrentMonth(prev => {
            const newMonth = new Date(prev);
            newMonth.setMonth(prev.getMonth() + direction);
            return newMonth;
        });
    };

    const renderCalendar = (): React.ReactElement[] => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDay = getFirstDayOfMonth(currentMonth);
        const days: React.ReactElement[] = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="p-2"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = new Date().toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString();
            days.push(
                <button
                    key={day}
                    type="button"
                    onClick={() => handleDateSelect(day)}
                    className={`p-2 text-sm rounded hover:bg-emerald-100 transition-colors ${
                        isToday ? 'bg-emerald-200 font-semibold' : 'hover:bg-stone-100'
                    }`}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    const monthNames: string[] = [
        'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
        'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
    ];

    const dayNames: string[] = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];

    // Program zájezdu
    const program: DayProgram[] = [
        {
            day: 1,
            title: 'Odlet z Prahy',
            description: 'Odlet z Prahy (PRG) do Cape Town (CPT)',
            highlights: ['Odlet z letiště Václava Havla', 'Přestup v mezinárodním uzlu', 'Let do Jihoafrické republiky'],
            type: 'travel'
        },
        {
            day: 2,
            title: 'Přílet do CPT',
            description: 'Přílet do CPT a přesun s delegátem na ubytování. Návštěva předměstí a pláže Camps Bay, výlet lanovkou na Stolovou horu, procházka přístavem s možností nákupů v centru Victoria Wharf Waterfront. Večeře.',
            highlights: ['Přílet a přesun na ubytování', 'Camps Bay pláž', 'Lanovka na Stolovou horu', 'Victoria Wharf Waterfront', 'Večeře'],
            type: 'sightseeing'
        },
        {
            day: 3,
            title: 'Hout Bay a Mys Dobré naděje',
            description: 'Snídaně, Hout Bay – přístav, Seal Cruise, návštěva předměstí Simon\'s Town s velkou kolonií tučňáků, Mys Dobré naděje, trh s africkými suvenýry, večeře.',
            highlights: ['Hout Bay přístav', 'Seal Cruise', 'Kolonie tučňáků v Simon\'s Town', 'Mys Dobré naděje', 'Africký trh se suvenýry'],
            type: 'adventure'
        },
        {
            day: 4,
            title: 'Botanická zahrada a akvárium',
            description: 'Snídaně, celodenní program, který zahrnuje prohlídku botanické zahrady Kirstenbosh National Botanical Garden, Camps Bay, Signální horu, Waterfront, mořské akvárium. Večeře v zážitkové restauraci.',
            highlights: ['Kirstenbosh National Botanical Garden', 'Camps Bay', 'Signální hora', 'Waterfront', 'Mořské akvárium'],
            type: 'sightseeing'
        },
        {
            day: 5,
            title: 'Vinařské oblasti',
            description: 'Snídaně, přejezd a návštěva vinařské oblasti. Ochutnávky vín a specialit v oblasti Stellenbosch a Franchhoek, večeře Stellenbosch, návrat do Cape Town ve večerních hodinách.',
            highlights: ['Stellenbosch vinařská oblast', 'Ochutnávky vín a specialit', 'Franschhoek oblast', 'Večeře ve Stellenbosch'],
            type: 'sightseeing'
        },
        {
            day: 6,
            title: 'Přelet na farmu Fijnbosch',
            description: 'Snídaně a přelet v dopoledních hodinách z Cape Town do Port Elizabeth, přejezd na naší farmu Fijnbosch v blízkosti Indického oceánu, odpolední safari na farmě, africká večeře.',
            highlights: ['Přelet z Cape Town do Port Elizabeth', 'Příjezd na farmu Fijnbosch', 'Odpolední safari na farmě', 'Africká večeře'],
            type: 'safari'
        },
        {
            day: 7,
            title: 'Jeffreys Bay aktivity',
            description: 'Aktivity v okolí města Jeffreys Bay (procházky po městě Jeffreys Bay, Paradise Beach, Marina Martinique - pobyt u Indického oceánu).',
            highlights: ['Procházky po Jeffreys Bay', 'Paradise Beach', 'Marina Martinique', 'Pobyt u Indického oceánu'],
            type: 'adventure'
        },
        {
            day: 8,
            title: 'Volné aktivity Jeffreys Bay',
            description: 'Celodenní aktivity v okolí města Jeffreys Bay dle individuální dohody s delegátem. Možnost ocean safari, jízdy na koních, rybaření, nakupování, pobyt na pláži apod.',
            highlights: ['Ocean safari (možnost)', 'Jízdy na koních', 'Rybaření', 'Nakupování', 'Pobyt na pláži'],
            type: 'adventure'
        },
        {
            day: 9,
            title: 'Tsitsikama národní park',
            description: 'Celodenní výlet do Tsitsikama národního parku s návštěvou záchranné stanice slonů, opičího parku Monkey land, Tsitsikama bungee jumping, večeře v městě Jeffreys Bay.',
            highlights: ['Záchranná stanice slonů', 'Opičí park Monkey Land', 'Tsitsikama bungee jumping', 'Večeře v Jeffreys Bay'],
            type: 'adventure'
        },
        {
            day: 10,
            title: 'Sibuya Game Reserve',
            description: 'Brzká snídaně, odjezd na celodenní safari do rezervace SIBUYA GAME RESERVE.',
            highlights: ['Brzká snídaně', 'Celodenní safari', 'Rezervace Sibuya Game Reserve', 'Pozorování zvířat'],
            type: 'safari'
        },
        {
            day: 11,
            title: 'Addo Elephant Park a Schotia',
            description: 'Brzká snídaně, prohlídka sloního parku ADDO ELEPHANT NATIONAL PARK a odpolední safari v soukromé rezervaci Schotia se stylovou večeří.',
            highlights: ['Addo Elephant National Park', 'Pozorování slonů', 'Safari v rezervaci Schotia', 'Stylová večeře'],
            type: 'safari'
        },
        {
            day: 12,
            title: 'Farma Mayabana',
            description: 'Snídaně, přejezd na farmu Mayabana, oběd na farmě Mayabana, projížďka po farmě, večeře v pravé africké přírodě',
            highlights: ['Přejezd na farmu Mayabana', 'Oběd na farmě', 'Projížďka po farmě', 'Večeře v africké přírodě'],
            type: 'safari'
        },
        {
            day: 13,
            title: 'Odlet z JAR',
            description: 'Snídaně na farmě Fijnbosch, odjezd na letiště, odlet z Cape Town nebo Port Elizabeth',
            highlights: ['Snídaně na farmě Fijnbosch', 'Odjezd na letiště', 'Odlet z Cape Town nebo Port Elizabeth'],
            type: 'departure'
        },
        {
            day: 14,
            title: 'Přílet do ČR',
            description: 'Přílet do ČR.',
            highlights: ['Přílet do Prahy', 'Ukončení zájezdu'],
            type: 'travel'
        }
    ];

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
                                        isScrolled ? 'text-stone-700 hover:text-green-700' : 'text-black hover:text-amber-200'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <button
                                    onClick={() => setLanguage(language === 'cs' ? 'en' : 'cs')}
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
                                        isScrolled ? 'text-stone-700 hover:text-green-700' : 'text-black hover:text-amber-200'
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
            <section id="hero" className="pt-16 relative overflow-hidden h-screen flex items-center">
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
                        <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            Květinová cesta a safari
                        </h1>
                        <p className="text-xl lg:text-2xl text-emerald-100 mb-4">
                            14denní zájezd do Jihoafrické republiky
                        </p>
                        <p className="text-lg text-emerald-200 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Objevte krásu JAR na našem nejoblíbenějším zájezdu kombinujícím Kapské město,
                            safari na farmách a nezapomenutelné zážitky v africké přírodě
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={() => {
                                    const element = document.getElementById('contact-form');
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="bg-amber-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Rezervovat zájezd
                            </button>
                            <button
                                onClick={() => openGallery(tripGallery, 0)}
                                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-emerald-800 transition-all duration-300"
                            >
                                Prohlédnout fotky
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
                            Program zájezdu
                        </h2>
                        <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-8">
                            Detailní program 14denního zájezdu Květinová cesta a safari
                        </p>

                        {/* Marketing highlights */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                                <Camera size={16} />
                                <span>5+ Safari expedice</span>
                            </div>
                            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                                <MapPin size={16} />
                                <span>12 destinací</span>
                            </div>
                            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                                <Clock size={16} />
                                <span>14 nezapomenutelných dní</span>
                            </div>
                        </div>

                        {/* View controls */}
                        <div className="flex justify-center space-x-4 mb-8">
                            <button
                                onClick={expandAllDays}
                                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                            >
                                Rozbalit vše
                            </button>
                            <button
                                onClick={collapseAllDays}
                                className="bg-stone-600 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors text-sm font-medium"
                            >
                                Sbalit vše
                            </button>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="max-w-5xl mx-auto">
                        {program.map((day, index) => (
                            <div key={day.day} className="relative flex items-start mb-8 last:mb-0">
                                {/* Timeline line - pouze pokud není poslední prvek */}
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
                                        <div className="text-xs text-stone-500">den</div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`flex-grow bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200 transition-all duration-500 hover:shadow-xl cursor-pointer ${
                                    expandedDays.has(day.day) ? 'bg-gradient-to-br from-white to-emerald-50/50 border-emerald-200' : ''
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
                                                {day.highlights.length} aktivit
                                            </div>
                                            <div className="flex space-x-1">
                                                {day.highlights.slice(0, 2).map((_, idx) => (
                                                    <div key={idx} className="w-2 h-2 bg-emerald-400 rounded-full"></div>
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
                                            {(day.type === 'safari' || day.day === 2 || day.day === 6) && (
                                                <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                                    <div className="text-xs text-emerald-800 font-medium">
                                                        {day.type === 'safari' ? '🦁 Vrchol zájezdu! Safari s profesionálním průvodcem' :
                                                            day.day === 2 ? '✨ První den plný objevování v Kapském městě' :
                                                                '🌟 Začínek nezapomenutelné safari adventure'}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Statistics summary */}
                    <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 mt-16 text-white">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold mb-2">Váš zájezd v číslech</h3>
                            <p className="text-emerald-100">Co vás čeká během 14 dní dobrodružství</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">5+</div>
                                <div className="text-sm text-emerald-100">Safari expedic</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">3</div>
                                <div className="text-sm text-emerald-100">Národní parky</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">12</div>
                                <div className="text-sm text-emerald-100">Destinací</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">100%</div>
                                <div className="text-sm text-emerald-100">Nezapomenutelné</div>
                            </div>
                        </div>
                    </div>

                    {/* Important Note */}
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mt-8">
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-white text-sm font-bold">!</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-amber-800 mb-2">Poznámka k programu:</h4>
                                <p className="text-amber-700 text-sm leading-relaxed">
                                    Jednotlivé naplánované aktivity, zejména výlety lanovkou, lodí atd. lze individuálně měnit
                                    po dohodě s průvodcem a zároveň mohou být přeloženy průvodcem z důvodu nepříznivých klimatických podmínek.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA at the end of program */}
                    <div className="text-center mt-12">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-200 max-w-2xl mx-auto">
                            <h3 className="text-2xl font-bold text-stone-800 mb-4">Připraveni na dobrodružství?</h3>
                            <p className="text-stone-600 mb-6">
                                Tento program je pouze začátek. Každý den přinese nové objevy a nezapomenutelné zážitky.
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
                                Rezervovat tento zájezd
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
                        <h2 className="text-4xl font-bold text-stone-800 mb-6">Co zahrnuje cena</h2>
                        <p className="text-xl text-stone-600">Transparentní přehled toho, co je a není zahrnuto v ceně zájezdu</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Zahrnuje */}
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                                    <Check className="text-white" size={20} />
                                </div>
                                <h3 className="text-2xl font-bold text-green-800">Cena zahrnuje</h3>
                            </div>

                            <div className="space-y-3">
                                {[
                                    'Ubytování po celou dobu pobytu',
                                    'Veškeré transfery a doprava',
                                    'VIP průvodce 24/7',
                                    'Snídaně každý den',
                                    'Polopenzi na farmě',
                                    'Safari na farmě Fijnbosch',
                                    'Safari na farmě Mayabana',
                                    'Všechny uvedené výlety'
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3">
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
                                <h3 className="text-2xl font-bold text-red-800">Cena nezahrnuje</h3>
                            </div>

                            <div className="space-y-3">
                                {[
                                    'Letenky Praha - Kapské město',
                                    'Zdravotní pojištění',
                                    'Vstupné do muzeí a atrakcí',
                                    'Obědy a večeře mimo farmu',
                                    'Alkoholické nápoje',
                                    'Osobní výdaje a suvenýry',
                                    'Spropitné',
                                    'Volitelné aktivity'
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <X size={16} className="text-red-600 flex-shrink-0" />
                                        <span className="text-red-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="text-center mt-12">
                        <button
                            onClick={() => {
                                const element = document.getElementById('contact-form');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            className="bg-emerald-600 text-white px-12 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg text-lg"
                        >
                            Rezervovat tento zájezd
                        </button>
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
                        <h2 className="text-4xl font-bold text-stone-800 mb-4">Rezervace zájezdu</h2>
                        <p className="text-xl text-stone-600">
                            Vyplňte formulář a my vám připravíme nezávaznou nabídku na míru
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-stone-200 relative">
                        <form
                            action="https://formsubmit.co/expertflo51@gmail.com"
                            method="POST"
                            className="space-y-6"
                        >
                            <input type="hidden" name="_subject" value="Rezervace zájezdu: Květinová cesta a safari" />
                            <input type="hidden" name="_next" value="https://adotours.vercel.app/dekujeme" />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_template" value="table" />
                            <input type="hidden" name="zajezd" value="Květinová cesta a safari - 14 dní" />

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                                    Jméno a příjmení *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-stone-700"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-stone-700"
                                />
                            </div>

                            <div>
                                <label htmlFor="numberOfPeople" className="block text-sm font-medium text-stone-700 mb-2">
                                    Počet osob *
                                </label>
                                <input
                                    type="number"
                                    id="numberOfPeople"
                                    name="numberOfPeople"
                                    value={formData.numberOfPeople}
                                    onChange={handleInputChange}
                                    min="1"
                                    max="20"
                                    required
                                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-stone-700"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="tripDateFrom" className="block text-sm font-medium text-stone-700 mb-2">
                                        Preferovaný termín od
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="tripDateFrom"
                                            name="tripDateFrom"
                                            value={formData.tripDateFrom}
                                            readOnly
                                            placeholder="Vyberte datum"
                                            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent cursor-pointer text-stone-700"
                                            onClick={() => openCalendar('from')}
                                        />
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400">
                                            📅
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="tripDateTo" className="block text-sm font-medium text-stone-700 mb-2">
                                        Preferovaný termín do
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="tripDateTo"
                                            name="tripDateTo"
                                            value={formData.tripDateTo}
                                            readOnly
                                            placeholder="Vyberte datum"
                                            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent cursor-pointer text-stone-700"
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
                                    Vaše zpráva
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-stone-700"
                                    placeholder="Máte nějaké speciální požadavky nebo dotazy k tomuto zájezdu?"
                                />
                            </div>

                            <div className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    id="gdprConsent"
                                    name="gdprConsent"
                                    checked={formData.gdprConsent}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-600 border-stone-300 rounded"
                                />
                                <label htmlFor="gdprConsent" className="text-sm text-stone-700">
                                    Souhlasím se zpracováním osobních údajů pro účely této rezervace *
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={!formData.gdprConsent}
                                className={`w-full px-8 py-4 rounded-lg font-semibold transition-colors text-lg ${
                                    formData.gdprConsent
                                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'
                                        : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                                }`}
                            >
                                Odeslat rezervaci
                            </button>
                        </form>

                        {/* Calendar Modal */}
                        {showCalendar && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-2xl">
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
                                        {dayNames.map((day: string) => (
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
                                            Zrušit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="bg-stone-900 text-white py-16 relative"
                style={{
                    backgroundImage: "url('bgafrica.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="absolute inset-0 bg-stone-900/85"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div>
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-emerald-600 p-2">
                                    <img src="addotourslogo.png" alt="AddoTours" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-2xl font-bold">AddoTours</span>
                            </div>
                            <p className="text-stone-300 mb-6 leading-relaxed">
                                Profesionální zájezdy do Jihoafrické republiky od roku 2008.
                                Vytváříme nezapomenutelné zážitky na míru.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-6">Rychlý kontakt</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 group">
                                    <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <div className="text-stone-300">+420 602 256 246</div>
                                        <div className="text-stone-400 text-sm">Ing. Petr Havel</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 group">
                                    <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <span className="text-stone-300">addotours@email.cz</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-6">Rychlé odkazy</h3>
                            <ul className="space-y-3">
                                {['Všechny zájezdy', 'Individuální zájezdy', 'Zájezdy s programem', 'Fotogalerie', 'O nás'].map((link: string) => (
                                    <li key={link}>
                                        <a href="#" className="text-stone-300 hover:text-emerald-400 transition-colors flex items-center group">
                                            <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3 group-hover:bg-emerald-400 transition-colors"></span>
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-stone-800 mt-12 pt-8 text-center">
                        <p className="text-stone-400">
                            © 2024 AddoTours. Všechna práva vyhrazena.
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
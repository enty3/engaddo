import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Mail, Star, Users, Car, Camera, Send, ExternalLink, Check, Heart, Wifi, Utensils, Waves, Mountain, TreePine, Calendar, User, MessageCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';

const PobytovenZajezdy = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        accommodation: '',
        numberOfPeople: '',
        tripDateFrom: '',
        tripDateTo: '',
        message: '',
        gdprConsent: false
    });

    const [activeAccommodation, setActiveAccommodation] = useState('fijnbosch');
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDateType, setSelectedDateType] = useState('');

    // Gallery modal states
    const [showGallery, setShowGallery] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentGalleryImages, setCurrentGalleryImages] = useState([]);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = e.target.checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Gallery functions
    const openGallery = (images, startIndex = 0) => {
        setCurrentGalleryImages(images);
        setCurrentImageIndex(startIndex);
        setShowGallery(true);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeGallery = () => {
        setShowGallery(false);
        document.body.style.overflow = 'unset';
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === currentGalleryImages.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? currentGalleryImages.length - 1 : prev - 1
        );
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    // Handle keyboard navigation
    React.useEffect(() => {
        const handleKeyPress = (e) => {
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

    // Kalendářové funkce
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return firstDay === 0 ? 6 : firstDay - 1;
    };

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const handleDateSelect = (day) => {
        const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const formattedDate = formatDate(selectedDate);

        if (selectedDateType === 'from') {
            setFormData(prev => ({ ...prev, tripDateFrom: formattedDate }));
        } else if (selectedDateType === 'to') {
            setFormData(prev => ({ ...prev, tripDateTo: formattedDate }));
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

    const monthNames = [
        'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
        'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
    ];

    const dayNames = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.gdprConsent) {
            alert('Musíte souhlasit se zpracováním osobních údajů');
            return;
        }
        console.log('Form submitted:', formData);
        alert('Poptávka byla odeslána! Brzy se vám ozveme.');
    };

    const accommodations = [
        {
            id: 'fijnbosch',
            name: 'Farma FIJNBOSCH',
            icon: TreePine,
            subtitle: 'Exkluzivní pobyt na luxusní farmě uprostřed africké přírody mezi zvířaty',
            image: 'klubovna.png',
            gallery: ['pobytbeach.jpg', 'klubovna.png', 'beach.jpg'],
            description: 'Farma leží 70 km od letiště Port Elizabeth, 7 km od centra městečka Jeffreys Bay, které je jednou z nejlepších surfařských destinací na světě. Modré moře (indický oceán) a nekonečné písčité pláže oceánu každý vodomilovný nadšenec.',
            features: ['Safari na farmě', 'Luxusní ubytování', 'Africký styl', 'Pozorování zvířat'],
            pricing: [
                { type: 'Pobyt se snídaní', price: '1625', eur: '65', zar: '1000', period: 'osoba/den', color: 'emerald' },
                { type: 'Pobyt s polopenzí', price: '1925', eur: '77', zar: '1280', period: 'osoba/den', color: 'amber' },
                { type: 'Pobyt s plnou penzí', price: '2185', eur: '85', zar: '1480', period: 'osoba/den', color: 'blue' }
            ],
            note: 'V ceně je zahrnutý jednodenní pobyt se stravou dle kategorie, služby průvodce, safari na farmě. Cena nezahrnuje letenky.'
        },
        {
            id: 'marina',
            name: 'MARINA SANDS',
            icon: Waves,
            subtitle: 'Ubytování v rekreačních domech v Jeffreys Bay na břehu Indického oceánu',
            image: 'beach.jpg',
            gallery: ['marina1.jpg', 'marina2.jpg', 'marina3.jpg', 'marina4.jpg'],
            description: 'Rekreační domy 70 km od letiště v Port Elizabeth leží na břehu Indického oceánu městečko Jeffreys Bay. Na kraji městečka Jeffreys Bay pár kroků od pláží Indického oceánu na Vás čekají 4 rekreační domy.',
            features: ['Přímý přístup k pláži', 'Celý dům pro 8 lidí', 'Vlastní kuchyň', 'Výhled na oceán'],
            pricing: [
                { type: 'Celý dům pro 8 lidí', price: '4000', eur: '160', zar: '2600', period: 'za den', color: 'blue' }
            ],
            note: 'V ceně na Booking je zahrnutí pronájmu celého domu. Cena nezahrnuje letenky.'
        },
        {
            id: 'capetown',
            name: 'Penzion Kapské město',
            icon: Mountain,
            subtitle: 'Ubytování v Bed and Breakfast penzionu v Kapském městě',
            image: 'pensioncapetown.jpg',
            gallery: ['capetown1.jpg', 'capetown2.jpg', 'capetown3.jpg', 'capetown4.jpg'],
            description: 'Kapské Město (Cape Town) je druhé největší město Jihoafrické republiky. Sídlí tu jihoafrický parlament a další vládní instituce.',
            features: ['Snídaně v ceně', 'Transfer z/na letiště', 'Centrum města', 'Výhled na Stolovou horu'],
            pricing: [
                { type: 'Apartmá pro 4 osoby se snídaní', price: '1380', eur: '55', zar: '950', period: 'osoba/den', color: 'purple' }
            ],
            note: 'V ceně je zahrnut pronájem apartmánu, snídaně, transfer z/na letiště. Cena nezahrnuje letenky.'
        }
    ];

    const activeAccommodationData = accommodations.find(acc => acc.id === activeAccommodation);

    // Gallery Modal Component
    const GalleryModal = () => {
        if (!showGallery) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-95 z-[100] flex items-center justify-center">
                {/* Close button */}
                <button
                    onClick={closeGallery}
                    className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2 transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Navigation buttons */}
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

                {/* Main image */}
                <div className="max-w-7xl max-h-full mx-4">
                    <img
                        src={currentGalleryImages[currentImageIndex]}
                        alt={`Gallery image ${currentImageIndex + 1}`}
                        className="max-w-full max-h-[80vh] object-contain"
                    />
                </div>

                {/* Image counter */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full">
                    {currentImageIndex + 1} / {currentGalleryImages.length}
                </div>

                {/* Thumbnail navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto px-4">
                    {currentGalleryImages.map((img, index) => (
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
        <div className="min-h-screen bg-stone-50">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-stone-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => window.history.back()}
                                className="flex items-center space-x-2 text-stone-700 hover:text-emerald-700 transition-colors group"
                            >
                                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="font-medium">Zpět</span>
                            </button>
                            <div className="h-8 w-px bg-stone-300"></div>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-lg overflow-hidden">
                                    <img src="addotourslogo.png" alt="AddoTours" className="w-full h-full object-cover" />
                                </div>
                                <span className="font-bold text-stone-800 text-lg">AddoTours</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 bg-emerald-50 px-4 py-2 rounded-full">
                            <Phone size={16} className="text-emerald-700" />
                            <span className="text-stone-700 font-medium">+420 224 567 890</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-16 relative overflow-hidden h-screen flex items-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('backgroundmain.jpg')"
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/10"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            Pobytové zájezdy
                        </h1>
                        <p className="text-xl lg:text-2xl text-emerald-100 mb-4">
                            v Jihoafrické republice
                        </p>
                        <p className="text-lg text-emerald-200 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Objevte krásu JAR v našich pečlivě vybraných ubytováních - od autentických farem
                            přes oceanfront domy až po luxusní apartmány v Kapském městě
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                                className="bg-amber-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Získat nabídku na míru
                            </button>
                            <button
                                onClick={() => document.getElementById('accommodations').scrollIntoView({ behavior: 'smooth' })}
                                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-emerald-800 transition-all duration-300"
                            >
                                Prohlédnout ubytování
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Accommodation Tabs */}
            <section className="py-8 bg-white sticky top-16 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center space-x-2 md:space-x-4">
                        {accommodations.map((acc) => {
                            const IconComponent = acc.icon;
                            return (
                                <button
                                    key={acc.id}
                                    onClick={() => setActiveAccommodation(acc.id)}
                                    className={`flex items-center space-x-2 px-4 md:px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                        activeAccommodation === acc.id
                                            ? 'bg-emerald-600 text-white shadow-lg scale-105'
                                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                                    }`}
                                >
                                    <IconComponent size={18} />
                                    <span className="hidden sm:inline">{acc.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Dynamic Accommodation Section */}
            <section id="accommodations" className="py-20 bg-stone-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left Column - Image and Gallery */}
                        <div className="space-y-6">
                            <div
                                className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                                onClick={() => openGallery([activeAccommodationData.image, ...activeAccommodationData.gallery], 0)}
                            >
                                <img
                                    src={activeAccommodationData.image}
                                    alt={activeAccommodationData.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/40 transition-colors"></div>
                                <div className="absolute top-4 right-4 bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="text-white" size={20} />
                                </div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h2 className="text-3xl lg:text-4xl font-bold mb-2">
                                        {activeAccommodationData.name}
                                    </h2>
                                    <p className="text-lg text-stone-200">
                                        {activeAccommodationData.subtitle}
                                    </p>
                                </div>
                            </div>

                            {/* Gallery */}
                            <div className="grid grid-cols-4 gap-3">
                                {activeAccommodationData.gallery.map((img, index) => (
                                    <div
                                        key={index}
                                        className="relative h-20 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity group"
                                        onClick={() => openGallery([activeAccommodationData.image, ...activeAccommodationData.gallery], index + 1)}
                                    >
                                        <img
                                            src={img}
                                            alt={`${activeAccommodationData.name} ${index + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Content */}
                        <div className="space-y-8">
                            {/* Description */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="text-2xl font-bold text-stone-800 mb-6">O ubytování</h3>
                                <p className="text-stone-600 leading-relaxed mb-6">
                                    {activeAccommodationData.description}
                                </p>

                                {/* Features */}
                                <div className="grid grid-cols-2 gap-3">
                                    {activeAccommodationData.features.map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-2 text-sm">
                                            <Check size={16} className="text-emerald-600" />
                                            <span className="text-stone-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="bg-amber-50 rounded-2xl p-8 shadow-lg">
                                <h4 className="text-xl font-bold text-amber-800 mb-6">Ceník</h4>
                                <div className="space-y-4">
                                    {activeAccommodationData.pricing.map((price, index) => (
                                        <div key={index} className={`bg-${price.color}-600 text-white p-6 rounded-xl`}>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-semibold text-lg">{price.type}</span>
                                                <span className="text-2xl font-bold">{price.price} Kč</span>
                                            </div>
                                            <div className={`text-${price.color}-100 text-sm mb-1`}>
                                                {price.eur} EUR • {price.zar} ZAR
                                            </div>
                                            <div className={`text-${price.color}-200 text-xs`}>
                                                ({price.period})
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm text-amber-700 mt-6 italic leading-relaxed">
                                    {activeAccommodationData.note}
                                </p>
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg"
                            >
                                Zaslat poptávku
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section id="contact-form" className="py-20 bg-gradient-to-br from-emerald-800 to-emerald-900 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">Zaslat poptávku</h2>
                        <p className="text-xl text-emerald-100">
                            Vyplňte formulář a my vám připravíme nezávaznou nabídku na míru
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl relative">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                                        Jméno a příjmení *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm text-stone-800 border border-white/30 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm text-stone-800 border border-white/30 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                                        Telefon
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm text-stone-800 border border-white/30 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="accommodation" className="block text-sm font-medium text-white mb-2">
                                        Preferované ubytování
                                    </label>
                                    <select
                                        id="accommodation"
                                        name="accommodation"
                                        value={formData.accommodation}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm text-stone-800 border border-white/30 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                                    >
                                        <option value="">Vyberte ubytování</option>
                                        <option value="fijnbosch">Farma Fijnbosch</option>
                                        <option value="marina">Marina Sands</option>
                                        <option value="capetown">Kapské město</option>
                                        <option value="combination">Kombinace více ubytování</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="numberOfPeople" className="block text-sm font-medium text-white mb-2">
                                        Počet osob *
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
                                        placeholder="Zadejte počet osob"
                                        className="w-full px-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm text-stone-800 border border-white/30 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        Termín zájezdu
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="tripDateFrom"
                                                value={formData.tripDateFrom}
                                                readOnly
                                                placeholder="Od"
                                                className="w-full px-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm text-stone-800 border border-white/30 focus:ring-2 focus:ring-emerald-400 focus:border-transparent cursor-pointer transition-all"
                                                onClick={() => openCalendar('from')}
                                            />
                                            <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="tripDateTo"
                                                value={formData.tripDateTo}
                                                readOnly
                                                placeholder="Do"
                                                className="w-full px-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm text-stone-800 border border-white/30 focus:ring-2 focus:ring-emerald-400 focus:border-transparent cursor-pointer transition-all"
                                                onClick={() => openCalendar('to')}
                                            />
                                            <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                                    Vaše zpráva
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Popište nám vaše představy o dovolené, speciální požadavky nebo dotazy..."
                                    className="w-full px-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm text-stone-800 border border-white/30 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all resize-none"
                                />
                            </div>

                            {/* GDPR Consent */}
                            <div className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    id="gdprConsent"
                                    name="gdprConsent"
                                    checked={formData.gdprConsent}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 h-4 w-4 text-emerald-700 focus:ring-emerald-700 border-white/30 rounded bg-white/90"
                                />
                                <label htmlFor="gdprConsent" className="text-sm text-white">
                                    Souhlasím se zpracováním osobních údajů *
                                </label>
                            </div>

                            <div className="text-center pt-4">
                                <button
                                    type="submit"
                                    disabled={!formData.gdprConsent}
                                    className={`group inline-flex items-center px-10 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                                        formData.gdprConsent
                                            ? 'bg-amber-500 text-white hover:bg-amber-600'
                                            : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                                    }`}
                                >
                                    <Send size={20} className="mr-3 group-hover:translate-x-1 transition-transform" />
                                    Zaslat poptávku
                                </button>
                            </div>
                        </form>

                        {/* Calendar Modal */}
                        {showCalendar && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-3xl">
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
            <footer className="bg-stone-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                            <div className="flex space-x-4 text-2xl">
                                <span>🌍</span>
                                <span>🦁</span>
                                <span>🏔️</span>
                                <span>🌊</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-6">Kontaktní informace</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 group">
                                    <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <span className="text-stone-300">+420 224 567 890</span>
                                </div>
                                <div className="flex items-center space-x-4 group">
                                    <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <span className="text-stone-300">info@addotours.cz</span>
                                </div>
                                <div className="flex items-start space-x-4 group">
                                    <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center group-hover:bg-emerald-500 transition-colors flex-shrink-0">
                                        <MapPin size={18} />
                                    </div>
                                    <div className="text-stone-300">
                                        <div>Václavské náměstí 28</div>
                                        <div>110 00 Praha 1</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-6">Rychlé odkazy</h3>
                            <ul className="space-y-3">
                                {['Všechny zájezdy', 'Individuální zájezdy', 'Zájezdy s programem', 'O nás', 'Kontakt'].map((link) => (
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

export default PobytovenZajezdy;
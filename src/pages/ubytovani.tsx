import React, { useState, useEffect, useCallback } from 'react';
import { Phone, Mail, Camera, X, ChevronLeft, ChevronRight, Globe, Menu, Waves, Mountain, TreePine, ArrowDown } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";

interface Accommodation {
    id: string;
    name: string;
    nameEn: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
    subtitle: string;
    subtitleEn: string;
    gallery: string[];
    bookingUrl: string;
    rating?: {
        score: number;
        label: string;
        labelEn: string;
        reviews: number;
        categories: Array<{
            name: string;
            nameEn: string;
            score: number;
        }>;
    };
}

// Translation object
const translations = {
    cs: {
        // Navigation
        nav: {
            flowerPath: 'KVĚTINOVÁ CESTA A SAFARI',
            seaSafari: 'MOŘE A SAFARI',
            capeTown: 'KAPSKÉ MĚSTO A OKOLÍ',
            accommodation: 'UBYTOVÁNÍ',
            contact: 'KONTAKT'
        },
        // Hero section
        hero: {
            title: 'Naše ubytování',
            subtitle: 'Fotogalerie destinací v Jihoafrické republice',
            description: 'Prohlédněte si fotky z našich tří jedinečných ubytovacích zařízení',
            browseButton: 'Prohlédnout ubytování'
        },
        // Gallery
        gallery: {
            photos: 'fotografií',
            showFullGallery: 'Zobrazit celou galerii',
            photos2: 'fotek',
            viewOnBooking: 'Zobrazit na Booking.com',
            more: 'dalších',
            reviews: 'hodnocení'
        },
        // Footer
        footer: {
            description: 'Profesionální zájezdy do Jihoafrické republiky od roku 2008. Vytváříme nezapomenutelné zážitky na míru.',
            quickContact: 'Rychlý kontakt',
            quickLinks: 'Rychlé odkazy',
            homepage: 'HLAVNÍ STRÁNKA',
            flowerPath: 'KVĚTINOVÁ CESTA A SAFARI',
            seaSafari: 'MOŘE A SAFARI',
            capeTown: 'KAPSKÉ MĚSTO A OKOLÍ',
            contact: 'KONTAKT',
            copyright: '© 2024 AddoTours. Všechna práva vyhrazena.'
        }
    },
    en: {
        // Navigation
        nav: {
            flowerPath: 'FLOWER ROUTE & SAFARI',
            seaSafari: 'SEA & SAFARI',
            capeTown: 'CAPE TOWN & SURROUNDINGS',
            accommodation: 'ACCOMMODATION',
            contact: 'CONTACT'
        },
        // Hero section
        hero: {
            title: 'Our accommodation',
            subtitle: 'Photo gallery of destinations in South Africa',
            description: 'Browse photos from our three unique accommodation facilities',
            browseButton: 'Browse accommodations'
        },
        // Gallery
        gallery: {
            photos: 'photos',
            showFullGallery: 'Show full gallery',
            photos2: 'photos',
            viewOnBooking: 'View on Booking.com',
            more: 'more',
            reviews: 'reviews'
        },
        // Footer
        footer: {
            description: 'Professional tours to South Africa since 2008. We create unforgettable tailor-made experiences.',
            quickContact: 'Quick contact',
            quickLinks: 'Quick links',
            homepage: 'HOMEPAGE',
            flowerPath: 'FLOWER ROUTE & SAFARI',
            seaSafari: 'SEA & SAFARI',
            capeTown: 'CAPE TOWN & SURROUNDINGS',
            contact: 'CONTACT',
            copyright: '© 2024 AddoTours. All rights reserved.'
        }
    }
};

const UbytovaniFotogalerie: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>('en');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    // Gallery modal states
    const [showGallery, setShowGallery] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [currentGalleryImages, setCurrentGalleryImages] = useState<string[]>([]);

    // Load language from localStorage on component mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('addotours-language');
        if (savedLanguage && (savedLanguage === 'cs' || savedLanguage === 'en')) {
            setLanguage(savedLanguage);
        }
    }, []);

    // Save language to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('addotours-language', language);
    }, [language]);

    // Scroll effect for navigation
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const t = translations[language as keyof typeof translations];

    const navItems = [
        { id: 'kvetinovacesta', label: t.nav.flowerPath, href: '/kvetinova-cesta' },
        { id: 'moreasafari', label: t.nav.seaSafari, href: '/more-a-safari' },
        { id: 'kapskemestoaokoli', label: t.nav.capeTown, href: '/kapske-mesto-a-okoli' },
        { id: 'ubytovani', label: t.nav.accommodation, href: '/ubytovani' },
        { id: 'kontakt', label: t.nav.contact, href: '/kontakt' }
    ];

    const handleNavigation = (href: string) => {
        // Add language parameter to URL
        const url = new URL(href, window.location.origin);
        url.searchParams.set('lang', language);
        window.location.href = url.toString();
        setIsMenuOpen(false);
    };

    const handleLanguageChange = () => {
        const newLanguage = language === 'cs' ? 'en' : 'cs';
        setLanguage(newLanguage);

        // Update URL with new language parameter
        const url = new URL(window.location.href);
        url.searchParams.set('lang', newLanguage);
        window.history.replaceState({}, '', url.toString());
    };

    // Function to scroll to accommodations section
    const scrollToAccommodations = () => {
        const gallerySection = document.getElementById('gallery');
        if (gallerySection) {
            gallerySection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Function to scroll to specific accommodation
    const scrollToAccommodation = (accommodationId: string) => {
        const accommodationElement = document.getElementById(`accommodation-${accommodationId}`);
        if (accommodationElement) {
            accommodationElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Gallery functions
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

    const nextImage = useCallback(() => {
        setCurrentImageIndex((prev: number) =>
            prev === currentGalleryImages.length - 1 ? 0 : prev + 1
        );
    }, [currentGalleryImages.length]);

    const prevImage = useCallback(() => {
        setCurrentImageIndex((prev: number) =>
            prev === 0 ? currentGalleryImages.length - 1 : prev - 1
        );
    }, [currentGalleryImages.length]);

    const goToImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    // Handle keyboard navigation
    useEffect(() => {
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
    }, [showGallery, nextImage, prevImage]);

    // Extended galleries for each accommodation with English translations
    const accommodations: Accommodation[] = [
        {
            id: 'fijnbosch',
            name: 'Farma FIJNBOSCH',
            nameEn: 'FIJNBOSCH Farm',
            icon: TreePine,
            subtitle: 'Exkluzivní pobyt na luxusní farmě uprostřed africké přírody mezi zvířaty',
            subtitleEn: 'Exclusive stay at a luxury farm in the heart of African nature among wildlife',
            gallery: [
                '/FARM/farm-klubovna.jpg',
                '/FARM/farm-klub-fire.jpg',
                '/FARM/farm-bedroom.jpg',
                '/FARM/farm-bedroom2.jpg',
                '/FARM/farm-bedroom3.jpg',
                '/FARM/farm-bedroom4.jpg',
                '/FARM/farm-bathroom.jpg',
                '/FARM/farm-bathroom2.jpg',
                '/FARM/farm-klub-pool.jpg',
                '/FARM/farm-klub-inter.jpg',
                '/FARM/farm-klub-night.jpg',
                '/FARM/farm-klub-day.jpg',
            ],
            bookingUrl: 'https://www.booking.com/hotel/za/fijnbosch-game-lodge-jeffreys-bay-jeffreys-bay.cs.html',
            rating: {
                score: 9.6,
                label: 'Naprosto výjimečné',
                labelEn: 'Absolutely exceptional',
                reviews: 98,
                categories: [
                    { name: 'Personál', nameEn: 'Staff', score: 10 },
                    { name: 'Zařízení', nameEn: 'Facilities', score: 9.4 },
                    { name: 'Čistota', nameEn: 'Cleanliness', score: 9.6 },
                    { name: 'Pohodlí', nameEn: 'Comfort', score: 9.8 },
                    { name: 'Poměr ceny a kvality', nameEn: 'Value for money', score: 9.3 },
                    { name: 'Lokalita', nameEn: 'Location', score: 9.0 }
                ]
            }
        },
        {
            id: 'marina',
            name: 'MARINA SANDS',
            nameEn: 'MARINA SANDS',
            icon: Waves,
            subtitle: 'Ubytování v rekreačních domech v Jeffreys Bay na břehu Indického oceánu',
            subtitleEn: 'Accommodation in holiday homes in Jeffreys Bay on the Indian Ocean shore',
            gallery: [
                '/MARINA/marina-house.jpg',
                '/MARINA/marina-pool.jpg',
                '/MARINA/marina-living-room.jpg',
                '/MARINA/marina-bedroom.jpg',
                '/MARINA/marina-bedroom2.jpg',
                '/MARINA/marina-view.jpg',
                '/MARINA/marina-beach.jpg',
                '/MARINA/marina-pool.jpg',
                '/MARINA/marina-kitchen.jpg',
                '/MARINA/marina-bathroom.jpg',
                '/MARINA/marina-house-car.jpg',
                '/MARINA/marina-house-back.jpg',
            ],
            bookingUrl: 'https://www.booking.com/hotel/za/marina-sands-jeffreys-bay.cs.html',
            rating: {
                score: 9.0,
                label: 'Fantastické',
                labelEn: 'Fantastic',
                reviews: 8,
                categories: [
                    { name: 'Personál', nameEn: 'Staff', score: 9.5 },
                    { name: 'Zařízení', nameEn: 'Facilities', score: 9.0 },
                    { name: 'Čistota', nameEn: 'Cleanliness', score: 9.5 },
                    { name: 'Pohodlí', nameEn: 'Comfort', score: 9.5 },
                    { name: 'Poměr ceny a kvality', nameEn: 'Value for money', score: 9.5 },
                    { name: 'Lokalita', nameEn: 'Location', score: 9.5 }
                ]
            }
        },
        {
            id: 'capetown',
            name: 'Penzion Kapské město',
            nameEn: 'Cape Town Guesthouse',
            icon: Mountain,
            subtitle: 'Ubytování v Bed and Breakfast penzionu v Kapském městě',
            subtitleEn: 'Accommodation in a Bed and Breakfast guesthouse in Cape Town',
            gallery: [
                '/CAPE/cape-house-drone.jpg',
                '/CAPE/cape-pool.jpg',
                '/CAPE/cape-drone.jpg'
            ],
            bookingUrl: 'https://www.booking.com/hotel/za/cape-town-bed-breakfast.html'
        }
    ];

    // Gallery Modal Component
    const GalleryModal: React.FC = () => {
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
                    <Image
                        src={currentGalleryImages[currentImageIndex]}
                        alt={`Gallery image ${currentImageIndex + 1}`}
                        width={800}
                        height={600}
                        className="max-w-full max-h-[80vh] object-contain"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                </div>

                {/* Image counter */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full">
                    {currentImageIndex + 1} / {currentGalleryImages.length}
                </div>

                {/* Thumbnail navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto px-4">
                    {currentGalleryImages.map((img: string, imgIndex: number) => (
                        <button
                            key={imgIndex}
                            onClick={() => goToImage(imgIndex)}
                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                                imgIndex === currentImageIndex
                                    ? 'border-emerald-400'
                                    : 'border-transparent hover:border-white'
                            }`}
                        >
                            <Image
                                src={img}
                                alt={`Thumbnail ${imgIndex + 1}`}
                                width={64}
                                height={64}
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
                                onClick={() => {
                                    const url = new URL('/', window.location.origin);
                                    url.searchParams.set('lang', language);
                                    window.location.href = url.toString();
                                }}
                                className="w-16 h-16 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                            >
                                <Image
                                    src="/addotourslogo.png"
                                    alt="AddoTours logo"
                                    width={64}
                                    height={64}
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
                                        item.id === 'ubytovani'
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
                                    onClick={handleLanguageChange}
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
                                        item.id === 'ubytovani'
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

            {/* Hero Section - Modified */}
            <section id="hero" className="pt-16 relative overflow-hidden">
                {/* Video Background - Now smaller, only at top */}
                <div className="relative h-80 lg:h-96">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source src="africabgvid.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* Video Content */}
                    <div className="relative h-full flex items-center justify-center">
                        <div className="text-center text-white px-4">
                            <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                                {t.hero.title}
                            </h1>
                            <p className="text-lg lg:text-xl text-emerald-100">
                                {t.hero.subtitle}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Section Below Video */}
                <div
                    className="py-16 relative"
                    style={{
                        backgroundImage: "url('background-main2.png')",
                        backgroundSize: 'auto',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'repeat'
                    }}
                >
                    <div className="absolute inset-0 bg-white/85"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="max-w-4xl mx-auto">
                            <p className="text-xl text-stone-700 mb-8 leading-relaxed">
                                {t.hero.description}
                            </p>

                            {/* Browse Accommodations Button */}
                            <button
                                onClick={scrollToAccommodations}
                                className="inline-flex items-center space-x-3 bg-emerald-600 text-white px-10 py-5 rounded-2xl font-semibold hover:bg-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                            >
                                <Camera size={24} />
                                <span className="text-lg">{t.hero.browseButton}</span>
                                <ArrowDown size={20} className="animate-bounce" />
                            </button>

                            {/* Quick Info Cards */}
                            <div className="grid md:grid-cols-3 gap-6 mt-16">
                                {accommodations.map((accommodation) => (
                                    <div
                                        key={accommodation.id}
                                        className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                                        onClick={() => scrollToAccommodation(accommodation.id)}
                                    >
                                        <div className="w-16 h-16 bg-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                            <accommodation.icon className="text-white" size={28} />
                                        </div>
                                        <h3 className="text-lg font-bold text-stone-800 mb-2">
                                            {language === 'cs' ? accommodation.name : accommodation.nameEn}
                                        </h3>
                                        <p className="text-stone-600 text-sm">
                                            {accommodation.gallery.length} {t.gallery.photos}
                                        </p>
                                        {accommodation.rating && (
                                            <div className="mt-3 flex items-center justify-center">
                                                <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-2">
                                                    {accommodation.rating.score}
                                                </div>
                                                <div className="text-xs text-gray-600">
                                                    {language === 'cs' ? accommodation.rating.label : accommodation.rating.labelEn}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section
                id="gallery"
                className="py-20 relative"
                style={{
                    backgroundImage: "url('background-main2.png')",
                    backgroundSize: 'auto',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat'
                }}
            >
                <div className="absolute inset-0 bg-white/80"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* All Accommodations Galleries */}
                    <div className="space-y-24">
                        {accommodations.map((accommodation) => {
                            const previewImages = accommodation.gallery.slice(0, 8);
                            const hasMoreImages = accommodation.gallery.length > 8;

                            return (
                                <div key={accommodation.id} id={`accommodation-${accommodation.id}`} className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
                                    {/* Header */}
                                    <div className="p-8 lg:p-12 text-center border-b border-stone-200">
                                        <div className="flex items-center justify-center space-x-4 mb-6">
                                            <div className="w-16 h-16 bg-emerald-600 rounded-xl flex items-center justify-center">
                                                <accommodation.icon className="text-white" size={32} />
                                            </div>
                                            <h2 className="text-3xl lg:text-4xl font-bold text-stone-800">
                                                {language === 'cs' ? accommodation.name : accommodation.nameEn}
                                            </h2>
                                        </div>
                                        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                                            {language === 'cs' ? accommodation.subtitle : accommodation.subtitleEn}
                                        </p>
                                    </div>

                                    {/* Photo Gallery Grid - Only first 8 images */}
                                    <div className="p-8 lg:p-12">
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {previewImages.map((img: string, imgIndex: number) => (
                                                <div
                                                    key={imgIndex}
                                                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-all duration-300"
                                                    onClick={() => openGallery(accommodation.gallery, imgIndex)}
                                                >
                                                    <Image
                                                        src={img}
                                                        alt={`${language === 'cs' ? accommodation.name : accommodation.nameEn} ${imgIndex + 1}`}
                                                        width={300}
                                                        height={300}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                        <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                                                    </div>
                                                    {/* Image number overlay */}
                                                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                                                        {imgIndex + 1}
                                                    </div>
                                                    {/* Show "+X more" overlay on last image if there are more */}
                                                    {hasMoreImages && imgIndex === previewImages.length - 1 && (
                                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                            <div className="text-white text-center">
                                                                <div className="text-2xl font-bold">+{accommodation.gallery.length - 8}</div>
                                                                <div className="text-sm">{t.gallery.more}</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Booking.com Rating */}
                                        {accommodation.rating && (
                                            <div className="mt-8 bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-2xl p-6">
                                                <div className="flex items-center justify-center mb-6">
                                                    <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-bold mr-3">
                                                        {accommodation.rating.score.toFixed(1)}
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="font-semibold text-gray-900">
                                                            {language === 'cs' ? accommodation.rating.label : accommodation.rating.labelEn}
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            {accommodation.rating.reviews} {t.gallery.reviews}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                                                    {accommodation.rating.categories.map((category, categoryIndex) => (
                                                        <div key={categoryIndex} className="flex flex-col space-y-2">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs lg:text-sm text-gray-700 font-medium truncate pr-1">
                                                                    {language === 'cs' ? category.name : category.nameEn}
                                                                </span>
                                                                <span className="text-xs lg:text-sm font-semibold text-gray-900">
                                                                    {category.score.toFixed(1)}
                                                                </span>
                                                            </div>
                                                            <div className="w-full h-2 bg-gray-200 rounded-full">
                                                                <div
                                                                    className="h-2 bg-blue-600 rounded-full"
                                                                    style={{ width: `${(category.score / 10) * 100}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                                            <button
                                                onClick={() => openGallery(accommodation.gallery, 0)}
                                                className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg"
                                            >
                                                <Camera size={20} />
                                                <span>{t.gallery.showFullGallery} ({accommodation.gallery.length} {t.gallery.photos2})</span>
                                            </button>
                                            <button
                                                onClick={() => window.open(accommodation.bookingUrl, '_blank')}
                                                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                                            >
                                                <Globe size={20} />
                                                <span>{t.gallery.viewOnBooking}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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
                                    <Image
                                        src="/addotourslogo.png"
                                        alt="AddoTours"
                                        width={48}
                                        height={48}
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
                                    <Link
                                        href={`/?lang=${language}`}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t.footer.homepage}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={`/kvetinova-cesta?lang=${language}`}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t.footer.flowerPath}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={`/more-a-safari?lang=${language}`}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t.footer.seaSafari}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={`/kapske-mesto-a-okoli?lang=${language}`}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t.footer.capeTown}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={`/kontakt?lang=${language}`}
                                        className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t.footer.contact}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-stone-200 mt-12 pt-8 text-center">
                        <p className="text-stone-500">
                            {t.footer.copyright}
                        </p>
                    </div>
                </div>
            </footer>

            {/* Gallery Modal */}
            <GalleryModal />
        </div>
    );
};

export default UbytovaniFotogalerie;
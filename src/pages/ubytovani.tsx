import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, Phone, Mail, Camera, X, ChevronLeft, ChevronRight, Globe, Menu, Waves, Mountain, TreePine } from 'lucide-react';

interface Accommodation {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
    subtitle: string;
    gallery: string[];
    bookingUrl: string;
}

const UbytovaniFotogalerie: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>('cs');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    // Gallery modal states
    const [showGallery, setShowGallery] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [currentGalleryImages, setCurrentGalleryImages] = useState<string[]>([]);

    // Scroll effect for navigation
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    // Rozšířené galerie pro každé ubytování
    const accommodations: Accommodation[] = [
        {
            id: 'fijnbosch',
            name: 'Farma FIJNBOSCH',
            icon: TreePine,
            subtitle: 'Exkluzivní pobyt na luxusní farmě uprostřed africké přírody mezi zvířaty',
            gallery: [
                'klubovna.png',
                'pobytbeach.jpg',
                'beach.jpg',
                'background-main2.png',
                'bgafrica.png',
                'pensioncapetown.jpg',
                'addotourslogo.png'
            ],
            bookingUrl: 'https://www.booking.com/hotel/za/fijnbosch-game-lodge-jeffreys-bay-jeffreys-bay.cs.html'
        },
        {
            id: 'marina',
            name: 'MARINA SANDS',
            icon: Waves,
            subtitle: 'Ubytování v rekreačních domech v Jeffreys Bay na břehu Indického oceánu',
            gallery: [
                'beach.jpg',
                'pobytbeach.jpg',
                'bgafrica.png',
                'klubovna.png',
                'pensioncapetown.jpg',
                'background-main2.png',
                'addotourslogo.png'
            ],
            bookingUrl: 'https://www.booking.com/hotel/za/marina-sands-jeffreys-bay.cs.html'
        },
        {
            id: 'capetown',
            name: 'Penzion Kapské město',
            icon: Mountain,
            subtitle: 'Ubytování v Bed and Breakfast penzionu v Kapském městě',
            gallery: [
                'pensioncapetown.jpg',
                'bgafrica.png',
                'beach.jpg',
                'klubovna.png',
                'pobytbeach.jpg',
                'background-main2.png',
                'addotourslogo.png'
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

                        {/* Language Switcher */}
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

                {/* Mobile menu */}
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
                            Naše ubytování
                        </h1>
                        <p className="text-xl lg:text-2xl text-emerald-100 mb-4">
                            Fotogalerie destinací v Jihoafrické republice
                        </p>
                        <p className="text-lg text-emerald-200 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Prohlédněte si fotky z našich tří jedinečných ubytovacích zařízení
                        </p>
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
                        {accommodations.map((accommodation) => (
                            <div key={accommodation.id} className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
                                {/* Header */}
                                <div className="p-8 lg:p-12 text-center border-b border-stone-200">
                                    <div className="flex items-center justify-center space-x-4 mb-6">
                                        <div className="w-16 h-16 bg-emerald-600 rounded-xl flex items-center justify-center">
                                            <accommodation.icon className="text-white" size={32} />
                                        </div>
                                        <h2 className="text-3xl lg:text-4xl font-bold text-stone-800">
                                            {accommodation.name}
                                        </h2>
                                    </div>
                                    <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                                        {accommodation.subtitle}
                                    </p>
                                </div>

                                {/* Photo Gallery Grid */}
                                <div className="p-8 lg:p-12">
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {accommodation.gallery.map((img: string, imgIndex: number) => (
                                            <div
                                                key={imgIndex}
                                                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-all duration-300"
                                                onClick={() => openGallery(accommodation.gallery, imgIndex)}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`${accommodation.name} ${imgIndex + 1}`}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                    <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                                                </div>
                                                {/* Image number overlay */}
                                                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                                                    {imgIndex + 1}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                                        <button
                                            onClick={() => openGallery(accommodation.gallery, 0)}
                                            className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg"
                                        >
                                            <Camera size={20} />
                                            <span>Zobrazit celou galerii ({accommodation.gallery.length} fotek)</span>
                                        </button>
                                        <button
                                            onClick={() => window.open(accommodation.bookingUrl, '_blank')}
                                            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                                        >
                                            <Globe size={20} />
                                            <span>Zobrazit na Booking.com</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                                {['Všechny zájezdy', 'Individuální zájezdy', 'Zájezdy s programem', 'O nás', 'Kontakt'].map((link: string) => (
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

export default UbytovaniFotogalerie;
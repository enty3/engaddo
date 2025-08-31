import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Globe, Menu, X, Clock, Building, CreditCard, FileText, User, ExternalLink } from 'lucide-react';

const KontaktAddoTours: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>('cs');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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

    const openPDF = (pdfName: string) => {
        window.open(`/${pdfName}.pdf`, '_blank');
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
                                        item.id === 'kontakt'
                                            ? (isScrolled ? 'text-emerald-600' : 'text-amber-200')
                                            : (isScrolled ? 'text-stone-700 hover:text-green-700' : 'text-black hover:text-amber-200')
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
                                        item.id === 'kontakt'
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



            {/* Contact Content */}
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
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Company Header */}
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center space-x-4 mb-6">
                            <div className="w-20 h-20 rounded-xl overflow-hidden bg-emerald-600 p-3">
                                <img src="addotourslogo.png" alt="AddoTours" className="w-full h-full object-cover" />
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-stone-800">
                                AddoTours
                            </h2>
                        </div>
                        <p className="text-xl text-stone-600">
                            Specializujeme se na zájezdy do Jihoafrické republiky
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Main Contact Info */}
                        <div className="space-y-8">
                            {/* Office Location */}
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                                <div className="flex items-start space-x-4 mb-6">
                                    <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Building className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-stone-800 mb-2">Provozovna a kancelář</h3>
                                        <div className="text-lg text-stone-700">
                                            <div className="font-semibold">Náměstí Smiřických 39</div>
                                            <div>Kostelec nad Černými lesy</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 bg-amber-50 rounded-xl p-4">
                                    <Clock className="text-amber-600 flex-shrink-0 mt-1" size={20} />
                                    <div>
                                        <div className="font-semibold text-amber-800">Otevírací doba kanceláře</div>
                                        <div className="text-amber-700">Po předchozí telefonické dohodě</div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Contacts */}
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                        <User className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-stone-800">Kontakty</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 p-4 bg-stone-50 rounded-xl">
                                        <Phone className="text-blue-600" size={20} />
                                        <div>
                                            <div className="font-semibold text-stone-800">Ing. Petr Havel</div>
                                            <a href="tel:+420602256246" className="text-blue-600 hover:underline">
                                                +420 602 256 246
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-4 bg-stone-50 rounded-xl">
                                        <Phone className="text-blue-600" size={20} />
                                        <div>
                                            <div className="font-semibold text-stone-800">Mgr. Karolína Schejbalová</div>
                                            <a href="tel:+420702000847" className="text-blue-600 hover:underline">
                                                +420 702 000 847
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-4 bg-emerald-50 rounded-xl">
                                        <Phone className="text-emerald-600" size={20} />
                                        <div>
                                            <div className="font-semibold text-stone-800">Kontakt v JAR - Chris</div>
                                            <a href="tel:+27829308370" className="text-emerald-600 hover:underline">
                                                +27 82 930 8370
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Email Contacts */}
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                                        <Mail className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-stone-800">Email</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 p-4 bg-stone-50 rounded-xl">
                                        <Mail className="text-purple-600" size={20} />
                                        <div>
                                            <div className="font-semibold text-stone-800">Hlavní email</div>
                                            <a href="mailto:addotours@email.cz" className="text-purple-600 hover:underline">
                                                addotours@email.cz
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-4 bg-stone-50 rounded-xl">
                                        <Mail className="text-purple-600" size={20} />
                                        <div>
                                            <div className="font-semibold text-stone-800">Email JAR</div>
                                            <a href="mailto:info@fijnbosch.com" className="text-purple-600 hover:underline">
                                                info@fijnbosch.com
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Info & Banking */}
                        <div className="space-y-8">
                            {/* Business Address */}
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-12 h-12 bg-stone-600 rounded-xl flex items-center justify-center">
                                        <MapPin className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-stone-800">Sídlo společnosti</h3>
                                </div>

                                <div className="space-y-3 text-stone-700">
                                    <div className="text-lg">Soumarská 975/1</div>
                                    <div className="text-lg">104 00 Praha 10 – Uhříněves</div>
                                    <div className="text-lg font-semibold">IČ: 248 30 330</div>
                                </div>
                            </div>

                            {/* Banking Info */}
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                                        <CreditCard className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-stone-800">Platební styk</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-green-50 rounded-xl">
                                        <div className="font-semibold text-green-800 mb-2">Platby v CZK</div>
                                        <div className="font-mono text-lg text-green-700">245953344/0300</div>
                                    </div>

                                    <div className="p-4 bg-blue-50 rounded-xl">
                                        <div className="font-semibold text-blue-800 mb-2">Platby v EUR</div>
                                        <div className="font-mono text-lg text-blue-700">249670376/0300</div>
                                    </div>
                                </div>
                            </div>

                            {/* Legal Documents */}
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
                                        <FileText className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-stone-800">Dokumenty</h3>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => openPDF('Certifikat-ADDO-TOURS-s.r.o')}
                                        className="w-full flex items-center justify-between p-4 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors group"
                                    >
                                        <span className="text-stone-700">Certifikát o zaplacení příspěvku do GF</span>
                                        <ExternalLink className="text-stone-400 group-hover:text-stone-600" size={16} />
                                    </button>

                                    <button
                                        onClick={() => openPDF('Potvrzeni-pojisteni-2025')}
                                        className="w-full flex items-center justify-between p-4 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors group"
                                    >
                                        <span className="text-stone-700">Potvrzení o pojištění CK proti úpadku</span>
                                        <ExternalLink className="text-stone-400 group-hover:text-stone-600" size={16} />
                                    </button>

                                    <button
                                        onClick={() => openPDF('Ochrana-osobnich-udaju')}
                                        className="w-full flex items-center justify-between p-4 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors group"
                                    >
                                        <span className="text-stone-700">Ochrana osobních údajů</span>
                                        <ExternalLink className="text-stone-400 group-hover:text-stone-600" size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
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
        </div>
    );
};

export default KontaktAddoTours;
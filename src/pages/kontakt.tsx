import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Globe, Menu, X, Clock, Building, CreditCard, FileText, User, ExternalLink, Instagram } from 'lucide-react';
import Link from "next/link";

const KontaktAddoTours: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>('en');
    const [isClient, setIsClient] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    // Scroll effect for navigation
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Initialize client-side state after hydration
    useEffect(() => {
        setIsClient(true);
        const savedLanguage = localStorage.getItem('addotours-language') || 'en';
        setLanguage(savedLanguage);
    }, []);

    // Save language preference to localStorage when it changes
    const handleLanguageChange = () => {
        const newLanguage = language === 'cs' ? 'en' : 'cs';
        setLanguage(newLanguage);
        if (isClient) {
            localStorage.setItem('addotours-language', newLanguage);
        }
    };

    // Translation object
    const translations = {
        cs: {
            // Navigation
            nav: {
                kvetinova: 'KVĚTINOVÁ CESTA A SAFARI',
                more: 'MOŘE A SAFARI',
                kapske: 'KAPSKÉ MĚSTO A OKOLÍ',
                ubytovani: 'UBYTOVÁNÍ',
                kontakt: 'KONTAKT'
            },
            // Main content
            companyDescription: 'Specializujeme se na zájezdy do Jihoafrické republiky',
            officeTitle: 'Provozovna a kancelář',
            officeHours: 'Otevírací doba kanceláře',
            officeHoursText: 'Po předchozí telefonické dohodě',
            contactsTitle: 'Kontakty',
            contactSA: 'Kontakt v JAR - Chris',
            emailTitle: 'Email',
            mainEmail: 'Hlavní email',
            emailSA: 'Email JAR',
            businessTitle: 'Sídlo společnosti',
            paymentTitle: 'Platební styk',
            paymentCZK: 'Platby v CZK',
            paymentEUR: 'Platby v EUR',
            documentsTitle: 'Dokumenty',
            certGF: 'Certifikát o zaplacení příspěvku do GF',
            insuranceDoc: 'Potvrzení o pojištění CK proti úpadku',
            gdprDoc: 'Ochrana osobních údajů',
            socialMedia: 'Sociální sítě',
            // Footer
            footerDescription: 'Profesionální zájezdy do Jihoafrické republiky od roku 2008. Vytváříme nezapomenutelné zážitky na míru.',
            quickContact: 'Rychlý kontakt',
            quickLinks: 'Rychlé odkazy',
            mainPage: 'HLAVNÍ STRÁNKA',
            flowerRoute: 'KVĚTINOVÁ CESTA A SAFARI',
            seaSafari: 'MOŘE A SAFARI',
            capeTown: 'KAPSKÉ MĚSTO A OKOLÍ',
            accommodation: 'UBYTOVÁNÍ',
            copyright: '© 2024 AddoTours. Všechna práva vyhrazena.'
        },
        en: {
            // Navigation
            nav: {
                kvetinova: 'FLOWER ROUTE & SAFARI',
                more: 'SEA & SAFARI',
                kapske: 'CAPE TOWN & SURROUNDINGS',
                ubytovani: 'ACCOMMODATION',
                kontakt: 'CONTACT'
            },
            // Main content
            companyDescription: 'We specialize in tours to South Africa',
            officeTitle: 'Office & Premises',
            officeHours: 'Office hours',
            officeHoursText: 'By prior telephone arrangement',
            contactsTitle: 'Contacts',
            contactSA: 'Contact in SA - Chris',
            emailTitle: 'Email',
            mainEmail: 'Main email',
            emailSA: 'South Africa email',
            businessTitle: 'Company address',
            paymentTitle: 'Banking details',
            paymentCZK: 'Payments in CZK',
            paymentEUR: 'Payments in EUR',
            documentsTitle: 'Documents',
            certGF: 'Certificate of contribution payment to GF',
            insuranceDoc: 'Travel agency insolvency insurance confirmation',
            gdprDoc: 'Personal data protection',
            socialMedia: 'Social Media',
            // Footer
            footerDescription: 'Professional tours to South Africa since 2008. We create unforgettable tailor-made experiences.',
            quickContact: 'Quick contact',
            quickLinks: 'Quick links',
            mainPage: 'HOMEPAGE',
            flowerRoute: 'FLOWER ROUTE & SAFARI',
            seaSafari: 'SEA & SAFARI',
            capeTown: 'CAPE TOWN & SURROUNDINGS',
            accommodation: 'ACCOMMODATION',
            copyright: '© 2024 AddoTours. All rights reserved.'
        }
    };

    const t = translations[language as keyof typeof translations];

    const navItems = [
        { id: 'kvetinovacesta', label: t.nav.kvetinova, href: '/kvetinova-cesta' },
        { id: 'moreasafari', label: t.nav.more, href: '/more-a-safari' },
        { id: 'kapskemestoaokoli', label: t.nav.kapske, href: '/kapske-mesto-a-okoli' },
        { id: 'ubytovani', label: t.nav.ubytovani, href: '/ubytovani' },
        { id: 'kontakt', label: t.nav.kontakt, href: '/kontakt' }
    ];

    const handleNavigation = (href: string) => {
        window.location.href = href;
        setIsMenuOpen(false);
    };

    const openPDF = (pdfName: string) => {
        window.open(`/${pdfName}.pdf`, '_blank');
    };

    const openInstagram = (url: string) => {
        window.open(url, '_blank');
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
                            <div className="w-20 h-20 rounded-xl overflow-hidden p-3" style={{ backgroundColor: '#c4b7a5' }}>
                                <img src="addotourslogo.png" alt="AddoTours" className="w-full h-full object-cover" />
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-stone-800">
                                AddoTours
                            </h2>
                        </div>
                        <p className="text-xl text-stone-600">
                            {t.companyDescription}
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
                                        <h3 className="text-2xl font-bold text-stone-800 mb-2">{t.officeTitle}</h3>
                                        <div className="text-lg text-stone-700">
                                            <div className="font-semibold">Náměstí Smiřických 39</div>
                                            <div>Kostelec nad Černými lesy</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 bg-amber-50 rounded-xl p-4">
                                    <Clock className="text-amber-600 flex-shrink-0 mt-1" size={20} />
                                    <div>
                                        <div className="font-semibold text-amber-800">{t.officeHours}</div>
                                        <div className="text-amber-700">{t.officeHoursText}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Contacts */}
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                        <User className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-stone-800">{t.contactsTitle}</h3>
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
                                            <div className="font-semibold text-stone-800">{t.contactSA}</div>
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
                                    <h3 className="text-2xl font-bold text-stone-800">{t.emailTitle}</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 p-4 bg-stone-50 rounded-xl">
                                        <Mail className="text-purple-600" size={20} />
                                        <div>
                                            <div className="font-semibold text-stone-800">{t.mainEmail}</div>
                                            <a href="mailto:addotours@email.cz" className="text-purple-600 hover:underline">
                                                addotours@email.cz
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-4 bg-stone-50 rounded-xl">
                                        <Mail className="text-purple-600" size={20} />
                                        <div>
                                            <div className="font-semibold text-stone-800">{t.emailSA}</div>
                                            <a href="mailto:info@fijnbosch.com" className="text-purple-600 hover:underline">
                                                info@fijnbosch.com
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center">
                                        <Instagram className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-stone-800">{t.socialMedia}</h3>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => openInstagram('https://www.instagram.com/jumanjisafaris?igsh=ZHk1OXJvZWRrYzRq')}
                                        className="w-full flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl transition-colors group"
                                    >
                                        <Instagram className="text-pink-600" size={20} />
                                        <div className="text-left">
                                            <div className="font-semibold text-stone-800">@jumanjisafaris</div>
                                            <div className="text-pink-600 text-sm">Safari adventures & experiences</div>
                                        </div>
                                        <ExternalLink className="text-pink-400 group-hover:text-pink-600 ml-auto" size={16} />
                                    </button>

                                    <button
                                        onClick={() => openInstagram('https://www.instagram.com/addotoursck?igsh=eWZtZGM5dm5tYnQ%3D')}
                                        className="w-full flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl transition-colors group"
                                    >
                                        <Instagram className="text-pink-600" size={20} />
                                        <div className="text-left">
                                            <div className="font-semibold text-stone-800">@addotoursck</div>
                                            <div className="text-pink-600 text-sm">AddoTours official account</div>
                                        </div>
                                        <ExternalLink className="text-pink-400 group-hover:text-pink-600 ml-auto" size={16} />
                                    </button>
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
                                    <h3 className="text-2xl font-bold text-stone-800">{t.businessTitle}</h3>
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
                                    <h3 className="text-2xl font-bold text-stone-800">{t.paymentTitle}</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-green-50 rounded-xl">
                                        <div className="font-semibold text-green-800 mb-2">{t.paymentCZK}</div>
                                        <div className="font-mono text-lg text-green-700">245953344/0300</div>
                                    </div>

                                    <div className="p-4 bg-blue-50 rounded-xl">
                                        <div className="font-semibold text-blue-800 mb-2">{t.paymentEUR}</div>
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
                                    <h3 className="text-2xl font-bold text-stone-800">{t.documentsTitle}</h3>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => openPDF('Certifikat-ADDO-TOURS-s.r.o')}
                                        className="w-full flex items-center justify-between p-4 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors group"
                                    >
                                        <span className="text-stone-700">{t.certGF}</span>
                                        <ExternalLink className="text-stone-400 group-hover:text-stone-600" size={16} />
                                    </button>

                                    <button
                                        onClick={() => openPDF('Potvrzeni-pojisteni-2025')}
                                        className="w-full flex items-center justify-between p-4 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors group"
                                    >
                                        <span className="text-stone-700">{t.insuranceDoc}</span>
                                        <ExternalLink className="text-stone-400 group-hover:text-stone-600" size={16} />
                                    </button>

                                    <button
                                        onClick={() => openPDF('Ochrana-osobnich-udaju')}
                                        className="w-full flex items-center justify-between p-4 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors group"
                                    >
                                        <span className="text-stone-700">{t.gdprDoc}</span>
                                        <ExternalLink className="text-stone-400 group-hover:text-stone-600" size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
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
                                {t.footerDescription}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-6 text-stone-800">{t.quickContact}</h3>
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
                            <h3 className="text-xl font-semibold mb-6 text-stone-800">{t.quickLinks}</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/" className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group">
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t.mainPage}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/kvetinova-cesta" className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group">
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t.flowerRoute}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/more-a-safari" className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group">
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t.seaSafari}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/kapske-mesto-a-okoli" className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group">
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t.capeTown}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/ubytovani" className="text-stone-600 hover:text-emerald-600 transition-colors flex items-center group">
                                        <span className="w-2 h-2 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors" style={{ backgroundColor: '#c4b7a5' }}></span>
                                        {t.accommodation}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-stone-200 mt-12 pt-8 text-center">
                        <p className="text-stone-500">
                            {t.copyright}
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default KontaktAddoTours;
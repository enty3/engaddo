import React, { useEffect, useState } from 'react';
import { CheckCircle, Mail, Phone, ArrowLeft, Home, Calendar, Globe } from 'lucide-react';

const Dekujeme: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [language, setLanguage] = useState<'cs' | 'en'>('cs');

    useEffect(() => {
        // Animace načtení
        setTimeout(() => setIsVisible(true), 100);

        // Detekce jazyka z URL parametru
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam === 'en') {
            setLanguage('en');
        }
        // Nebo detekce z localStorage pokud je uložený
        else if (localStorage.getItem('language') === 'en') {
            setLanguage('en');
        }
        // Nebo detekce z browser jazyka
        else if (navigator.language.startsWith('en')) {
            setLanguage('en');
        }
    }, []);

    const translations = {
        cs: {
            title: 'Děkujeme!',
            subtitle: 'Vaše poptávka byla úspěšně odeslána',
            emailSent: 'Email byl úspěšně zaslán',
            description: 'Vaše zpráva byla doručena našemu týmu. Ozveme se vám co nejdříve s nezávaznou nabídkou přizpůsobenou vašim požadavkům.',
            whatNext: 'Co bude následovat?',
            step1: {
                title: 'Zpracování poptávky',
                desc: 'Náš tým prostuduje vaše požadavky a připraví nabídku na míru'
            },
            step2: {
                title: 'Kontakt do 24 hodin',
                desc: 'Ozveme se vám emailem nebo telefonicky s první nabídkou'
            },
            step3: {
                title: 'Konzultace a plánování',
                desc: 'Společně vytvoříme dokonalý zájezd podle vašich přání'
            },
            needContact: 'Potřebujete nás kontaktovat?',
            phone: 'Telefon',
            email: 'Email',
            backHome: 'Zpět na hlavní stránku',
            back: 'Zpět',
            tagline: 'Profesionální zájezdy do Jihoafrické republiky od roku 2008'
        },
        en: {
            title: 'Thank You!',
            subtitle: 'Your inquiry has been successfully sent',
            emailSent: 'Email has been sent successfully',
            description: 'Your message has been delivered to our team. We will contact you as soon as possible with a customized offer tailored to your requirements.',
            whatNext: 'What happens next?',
            step1: {
                title: 'Processing your inquiry',
                desc: 'Our team will study your requirements and prepare a customized offer'
            },
            step2: {
                title: 'Contact within 24 hours',
                desc: 'We will contact you by email or phone with the first offer'
            },
            step3: {
                title: 'Consultation and planning',
                desc: 'Together we will create the perfect trip according to your wishes'
            },
            needContact: 'Need to contact us?',
            phone: 'Phone',
            email: 'Email',
            backHome: 'Back to homepage',
            back: 'Back',
            tagline: 'Professional tours to South Africa since 2008'
        }
    };

    const t = translations[language];

    const goHome = () => {
        window.location.href = '/';
    };

    const goBack = () => {
        window.history.back();
    };

    const toggleLanguage = () => {
        const newLang = language === 'cs' ? 'en' : 'cs';
        setLanguage(newLang);
        localStorage.setItem('language', newLang);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center px-4">
            {/* Language switcher */}
            <button
                onClick={toggleLanguage}
                className="fixed top-4 right-4 z-50 flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:bg-white transition-colors"
            >
                <Globe size={16} className="text-emerald-600" />
                <span className="text-sm font-medium text-gray-700">{language.toUpperCase()}</span>
            </button>

            {/* Background pattern */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23059669" fill-opacity="0.1"><circle cx="30" cy="30" r="4"/></g></svg>')`,
                    backgroundSize: '60px 60px'
                }}
            />

            <div className={`max-w-2xl w-full relative transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
                {/* Main success card */}
                <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-emerald-600 to-green-700 px-8 py-12 text-center relative">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                            {/* Success icon with animation */}
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-6 animate-pulse">
                                <CheckCircle size={48} className="text-white animate-bounce" />
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                                {t.title}
                            </h1>
                            <p className="text-xl text-emerald-100 font-light">
                                {t.subtitle}
                            </p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-12">
                        {/* Success message */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
                                <Mail size={32} className="text-emerald-600" />
                            </div>

                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                {t.emailSent}
                            </h2>

                            <p className="text-gray-600 leading-relaxed mb-6">
                                {t.description}
                            </p>
                        </div>

                        {/* What happens next */}
                        <div className="bg-emerald-50 rounded-2xl p-6 mb-8">
                            <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center">
                                <Calendar size={20} className="mr-2" />
                                {t.whatNext}
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-sm font-bold">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-emerald-800">{t.step1.title}</h4>
                                        <p className="text-emerald-700 text-sm">{t.step1.desc}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-sm font-bold">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-emerald-800">{t.step2.title}</h4>
                                        <p className="text-emerald-700 text-sm">{t.step2.desc}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-sm font-bold">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-emerald-800">{t.step3.title}</h4>
                                        <p className="text-emerald-700 text-sm">{t.step3.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact info */}
                        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                {t.needContact}
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                                        <Phone size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-800">{t.phone}</div>
                                        <div className="text-gray-600">+420 224 567 890</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                                        <Mail size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-800">{t.email}</div>
                                        <div className="text-gray-600">info@addotours.cz</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                onClick={goHome}
                                className="flex-1 bg-emerald-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg flex items-center justify-center group"
                            >
                                <Home size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                                {t.backHome}
                            </button>

                            <button
                                onClick={goBack}
                                className="flex-1 border-2 border-emerald-600 text-emerald-600 px-6 py-4 rounded-xl font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center group"
                            >
                                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                                {t.back}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Additional info card */}
                <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-3">
                            <div className="w-8 h-8 overflow-hidden rounded-lg">
                                <img
                                    src="addotourslogo.png"
                                    alt="AddoTours"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="font-bold text-gray-800 text-lg">AddoTours</span>
                        </div>

                        <p className="text-gray-600 text-sm">
                            {t.tagline}
                        </p>

                        <div className="flex justify-center space-x-2 mt-4 text-xl">
                            <span>🌍</span>
                            <span>🦁</span>
                            <span>🏔️</span>
                            <span>🌊</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dekujeme;
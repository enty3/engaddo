import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Mail, Globe } from 'lucide-react';
import Image from 'next/image';

// Komponenta pro animované číslo
interface AnimatedNumberProps {
    target: number;
    suffix?: string;
    duration?: number;
    startAnimation: boolean;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ target, suffix = '', duration = 2000, startAnimation }) => {
    const [current, setCurrent] = useState<number>(0);
    const startTime = useRef<number | null>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        if (!startAnimation) return;

        const animate = (timestamp: number): void => {
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
const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [hasBeenVisible, setHasBeenVisible] = useState<boolean>(false);
    const elementRef = useRef<HTMLDivElement | null>(null);

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

    return [elementRef, isVisible] as const;
};

// Jazykové konstanty
const translations = {
    cs: {
        nav: {
            pobytove: 'KVĚTINOVÁ CESTA A SAFARI',
            individualni: 'MOŘE A SAFARI',
            program: 'KAPSKÉ MĚSTO A OKOLÍ',
            faq: 'ČASTÉ OTÁZKY',
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
                title: 'Květinová cesta a safari',
                description: 'Zajistíme pro Vás v Jihoafrické republice exkluzivní pobyty na farmách v blízkosti měst Kimberley nebo Port Elizabeth s autentickou atmosférou africké přírody, v resortu Marina Sands s rekreačními domky na břehu Indického oceánu, nebo v luxusních apartmánech v Kapském městě s výhledem na oceán.',
                price: 'Od 65 000 Kč',
                duration: '7 dní / 6 nocí'
            },
            program: {
                title: 'Kapské město a okolí',
                description: 'Připravili jsme pro Vás pestrý 14denní zájezd kombinující nejkrásnější město JAR Cape Town s jeho pravou atmosférou přístavního města, autentické safari v národních parcích i na soukromých farmách Fijnbosch a Mayabana, plus relaxaci na břehu Indického oceánu pro dokonalé africké dobrodružství.',
                price: 'Od 55 000 Kč',
                duration: '6 dní / 5 nocí'
            },
            individualni: {
                title: 'Moře a safari',
                description: 'Rádi vám dále sestavíme individuální zájezd podle vašich přání – od pracovních teambuildinových cest s konferenčním servisem a svateb včetně hostiny, přes forfaitové a golfové zájezdy, až po surfařské zájezdy s možností výuky, cesty za vínem a vinařstvím nebo safari dle vašich představ.',
                price: 'Od 48 000 Kč',
                duration: '8 dní / 7 nocí'
            }
        },
        faq: {
            title: 'Často kladené otázky',
            subtitle: 'Odpovědi na nejčastější dotazy ohledně našich zájezdů do Jihoafrické republiky',
            questions: {
                letenky: {
                    question: 'Jak to funguje s letenkami?',
                    answer: 'Letenky zajišťujeme podle vašich preferencí. Spolupracujeme s renomovanými aerolinkami a vždy hledáme nejlepší spojení za rozumnou cenu. Letenky je možné zařídit jak přímo přes nás, tak si je můžete obstarat samostatně. Doporučujeme rezervaci s dostatečným předstihem pro lepší ceny.'
                },
                pojisteni: {
                    question: 'Je nutné cestovní pojištění?',
                    answer: 'Cestovní pojištění je naprosto nezbytné a je podmínkou účasti na zájezdu. Musí pokrývat minimálně zdravotní péči do výše 2 miliony Kč, úrazové pojištění a odpovědnost za škodu. Doporučujeme také pojištění zavazadel a storna zájezdu. Můžeme vám doporučit vhodné pojistné produkty.'
                },
                ockovani: {
                    question: 'Jsou nutná nějaká očkování?',
                    answer: 'Pro Jihoafrickou republiku nejsou povinná žádná speciální očkování. Doporučujeme však konzultaci s lékařem nebo cestovní klinikou nejpozději 6 týdnů před odjezdem. V případě návštěvy národních parků v malarické oblasti doporučujeme profylaxi proti malárii.'
                },
                bezpecnost: {
                    question: 'Je Jihoafrická republika bezpečná?',
                    answer: 'Při dodržování základních bezpečnostních pravidel a cestování s námi je JAR bezpečnou destinací. Všechny naše programy jsou navrženy s ohledem na bezpečnost. Poskytujeme podrobné informace o bezpečnostním chování a naši průvodci znají místní podmínky. Vyhýbáme se rizikovým oblastem a aktivitám.'
                },
                ubytovani: {
                    question: 'Jaké je ubytování během zájezdu?',
                    answer: 'Ubytování vybíráme pečlivě podle kategorie zájezdu. Nabízíme od luxusních lodge až po útulné farmy s autentickou atmosférou. Všechna ubytování mají standardní vybavení, často s bazénem a dalšími službami. V případě potřeby můžeme zajistit jednotlivé pokoje za příplatek.'
                },
                narocnost: {
                    question: 'Jaká je náročnost zájezdů a věková kategorie?',
                    answer: 'Naše zájezdy jsou vhodné pro všechny věkové kategorie od 5 let. Fyzická náročnost je mírná - zahrnuje chůzi v terénu během safari a výletů. Pro seniory a osoby s omezenou pohyblivostí můžeme program přizpůsobit. Doporučujeme základní fyzickou kondici pro plné využití všech aktivit.'
                },
                kdo: {
                    question: 'Kdo s vámi pojede a kdo vás bude provázet?',
                    answer: 'Skupiny cestují s českým průvodcem, který má více než 10 let zkušeností s Jižní Afrikou a hovoří anglicky i místními jazyky. V destinaci vás doprovodí také místní průvodci s bohatými znalostmi přírody a kultury. Skupiny jsou obvykle 8-16 osob, což zaručuje osobní přístup.'
                },
                viza: {
                    question: 'Potřebuji vízum do Jihoafrické republiky?',
                    answer: 'Občané ČR nepotřebují pro turistické pobyty do 90 dnů vízum. Stačí platný pas s platností minimálně 30 dnů po skončení pobytu a alespoň 2 volnými stránkami pro razítka. Při vstupu dostanete turistické razítko. Doporučujeme mít s sebou potvrzení o zpáteční letenče a ubytování.'
                }
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
            pobytove: 'FLOWER ROUTE & SAFARI',
            individualni: 'SEA & SAFARI',
            program: 'CAPE TOWN & SURROUNDINGS',
            faq: 'FAQ',
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
                title: 'Flower Route & Safari',
                description: 'We will arrange exclusive stays on farms near Kimberley or Port Elizabeth with authentic African nature atmosphere.',
                price: 'From 65,000 CZK',
                duration: '7 days / 6 nights'
            },
            program: {
                title: 'Cape Town & Surroundings',
                description: 'We have prepared a varied 14-day tour combining the most beautiful city of SA, Cape Town, with its true port city atmosphere.',
                price: 'From 55,000 CZK',
                duration: '6 days / 5 nights'
            },
            individualni: {
                title: 'Sea & Safari',
                description: 'We will gladly create an individual tour according to your wishes - from corporate team building trips to surfing tours.',
                price: 'From 48,000 CZK',
                duration: '8 days / 7 nights'
            }
        },
        faq: {
            title: 'Frequently Asked Questions',
            subtitle: 'Answers to the most common questions about our tours to South Africa',
            questions: {
                letenky: {
                    question: 'How do flight tickets work?',
                    answer: 'We arrange flight tickets according to your preferences. We work with reputable airlines and always look for the best connections at reasonable prices. Tickets can be arranged directly through us or you can arrange them yourself. We recommend booking well in advance for better prices.'
                },
                pojisteni: {
                    question: 'Is travel insurance necessary?',
                    answer: 'Travel insurance is absolutely essential and is a condition for participating in the tour. It must cover at least medical care up to 2 million CZK, accident insurance and liability for damage. We also recommend luggage insurance and tour cancellation insurance. We can recommend suitable insurance products.'
                },
                ockovani: {
                    question: 'Are any vaccinations required?',
                    answer: 'No special vaccinations are required for South Africa. However, we recommend consultation with a doctor or travel clinic at least 6 weeks before departure. If visiting national parks in malaria areas, we recommend malaria prophylaxis.'
                },
                bezpecnost: {
                    question: 'Is South Africa safe?',
                    answer: 'When following basic safety rules and traveling with us, SA is a safe destination. All our programs are designed with safety in mind. We provide detailed information about safety behavior and our guides know local conditions. We avoid risky areas and activities.'
                },
                ubytovani: {
                    question: 'What is the accommodation like during the tour?',
                    answer: 'We carefully select accommodation according to the tour category. We offer everything from luxury lodges to cozy farms with authentic atmosphere. All accommodations have standard facilities, often with pools and other services. We can arrange single rooms for an additional fee if needed.'
                },
                narocnost: {
                    question: 'What is the difficulty level and age category?',
                    answer: 'Our tours are suitable for all age categories from 5 years old. Physical difficulty is mild - includes walking in terrain during safaris and excursions. For seniors and people with limited mobility, we can adapt the program. We recommend basic physical fitness for full enjoyment of all activities.'
                },
                kdo: {
                    question: 'Who will travel with you and who will guide you?',
                    answer: 'Groups travel with a Czech guide who has more than 10 years of experience with South Africa and speaks English and local languages. In the destination, you will also be accompanied by local guides with rich knowledge of nature and culture. Groups are usually 8-16 people, ensuring personal approach.'
                },
                viza: {
                    question: 'Do I need a visa for South Africa?',
                    answer: 'Czech citizens do not need a visa for tourist stays up to 90 days. A valid passport with validity of at least 30 days after the end of stay and at least 2 blank pages for stamps is sufficient. You will receive a tourist stamp upon entry. We recommend having confirmation of return ticket and accommodation.'
                }
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
} as const;

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

interface NavItem {
    id: string;
    label: string;
    section: string;
}

interface Stat {
    number: number;
    suffix: string;
    label: string;
}

type DateType = 'from' | 'to' | '';

const AddoTours: React.FC = () => {
    const [language, setLanguage] = useState<'cs' | 'en'>('cs');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [expandedFAQ, setExpandedFAQ] = useState<string>('');
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
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [selectedDateType, setSelectedDateType] = useState<DateType>(''); // 'from' nebo 'to'

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

    const scrollToSection = (sectionId: string): void => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    const handleNavigation = (section: string): void => {
        if (section === 'faq') {
            scrollToSection(section);
        } else {
            switch (section) {
                case 'kvetinova-cesta':
                    window.location.href = '/kvetinova-cesta';
                    break;
                case 'individualni-zajezdy':
                    window.location.href = '/individualni-zajezdy';
                    break;
                case 'zajezdy-s-programem':
                    window.location.href = '/zajezdy-s-programem';
                    break;
                case 'contact':
                    window.location.href = '/kontakt';
                    break;
                default:
                    scrollToSection(section);
            }
        }
        setIsMenuOpen(false);
    };

    const toggleFAQ = (questionKey: string): void => {
        setExpandedFAQ(expandedFAQ === questionKey ? '' : questionKey);
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
    const getDaysInMonth = (date: Date): number => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date): number => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return firstDay === 0 ? 6 : firstDay - 1; // Pondělí = 0
    };

    const formatDate = (date: Date): string => {
        return date.toISOString().split('T')[0];
    };

    const handleDateSelect = (day: number): void => {
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

    const openCalendar = (dateType: DateType): void => {
        setSelectedDateType(dateType);
        setShowCalendar(true);
    };

    const navigateMonth = (direction: number): void => {
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

    const monthNames = {
        cs: [
            'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
            'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
        ],
        en: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ]
    };

    const dayNames = {
        cs: ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'],
        en: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    };

    const navItems: NavItem[] = [
        { id: '1', label: t.nav.pobytove, section: 'kvetinova-cesta' },
        { id: '2', label: t.nav.individualni, section: 'individualni-zajezdy' },
        { id: '3', label: t.nav.program, section: 'zajezdy-s-programem' },
        { id: '4', label: t.nav.faq, section: 'faq' },
        { id: '5', label: t.nav.kontakt, section: 'contact' }
    ];

    const destinations: Destination[] = [
        {
            id: '1',
            title: t.destinations.pobytove.title,
            description: t.destinations.pobytove.description,
            features: ['Safari', 'Luxury Lodge', 'Beach Resort'],
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
            features: ['Custom Tours', 'Scenic Route', 'Wildlife'],
            price: t.destinations.individualni.price,
            duration: t.destinations.individualni.duration,
            gradient: 'from-stone-600 to-stone-800',
            tagColor: 'bg-green-100 text-green-800'
        }
    ];

    const destinationImages: Record<string, string[]> = {
        '1': ['klubovna.png', 'pobytbeach.jpg', 'beach.jpg'],
        '2': ['wprogrammain.jpg', 'wprogrambridge.jpg', 'wprogramrides.jpg'],
        '3': ['indivimain.jpg', 'indiviwedding.jpg', 'indivigolf.jpg']
    };

    const [destinationImageIndexes, setDestinationImageIndexes] = useState<Record<string, number>>({
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
    const stats: Stat[] = [
        { number: 500, suffix: '+', label: t.hero.stats.clients },
        { number: 14, suffix: '', label: t.hero.stats.experience },
        { number: 98, suffix: '%', label: t.hero.stats.satisfaction }
    ];

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
                            <div className="w-16 h-16 overflow-hidden">
                                <Image
                                    src="/addotourslogo.png"
                                    alt="AddoTours logo"
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="hidden md:flex space-x-8">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigation(item.section)}
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
                {/* Video pozadí */}
                <div className="absolute inset-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="africabgvid.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    {/* Overlay pro lepší čitelnost textu */}
                    <div className="absolute inset-0 bg-black/40"></div>
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
                    </div>
                </div>
            </section>

            {/* Destinations Section */}
            <section
                id="destinations"
                className="py-20 relative"
                style={{
                    backgroundImage: `url('background-main2.png')`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '400px 400px',
                    backgroundAttachment: 'fixed'
                }}
            >
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
                                    {/* Stack všech obrázků s fade animací */}
                                    {destinationImages[destination.id].map((imageSrc, imgIndex) => (
                                        <div
                                            key={imgIndex}
                                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                                imgIndex === destinationImageIndexes[destination.id]
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            }`}
                                        >
                                            <Image
                                                src={`/${imageSrc}`}
                                                alt={`${destination.title} ${imgIndex + 1}`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                priority={imgIndex === 0} // Priorita pro první obrázek
                                            />
                                        </div>
                                    ))}

                                    <div className="absolute inset-0 bg-black/20"></div>

                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
                                        {destinationImages[destination.id].map((_, index) => (
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
                                                if (destination.id === '1') window.location.href = '/kvetinova-cesta';
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

            {/* FAQ Section */}
            <section
                id="faq"
                className="py-20 relative"
                style={{
                    backgroundImage: `url('background-main2.png')`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '400px 400px',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="absolute inset-0 bg-stone-50/85"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-black mb-4">
                            {t.faq.title}
                        </h2>
                        <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                            {t.faq.subtitle}
                        </p>
                    </div>

                    <div className="space-y-4">
                        {Object.entries(t.faq.questions).map(([key, faq]) => (
                            <div
                                key={key}
                                className="bg-white rounded-lg border border-stone-200 overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
                                onClick={() => toggleFAQ(key)}
                            >
                                <div className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-stone-50 transition-colors duration-200">
                                    <h3 className="text-lg font-semibold text-black pr-4">
                                        {faq.question}
                                    </h3>
                                    <div
                                        className={`transform transition-transform duration-200 ${
                                            expandedFAQ === key ? 'rotate-180' : ''
                                        }`}
                                    >
                                        <svg
                                            className="w-5 h-5 text-black"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        expandedFAQ === key
                                            ? 'max-h-96 opacity-100'
                                            : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div className="px-6 pb-4">
                                        <p className="text-black leading-relaxed">
                                            {faq.answer}
                                        </p>
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
                                <input type="hidden" name="_next" value="https://adotours.vercel.app/dekujeme" />
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
                                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-stone-700"
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
                                        placeholder={language === 'cs' ? 'Zadejte váš email' : 'Enter your email'}
                                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-stone-700"
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
                                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-stone-700"
                                    >
                                        <option value="">{t.contact.form.selectDestination}</option>
                                        <option value="pobytove">{t.destinations.pobytove.title}</option>
                                        <option value="program">{t.destinations.program.title}</option>
                                        <option value="individualni">{t.destinations.individualni.title}</option>
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
                                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-stone-700"
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
                                                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent cursor-pointer text-stone-700"
                                                onClick={() => openCalendar('from')}
                                            />
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 ">
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
                                                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent cursor-pointer text-stone-700"
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
                                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-stone-700"
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
                                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4 text-black">
                                        <div className="flex items-center justify-between mb-4">
                                            <button
                                                type="button"
                                                onClick={() => navigateMonth(-1)}
                                                className="p-2 hover:bg-stone-100 rounded"
                                            >
                                                ←
                                            </button>
                                            <h3 className="text-lg font-semibold">
                                                {monthNames[language][currentMonth.getMonth()]} {currentMonth.getFullYear()}
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
                                            {dayNames[language].map(day => (
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
                            <Image
                                src="/addotourslogo.png"
                                alt="AddoTours logo"
                                width={64}
                                height={64}
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
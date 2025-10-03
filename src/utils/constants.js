export const ADMIN_NOTIFICATIONS = [
	{
		id: 1,
		title: "New Enquiry",
		message: "Aarti Nair has submitted a course access issue",
		time: "12 mins ago",
		path: "/admin/enquiries",
	},
	{
		id: 2,
		title: "Payment Received",
		message: "₹45,000 payment received for Gemstone consultation",
		time: "15 mins ago",
		path: "/admin/payments",
	},
	{
		id: 3,
		title: "Course Completed",
		message: "John Doe completed Numerology Basic Course",
		time: "1 hour ago",
		path: "/admin/courses",
	},
	{
		id: 4,
		title: "New Registration",
		message: "5 new students registered today",
		time: "2 hours ago",
		path: "/admin/student-management",
	},
];

export const ADMIN_HIDE_GREETING_PATHS = [
	"/admin/astrologers",
	"/admin/student-management",
];

export const ADMIN_TIMEZONE_OPTIONS = [
	"Asia/Kolkata",
	"Asia/Dubai",
	"Europe/London",
	"UTC",
	"America/New_York",
];

export const ADMIN_LANGUAGE_OPTIONS = [
	"English (India)",
	"English (US)",
	"Hindi",
	"Gujarati",
	"Marathi",
];

export const ADMIN_THEME_OPTIONS = [
	{ label: "System", value: "system" },
	{ label: "Light", value: "light" },
	{ label: "Dark", value: "dark" },
];

export const ADMIN_SETTINGS_DEFAULTS = Object.freeze({
	preferences: {
		timezone: "Asia/Kolkata",
		language: "English (India)",
		theme: "system",
	},
	notifications: {
		productUpdates: true,
		marketing: false,
		security: true,
		weeklySummary: true,
	},
	security: {
		twoFactor: false,
		loginAlerts: true,
		autoSignOutMinutes: 30,
	},
});

export const ADMIN_SECURITY_MIN_TIMEOUT = 5;

export const ROLES = Object.freeze({
	ADMIN: "admin",
	ASTROLOGER: "astrologer",
	STUDENT: "student",
});

export const menuOptions = [
	{ label: "Home", path: "/" },
	{
		label: "Consultation",
		path: "/consultation",
		links: [
			{ label: "Vastu For Office", path: "/vastu-office" },
			{ label: "Vastu For Home", path: "/vastu-home" },
			{ label: "Vastu For Factory/Commercial", path: "/vastu-industrial" },
		],
	},
	{
		label: "Packages",
		path: "/package",
		links: [
			{ label: "Numero Package", path: "/numero-consultation" },
			{ label: "Astrology Package", path: "/astrology-consultation" },
			{ label: "Vastu Package", path: "/vastu-consultation" },
		],
	},
	{
		label: "Books",
		path: "/books",
	},
	{
		label: "Services",
		path: "/services",
	},
	{
		label: "Courses",
		path: "/courses",
	},
	{ label: "Blogs", path: "/blogs" },
	{ label: "Podcast", path: "/podcast" },
	{ label: "Contact", path: "/contact" },
];

export const notifications = [
	{
		id: 1,
		title: "New Course Available",
		message: "Check out the latest Vastu course.",
		time: "2 mins ago",
		path: "/courses/new",
	},
	{
		id: 2,
		title: "Forum Reply Received",
		message: "Someone replied to your post.",
		time: "10 mins ago",
		path: "/forum",
	},
	{
		id: 3,
		title: "Profile Updated",
		message: "Your profile has been updated.",
		time: "1 hour ago",
		path: "/dashboard/profile",
	},
	{
		id: 4,
		title: "Profile Updated",
		message: "Your profile has been updated.",
		time: "1 hour ago",
		path: "/dashboard/profile",
	},
	{
		id: 5,
		title: "Profile Updated",
		message: "Your profile has been updated.",
		time: "1 hour ago",
		path: "/dashboard/profile",
	},
];

export const blogData = [
	{
		id: 1,
		title: "The Future of Astro Vastu",
		tags: ["Vastu", "Astrology", "Wellness"],
		author: "Abhishek Goel",
		date: "2025-08-20",
		mainImage: "/images/course.png",
		description:
			"Astro Vastu is an evolving practice that blends the wisdom of astrology with the structural science of Vastu Shastra. By aligning spaces with planetary movements and cosmic energies, Astro Vastu helps create balance, harmony, and prosperity in modern homes and workplaces. Its growing relevance lies in the fact that people today are more conscious about holistic living, and this integration provides a systematic way of enhancing well-being through design and energy placement. This article explores the foundations of Astro Vastu and its importance in our fast-changing lifestyles.",
		sections: [
			{
				subheading: "Understanding Vastu Shastra",
				text: "Vastu Shastra is an ancient architectural science originating in India, which focuses on the alignment of structures with natural energies such as sunlight, wind, and earth’s magnetic fields. It prescribes specific principles for the placement of rooms, entrances, and objects to ensure harmony between the built environment and nature. When followed correctly, it is believed to promote health, prosperity, and overall happiness. The science doesn’t merely rely on superstition but is rooted in centuries of observation and practical results. Today, architects and designers are reinterpreting these age-old rules to create spaces that are both aesthetically pleasing and energetically balanced.",
				images: ["/images/course.png"],
			},
			{
				subheading: "Why Astro Vastu Matters Today",
				text: "Astro Vastu brings an added layer to traditional Vastu Shastra by factoring in astrology—specifically, the positions of planets in an individual’s horoscope. By blending these two sciences, it provides customized solutions for creating homes and workplaces aligned with a person’s destiny and natural energies. For instance, certain directions and placements may be more favorable for one individual based on their astrological chart, while different arrangements might suit another. This approach helps people optimize prosperity, relationships, and overall mental peace. In today’s stressful and competitive world, Astro Vastu is becoming increasingly popular as it provides a structured and personalized path toward harmony, success, and well-being.",
				images: ["/images/course.png", "/images/course.png"],
			},
		],
	},
	{
		id: 2,
		title: "Top 5 UI Trends in 2025",
		tags: ["UI/UX", "Design", "Web"],
		author: "Titiksha Sharma",
		date: "2025-08-10",
		mainImage: "/images/course.png",
		description:
			"The digital design industry in 2025 is evolving faster than ever, driven by technology, user behavior, and AI-driven innovation. From immersive experiences to minimal interfaces, UI trends are shaping how users interact with apps and websites daily. Designers now focus not only on aesthetics but also accessibility, speed, and personalization. AI is also becoming an integral part of design tools, enabling faster prototyping and better decision-making. This article explores five major trends that are expected to dominate the user interface landscape in 2025, helping businesses and designers stay ahead of the curve.",
		sections: [
			{
				subheading: "Minimalist Interfaces",
				text: "Minimalism in UI has continued to thrive because it prioritizes usability, speed, and focus. Instead of cluttered screens filled with unnecessary features, modern interfaces emphasize clean typography, ample whitespace, and well-placed interactive elements. This helps users navigate seamlessly while reducing cognitive overload. A minimalist approach also ensures accessibility for diverse audiences, as it avoids overwhelming layouts and focuses on what matters most. Designers now pair minimalism with micro-animations and subtle visual cues, creating interfaces that are simple yet engaging. In an era of short attention spans, minimal UI design allows brands to deliver their core message quickly and effectively, without distractions or unnecessary complexity.",
				images: [],
			},
			{
				subheading: "AI-Assisted Design",
				text: "Artificial Intelligence is revolutionizing the way user interfaces are built. Modern tools now integrate AI-driven features that recommend color palettes, suggest layouts, or even auto-generate design systems based on content. This allows designers to focus on creativity while leaving repetitive tasks to AI. Beyond tools, AI also enhances personalization for end-users by adapting designs dynamically—such as changing font sizes for accessibility or optimizing navigation based on user behavior. As machine learning continues to advance, we can expect interfaces that learn continuously from users, delivering experiences that are truly unique. This balance of automation and creativity marks a new era in design innovation where AI is not a replacement, but a powerful partner for designers.",
				images: [],
			},
		],
	},
	{
		id: 3,
		title: "Mastering React Performance",
		tags: ["React", "Frontend", "Performance"],
		author: "Satender Kumar",
		date: "2025-07-28",
		mainImage: "/images/react-main.png",
		description:
			"Performance optimization in React has become a crucial skill for frontend developers. A smooth and fast app significantly improves user experience, retention, and conversion. React applications, while powerful, can sometimes suffer from slow rendering, large bundle sizes, or unnecessary re-renders. By adopting the right techniques, developers can create apps that not only run efficiently but also scale well. This article highlights performance-boosting strategies such as code splitting, memoization, and lazy loading. Whether you’re building a small project or a large-scale application, these practices can dramatically enhance the speed and usability of your React apps.",
		sections: [
			{
				subheading: "Code Splitting",
				text: "Code splitting is one of the most impactful ways to optimize React applications. By dividing large bundles into smaller chunks, the browser only loads what is necessary for the initial view. This improves loading speed and ensures that users don’t wait for unnecessary code. Tools like Webpack and React.lazy make code splitting easy to implement. It is particularly useful for applications with multiple routes, as different pages can load their JavaScript independently. Additionally, developers can use dynamic imports to load components on-demand, further reducing the initial bundle size. The result is a smoother user experience, faster performance, and better scalability, especially in apps with growing complexity and numerous features.",
				images: ["/images/react1.png"],
			},
			{
				subheading: "Memoization",
				text: "Memoization is another critical technique in React that prevents unnecessary re-renders. When components re-render too frequently, they slow down the app and consume more resources. By using React.memo, developers can ensure components only update when their props change. Similarly, hooks like useMemo and useCallback help optimize expensive calculations and prevent redundant function recreation. Memoization is especially powerful when dealing with large data lists or performance-heavy components. However, it should be used thoughtfully, as overuse can lead to unnecessary complexity. Striking the right balance ensures a React application that remains both efficient and maintainable. When combined with code splitting, memoization creates a highly performant and responsive user experience.",
				images: ["/images/react2.png"],
			},
		],
	},
	{
		id: 4,
		title: "AI in Everyday Life",
		tags: ["Artificial Intelligence", "Tech", "Innovation"],
		author: "Ananya Verma",
		date: "2025-07-15",
		mainImage: "/images/ai-main.png",
		description:
			"Artificial Intelligence has moved beyond labs and industries—it is now an inseparable part of our daily lives. From voice assistants that manage our schedules to recommendation engines that personalize shopping and entertainment, AI is influencing how we live, work, and interact with technology. Its widespread integration has brought both opportunities and challenges. On one hand, it offers convenience, speed, and smarter decision-making. On the other, it raises questions about privacy, dependence, and ethical use. This article explores how AI is seamlessly becoming a household presence and transforming vital sectors like healthcare, education, and communication in today’s digital world.",
		sections: [
			{
				subheading: "AI at Home",
				text: "Smart homes are becoming mainstream thanks to AI. Devices such as smart speakers, thermostats, and IoT appliances are powered by artificial intelligence to learn user behavior and preferences. For example, smart assistants can control lights, suggest music, or remind users about tasks. These systems adapt over time, making homes more energy-efficient and personalized. AI is also improving security with smart cameras and facial recognition systems. The convenience it offers is unmatched, but it also creates dependency on connected systems. As these technologies evolve, the integration of AI at home will continue to expand, reshaping how households function and how people interact with their living spaces on a daily basis.",
				images: ["/images/ai1.png", "/images/ai2.png"],
			},
			{
				subheading: "AI in Healthcare",
				text: "Healthcare is witnessing a revolution due to AI. From early disease detection to drug discovery, AI-powered systems are reducing human errors and speeding up critical processes. Diagnostic tools can analyze medical images more accurately than humans in some cases, while predictive algorithms help doctors identify risks before symptoms appear. AI is also enabling personalized treatment plans, as it considers genetic and lifestyle data. In hospitals, AI-driven robotics are assisting in surgeries with unmatched precision. While the benefits are vast, the adoption of AI in healthcare raises concerns about data privacy and dependence on technology. Nevertheless, AI promises a future where healthcare is faster, more accurate, and more accessible to people across the globe.",
				images: ["/images/ai3.png"],
			},
		],
	},
	{
		id: 5,
		title: "The Rise of Remote Work Culture",
		tags: ["Work", "Productivity", "Remote Jobs"],
		author: "Rohit Mehra",
		date: "2025-06-30",
		mainImage: "/images/work-main.png",
		description:
			"Remote work has evolved from being a temporary solution into a long-term cultural shift that is redefining the workplace. Companies worldwide are embracing flexible work models that allow employees to work from anywhere, reducing overhead costs while increasing productivity. For employees, this has unlocked opportunities for better work-life balance, reduced commute stress, and global job access. However, remote work also comes with its challenges such as isolation, communication gaps, and difficulty in team bonding. This article examines both the advantages and challenges of remote work culture and how it continues to transform industries and careers globally.",
		sections: [
			{
				subheading: "Flexibility & Productivity",
				text: "Flexibility is perhaps the biggest advantage of remote work. Employees can structure their schedules according to their personal peak productivity times, leading to better results. Many companies report that remote employees deliver more consistent output when compared to rigid office setups. Furthermore, it allows organizations to access a wider talent pool across geographies. However, remote work requires discipline and strong self-management skills. While productivity often increases, blurred boundaries between personal and professional life can cause burnout. With proper planning, tools, and healthy practices, remote work can enhance efficiency while empowering employees to maintain better work-life balance and long-term satisfaction.",
				images: ["/images/work1.png"],
			},
			{
				subheading: "Challenges of Remote Work",
				text: "Despite its benefits, remote work comes with real challenges. Employees often struggle with feelings of isolation, especially when working in different time zones. Communication gaps can emerge without face-to-face interactions, making collaboration less effective. Virtual meetings sometimes fail to capture the nuances of in-person discussions, leading to misunderstandings. Another issue is maintaining team spirit and trust among remote employees. Many companies are now investing in digital collaboration platforms, team-building activities, and hybrid work solutions to bridge these gaps. While the challenges exist, organizations that embrace innovation and foster community can overcome them, making remote work a sustainable model for the future of employment worldwide.",
				images: ["/images/work2.png", "/images/work3.png"],
			},
		],
	},
];

export const courses = [
	{
		id: 1,
		title: "Beginner's Guide to Vastu Shastra",
		description:
			"Learn the fundamentals of Vastu Shastra to design harmonious spaces and attract positive energy.",
		price: 1400,
		originalPrice: 3990,
		image: "/images/course.png",
		createdBy: "Abhishek",
		lastUpdated: "07/2025",
		languages: ["Hindi", "English (Auto)"],
		subtitles: ["Hindi", "English (Auto)"],
		includedInPlans: true,
		premium: true,
		rating: 5.0,
		ratingCount: 1930,
		learners: 10467,
		duration: 3,
		lessions: 18,
		progress: 70,

		whatYouWillLearn: [
			"Understand the core principles and history of Vastu Shastra",
			"Identify the five elements and their role in spatial harmony",
			"Learn how to position rooms for maximum energy flow",
			"Understand the impact of directions and orientation on well-being",
			"Use Vastu tips to improve home and workspace positivity",
			"Recognize and correct common Vastu defects",
		],
		relatedTopics: ["Astrology", "Numerology", "Tarot"],
		courseIncludes: [
			"6 hours on-demand video",
			"Downloadable resources",
			"Access on mobile and desktop",
			"Lifetime access",
			"Certificate of completion",
			"Interactive discussion forums",
		],
		courseContent: [
			{ title: "Introduction to Vastu Shastra", preview: true },
			{ title: "The Five Elements & Their Influence", preview: true },
			{ title: "Directional Guidelines for Home & Office", preview: true },
			{ title: "Common Vastu Defects and Remedies", preview: true },
			{ title: "Practical Vastu Tips for Everyday Life", preview: true },
		],
		requirements: [
			"No prior knowledge required",
			"An open mind and willingness to learn",
			"Basic understanding of layouts is helpful",
			"Notebook or digital device for notes",
			"Stable internet connection",
		],
		detailedDescription: [
			"This beginner-friendly course introduces you to the ancient science of Vastu Shastra.",
			"You’ll learn how the five elements interact with your environment.",
			"We’ll cover common Vastu defects and remedies.",
			"By the end, you'll be able to improve the energy of any space.",
		],
		instructors: [
			{
				name: "Abhishek",
				bio: "Expert in Vastu Shastra and traditional Indian architecture with 15+ years of experience.",
				profileImage: "/images/instructor-abhishek.png",
				specialties: [
					"Residential Vastu Planning",
					"Commercial Vastu Consultation",
					"Remedial Vastu Solutions",
					"Modern Architecture Integration",
				],
				rating: 5.0,
				students: 10467,
				reviews: [
					{
						reviewer: "Varun B",
						comment: "Well-structured course, made Vastu easy to understand.",
						rating: 5,
					},
					{
						reviewer: "Varun B",
						comment: "Highly recommended for improving living spaces.",
						rating: 5,
					},
				],
			},
		],
	},
	{
		id: 2,
		title: "Astrology for Beginners",
		description:
			"Master the basics of astrology to read charts and understand planetary influences on life events.",
		price: 1200,
		originalPrice: 3500,
		image: "/images/course.png",
		createdBy: "Priya Sharma",
		lastUpdated: "05/2025",
		languages: ["English", "Hindi"],
		subtitles: ["English", "Hindi"],
		includedInPlans: false,
		premium: true,
		rating: 4.8,
		ratingCount: 1480,
		learners: 8450,
		duration: 3,
		lessions: 18,
		progress: 70,
		whatYouWillLearn: [
			"Understand zodiac signs and their traits",
			"Read and interpret birth charts",
			"Identify planetary strengths and weaknesses",
			"Predict life events using transits",
			"Apply astrology to relationships and careers",
			"Avoid common mistakes in chart reading",
		],
		relatedTopics: ["Numerology", "Tarot", "Vastu Shastra"],
		courseIncludes: [
			"8 hours on-demand video",
			"PDF notes",
			"Access on mobile & desktop",
			"Lifetime access",
			"Certificate of completion",
		],
		courseContent: [
			{ title: "Introduction to Astrology", preview: true },
			{ title: "Understanding Zodiac Signs", preview: true },
			{ title: "Planetary Aspects and Houses", preview: true },
			{ title: "Birth Chart Interpretation", preview: true },
			{ title: "Practical Readings", preview: false },
		],
		requirements: [
			"No prior astrology knowledge required",
			"Interest in metaphysical studies",
			"Notebook and pen for chart notes",
		],
		detailedDescription: [
			"This course simplifies astrology for beginners.",
			"Learn to read charts and understand planetary effects.",
			"We focus on real-world applications.",
		],
		instructors: [
			{
				name: "Priya Sharma",
				bio: "Astrology consultant with 12 years of professional experience.",
				profileImage: "/images/astrologer-avatar.png",
				specialties: [
					"Horoscope Reading",
					"Relationship Astrology",
					"Business Astrology",
				],
				rating: 4.8,
				students: 8450,
				reviews: [
					{
						reviewer: "Rahul M",
						comment: "Great introduction to astrology.",
						rating: 5,
					},
				],
			},
		],
	},
	{
		id: 3,
		title: "Numerology Mastery",
		description:
			"Unlock the secrets of numbers and how they influence your personality and life path.",
		price: 1100,
		originalPrice: 3200,
		image: "/images/course-numerology.png",
		createdBy: "Rahul Kapoor",
		lastUpdated: "06/2025",
		languages: ["Hindi", "English"],
		subtitles: ["Hindi", "English"],
		includedInPlans: true,
		premium: true,
		rating: 4.9,
		ratingCount: 1250,
		learners: 7200,
		duration: 3,
		lessions: 18,
		progress: 70,
		whatYouWillLearn: [
			"Calculate and interpret life path numbers",
			"Understand name numerology",
			"Predict personal years and months",
			"Use numerology for career guidance",
			"Apply numerology in relationships",
			"Create numerology compatibility charts",
		],
		relatedTopics: ["Astrology", "Tarot", "Palmistry"],
		courseIncludes: [
			"5 hours on-demand video",
			"Numerology calculator tool",
			"Access on mobile and desktop",
			"Lifetime access",
			"Certificate of completion",
		],
		courseContent: [
			{ title: "Introduction to Numerology", preview: true },
			{ title: "Core Numbers and Calculations", preview: true },
			{ title: "Name Vibration Analysis", preview: true },
			{ title: "Numerology for Decision Making", preview: false },
			{ title: "Advanced Predictive Techniques", preview: false },
		],
		requirements: [
			"Basic math skills",
			"Interest in self-discovery",
			"Calculator or smartphone",
		],
		detailedDescription: [
			"Comprehensive guide to practical numerology applications",
			"Learn to make important life decisions using numbers",
			"Includes personalized number analysis techniques",
		],
		instructors: [
			{
				name: "Rahul Kapoor",
				bio: "Numerologist with 10+ years experience helping clients worldwide",
				profileImage: "/images/instructor-rahul.png",
				specialties: [
					"Life Path Analysis",
					"Business Numerology",
					"Name Correction",
					"Compatibility Readings",
				],
				rating: 4.9,
				students: 7200,
				reviews: [
					{
						reviewer: "Neha S",
						comment: "Changed how I view numbers forever!",
						rating: 5,
					},
				],
			},
		],
	},
	{
		id: 4,
		title: "Tarot Reading Fundamentals",
		description:
			"Learn to read tarot cards with confidence and provide meaningful interpretations.",
		price: 950,
		originalPrice: 2800,
		image: "/images/course-tarot.png",
		createdBy: "Meena Patel",
		lastUpdated: "04/2025",
		languages: ["English"],
		subtitles: ["English"],
		includedInPlans: false,
		premium: true,
		rating: 4.7,
		ratingCount: 980,
		learners: 5400,
		duration: 3,
		lessions: 18,
		progress: 100,
		whatYouWillLearn: [
			"Understand all 78 tarot cards",
			"Perform accurate spreads",
			"Develop intuitive reading skills",
			"Interpret card combinations",
			"Ethics of professional tarot reading",
			"Common reading mistakes to avoid",
		],
		relatedTopics: ["Astrology", "Numerology", "Divination"],
		courseIncludes: [
			"7 hours on-demand video",
			"Digital tarot deck",
			"Cheat sheets for quick reference",
			"Lifetime access",
			"Certificate of completion",
		],
		courseContent: [
			{ title: "Tarot History and Structure", preview: true },
			{ title: "Major Arcana Deep Dive", preview: true },
			{ title: "Minor Arcana Interpretation", preview: true },
			{ title: "Popular Spreads Explained", preview: false },
			{ title: "Developing Psychic Connection", preview: false },
		],
		requirements: [
			"Tarot deck (physical or digital)",
			"Open mind to intuitive development",
			"Journal for recording readings",
		],
		detailedDescription: [
			"Step-by-step guide from complete beginner to confident reader",
			"Special focus on intuitive interpretation beyond memorization",
			"Includes real-life reading examples and practice exercises",
		],
		instructors: [
			{
				name: "Meena Patel",
				bio: "Professional tarot reader and teacher with 8 years experience",
				profileImage: "/images/instructor-meena.png",
				specialties: [
					"Predictive Tarot",
					"Relationship Readings",
					"Career Guidance",
					"Spiritual Development",
				],
				rating: 4.7,
				students: 5400,
				reviews: [
					{
						reviewer: "Anjali K",
						comment: "Made tarot accessible and fun to learn!",
						rating: 5,
					},
				],
			},
		],
	},
	{
		id: 5,
		title: "Palmistry Decoded",
		description:
			"Master the art of palm reading to understand personality traits and predict life events.",
		price: 1500,
		originalPrice: 2500,
		image: "/images/course-palmistry.png",
		createdBy: "Vikram Joshi",
		lastUpdated: "03/2025",
		languages: ["Hindi"],
		subtitles: ["English"],
		includedInPlans: true,
		premium: false,
		rating: 4.6,
		ratingCount: 870,
		learners: 4800,
		duration: 3,
		lessions: 18,
		progress: 100,
		whatYouWillLearn: [
			"Identify major lines and mounts",
			"Interpret hand shapes and finger characteristics",
			"Analyze relationship compatibility",
			"Predict career and health trends",
			"Understand timing of events",
			"Combine palmistry with other divination methods",
		],
		relatedTopics: ["Astrology", "Face Reading", "Psychic Development"],
		courseIncludes: [
			"4 hours on-demand video",
			"Hand analysis templates",
			"Access on mobile and desktop",
			"Lifetime access",
			"Certificate of completion",
		],
		courseContent: [
			{ title: "Introduction to Palmistry", preview: true },
			{ title: "Major Lines Deep Analysis", preview: true },
			{ title: "Mounts and Special Markings", preview: true },
			{ title: "Timing Events on Palm", preview: false },
			{ title: "Advanced Predictive Techniques", preview: false },
		],
		requirements: [
			"Interest in human psychology",
			"Good observation skills",
			"Camera or scanner for practice",
		],
		detailedDescription: [
			"Practical approach to reading palms for self and others",
			"Focus on both traditional and modern interpretations",
			"Includes case studies from real palm readings",
		],
		instructors: [
			{
				name: "Vikram Joshi",
				bio: "Palmistry expert with 12 years of professional practice",
				profileImage: "/images/instructor-vikram.png",
				specialties: [
					"Career Prediction",
					"Health Indicators",
					"Relationship Analysis",
					"Child Potential Reading",
				],
				rating: 4.6,
				students: 4800,
				reviews: [
					{
						reviewer: "Sanjay P",
						comment: "Excellent teacher with clear explanations",
						rating: 4,
					},
				],
			},
		],
	},
	{
		id: 6,
		title: "Crystal Healing Certification",
		description:
			"Learn to use crystals for healing, protection and spiritual growth.",
		price: 130,
		originalPrice: 3800,
		image: "/images/course-crystals.png",
		createdBy: "Ananya Gupta",
		lastUpdated: "02/2025",
		languages: ["English"],
		subtitles: ["English"],
		includedInPlans: true,
		premium: true,
		rating: 4.8,
		ratingCount: 1100,
		learners: 6200,
		duration: 3,
		lessions: 18,
		progress: 70,
		whatYouWillLearn: [
			"Identify and select appropriate crystals",
			"Create effective crystal grids",
			"Program crystals for specific purposes",
			"Use crystals for chakra balancing",
			"Make crystal elixirs safely",
			"Combine crystals with other healing modalities",
		],
		relatedTopics: ["Reiki", "Meditation", "Energy Healing"],
		courseIncludes: [
			"6 hours on-demand video",
			"Crystal properties guide",
			"Access on mobile and desktop",
			"Lifetime access",
			"Professional certification",
		],
		courseContent: [
			{ title: "Crystal Basics and Selection", preview: true },
			{ title: "Cleansing and Charging Methods", preview: true },
			{ title: "Chakra Healing with Crystals", preview: true },
			{ title: "Advanced Grid Work", preview: false },
			{ title: "Professional Practice Setup", preview: false },
		],
		requirements: [
			"Basic set of crystals (list provided)",
			"Openness to energy work",
			"Quiet space for practice",
		],
		detailedDescription: [
			"Comprehensive training from beginner to professional level",
			"Scientific and metaphysical approaches combined",
			"Includes business guidance for professional practitioners",
		],
		instructors: [
			{
				name: "Ananya Gupta",
				bio: "Master crystal healer and teacher with 9 years experience",
				profileImage: "/images/instructor-ananya.png",
				specialties: [
					"Chakra Therapy",
					"Crystal Grids",
					"Space Clearing",
					"Jewelry Creation",
				],
				rating: 4.8,
				students: 6200,
				reviews: [
					{
						reviewer: "Priya M",
						comment: "Transformational course with practical techniques",
						rating: 5,
					},
				],
			},
		],
	},
	{
		id: 7,
		title: "Meditation for Modern Life",
		description:
			"Practical meditation techniques to reduce stress and enhance focus in daily life.",
		price: 150,
		originalPrice: 2200,
		image: "/images/course-meditation.png",
		createdBy: "Deepak Oberoi",
		lastUpdated: "01/2025",
		languages: ["Hindi", "English"],
		subtitles: ["Hindi", "English"],
		includedInPlans: false,
		premium: false,
		rating: 4.9,
		ratingCount: 2300,
		learners: 12800,
		duration: 3,
		lessions: 18,
		progress: 70,
		whatYouWillLearn: [
			"5-minute meditation techniques for busy schedules",
			"Breathwork for stress relief",
			"Mindfulness in everyday activities",
			"Overcoming common meditation obstacles",
			"Creating sustainable practice habits",
			"Advanced concentration techniques",
		],
		relatedTopics: ["Yoga", "Ayurveda", "Energy Healing"],
		courseIncludes: [
			"3 hours on-demand video",
			"Guided meditation audio files",
			"Access on mobile and desktop",
			"Lifetime access",
			"Certificate of completion",
		],
		courseContent: [
			{ title: "Meditation Fundamentals", preview: true },
			{ title: "Breath Awareness Techniques", preview: true },
			{ title: "Mindfulness in Motion", preview: true },
			{ title: "Deepening Your Practice", preview: false },
			{ title: "Meditation for Specific Goals", preview: false },
		],
		requirements: [
			"Willingness to practice daily",
			"Quiet space (even small)",
			"Comfortable seating",
		],
		detailedDescription: [
			"Evidence-based techniques adapted for modern lifestyles",
			"Special focus on overcoming meditation challenges",
			"Includes 30-day guided practice plan",
		],
		instructors: [
			{
				name: "Deepak Oberoi",
				bio: "Meditation teacher trained in multiple traditions with 7 years teaching experience",
				profileImage: "/images/instructor-deepak.png",
				specialties: [
					"Stress Reduction",
					"Focus Enhancement",
					"Sleep Improvement",
					"Corporate Mindfulness",
				],
				rating: 4.9,
				students: 12800,
				reviews: [
					{
						reviewer: "Rohit K",
						comment: "Finally a meditation course that works for my busy life!",
						rating: 5,
					},
				],
			},
		],
	},
	{
		id: 8,
		title: "Advanced Astrology: Predictive Techniques",
		description:
			"Take your astrology skills to the next level with professional predictive methods.",
		price: 1250,
		originalPrice: 4500,
		image: "/images/course-advanced-astrology.png",
		createdBy: "Priya Sharma",
		lastUpdated: "06/2025",
		languages: ["English"],
		subtitles: ["English"],
		includedInPlans: true,
		premium: true,
		rating: 4.9,
		ratingCount: 650,
		learners: 3200,
		duration: 3,
		lessions: 18,
		progress: 70,
		whatYouWillLearn: [
			"Advanced chart interpretation techniques",
			"Accurate timing with transits and progressions",
			"Solar return and lunar return charts",
			"Synastry and composite relationship analysis",
			"Financial and career prediction methods",
			"Professional consultation techniques",
		],
		relatedTopics: ["Numerology", "Tarot", "Vedic Astrology"],
		courseIncludes: [
			"10 hours on-demand video",
			"Advanced calculation templates",
			"Access on mobile and desktop",
			"Lifetime access",
			"Professional certification",
		],
		courseContent: [
			{ title: "Review of Core Concepts", preview: true },
			{ title: "Advanced House Interpretation", preview: true },
			{ title: "Predictive Timing Methods", preview: false },
			{ title: "Specialized Chart Types", preview: false },
			{ title: "Building Professional Practice", preview: false },
		],
		requirements: [
			"Completion of beginner astrology course",
			"Ability to calculate basic charts",
			"Dedication to practice readings",
		],
		detailedDescription: [
			"For serious students wanting professional-level skills",
			"Focus on accurate prediction techniques",
			"Includes business aspects of professional astrology",
		],
		instructors: [
			{
				name: "Priya Sharma",
				bio: "Professional astrologer with 15 years predictive experience",
				profileImage: "/images/instructor-priya.png",
				specialties: [
					"Financial Astrology",
					"Medical Astrology",
					"Electional Astrology",
					"Horary Astrology",
				],
				rating: 4.9,
				students: 3200,
				reviews: [
					{
						reviewer: "Amit R",
						comment: "Took my chart reading skills to professional level",
						rating: 5,
					},
				],
			},
		],
	},
	{
		id: 9,
		title: "Ayurvedic Nutrition Fundamentals",
		description:
			"Learn to balance your diet according to Ayurvedic principles for optimal health.",
		price: 1300,
		originalPrice: 2700,
		image: "/images/course-ayurveda.png",
		createdBy: "Dr. Sanjay Verma",
		lastUpdated: "05/2025",
		languages: ["Hindi", "English"],
		subtitles: ["Hindi", "English"],
		includedInPlans: true,
		premium: false,
		rating: 4.7,
		ratingCount: 980,
		learners: 5400,
		duration: 3,
		lessions: 18,
		progress: 70,
		whatYouWillLearn: [
			"Determine your dosha type",
			"Select foods for your constitution",
			"Prepare simple Ayurvedic meals",
			"Use spices therapeutically",
			"Follow seasonal eating guidelines",
			"Address common imbalances through diet",
		],
		relatedTopics: ["Yoga", "Meditation", "Herbal Remedies"],
		courseIncludes: [
			"4 hours on-demand video",
			"Recipe ebook",
			"Access on mobile and desktop",
			"Lifetime access",
			"Certificate of completion",
		],
		courseContent: [
			{ title: "Ayurveda Basics", preview: true },
			{ title: "Dosha Assessment", preview: true },
			{ title: "Food Classification System", preview: true },
			{ title: "Simple Ayurvedic Recipes", preview: false },
			{ title: "Therapeutic Diet Plans", preview: false },
		],
		requirements: [
			"Interest in holistic health",
			"Basic cooking facilities",
			"Openness to dietary changes",
		],
		detailedDescription: [
			"Practical approach to Ayurvedic eating",
			"Focus on easily available ingredients",
			"Includes 21-day meal plan templates",
		],
		instructors: [
			{
				name: "Dr. Sanjay Verma",
				bio: "Ayurvedic practitioner with MD in Ayurveda and 10 years clinical experience",
				profileImage: "/images/instructor-sanjay.png",
				specialties: [
					"Digestive Health",
					"Weight Management",
					"Detoxification",
					"Rasayana Therapy",
				],
				rating: 4.7,
				students: 5400,
				reviews: [
					{
						reviewer: "Neha T",
						comment: "Finally understand what foods work for my body type!",
						rating: 5,
					},
				],
			},
		],
	},
	{
		id: 10,
		title: "Reiki Level I Certification",
		description:
			"Receive attunement and learn to channel Reiki energy for self-healing and growth.",
		price: 1310,
		originalPrice: 3600,
		image: "/images/course-reiki.png",
		createdBy: "Maya Krishnan",
		lastUpdated: "04/2025",
		languages: ["English"],
		subtitles: ["English"],
		includedInPlans: true,
		premium: true,
		rating: 4.8,
		ratingCount: 1450,
		learners: 7800,
		duration: 3,
		lessions: 18,
		progress: 70,
		whatYouWillLearn: [
			"History and principles of Reiki",
			"Proper hand positions for self-treatment",
			"Energy cleansing techniques",
			"Developing sensitivity to energy",
			"Creating sacred space",
			"Ethics of energy healing",
		],
		relatedTopics: ["Crystal Healing", "Meditation", "Chakra Balancing"],
		courseIncludes: [
			"5 hours on-demand video",
			"Attunement process",
			"Access on mobile and desktop",
			"Lifetime access",
			"Official certification",
		],
		courseContent: [
			{ title: "Reiki Origins and Principles", preview: true },
			{ title: "Self-Healing Techniques", preview: true },
			{ title: "Energy Awareness Development", preview: false },
			{ title: "21-Day Cleansing Process", preview: false },
			{ title: "Next Steps in Practice", preview: false },
		],
		requirements: [
			"Openness to energy concepts",
			"Quiet space for practice",
			"Commitment to 21-day self-treatment",
		],
		detailedDescription: [
			"Traditional Usui Reiki training adapted for online learning",
			"Focus on establishing strong foundational skills",
			"Includes guidance for continuing to higher levels",
		],
		instructors: [
			{
				name: "Maya Krishnan",
				bio: "Reiki Master Teacher with 12 years experience in traditional Usui Reiki",
				profileImage: "/images/instructor-maya.png",
				specialties: [
					"Traditional Reiki",
					"Animal Reiki",
					"Distance Healing",
					"Reiki for Children",
				],
				rating: 4.8,
				students: 7800,
				reviews: [
					{
						reviewer: "Arjun P",
						comment: "The attunement experience was powerful even online",
						rating: 5,
					},
				],
			},
		],
	},
	{
		id: 11,
		title: "Face Reading Secrets",
		description:
			"Decode personality traits and life patterns through the ancient art of face reading.",
		price: 1380,
		originalPrice: 2400,
		image: "/images/course-face-reading.png",
		createdBy: "Rajiv Malhotra",
		lastUpdated: "03/2025",
		languages: ["Hindi"],
		subtitles: ["English"],
		includedInPlans: false,
		premium: false,
		rating: 4.5,
		ratingCount: 720,
		learners: 3900,
		duration: 3,
		lessions: 18,
		progress: 70,
		whatYouWillLearn: [
			"Interpret facial features and shapes",
			"Understand personality from facial characteristics",
			"Predict relationship compatibility",
			"Identify health indicators",
			"Analyze career potential",
			"Combine with other divination methods",
		],
		relatedTopics: ["Palmistry", "Astrology", "Physiognomy"],
		courseIncludes: [
			"3 hours on-demand video",
			"Face analysis templates",
			"Access on mobile and desktop",
			"Lifetime access",
			"Certificate of completion",
		],
		courseContent: [
			{ title: "Introduction to Face Reading", preview: true },
			{ title: "Forehead and Brow Analysis", preview: true },
			{ title: "Eye Interpretation", preview: true },
			{ title: "Nose and Mouth Characteristics", preview: false },
			{ title: "Advanced Composite Analysis", preview: false },
		],
		requirements: [
			"Good observation skills",
			"Camera for practice exercises",
			"Interest in human behavior",
		],
		detailedDescription: [
			"Practical system for quick personality assessment",
			"Focus on real-world applications",
			"Includes celebrity face analysis examples",
		],
		instructors: [
			{
				name: "Rajiv Malhotra",
				bio: "Face reading specialist with 9 years professional experience",
				profileImage: "/images/instructor-rajiv.png",
				specialties: [
					"Personality Assessment",
					"Compatibility Analysis",
					"Career Guidance",
					"Health Indicators",
				],
				rating: 4.5,
				students: 3900,
				reviews: [
					{
						reviewer: "Sunita M",
						comment: "Fascinating course with immediate practical use",
						rating: 4,
					},
				],
			},
		],
	},
	{
		id: 12,
		title: "Dream Interpretation Guide",
		description:
			"Learn to understand the hidden messages in your dreams for personal growth.",
		price: 1300,
		originalPrice: 2100,
		image: "/images/course-dreams.png",
		createdBy: "Nandini Rao",
		lastUpdated: "02/2025",
		languages: ["English", "Hindi"],
		subtitles: ["English", "Hindi"],
		includedInPlans: true,
		premium: false,
		rating: 4.4,
		ratingCount: 580,
		learners: 3100,
		duration: 3,
		lessions: 18,
		progress: 70,
		whatYouWillLearn: [
			"Common dream symbols and meanings",
			"Personal symbol dictionary creation",
			"Lucid dreaming techniques",
			"Recurring dream interpretation",
			"Psychological vs spiritual approaches",
			"Dream journaling best practices",
		],
		relatedTopics: ["Psychology", "Meditation", "Subconscious Mind"],
		courseIncludes: [
			"3 hours on-demand video",
			"Dream symbol guide",
			"Access on mobile and desktop",
			"Lifetime access",
			"Certificate of completion",
		],
		courseContent: [
			{ title: "Dream Basics and Recording", preview: true },
			{ title: "Universal Symbol Interpretation", preview: true },
			{ title: "Personal Symbol Development", preview: true },
			{ title: "Special Dream Types", preview: false },
			{ title: "Practical Application", preview: false },
		],
		requirements: [
			"Notebook for dream journal",
			"Commitment to record dreams",
			"Openness to self-reflection",
		],
		detailedDescription: [
			"Combines psychological and metaphysical approaches",
			"Focus on personal growth through dream work",
			"Includes techniques to enhance dream recall",
		],
		instructors: [
			{
				name: "Nandini Rao",
				bio: "Dream researcher with background in psychology and mystical traditions",
				profileImage: "/images/instructor-nandini.png",
				specialties: [
					"Symbol Interpretation",
					"Lucid Dreaming",
					"Prophetic Dreams",
					"Nightmare Resolution",
				],
				rating: 4.4,
				students: 3100,
				reviews: [
					{
						reviewer: "Priyanka D",
						comment: "Helped me understand recurring dreams I've had for years",
						rating: 4,
					},
				],
			},
		],
	},
];

export const courseVideo = [
	{
		id: 1,
		title: "Lorem ipsum dolor sit amet",
		videoUrl: "/videos/course.mp4",
	},
	{
		id: 2,
		title: "Lorem ipsum dolor sit amet",
		videoUrl: "/videos/course.mp4",
	},
	{
		id: 3,
		title: "Lorem ipsum dolor sit amet",
		videoUrl: "/videos/course.mp4",
	},
	{
		id: 4,
		title: "Lorem ipsum dolor sit amet",
		videoUrl: "/videos/course.mp4",
	},
];

export const chatsData = [
	{
		id: 1,
		name: "Abhishek",
		avatar: "/avatars/abhishek.jpg",
		lastMessage: "Lorem ipsum dolor sit amet...",
		messages: [
			{
				id: 1,
				sender: "them",
				text: "Lorem ipsum dolor sit amet, consectetur?",
				time: "3:02 PM",
			},
			{
				id: 2,
				sender: "me",
				text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor",
				time: "3:15 PM",
			},
			{
				id: 3,
				sender: "them",
				text: "Lorem ipsum dolor sit amet, consectetur?",
				time: "3:02 PM",
			},
		],
	},
	{
		id: 2,
		name: "John",
		avatar: "/avatars/john.jpg",
		lastMessage: "Hey, how are you?",
		messages: [
			{ id: 1, sender: "me", text: "Hey John!", time: "4:10 PM" },
			{ id: 2, sender: "them", text: "All good here!", time: "4:11 PM" },
		],
	},
	{
		id: 3,
		name: "Maria",
		avatar: "/avatars/maria.jpg",
		lastMessage: "Are we meeting tomorrow?",
		messages: [
			{
				id: 1,
				sender: "them",
				text: "Are we meeting tomorrow?",
				time: "5:20 PM",
			},
		],
	},
];

export const GroupChatsData = [
	{
		id: 1,
		name: "Project Alpha Team",
		type: "group",
		participants: [
			{ id: "u1", name: "Abhishek", avatar: "/images/aditi.png" },
			{ id: "u2", name: "John", avatar: "/avatars/john.jpg" },
			{ id: "u3", name: "Maria", avatar: "/avatars/maria.jpg" },
			{ id: "me", name: "You", avatar: "/avatars/me.jpg" },
		],
		lastMessage: "Maria: Let's meet tomorrow!",
		messages: [
			{
				id: 1,
				sender: "u1",
				text: "Hey team, any updates on the project?",
				time: "3:02 PM",
			},
			{
				id: 2,
				sender: "me",
				text: "Yes, I’ve completed the frontend integration.",
				time: "3:15 PM",
			},
			{
				id: 3,
				sender: "u2",
				text: "Backend API is ready for deployment.",
				time: "3:25 PM",
			},
			{
				id: 4,
				sender: "u3",
				text: "Let's meet tomorrow to finalize everything.",
				time: "3:40 PM",
			},
		],
	},
	{
		id: 2,
		name: "Marketing Crew",
		type: "group",
		participants: [
			{ id: "u4", name: "Ravi", avatar: "/avatars/ravi.jpg" },
			{ id: "u5", name: "Anita", avatar: "/avatars/anita.jpg" },
			{ id: "me", name: "You", avatar: "/avatars/me.jpg" },
		],
		lastMessage: "Anita: I’ll prepare the ad copy.",
		messages: [
			{
				id: 1,
				sender: "u4",
				text: "We need a new campaign for next month.",
				time: "10:05 AM",
			},
			{
				id: 2,
				sender: "u5",
				text: "I’ll prepare the ad copy.",
				time: "10:12 AM",
			},
		],
	},
	{
		id: 3,
		name: "Friends Hangout",
		type: "group",
		participants: [
			{ id: "u6", name: "Priya", avatar: "/avatars/priya.jpg" },
			{ id: "u7", name: "Karan", avatar: "/avatars/karan.jpg" },
			{ id: "u8", name: "Neha", avatar: "/avatars/neha.jpg" },
			{ id: "me", name: "You", avatar: "/avatars/me.jpg" },
		],
		lastMessage: "Karan: Movie night this weekend?",
		messages: [
			{
				id: 1,
				sender: "u7",
				text: "Movie night this weekend?",
				time: "7:45 PM",
			},
			{
				id: 2,
				sender: "u8",
				text: "I’m in! 🍿",
				time: "7:50 PM",
			},
			{
				id: 3,
				sender: "u6",
				text: "Count me in too!",
				time: "7:52 PM",
			},
		],
	},
];

export const videoData = [
	{
		id: 1,
		youtubeId: "Ke90Tje7VS0",
		title: "React JS Crash Course",
		description:
			"A complete beginner-friendly React JS crash course covering components, state, props, and hooks.",
	},
	{
		id: 2,
		youtubeId: "1Rs2ND1ryYc",
		title: "Tailwind CSS Full Tutorial",
		description:
			"Learn how to design beautiful websites quickly using Tailwind CSS utility classes.",
	},
	{
		id: 3,
		youtubeId: "Oe421EPjeBE",
		title: "Node.js Crash Course",
		description:
			"Understand Node.js fundamentals and build a simple backend API in under an hour.",
	},
	{
		id: 4,
		youtubeId: "Z1Yd7upQsXY",
		title: "JavaScript Tutorial for Beginners",
		description:
			"A beginner’s guide to JavaScript fundamentals including variables, functions, and DOM manipulation.",
	},
	{
		id: 5,
		youtubeId: "gK1WkL3D-nI",
		title: "MongoDB Tutorial",
		description:
			"Learn how to work with MongoDB, create collections, and run queries in this crash course.",
	},
	{
		id: 6,
		youtubeId: "Fdf5aTYRW0E",
		title: "Express.js Crash Course",
		description:
			"A step-by-step guide to building APIs with Express.js and handling routes, middleware, and requests.",
	},
	{
		id: 7,
		youtubeId: "SqcY0GlETPk",
		title: "Next.js Tutorial for Beginners",
		description:
			"Learn how to build modern web apps with Next.js, including SSR and API routes.",
	},
	{
		id: 8,
		youtubeId: "Dorf8i6lCuk",
		title: "React Hooks Tutorial",
		description:
			"Master React Hooks like useState, useEffect, and useContext with practical examples.",
	},
	{
		id: 9,
		youtubeId: "lWMemPN9t6Q",
		title: "Authentication with JWT",
		description:
			"Learn how to implement user authentication in Node.js using JWT (JSON Web Tokens).",
	},
	{
		id: 10,
		youtubeId: "Oive66jrwBs",
		title: "Full MERN Stack Project",
		description:
			"A complete walkthrough of building a full-stack MERN application with authentication and CRUD features.",
	},
];

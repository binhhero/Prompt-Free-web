


import { PromptItem, PromptCategory, AITool, BlogPost, VideoItem } from './types';

export const FEATURED_PROMPTS: PromptItem[] = [
  {
    id: '1',
    title: 'Chân dung Cyberpunk (Pro)',
    description: 'Tạo hình ảnh chân dung phong cách tương lai với ánh sáng neon. Chất lượng 8K.',
    content: 'A futuristic cyberpunk portrait of a woman with neon glowing cybernetic implants, rainy night city background, highly detailed, cinematic lighting, 8k resolution --ar 2:3 --v 6.0',
    category: PromptCategory.ART,
    tags: ['Midjourney', 'Cyberpunk', 'Portrait'],
    author: 'Admin',
    likes: 1240,
    imageUrl: 'https://picsum.photos/400/600?random=1',
    isPro: true
  },
  {
    id: '2',
    title: 'Viết bài chuẩn SEO',
    description: 'Prompt giúp viết bài blog chuẩn SEO về công nghệ.',
    content: 'Hãy viết một bài blog chuẩn SEO dài 1000 từ về chủ đề "Tương lai của Trí tuệ nhân tạo". Sử dụng các từ khóa: AI, Machine Learning, Automation. Cấu trúc bài viết gồm: Mở bài, 3 luận điểm chính, và Kết luận. Giọng văn chuyên nghiệp.',
    category: PromptCategory.SEO,
    tags: ['ChatGPT', 'Gemini', 'Writing'],
    author: 'SEO_Master',
    likes: 850,
    isPro: false
  },
  {
    id: '3',
    title: 'Logo Vector tối giản (Pro)',
    description: 'Thiết kế logo phẳng, đơn giản cho startup công nghệ.',
    content: 'Minimalist vector logo for a tech startup named "Nexus", abstract geometric shape, blue and white color scheme, flat design, white background, Paul Rand style',
    category: PromptCategory.ART,
    tags: ['Dall-E', 'Logo', 'Design'],
    author: 'DesignPro',
    likes: 560,
    imageUrl: 'https://picsum.photos/400/400?random=2',
    isPro: true
  },
  {
    id: '4',
    title: 'React Component Generator',
    description: 'Tạo component React với Tailwind CSS.',
    content: 'Create a responsive React navigation bar component using Tailwind CSS. Include a logo on the left, links in the center, and a "Sign In" button on the right. Mobile menu should be collapsible.',
    category: PromptCategory.CODING,
    tags: ['Coding', 'React', 'Web'],
    author: 'DevGuru',
    likes: 2100,
    isPro: false
  },
  {
    id: '5',
    title: 'Kế hoạch Marketing Mạng xã hội',
    description: 'Lên lịch đăng bài 1 tháng cho quán cà phê.',
    content: 'Lập kế hoạch nội dung Facebook trong 4 tuần cho một quán cà phê mới mở. Mục tiêu: tăng nhận diện thương hiệu. Bao gồm ý tưởng hình ảnh và caption cho 3 bài đăng mỗi tuần.',
    category: PromptCategory.MARKETING,
    tags: ['Marketing', 'Social Media', 'Plan'],
    author: 'MarketerX',
    likes: 930,
    isPro: false
  },
  {
    id: '6',
    title: 'Phong cảnh Fantasy (Pro)',
    description: 'Vẽ cảnh quan thế giới giả tưởng hùng vĩ.',
    content: 'Epic fantasy landscape, floating islands in the sky, waterfalls cascading into clouds, dragon flying in distance, ethereal lighting, matte painting style, Studio Ghibli inspired',
    category: PromptCategory.ART,
    tags: ['Midjourney', 'Fantasy', 'Landscape'],
    author: 'ArtWiz',
    likes: 1500,
    imageUrl: 'https://picsum.photos/600/400?random=3',
    isPro: true
  },
  // Additional Prompts for 3x4 Grid
  {
    id: '7',
    title: 'Nhiếp ảnh sản phẩm (Pro)',
    description: 'Chụp ảnh chai nước hoa sang trọng trên nền lụa.',
    content: 'Luxury perfume bottle photography, silk background, soft pastel colors, professional lighting, macro shot, 8k --v 6.0',
    category: PromptCategory.PHOTOGRAPHY,
    tags: ['Midjourney', 'Product', 'Luxury'],
    author: 'PhotoAI',
    likes: 420,
    imageUrl: 'https://picsum.photos/400/400?random=4',
    isPro: true
  },
  {
    id: '8',
    title: 'Python Data Analysis',
    description: 'Script Python phân tích dữ liệu bán hàng từ CSV.',
    content: 'Write a Python script using Pandas to read a CSV file named "sales.csv". Calculate total revenue, average order value, and find the top-selling product category. Output the results to the console.',
    category: PromptCategory.CODING,
    tags: ['Python', 'Data', 'Code'],
    author: 'DataSci',
    likes: 780,
    isPro: false
  },
  {
    id: '9',
    title: 'Email Marketing Cold Outreach',
    description: 'Viết email chào hàng dịch vụ thiết kế web.',
    content: 'Write a cold outreach email to a small business owner offering web design services. Keep it short, personalized, and focus on the benefits of having a modern website. Include a call to action.',
    category: PromptCategory.MARKETING,
    tags: ['Email', 'Sales', 'Copywriting'],
    author: 'SalesBot',
    likes: 310,
    isPro: false
  },
  {
    id: '10',
    title: 'Nhân vật hoạt hình 3D (Pro)',
    description: 'Tạo nhân vật chú mèo dễ thương phong cách Pixar.',
    content: 'Cute fluffy cat character, Pixar style 3D render, big eyes, wearing a small backpack, bright colors, friendly expression, plain background --ar 1:1',
    category: PromptCategory.ART,
    tags: ['Midjourney', '3D', 'Cute'],
    author: 'ToonMaker',
    likes: 1100,
    imageUrl: 'https://picsum.photos/400/400?random=5',
    isPro: true
  },
  {
    id: '11',
    title: 'Dịch thuật đa ngôn ngữ',
    description: 'Dịch văn bản sang tiếng Nhật, Hàn, Trung tự nhiên.',
    content: 'Translate the following English text into natural-sounding Japanese, Korean, and Simplified Chinese. Maintain the polite tone suitable for a business email.',
    category: PromptCategory.WRITING,
    tags: ['Translate', 'Language', 'Global'],
    author: 'Polyglot',
    likes: 540,
    isPro: false
  },
  {
    id: '12',
    title: 'Kiến trúc hiện đại (Pro)',
    description: 'Thiết kế biệt thự kính giữa rừng thông.',
    content: 'Modern glass villa architecture in a pine forest, brutalist concrete elements, warm interior lighting, twilight atmosphere, photorealistic, architectural digest style --ar 16:9',
    category: PromptCategory.PHOTOGRAPHY,
    tags: ['Architecture', 'Midjourney', 'House'],
    author: 'ArchiBot',
    likes: 980,
    imageUrl: 'https://picsum.photos/600/400?random=6',
    isPro: true
  }
];

export const AI_TOOLS: AITool[] = [
  // --- Chatbots & LLMs ---
  {
    id: '1',
    name: 'ChatGPT',
    description: 'Chatbot AI phổ biến nhất thế giới từ OpenAI.',
    url: '#',
    category: 'Chatbot',
    priceModel: 'Freemium',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg'
  },
  {
    id: '2',
    name: 'Gemini',
    description: 'Mô hình AI đa phương thức mạnh mẽ của Google.',
    url: '#',
    category: 'Chatbot',
    priceModel: 'Freemium',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg'
  },
  {
    id: '3',
    name: 'Claude 3',
    description: 'AI thông minh, an toàn và có khả năng xử lý văn bản dài.',
    url: '#',
    category: 'Chatbot',
    priceModel: 'Paid',
    imageUrl: 'https://picsum.photos/100/100?random=10'
  },
  {
    id: '4',
    name: 'Perplexity',
    description: 'Công cụ tìm kiếm AI cung cấp nguồn tin cậy.',
    url: '#',
    category: 'Search',
    priceModel: 'Freemium',
    imageUrl: 'https://picsum.photos/100/100?random=11'
  },
  {
    id: '5',
    name: 'Poe',
    description: 'Truy cập nhiều mô hình AI (GPT-4, Claude) cùng lúc.',
    url: '#',
    category: 'Chatbot',
    priceModel: 'Freemium',
    imageUrl: 'https://picsum.photos/100/100?random=12'
  },
  {
    id: '26',
    name: 'Grok',
    description: 'AI hài hước và cập nhật thời gian thực từ X (Twitter).',
    url: '#',
    category: 'Chatbot',
    priceModel: 'Paid',
    imageUrl: 'https://picsum.photos/100/100?random=36'
  },

  // --- Image Generation ---
  {
    id: '6',
    name: 'Midjourney',
    description: 'Tạo ảnh nghệ thuật chất lượng cao nhất hiện nay.',
    url: '#',
    category: 'Image Gen',
    priceModel: 'Paid',
    imageUrl: 'https://picsum.photos/100/100?random=13'
  },
  {
    id: '7',
    name: 'Stable Diffusion',
    description: 'Mô hình tạo ảnh mã nguồn mở, tùy biến cao.',
    url: '#',
    category: 'Image Gen',
    priceModel: 'Free',
    imageUrl: 'https://picsum.photos/100/100?random=14'
  },
  {
    id: '8',
    name: 'DALL-E 3',
    description: 'Tạo ảnh chính xác theo prompt, tích hợp trong ChatGPT.',
    url: '#',
    category: 'Image Gen',
    priceModel: 'Paid',
    imageUrl: 'https://picsum.photos/100/100?random=15'
  },
  {
    id: '9',
    name: 'Leonardo.ai',
    description: 'Nền tảng tạo assets game và nghệ thuật chuyên nghiệp.',
    url: '#',
    category: 'Image Gen',
    priceModel: 'Freemium',
    imageUrl: 'https://picsum.photos/100/100?random=16'
  },
  {
    id: '10',
    name: 'Adobe Firefly',
    description: 'Tạo ảnh an toàn bản quyền cho thiết kế thương mại.',
    url: '#',
    category: 'Image Gen',
    priceModel: 'Freemium',
    imageUrl: 'https://picsum.photos/100/100?random=17'
  },
   {
    id: '27',
    name: 'Krea AI',
    description: 'Tạo và nâng cấp ảnh thời gian thực chất lượng cao.',
    url: '#',
    category: 'Image Gen',
    priceModel: 'Freemium',
    imageUrl: 'https://picsum.photos/100/100?random=37'
  },
   {
    id: '28',
    name: 'Magnific AI',
    description: 'Upscale và tăng chi tiết ảnh lên mức không tưởng.',
    url: '#',
    category: 'Image Gen',
    priceModel: 'Paid',
    imageUrl: 'https://picsum.photos/100/100?random=38'
  },

  // --- Video Generation ---
  {
    id: '11',
    name: 'Runway Gen-2',
    description: 'Tạo video từ văn bản và chỉnh sửa video bằng AI.',
    url: '#',
    category: 'Video Gen',
    priceModel: 'Freemium',
    imageUrl: 'https://picsum.photos/100/100?random=18'
  },
  {
    id: '12',
    name: 'Pika Labs',
    description: 'Nền tảng tạo video hoạt hình và 3D ấn tượng.',
    url: '#',
    category: 'Video Gen',
    priceModel: 'Freemium',
    imageUrl: 'https://picsum.photos/100/100?random=19'
  },
  {
    id: '13',
    name: 'HeyGen',
    description: 'Tạo video người ảo thuyết trình như thật.',
    url: '#',
    category: 'Video Gen',
    priceModel: 'Paid',
    imageUrl: 'https://picsum.photos/100/100?random=20'
  },
  {
    id: '14',
    name: 'Sora',
    description: 'Mô hình tạo video chân thực đột phá từ OpenAI.',
    url: '#',
    category: 'Video Gen',
    priceModel: 'Paid',
    imageUrl: 'https://picsum.photos/100/100?random=21'
  },
  {
    id: '29',
    name: 'Luma Dream Machine',
    description: 'Tạo video chất lượng cao, miễn phí dùng thử.',
    url: '#',
    category: 'Video Gen',
    priceModel: 'Freemium',
    imageUrl: 'https://picsum.photos/100/100?random=39'
  },

  // --- Audio & Music ---
  {
    id: '15',
    name: 'Suno AI',
    description: 'Tạo bài hát đầy đủ lời và nhạc chỉ trong vài giây.',
    url: '#',
    category: 'Audio',
    priceModel: 'Freemium',
    imageUrl: 'https://picsum.photos/100/100?random=22'
  },
  {
    id: '16',
    name: 'ElevenLabs',
    description: 'Công nghệ giọng đọc AI (TTS) tự nhiên nhất.',
    url: '#',
    category: 'Audio',
    priceModel: 'Freemium',
    imageUrl: 'https://picsum.photos/100/100?random=23'
  },
  {
    id: '17',
    name: 'Udio',
    description: 'Tạo nhạc chất lượng cao với khả năng tùy biến sâu.',
    url: '#',
    category: 'Audio',
    priceModel: 'Free',
    imageUrl: 'https://picsum.photos/100/100?random=24'
  },

  // --- Coding & Productivity ---
  {
    id: '18',
    name: 'GitHub Copilot',
    description: 'Trợ lý lập trình AI giúp viết code nhanh hơn.',
    url: '#',
    category: 'Coding',
    priceModel: 'Paid',
    imageUrl: 'https://picsum.photos/100/100?random=25'
  },
  {
    id: '19',
    name: 'Jasper',
    description: 'Viết nội dung Marketing chuyên nghiệp cho doanh nghiệp.',
    url: '#',
    category: 'Writing',
    priceModel: 'Paid',
    imageUrl: 'https://picsum.photos/100/100?random=26'
  },
  {
    id: '20',
    name: 'Notion AI',
    description: 'Tích hợp AI trực tiếp vào không gian làm việc Notion.',
    url: '#',
    category: 'Productivity',
    priceModel: 'Paid',
    imageUrl: 'https://picsum.photos/100/100?random=27'
  },
  {
    id: '21',
    name: 'Canva Magic',
    description: 'Bộ công cụ thiết kế AI tích hợp trong Canva.',
    url: '#',
    category: 'Design',
    priceModel: 'Freemium',
    imageUrl: 'https://picsum.photos/100/100?random=28'
  },
  {
    id: '22',
    name: 'Gamma',
    description: 'Tạo slide thuyết trình đẹp mắt chỉ bằng văn bản.',
    url: '#',
    category: 'Productivity',
    priceModel: 'Freemium',
    imageUrl: 'https://picsum.photos/100/100?random=29'
  },
  {
    id: '23',
    name: 'Copy.ai',
    description: 'Tạo nội dung quảng cáo và blog nhanh chóng.',
    url: '#',
    category: 'Writing',
    priceModel: 'Freemium',
    imageUrl: 'https://picsum.photos/100/100?random=30'
  },
  {
    id: '24',
    name: 'Quillbot',
    description: 'Công cụ Paraphrase và kiểm tra ngữ pháp hàng đầu.',
    url: '#',
    category: 'Writing',
    priceModel: 'Freemium',
    imageUrl: 'https://picsum.photos/100/100?random=31'
  },
  {
    id: '25',
    name: 'Beautiful.ai',
    description: 'Thiết kế slide thông minh, tự động căn chỉnh.',
    url: '#',
    category: 'Productivity',
    priceModel: 'Paid',
    imageUrl: 'https://picsum.photos/100/100?random=32'
  },
  {
    id: '30',
    name: 'Replit Ghostwriter',
    description: 'AI Coding tích hợp trong môi trường IDE trực tuyến.',
    url: '#',
    category: 'Coding',
    priceModel: 'Paid',
    imageUrl: 'https://picsum.photos/100/100?random=40'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Prompt Midjourney tốt nhất tháng này',
    excerpt: 'Tổng hợp những câu lệnh tạo ảnh đẹp nhất được cộng đồng bình chọn. Từ phong cách điện ảnh đến tranh sơn dầu.',
    date: '2023-10-25',
    imageUrl: 'https://picsum.photos/600/300?random=20',
    author: 'Admin',
    authorAvatar: 'https://ui-avatars.com/api/?name=Admin&background=random',
    tags: ['Midjourney', 'Tips', 'Art'],
    readTime: '8 phút',
    views: 12450
  },
  {
    id: '2',
    title: 'Cách sử dụng Gemini để viết code nhanh hơn',
    excerpt: 'Hướng dẫn chi tiết cách tối ưu hóa quy trình lập trình với Google Gemini. Debug, refactor và tạo boilerplate code trong vài giây.',
    date: '2023-10-20',
    imageUrl: 'https://picsum.photos/600/300?random=21',
    author: 'DevGuru',
    authorAvatar: 'https://ui-avatars.com/api/?name=DevGuru&background=random',
    tags: ['Coding', 'Gemini', 'Productivity'],
    readTime: '12 phút',
    views: 8900
  },
  {
    id: '3',
    title: 'AI sẽ thay đổi ngành Marketing như thế nào?',
    excerpt: 'Phân tích xu hướng marketing tự động hóa trong năm 2024. Cá nhân hóa trải nghiệm khách hàng ở quy mô lớn.',
    date: '2023-10-15',
    imageUrl: 'https://picsum.photos/600/300?random=22',
    author: 'MarketerX',
    authorAvatar: 'https://ui-avatars.com/api/?name=MarketerX&background=random',
    tags: ['Marketing', 'Trends', 'Business'],
    readTime: '6 phút',
    views: 15200
  },
  {
    id: '4',
    title: 'Hướng dẫn sử dụng Stable Diffusion cho người mới',
    excerpt: 'Làm quen với Stable Diffusion: Cài đặt, cấu hình và những prompt cơ bản để bắt đầu hành trình sáng tạo của bạn.',
    date: '2023-10-10',
    imageUrl: 'https://picsum.photos/600/300?random=60',
    author: 'ArtAI',
    authorAvatar: 'https://ui-avatars.com/api/?name=ArtAI&background=random',
    tags: ['Stable Diffusion', 'Tutorial', 'Beginner'],
    readTime: '15 phút',
    views: 6700
  },
  {
    id: '5',
    title: 'So sánh ChatGPT Plus và Claude 3 Opus',
    excerpt: 'Đâu là mô hình ngôn ngữ tốt nhất hiện nay? Bài viết so sánh chi tiết về khả năng lập luận, sáng tạo và độ chính xác.',
    date: '2023-10-05',
    imageUrl: 'https://picsum.photos/600/300?random=61',
    author: 'TechReview',
    authorAvatar: 'https://ui-avatars.com/api/?name=TechReview&background=random',
    tags: ['Review', 'LLM', 'ChatGPT'],
    readTime: '10 phút',
    views: 22000
  },
  {
    id: '6',
    title: '5 công cụ AI tạo video miễn phí tốt nhất',
    excerpt: 'Khám phá các công cụ tạo video từ văn bản (text-to-video) miễn phí giúp bạn sản xuất nội dung TikTok và Youtube Shorts.',
    date: '2023-09-30',
    imageUrl: 'https://picsum.photos/600/300?random=62',
    author: 'VideoMaker',
    authorAvatar: 'https://ui-avatars.com/api/?name=VideoMaker&background=random',
    tags: ['Video', 'Tools', 'Free'],
    readTime: '7 phút',
    views: 18500
  },
  {
    id: '7',
    title: 'Prompt Engineering: Nghề mới lương nghìn đô?',
    excerpt: 'Tìm hiểu về kỹ năng "ra lệnh" cho AI. Tại sao các công ty công nghệ đang săn đón kỹ sư Prompt với mức lương khủng?',
    date: '2023-09-25',
    imageUrl: 'https://picsum.photos/600/300?random=63',
    author: 'CareerCoach',
    authorAvatar: 'https://ui-avatars.com/api/?name=CareerCoach&background=random',
    tags: ['Career', 'Prompt Engineering', 'Jobs'],
    readTime: '9 phút',
    views: 31000
  },
  {
    id: '8',
    title: 'Tạo slide thuyết trình đẹp mắt với Gamma AI',
    excerpt: 'Không cần tốn hàng giờ thiết kế PowerPoint. Gamma AI giúp bạn tạo slide chuyên nghiệp chỉ từ một dàn ý thô.',
    date: '2023-09-20',
    imageUrl: 'https://picsum.photos/600/300?random=64',
    author: 'OfficePro',
    authorAvatar: 'https://ui-avatars.com/api/?name=OfficePro&background=random',
    tags: ['Productivity', 'Design', 'Presentation'],
    readTime: '5 phút',
    views: 9400
  },
  {
    id: '9',
    title: 'Đạo đức AI: Những vấn đề cần quan tâm',
    excerpt: 'Bàn về bản quyền, thiên kiến (bias) và tác động của AI đến thị trường lao động. Góc nhìn đa chiều.',
    date: '2023-09-15',
    imageUrl: 'https://picsum.photos/600/300?random=65',
    author: 'EthicsWatch',
    authorAvatar: 'https://ui-avatars.com/api/?name=EthicsWatch&background=random',
    tags: ['Ethics', 'Opinion', 'Society'],
    readTime: '11 phút',
    views: 5600
  },
  {
    id: '10',
    title: 'Tối ưu hóa SEO với Surfer SEO và Jasper',
    excerpt: 'Kết hợp sức mạnh của dữ liệu và AI để viết bài content leo top Google nhanh chóng và bền vững.',
    date: '2023-09-10',
    imageUrl: 'https://picsum.photos/600/300?random=66',
    author: 'SEO_Master',
    authorAvatar: 'https://ui-avatars.com/api/?name=SEO_Master&background=random',
    tags: ['SEO', 'Marketing', 'Tools'],
    readTime: '14 phút',
    views: 11200
  },
  {
    id: '11',
    title: 'Photoshop tích hợp AI Firefly: Cuộc cách mạng chỉnh sửa ảnh',
    excerpt: 'Tính năng Generative Fill của Photoshop thay đổi cách chúng ta chỉnh sửa ảnh như thế nào? Review chi tiết.',
    date: '2023-09-05',
    imageUrl: 'https://picsum.photos/600/300?random=67',
    author: 'DesignPro',
    authorAvatar: 'https://ui-avatars.com/api/?name=DesignPro&background=random',
    tags: ['Design', 'Adobe', 'Review'],
    readTime: '8 phút',
    views: 14300
  },
  {
    id: '12',
    title: 'Tổng hợp 50 Prompts ChatGPT cho dân văn phòng',
    excerpt: 'Bộ sưu tập prompt giúp viết email, tóm tắt báo cáo, lên lịch trình và soạn thảo hợp đồng nhanh chóng.',
    date: '2023-09-01',
    imageUrl: 'https://picsum.photos/600/300?random=68',
    author: 'Admin',
    authorAvatar: 'https://ui-avatars.com/api/?name=Admin&background=random',
    tags: ['ChatGPT', 'Productivity', 'Office'],
    readTime: '20 phút',
    views: 45000
  }
];

export const PRACTICAL_VIDEOS: VideoItem[] = [
  {
    id: '1',
    title: 'Hướng dẫn Midjourney V6 cho người mới bắt đầu',
    duration: '15:20',
    views: '24K views',
    thumbnailUrl: 'https://picsum.photos/600/350?random=50',
    author: 'AI Academy'
  },
  {
    id: '2',
    title: 'Tối ưu hóa ChatGPT để viết Content Marketing',
    duration: '10:05',
    views: '12K views',
    thumbnailUrl: 'https://picsum.photos/600/350?random=51',
    author: 'Marketing Pro'
  },
  {
    id: '3',
    title: 'Tạo Video từ văn bản với Sora AI',
    duration: '08:45',
    views: '50K views',
    thumbnailUrl: 'https://picsum.photos/600/350?random=52',
    author: 'Tech Review'
  },
  {
    id: '4',
    title: 'Kiếm tiền từ AI Art: Hướng dẫn từ A-Z',
    duration: '22:10',
    views: '35K views',
    thumbnailUrl: 'https://picsum.photos/600/350?random=53',
    author: 'Passive Income'
  }
];
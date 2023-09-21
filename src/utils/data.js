const billieEilish = {
    id: 2,
    name: "Billie Eilish",
    avatar: "https://i.ytimg.com/vi/E9Ljxq_Sl-E/hqdefault.jpg"
}

const minamino = {
    id: 1,
    name: "Minamino",
    avatar: "https://th.bing.com/th/id/OIP.ZpNOsfN4Tzl8UMtCe7j2kwHaE8?pid=ImgDet&w=192&h=128&c=7&dpr=1.3"
}


const doDoanVu = {
    id: 3,
    name: "Đỗ Doãn Vũ",
    avatar: "https://th.bing.com/th/id/OIP.iNi82mqaHFetC_F3ANxBeQHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7"
}


const nguyenHoangVy = {
    id: 4,
    name: "Nguyen Hoang Vy",
    avatar: "https://th.bing.com/th/id/OIP.5aLF0OgX8_h2W7yrXmrZNgHaE8?w=192&h=128&c=7&r=0&o=5&dpr=1.3&pid=1.7"
}


const hiu = {
    id: 5,
    name: "Híu",
    avatar: "https://th.bing.com/th/id/OIP.mLA2Heru41ZftFNA4RgeigHaFj?w=192&h=144&c=7&r=0&o=5&dpr=1.3&pid=1.7",
}

const quangNam = {
    id: 6,
    name: "Quang Nam",
    avatar: "https://th.bing.com/th/id/OIP.gFM1TD9LEvbotNqSlPGrmQHaFY?w=192&h=140&c=7&r=0&o=5&dpr=1.3&pid=1.7"
}


const lamTran = {
    id: 7,
    name: "Lâm Trần",
    avatar: "https://th.bing.com/th/id/OIP.OucO-gLm1krkEbWTltrRQAHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7"
}


const conversation2 = [
    {
        id: 1,
        name: "User 2",
        avatar: "https://i.ytimg.com/vi/E9Ljxq_Sl-E/hqdefault.jpg",
        message: "Wait 'til the world is mine",
        time: "Wed 12:32",
        unread: false
    },
    {
        id: 2,
        name: "Đỗ Doãn Vũ",
        avatar: "https://th.bing.com/th/id/OIP.iNi82mqaHFetC_F3ANxBeQHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        message: "Khong di a? ",
        time: "Today 08:31",
        unread: true
    },
    {
        id: 3,
        name: "Nguyen Hoang Vy",
        avatar: "https://th.bing.com/th/id/OIP.5aLF0OgX8_h2W7yrXmrZNgHaE8?w=192&h=128&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        message: "Nhô đi chưa 😊, tôi đang trên ...",
        time: "Today 08:32",
        unread: false
    },
    {
        id: 3,
        name: "Híu",
        avatar: "https://th.bing.com/th/id/OIP.mLA2Heru41ZftFNA4RgeigHaFj?w=192&h=144&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        message: "Oceee",
        time: "Mon 18:42",
        unread: false
    },
    {
        id: 4,
        name: "Quang Nam",
        avatar: "https://th.bing.com/th/id/OIP.gFM1TD9LEvbotNqSlPGrmQHaFY?w=192&h=140&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        message: "Chốc nữa run ko?",
        time: "Mon 17:22",
        unread: true
    },
    {
        id: 5,
        name: "Lâm Trần",
        avatar: "https://th.bing.com/th/id/OIP.OucO-gLm1krkEbWTltrRQAHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        message: "Uk oke 😊",
        time: "Mon 13:51",
        unread: false
    }
]

export const messages = [
    {
        conversationId: 1,
        name: "Billie Eilish",
        onlineStatus: "online",
        avatar: "https://i.ytimg.com/vi/E9Ljxq_Sl-E/hqdefault.jpg",
        lastSeen: {
            messageId: 14,
            user: billieEilish
        },
        lastSent: {
            messageId: 15
        },
        messages: [
            {
                id: 1,
                user: minamino,
                content: "Hello, can you hear me?",
                time: "2023-08-12T12:12:30"
            },
            {
                id: 2,
                user: billieEilish,
                content: "It's not true, tell me I've been lied to",
                time: "2023-08-20T12:30:10"
            },
            {
                id: 3,
                user: billieEilish,
                content: "Crying isn't like you, ooh",
                time: "2023-08-20T12:30:10"
            },
            {
                id: 4,
                user: billieEilish,
                content: "What the hell did I do?",
                time: "2023-08-20T12:30:10"
            },
            {
                id: 5,
                user: billieEilish,
                content: "Never been the type to",
                time: "2023-08-20T12:30:10"
            },
            {
                id: 6,
                user: billieEilish,
                content: "Let someone see right through, ooh",
                time: "2023-08-20T12:30:10"
            },
            {
                id: 7,
                user: billieEilish,
                content: "Ooh ooh ooh ooh ooh",
                time: "2023-08-20T12:30:10"
            },
            {
                id: 8,
                user: minamino,
                content: "Maybe won't you take it back?",
                time: "2023-08-20T12:30:10"
            },
            {
                id: 9,
                user: minamino,
                content: "Does anyone have a more sophisticated solution/library for truncating strings with JavaScript and putting an ellipsis on the end, than the obvious one: if (string.length",
                time: "2023-08-20T12:30:10"
            },
            {
                id: 10,
                user: minamino,
                content: "In linguistics, an ellipsis is a series of three dots (…) that indicates an intentional omission of a word, sentence, or whole section from a text without changing its original meaning. It is commonly used in writing to indicate a pause or trailing off of thought, or to represent an unfinished sentence. In programming, an ellipsis is often used to indicate that there is more content to be displayed or entered, prompting the user to take further action.",
                time: "2023-08-20T12:30:10"
            },
            {
                id: 11,
                user: billieEilish,
                content: "Byte my tongue, bide my time",
                time: "2023-08-20T12:30:10",
                replyTo: {
                    id: 11,
                    user: billieEilish,
                    content: "Wearing a warningem",
                    time: "2023-08-20T12:30:10"
                }
            },
            {
                id: 12,
                user: billieEilish,
                content: "In linguistics, an ellipsis is a series of three dots (…) that indicates an intentional omission of a word, sentence, or whole section from a text without changing its original meaning. It is commonly used in writing to indicate a pause or trailing off of thought, or to represent an unfinished sentence. In programming, an ellipsis is often used to indicate that there is more content to be displayed or entered, prompting the user to take further action.",
                time: "2023-08-20T12:30:10",
                replyTo: {
                    id: 11,
                    user: billieEilish,
                    content: "Wearing a warningem",
                    time: "2023-08-20T12:30:10"
                }
            },
            {
                id: 13,
                user: minamino,
                content: "Wait 'til the world is mine lorem100 Wait 'til the world is mine lorem100 Wait 'til the world is mine lorem100 Wait 'til the world is mine lorem100 Wait 'til the world is mine lorem100 Wait 'til the world is mine lorem100 Wait 'til the world is mine lorem100 Wait 'til the world is mine lorem100 Wait 'til the world is mine lorem100 Wait 'til the world is mine lorem100 ",
                time: "2023-08-20T12:30:10",
                replyTo: {
                    id: 11,
                    user: billieEilish,
                    content: "Wearing a warningem",
                    time: "2023-08-20T12:30:10"
                }
            },
            {
                id: 14,
                user: minamino,
                content: "It's hard to stop once it starts",
                time: "2023-08-20T12:30:10",
                status: "seen",
            },
            {
                id: 15,
                user: minamino,
                content: "A lot can happen in twenty seconds",
                time: "2023-08-20T12:32:10",

            }
        ]
    },
    {
        conversationId: 2,
        name: "Đỗ Doãn Vũ",
        avatar: "https://th.bing.com/th/id/OIP.iNi82mqaHFetC_F3ANxBeQHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        lastSeen: {
            messageId: 10,
            user: doDoanVu
        },
        lastSent: {
            messageId: 12
        },
        messages: [
            {
                id: 1,
                user: minamino,
                content: "Hey there, how's it going?",
                time: "2023-08-12T12:12:30"
            },
            {
                id: 2,
                user: doDoanVu,
                content: "I'm doing well, thanks for asking!",
                time: "2023-08-12T12:15:45"
            },
            {
                id: 3,
                user: doDoanVu,
                content: "Have you tried the latest Java Spring Boot features?",
                time: "2023-08-12T12:20:22"
            },
            {
                id: 4,
                user: doDoanVu,
                content: "I've been experimenting with microservices architecture lately.",
                time: "2023-08-12T12:25:17"
            },
            {
                id: 5,
                user: doDoanVu,
                content: "It's fascinating how it can improve scalability.",
                time: "2023-08-12T12:30:51"
            },
            {
                id: 6,
                user: doDoanVu,
                content: "What are your thoughts on it?",
                time: "2023-08-12T12:35:29"
            },
            {
                id: 7,
                user: doDoanVu,
                content: "By the way, have you seen any good Java Spring Boot tutorials lately?",
                time: "2023-08-12T12:40:14"
            },
            {
                id: 8,
                user: minamino,
                content: "Yes, I've been keeping an eye out for quality tutorials.",
                time: "2023-08-12T12:45:07"
            },
            {
                id: 9,
                user: minamino,
                content: "I recently came across one that explains Spring Security in-depth. It was really helpful.",
                time: "2023-08-12T12:50:39"
            },
            {
                id: 10,
                user: minamino,
                content: "Let me find the link for you...",
                time: "2023-08-12T12:55:18"
            },
            {
                id: 11,
                user: doDoanVu,
                content: "That sounds great! I've been looking to improve my knowledge of Spring Security.",
                time: "2023-08-12T13:00:02",
                replyTo: {
                    id: 11,
                    user: doDoanVu,
                    content: "Thanks for sharing!",
                    time: "2023-08-12T13:05:09"
                }
            },
            {
                id: 12,
                user: doDoanVu,
                content: "I appreciate your help with this.",
                time: "2023-08-12T13:10:30",
                replyTo: {
                    id: 11,
                    user: doDoanVu,
                    content: "Thanks for sharing!",
                    time: "2023-08-12T13:15:47"
                }
            },
            {
                id: 13,
                user: minamino,
                content: "No problem at all. Here's the link to the Spring Security tutorial: [Spring Security Tutorial](https://example.com/spring-security-tutorial)",
                time: "2023-08-12T13:20:58",
                replyTo: {
                    id: 11,
                    user: doDoanVu,
                    content: "Thanks for sharing!",
                    time: "2023-08-12T13:30:21"
                }
            },
            {
                id: 14,
                user: doDoanVu,
                content: "Xin chao ban",
                time: "2023-08-12T15:20:58",
                replyTo: {
                    id: 11,
                    user: minamino,
                    content: "No problem at all. Here's the link to the Spring Security tutorial: [Spring Security Tutorial](https://example.com/spring-security-tutorial)",
                    time: "2023-08-12T13:30:21"
                }
            }
        ]
    },
    {
        conversationId: 3,
        name: nguyenHoangVy.name,
        avatar: nguyenHoangVy.avatar,
        onlineStatus: "away",
        lastSeen: {
            messageId: 11,
            user: nguyenHoangVy
        },
        lastSent: {
            messageId: 11
        },
        messages: [
            {
                id: 1,
                user: minamino,
                content: "Hey Vy, how's it going?",
                time: "2023-09-15T14:20:30"
            },
            {
                id: 2,
                user: nguyenHoangVy,
                content: "I'm doing great, thanks! How about you?",
                time: "2023-09-15T14:25:45"
            },
            {
                id: 3,
                user: nguyenHoangVy,
                content: "Have you been working on any interesting backend projects lately?",
                time: "2023-09-15T14:30:22"
            },
            {
                id: 4,
                user: minamino,
                content: "Yes, I've been diving into microservices architecture. It's quite challenging but rewarding.",
                time: "2023-09-15T14:35:17"
            },
            {
                id: 5,
                user: nguyenHoangVy,
                content: "That sounds exciting! Any specific technologies or frameworks you're using?",
                time: "2023-09-15T14:40:51"
            },
            {
                id: 6,
                user: minamino,
                content: "I'm primarily using Java and Spring Boot. It provides a solid foundation for microservices.",
                time: "2023-09-15T14:45:29"
            },
            {
                id: 7,
                user: nguyenHoangVy,
                content: "I've heard great things about Java and Spring Boot for backend development. Any tips for someone starting with it?",
                time: "2023-09-15T14:50:14"
            },
            {
                id: 8,
                user: minamino,
                content: "Certainly, Vy! First, focus on mastering the fundamentals of Java. Then, dive into Spring Boot and its core concepts like dependency injection and AOP.",
                time: "2023-09-15T14:55:07"
            },
            {
                id: 9,
                user: minamino,
                content: "Additionally, always keep learning. The tech world evolves quickly, and staying updated is crucial.",
                time: "2023-09-15T15:00:39"
            },
            {
                id: 10,
                user: minamino,
                content: "Lastly, don't hesitate to ask questions and seek help from the developer community. There's a wealth of knowledge out there.",
                time: "2023-09-15T15:05:18"
            },
            {
                id: 11,
                user: nguyenHoangVy,
                content: "Thanks for the valuable advice, Minamino! I'll definitely keep that in mind as I continue my journey into backend development.",
                time: "2023-09-15T15:10:02",
                replyTo: {
                    id: 11,
                    user: nguyenHoangVy,
                    content: "I appreciate your guidance.",
                    time: "2023-09-15T15:15:09"
                }
            },
            {
                id: 11,
                user: nguyenHoangVy,
                content: "By the way, do you have any book recommendations on Java and Spring Boot?",
                time: "2023-09-15T15:20:30",
                replyTo: {
                    id: 11,
                    user: nguyenHoangVy,
                    content: "I appreciate your guidance.",
                    time: "2023-09-15T15:25:47"
                }
            },
            {
                id: 11,
                user: minamino,
                content: "Certainly, Vy! Two highly recommended books are 'Effective Java' by Joshua Bloch for Java and 'Spring in Action' by Craig Walls for Spring Boot.",
                time: "2023-09-15T15:30:58",
                replyTo: {
                    id: 11,
                    user: nguyenHoangVy,
                    content: "I appreciate your guidance.",
                    time: "2023-09-15T15:40:21"
                }
            }
        ]
    },
    {
        conversationId: 4,
        name: hiu.name,
        avatar: hiu.avatar,
        onlineStatus: "online",
        lastSeen: {
            messageId: 9,
            user: hiu
        },
        lastSent: {
            messageId: 12
        },
        messages: [
            {
                id: 1,
                user: minamino,
                content: "Hello! I've always been fascinated by space and astronomy. Do you share the same interest?",
                time: "2023-09-21T16:00:00"
            },
            {
                id: 2,
                user: hiu,
                content: "Absolutely! Space is a captivating and endless frontier. What aspect of space interests you the most?",
                time: "2023-09-21T16:05:15"
            },
            {
                id: 3,
                user: minamino,
                content: "I'm particularly intrigued by black holes. Their mysterious nature and the way they warp space and time are mind-boggling.",
                time: "2023-09-21T16:10:30"
            },
            {
                id: 4,
                user: hiu,
                content: "Black holes are indeed enigmatic. Have you heard about the recent discoveries related to supermassive black holes at the centers of galaxies?",
                time: "2023-09-21T16:15:45"
            },
            {
                id: 5,
                user: minamino,
                content: "I've read a bit about them, but I'd love to learn more. Do you have any recommendations for articles or books on this topic?",
                time: "2023-09-21T16:20:55"
            },
            {
                id: 6,
                user: hiu,
                content: "Certainly! A great starting point is 'Black Holes and Time Warps: Einstein's Outrageous Legacy' by Kip S. Thorne. It provides a fascinating insight into the world of black holes.",
                time: "2023-09-21T16:25:20"
            },
            {
                id: 7,
                user: hiu,
                content: "Additionally, you might want to explore articles from reputable space science journals like 'Astronomy & Astrophysics' and 'The Astrophysical Journal.' They often feature the latest research findings.",
                time: "2023-09-21T16:30:40"
            },
            {
                id: 8,
                user: minamino,
                content: "Thanks for the recommendations! I'm excited to dive deeper into the world of black holes and space exploration.",
                time: "2023-09-21T16:35:55"
            },
            {
                id: 9,
                user: minamino,
                content: "By the way, have you ever tried stargazing or astrophotography? It's a fantastic way to connect with the cosmos.",
                time: "2023-09-21T16:40:10"
            },
            {
                id: 10,
                user: hiu,
                content: "Absolutely! I've spent countless nights gazing at the stars through my telescope and capturing the beauty of celestial objects with astrophotography. It's a truly awe-inspiring experience.",
                time: "2023-09-21T16:45:25"
            },
            {
                id: 11,
                user: hiu,
                content: "If you ever decide to give it a try, I can share some tips and resources to get you started on your stargazing and astrophotography journey.",
                time: "2023-09-21T16:50:40"
            },
            {
                id: 12,
                user: minamino,
                content: "That would be fantastic! I'd love to explore the night sky and capture its wonders. Let's connect on this more in the future. Thanks for the great conversation!",
                time: "2023-09-21T16:55:55"
            }
        ]
    },
    {
        conversationId: 5,
        name: quangNam.name,
        avatar: quangNam.avatar,
        onlineStatus: "online",
        lastSeen: {
            messageId: 14,
            user: quangNam
        },
        lastSent: {
            messageId: 14
        },
        messages: [
            {
                id: 1,
                user: minamino,
                content: "Hello! I'm a big fan of pop music. Do you enjoy listening to pop songs as well?",
                time: "2023-09-22T18:00:00"
            },
            {
                id: 2,
                user: quangNam,
                content: "Hi there! Yes, I absolutely love pop music. It's so diverse and catchy. Who are some of your favorite pop artists?",
                time: "2023-09-22T18:05:15"
            },
            {
                id: 3,
                user: minamino,
                content: "I have a wide range of favorites, but I really admire artists like Beyoncé, Taylor Swift, and Bruno Mars. Their talent and creativity are exceptional.",
                time: "2023-09-22T18:10:30"
            },
            {
                id: 4,
                user: quangNam,
                content: "Great choices! Beyoncé's performances are legendary, and Taylor Swift's songwriting is remarkable. Have you attended any pop music concerts recently?",
                time: "2023-09-22T18:15:45"
            },
            {
                id: 5,
                user: minamino,
                content: "I haven't been to a concert in a while due to the pandemic, but I'm looking forward to attending live shows again. How about you? Any memorable concert experiences?",
                time: "2023-09-22T18:20:55"
            },
            {
                id: 6,
                user: quangNam,
                content: "I miss live concerts too. One of my most memorable experiences was seeing Ed Sheeran perform live. His acoustic set was incredible, and the crowd's energy was amazing!",
                time: "2023-09-22T18:25:20"
            },
            {
                id: 7,
                user: quangNam,
                content: "By the way, have you heard any new pop songs or albums that you're really enjoying? I'm always on the lookout for fresh music recommendations.",
                time: "2023-09-22T18:30:40"
            },
            {
                id: 8,
                user: minamino,
                content: "I've been listening to Olivia Rodrigo's debut album 'SOUR.' It's a fantastic blend of pop and rock with emotionally charged lyrics. Highly recommended!",
                time: "2023-09-22T18:35:55"
            },
            {
                id: 9,
                user: minamino,
                content: "If you're into catchy melodies and relatable lyrics, you'll definitely enjoy it.",
                time: "2023-09-22T18:40:10"
            },
            {
                id: 10,
                user: quangNam,
                content: "Thanks for the recommendation! I'll give it a listen. Pop music has a way of connecting with our emotions, and I love exploring new artists and songs.",
                time: "2023-09-22T18:45:25"
            },
            {
                id: 11,
                user: quangNam,
                content: "It's been great chatting about pop music with you. If you come across any more gems, feel free to share them. Let's keep the music conversation going!",
                time: "2023-09-22T18:50:40"
            },
            {
                id: 12,
                user: minamino,
                content: "Absolutely! Music is a universal language, and it's always a pleasure to discuss it with fellow enthusiasts. Let's stay connected and share our musical discoveries.",
                time: "2023-09-22T18:55:55",

            },
            {
                id: 13,
                user: minamino,
                content: "See you around!",
                time: "2023-09-22T18:55:57"
            },
            {
                id: 13,
                user: quangNam,
                content: "Ok!",
                time: "2023-09-22T20:55:57"
            }
        ]
    },
    {
        conversationId: 6,
        name: lamTran.name,
        avatar: lamTran.avatar,
        lastSeen: {
            messageId: 12,
            user: lamTran
        },
        lastSent: {
            messageId: 12
        },
        messages: [
            {
                id: 1,
                user: minamino,
                content: "こんにちは！最近、日本の文化について学んでいます。何かおすすめの本や映画がありますか？",
                time: "2023-09-23T14:00:00"
            },
            {
                id: 2,
                user: lamTran,
                content: "こんにちは！それは素晴らしいですね。日本の文化を知るために、映画『千と千尋の神隠し』と本『ノルウェイの森』をおすすめします。",
                time: "2023-09-23T14:05:15"
            },
            {
                id: 3,
                user: minamino,
                content: "ありがとうございます！『千と千尋の神隠し』はスタジオジブリの作品ですね。楽しみにします！",
                time: "2023-09-23T14:10:30"
            },
            {
                id: 4,
                user: lamTran,
                content: "そうです、スタジオジブリの作品は日本のアニメーションの傑作です。『ノルウェイの森』も感動的な小説です。ぜひ読んでみてください。",
                time: "2023-09-23T14:15:45"
            },
            {
                id: 5,
                user: minamino,
                content: "また、日本の料理が大好きです。おすすめのレストランや料理はありますか？",
                time: "2023-09-23T14:20:55"
            },
            {
                id: 6,
                user: lamTran,
                content: "日本の料理は美味しいですね！特に寿司やラーメンはおすすめです。お住まいの地域によって異なりますが、地元の寿司屋やラーメン店を探してみてください。",
                time: "2023-09-23T14:25:20"
            },
            {
                id: 7,
                user: lamTran,
                content: "また、居酒屋で日本の居酒屋料理を楽しむのもおすすめです。日本の文化をさらに体験できますよ。",
                time: "2023-09-23T14:30:40"
            },
            {
                id: 8,
                user: minamino,
                content: "それは楽しそうです！日本の居酒屋文化についても学んでみたいです。ありがとう、友達！",
                time: "2023-09-23T14:35:55"
            },
            {
                id: 9,
                user: minamino,
                content: "また、日本語の勉強もしています。言語の勉強におすすめのアプリやウェブサイトはありますか？",
                time: "2023-09-23T14:40:10"
            },
            {
                id: 10,
                user: lamTran,
                content: "素晴らしい！日本語の勉強にはDuolingoやMemriseといったアプリが役立ちます。また、NHKのウェブサイトには無料の日本語レッスンもあります。",
                time: "2023-09-23T14:45:25"
            },
            {
                id: 11,
                user: lamTran,
                content: "頑張ってください！日本語を学ぶことは素晴らしい冒険です。",
                time: "2023-09-23T14:50:40"
            },
            {
                id: 12,
                user: minamino,
                content: "ありがとう！日本の文化と言語について学ぶことは楽しいです。今後もお互いに学び合いましょう。",
                time: "2023-09-23T14:55:55"
            }
        ]
    }
]

export const directConversationListData = [
    {
        id: 1,
        name: "Billie Eilish",
        avatar: "https://i.ytimg.com/vi/E9Ljxq_Sl-E/hqdefault.jpg",
        lastMessage: {
            unread: false,
            content: "A lot can happen in twenty seconds",
            time: "2023-09-20T15:02:41"
        },
        onlineStatus: "online"
    },
    {
        id: 2,
        name: "Đỗ Doãn Vũ",
        avatar: "https://th.bing.com/th/id/OIP.iNi82mqaHFetC_F3ANxBeQHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        lastMessage: {
            unread: true,
            content: "Xin chao ban",
            time: "2023-09-20T12:02:41"
        },
        onlineStatus: "online"
    },
    {
        id: 3,
        name: "Nguyen Hoang Vy",
        avatar: "https://th.bing.com/th/id/OIP.5aLF0OgX8_h2W7yrXmrZNgHaE8?w=192&h=128&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        lastMessage: {
            unread: false,
            content: "Certainly, Vy! Two highly recommended books are 'Effective Java' by Joshua Bloch for Java and 'Spring in Action' by Craig Walls for Spring Boot",
            time: "2023-09-20T16:02:41"
        },
        onlineStatus: "away"
    },
    {
        id: 4,
        name: "Híu",
        avatar: "https://th.bing.com/th/id/OIP.mLA2Heru41ZftFNA4RgeigHaFj?w=192&h=144&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        lastMessage: {
            unread: false,
            content: "That would be fantastic! I'd love to explore the night sky and capture its wonders. Let's connect on this more in the future. Thanks for the great conversation!",
            time: "2023-09-20T16:02:41"
        },
        onlineStatus: "online"
    },
    {
        id: 5,
        name: "Quang Nam",
        avatar: "https://th.bing.com/th/id/OIP.gFM1TD9LEvbotNqSlPGrmQHaFY?w=192&h=140&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        lastMessage: {
            unread: true,
            content: "Ok",
            time: "2023-09-20T16:02:41"
        },
        onlineStatus: "online"
    },
    {
        id: 6,
        name: "Lâm Trần",
        avatar: "https://th.bing.com/th/id/OIP.OucO-gLm1krkEbWTltrRQAHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        lastMessage: {
            unread: false,
            content: "ありがとう！日本の文化と言語について学ぶことは楽しいです。今後もお互いに学び合いましょう",
            time: "2023-09-20T16:02:41"
        },
        onlineStatus: "offline"
    }
]

export const groupConversationListData = [
    {
        id: 1,
        name: "Meow Meow Meow",
        avatar: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
        lastMessage: {
            unread: true,
            content: "A lot can happen in twenty seconds",
            time: "2023-09-20T18:22:11",
            user: billieEilish
        },
    },
    // create more 3 group chat
    {
        id: 2,
        name: "Những người bạn thân",
        avatar: "https://images.unsplash.com/photo-1542931380-c654087500b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
        lastMessage: {
            unread: false,
            content: "Đừng đùa với thằng này nữa! 🤳",
            time: "2023-09-20T15:09:41",
            user: doDoanVu
        },
    },
    {
        id: 3,
        name: "#Het-Dem-Nay",
        avatar: "https://plus.unsplash.com/premium_photo-1679591002315-cbe428ca5109?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBhcnR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
        lastMessage: {
            unread: false,
            content: "Về chưa sếp?",
            time: "2023-09-20T05:02:41",
            user: nguyenHoangVy
        },
    },
    {
        id: 3,
        name: "Hải, Nam, Hiếu, ...",
        avatar: "https://images.unsplash.com/photo-1573074617613-fc8ef27eaa2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VwZXJjYXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
        lastMessage: {
            unread: true,
            content: "Mai đi chơi không?",
            time: "2023-09-20T10:21:41",
            user: quangNam
        },
    }

]

export const notifiationListData = [
    {
        id: 1,
        image: billieEilish.avatar,
        title: billieEilish.name,
        content: "Reply to your message: A lot can happen in twenty seconds",
        time: "2023-08-20T12:30:10",
        unread: true
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1573074617613-fc8ef27eaa2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VwZXJjYXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
        title: quangNam.name,
        content: "Tagged you in a message: Mai đi chơi không?",
        time: "2023-08-20T16:20:10",
        unread: true
    },
    {
        id: 3,
        image: hiu.avatar,
        title: hiu.name,
        content: "Reacted to your message: That would be fantastic! I'd love to explore the night sky and capture its wonders. Let's connect on this more in the future. Thanks for the great conversation!",
        time: "2023-08-20T16:20:10",
        unread: true
    },
    {
        id: 4,
        image: lamTran.avatar,
        title: lamTran.name,
        content: "Reacted to your message: ありがとう！日本の文化と言語について学ぶことは楽しいです。今後もお互いに学び合いましょう。",
        time: "2023-08-20T16:20:10",
        unread: false
    },
    {
        id: 5,
        image: nguyenHoangVy.avatar,
        title: nguyenHoangVy.name,
        content: "Reply to your message: Certainly, Vy! Two highly recommended books are 'Effective Java' by Joshua Bloch for Java and 'Spring in Action' by Craig Walls for Spring Boot",
        time: "2023-08-20T16:20:10",
        unread: false
    }


]

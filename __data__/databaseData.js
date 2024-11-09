module.exports = {
    roles: [
        {role: 'Admin', id: '142977898717'},
        {role: 'Utilisateur', id: '695849930838'}
    ],
    users: [
        {
            email: 'alice@example.com',
            password_hash: '$2b$10$qMNmU2B8ntspiIFejFVMq.w5UpNdITNcXUpAzNwbYx45lwtPjY2eW', // password
            username: 'alice',
            role_id: '695849930838',
            firstname: 'Alice',
            lastname: 'Dupont',
            birthday: new Date('1985-06-15')
        },
        {
            email: 'bob@example.com',
            password_hash: '$2b$10$qMNmU2B8ntspiIFejFVMq.w5UpNdITNcXUpAzNwbYx45lwtPjY2eW', // password
            username: 'bob',
            role_id: '142977898717',
            firstname: 'Bob',
            lastname: 'Martin',
            birthday: new Date('1988-09-23')
        },
        {
            email: 'charles@example.com',
            password_hash: '$2b$10$qMNmU2B8ntspiIFejFVMq.w5UpNdITNcXUpAzNwbYx45lwtPjY2eW', // password
            username: 'charles',
            role_id: '695849930838',
            firstname: 'Charles',
            lastname: 'Durand',
            birthday: new Date('1991-11-20')
        },
        {
            email: 'diane@example.com',
            password_hash: '$2b$10$qMNmU2B8ntspiIFejFVMq.w5UpNdITNcXUpAzNwbYx45lwtPjY2eW', // password
            username: 'diane',
            role_id: '695849930838',
            firstname: 'Diane',
            lastname: 'Leroy',
            birthday: new Date('1995-02-14')
        },
        {
            email: 'emma@example.com',
            password_hash: '$2b$10$qMNmU2B8ntspiIFejFVMq.w5UpNdITNcXUpAzNwbYx45lwtPjY2eW', // password
            username: 'emma',
            role_id: '695849930838',
            firstname: 'Emma',
            lastname: 'Petit',
            birthday: new Date('2000-05-30')
        },
        {
            email: 'francois@example.com',
            password_hash: '$2b$10$qMNmU2B8ntspiIFejFVMq.w5UpNdITNcXUpAzNwbYx45lwtPjY2eW', // password
            username: 'francois',
            role_id: '695849930838',
            firstname: 'François',
            lastname: 'Roux',
            birthday: new Date('1993-08-22')
        },
        {
            email: 'dorian@tarin.com',
            password_hash: '$2b$10$qMNmU2B8ntspiIFejFVMq.w5UpNdITNcXUpAzNwbYx45lwtPjY2eW', // password
            username: 'DorianLeGoat',
            role_id: '695849930838',
            firstname: 'Dorian',
            lastname: 'Tarin',
            birthday: new Date('2002-01-01')
        },
        {
            email: 'valentin@herve.com',
            password_hash: '$2b$10$qMNmU2B8ntspiIFejFVMq.w5UpNdITNcXUpAzNwbYx45lwtPjY2eW', // password
            username: 'ValAdmin',
            role_id: '142977898717',
            firstname: 'Valentin',
            lastname: 'Hervé',
            birthday: new Date('2003-01-01')
        },
    ],
    themes: [
        {theme: 'Sport', code: 'SPORT'},
        {theme: 'Culture', code: 'CULTURE'},
        {theme: 'Festif', code: 'FESTIF'},
        {theme: 'Professionnel', code: 'PROFESSIONNEL'},
        {theme: 'Autre', code: 'AUTRE'}
    ],
    events: [
        {
            created_by_email: 'alice@example.com',
            theme_code: 'SPORT',
            name: 'Match de Football',
            date: new Date('2023-12-10'),
            price: 20
        },
        {
            created_by_email: 'bob@example.com',
            theme_code: 'CULTURE',
            name: 'Exposition d\'art moderne',
            date: new Date('2023-11-15'),
            price: 21
        },
        {
            created_by_email: 'charles@example.com',
            theme_code: 'FESTIF',
            name: 'Soirée Années 80',
            date: new Date('2024-01-20'),
            price: 22
        },
        {
            created_by_email: 'diane@example.com',
            theme_code: 'PROFESSIONNEL',
            name: 'Conférence sur l\'IA',
            date: new Date('2024-02-15'),
            price: 23
        },
        {
            created_by_email: 'emma@example.com',
            theme_code: 'AUTRE',
            name: 'Atelier de cuisine',
            date: new Date('2023-12-05'),
            price: 24
        },
        {
            created_by_email: 'francois@example.com',
            theme_code: 'SPORT',
            name: 'Tournoi de tennis',
            date: new Date('2023-11-30'),
            price: 25
        },
        {
            created_by_email: 'alice@example.com',
            theme_code: 'CULTURE',
            name: 'Projection de film',
            date: new Date('2023-12-20'),
            price: 26
        },
        {
            created_by_email: 'bob@example.com',
            theme_code: 'FESTIF',
            name: 'Fête de Noël',
            date: new Date('2023-12-24'),
            price: 27
        },
        {
            created_by_email: 'charles@example.com',
            theme_code: 'PROFESSIONNEL',
            name: 'Networking IT',
            date: new Date('2024-03-10'),
            price: 28
        },
        {
            created_by_email: 'diane@example.com',
            theme_code: 'AUTRE',
            name: 'Cours de yoda',
            date: new Date('2024-01-25'),
            price: 29
        },
    ],
    userLikes: [
        {user_email: 'alice@example.com', event_name: 'Match de Football'},
        {user_email: 'alice@example.com', event_name: 'Projection de film'},
        {user_email: 'bob@example.com', event_name: 'Conférence sur l\'IA'},
        {user_email: 'charles@example.com', event_name: 'Soirée Années 80'},
        {user_email: 'charles@example.com', event_name: 'Tournoi de tennis'},
        {user_email: 'diane@example.com', event_name: 'Fête de Noël'},
        {user_email: 'emma@example.com', event_name: 'Atelier de cuisine'},
        {user_email: 'emma@example.com', event_name: 'Cours de yoda'},
        {user_email: 'francois@example.com', event_name: 'Match de Football'},
        {user_email: 'francois@example.com', event_name: 'Projection de film'},
    ],
    messages: [
        {
            sender_email: 'alice@example.com',
            chat_users: ['alice@example.com', 'bob@example.com'],
            content: 'Salut Bob ! Tu viens au match de football ?',
            date: new Date('2023-11-01')
        },
        {
            sender_email: 'bob@example.com',
            chat_users: ['alice@example.com', 'bob@example.com'],
            content: 'Oui, ça va être super !',
            date: new Date('2023-11-01')
        },
        {
            sender_email: 'charles@example.com',
            chat_users: ['charles@example.com', 'diane@example.com'],
            content: 'Salut Diane, tu es libre pour la soirée années 80 ?',
            date: new Date('2024-01-01')
        },
        {
            sender_email: 'diane@example.com',
            chat_users: ['charles@example.com', 'diane@example.com'],
            content: 'Oui, j\'ai hâte d\'y aller !',
            date: new Date('2024-01-02')
        },
        {
            sender_email: 'emma@example.com',
            chat_users: ['emma@example.com', 'francois@example.com'],
            content: 'François, viens-tu à l\'atelier de cuisine ?',
            date: new Date('2023-11-15')
        },
        {
            sender_email: 'francois@example.com',
            chat_users: ['emma@example.com', 'francois@example.com'],
            content: 'Bien sûr, je vais préparer ma spécialité !',
            date: new Date('2023-11-15')
        },
        {
            sender_email: 'francois@example.com',
            chat_users: ['alice@example.com', 'francois@example.com'],
            content: 'Salut Alice ! Comment va en ce beau matin ?',
            date: new Date('2023-11-15')
        },
        {
            sender_email: 'valentin@herve.com',
            chat_users: ['valentin@herve.com', 'dorian@tarin.com'],
            content: 'Salut Dorian ! Comment va en ce beau matin ?',
            date: new Date('2023-11-15T15:03:22Z')
        },
        {
            sender_email: 'dorian@tarin.com',
            chat_users: ['valentin@herve.com', 'dorian@tarin.com'],
            content: 'Ca va, ça va, et toi ?',
            date: new Date('2023-11-15T15:04:22Z')
        },
        {
            sender_email: 'valentin@herve.com',
            chat_users: ['valentin@herve.com', 'dorian@tarin.com'],
            content: 'Tranquillou, même si ce lever à 14h du matin est un pur challenge',
            date: new Date('2023-11-15T15:05:22Z')
        },
        {
            sender_email: 'dorian@tarin.com',
            chat_users: ['valentin@herve.com', 'dorian@tarin.com'],
            content: 'kmthgy,fledsgcnockturdlhmgclitpu gehouhg,c; eshgejschgnv er',
            date: new Date('2023-11-15T15:07:22Z')
        },
        {
            sender_email: 'valentin@herve.com',
            chat_users: ['valentin@herve.com', 'alice@example.com'],
            content: 'Hi !',
            date: new Date('2023-11-15T15:07:22Z')
        },
        {
            sender_email: 'valentin@herve.com',
            chat_users: ['francois@example.com', 'valentin@herve.com'],
            content: 'Hi !',
            date: new Date('2023-11-15T15:07:22Z')
        },
    ]
};

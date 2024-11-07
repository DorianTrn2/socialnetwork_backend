module.exports = {
    roles: [
        {role: 'Admin', id: '142977898717'},
        {role: 'Utilisateur', id: '695849930838'}
    ],
    users: [
        {
            email: 'alice@example.com',
            password_hash: 'hash1',
            username: 'alice',
            role_id: '042977898717',
            firstname: 'Alice',
            lastname: 'Dupont',
            birthday: new Date('1985-06-15')
        },
        {
            email: 'bob@example.com',
            password_hash: 'hash2',
            username: 'bob',
            role_id: '695849930838',
            firstname: 'Bob',
            lastname: 'Martin',
            birthday: new Date('1988-09-23')
        },
        {
            email: 'charles@example.com',
            password_hash: 'hash3',
            username: 'charles',
            role_id: '042977898717',
            firstname: 'Charles',
            lastname: 'Durand',
            birthday: new Date('1991-11-20')
        },
        {
            email: 'diane@example.com',
            password_hash: 'hash4',
            username: 'diane',
            role_id: '042977898717',
            firstname: 'Diane',
            lastname: 'Leroy',
            birthday: new Date('1995-02-14')
        },
        {
            email: 'emma@example.com',
            password_hash: 'hash5',
            username: 'emma',
            role_id: '042977898717',
            firstname: 'Emma',
            lastname: 'Petit',
            birthday: new Date('2000-05-30')
        },
        {
            email: 'francois@example.com',
            password_hash: 'hash6',
            username: 'francois',
            role_id: '042977898717',
            firstname: 'François',
            lastname: 'Roux',
            birthday: new Date('1993-08-22')
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
            date: new Date('2023-12-10')
        },
        {
            created_by_email: 'bob@example.com',
            theme_code: 'CULTURE',
            name: 'Exposition d\'art moderne',
            date: new Date('2023-11-15')
        },
        {
            created_by_email: 'charles@example.com',
            theme_code: 'FESTIF',
            name: 'Soirée Années 80',
            date: new Date('2024-01-20')
        },
        {
            created_by_email: 'diane@example.com',
            theme_code: 'PROFESSIONNEL',
            name: 'Conférence sur l\'IA',
            date: new Date('2024-02-15')
        },
        {
            created_by_email: 'emma@example.com',
            theme_code: 'AUTRE',
            name: 'Atelier de cuisine',
            date: new Date('2023-12-05')
        },
        {
            created_by_email: 'francois@example.com',
            theme_code: 'SPORT',
            name: 'Tournoi de tennis',
            date: new Date('2023-11-30')
        },
        {
            created_by_email: 'alice@example.com',
            theme_code: 'CULTURE',
            name: 'Projection de film',
            date: new Date('2023-12-20')
        },
        {
            created_by_email: 'bob@example.com',
            theme_code: 'FESTIF',
            name: 'Fête de Noël',
            date: new Date('2023-12-24')
        },
        {
            created_by_email: 'charles@example.com',
            theme_code: 'PROFESSIONNEL',
            name: 'Networking IT',
            date: new Date('2024-03-10')
        },
        {
            created_by_email: 'diane@example.com',
            theme_code: 'AUTRE',
            name: 'Cours de yoda',
            date: new Date('2024-01-25')
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
    ]
};

export const USER_MAIN_DATA = [
    {
        id: 32,
        userInfos: {
            firstName: "Vittorio",
            lastName: "Toscano",
            age: 34,
        },
        todayScore: 0.5,
        keyData: {
            calorieCount: 2500,
            proteinCount: 250,
            carbohydrateCount: 190,
            lipidCount: 30,
        },
    },
    {
        id: 7,
        userInfos: {
            firstName: "Mikaela",
            lastName: "Reid",
            age: 24,
        },
        todayScore: 0.12,
        keyData: {
            calorieCount: 1950,
            proteinCount: 150,
            carbohydrateCount: 260,
            lipidCount: 220,
        },
    },
]

export const USER_ACTIVITY = [
    {
        userId: 32,
        sessions: [
            {
                day: "2024-07-01",
                kilogram: 74,
                calories: 240,
            },
            {
                day: "2024-07-02",
                kilogram: 80,
                calories: 220,
            },
            {
                day: "2024-07-03",
                kilogram: 81,
                calories: 280,
            },
            {
                day: "2024-07-04",
                kilogram: 81,
                calories: 290,
            },
            {
                day: "2024-07-05",
                kilogram: 80,
                calories: 160,
            },
            {
                day: "2024-07-06",
                kilogram: 78,
                calories: 162,
            },
            {
                day: "2024-07-07",
                kilogram: 76,
                calories: 390,
            },
        ],
    },
    {
        userId: 7,
        sessions: [
            {
                day: "2024-07-01",
                kilogram: 70,
                calories: 240,
            },
            {
                day: "2024-07-02",
                kilogram: 69,
                calories: 220,
            },
            {
                day: "2024-07-03",
                kilogram: 70,
                calories: 280,
            },
            {
                day: "2024-07-04",
                kilogram: 70,
                calories: 500,
            },
            {
                day: "2024-07-05",
                kilogram: 69,
                calories: 160,
            },
            {
                day: "2024-07-06",
                kilogram: 69,
                calories: 162,
            },
            {
                day: "2024-07-07",
                kilogram: 69,
                calories: 390,
            },
        ],
    },
]

export const USER_AVERAGE_SESSIONS = [
    {
        userId: 32,
        sessions: [
            {
                day: 1,
                sessionLength: 30,
            },
            {
                day: 2,
                sessionLength: 23,
            },
            {
                day: 3,
                sessionLength: 45,
            },
            {
                day: 4,
                sessionLength: 50,
            },
            {
                day: 5,
                sessionLength: 0,
            },
            {
                day: 6,
                sessionLength: 0,
            },
            {
                day: 7,
                sessionLength: 60,
            },
        ],
    },
    {
        userId: 7,
        sessions: [
            {
                day: 1,
                sessionLength: 30,
            },
            {
                day: 2,
                sessionLength: 40,
            },
            {
                day: 3,
                sessionLength: 50,
            },
            {
                day: 4,
                sessionLength: 30,
            },
            {
                day: 5,
                sessionLength: 30,
            },
            {
                day: 6,
                sessionLength: 50,
            },
            {
                day: 7,
                sessionLength: 50,
            },
        ],
    },
]

export const USER_PERFORMANCE = [
    {
        userId: 32,
        kind: {
            1: "cardio",
            2: "energy",
            3: "endurance",
            4: "strength",
            5: "speed",
            6: "intensity",
        },

        data: [
            {
                value: 110,
                kind: 1,
            },
            {
                value: 80,
                kind: 2,
            },
            {
                value: 180,
                kind: 3,
            },
            {
                value: 40,
                kind: 4,
            },
            {
                value: 260,
                kind: 5,
            },
            {
                value: 120,
                kind: 6,
            },
        ],
    },
    {
        userId: 7,
        kind: {
            1: "cardio",
            2: "energy",
            3: "endurance",
            4: "strength",
            5: "speed",
            6: "intensity",
        },

        data: [
            {
                value: 120,
                kind: 1,
            },
            {
                value: 199,
                kind: 2,
            },
            {
                value: 220,
                kind: 3,
            },
            {
                value: 228,
                kind: 4,
            },
            {
                value: 188,
                kind: 5,
            },
            {
                value: 150,
                kind: 6,
            },
        ],
    },
]

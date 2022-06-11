module.exports = {
    database: {
        username: "shopifybackendchallenge",
        password: "shopifybackenddevinternchallengePassword",
        url: "mongodb+srv://shopifybackendchallenge:shopifybackenddevinternchallengePassword@cluster0.w3rh8.mongodb.net/backenddatabase",
    },
    server: {
        port: process.env.PORT || 8000,
    }
}

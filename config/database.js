require("dotenv").config();

const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const secret = process.env.SECRET;
module.exports = {
    database: `mongodb+srv://${username}:${password}@cluster0.2s5jl.mongodb.net/Cluster0?retryWrites=true&w=majority`,
    secret: `${secret}`,
}
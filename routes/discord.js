const express = require("express")
const router = express.Router()

router.get("/", async (req, res) => {
    res.redirect("https://discord.com/users/681424352599736327")
})

module.exports = {
    path: "/discord",
    method: "GET",
    router: router
}
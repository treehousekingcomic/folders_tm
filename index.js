const startedAt = new Date()
const moment = require("moment")
console.log(`Starting... ${moment(startedAt).format("DD.MM.YYYY hh:mm:ss")}`)
const fs = require("fs")
const express = require("express")
const app = express()
app.set("view engine", "ejs")
const conf = require("./utils/config.json")

fs.readdirSync(`${__dirname}/routes/`).forEach(async file => {
    file = require(`${__dirname}/routes/${file}`)
    app.use(file.path, file.router)
    console.log(`Loaded path ${file.path}`)
})

app.get("/image/:name", async (req, res) => {
    if (!fs.existsSync(`${__dirname}/public/${req.params.name}`)) return res.sendStatus(404)
    res.sendFile(`${__dirname}/public/${req.params.name}`)
})

app.get("*", (req, res) => res.redirect("/"))

app.listen(conf.port, () => {
    console.log(`Running on port ${conf.port}`)
})
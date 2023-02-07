import * as express from "express"
import { Socket } from "net"

const app = express()

app.get("/connectiontest", (req, res) => {
    const host: string = req.query.host as string
    const port = parseInt(req.query.port as string)

    new Promise((resolve, reject) => {
        const client = new Socket()

        client.setTimeout(3000)

        client.on("error", (err) => {
            client.destroy()
            resolve(false)
        })

        client.on("timeout", (err) => {
            client.destroy()
            resolve(false)
        })

        client.connect(port, host, () => {
            client.destroy()
            resolve(true)
        })
    }).then(result => {
        console.log(result)

        if (result) {
            res.status(200).send();
        } else {
            res.status(503).send();
        }
    }).catch(error => {
        res.status(503).send()
    })
})

app.listen(8080, "0.0.0.0")

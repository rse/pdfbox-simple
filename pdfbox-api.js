/*
**  PDFBox-Simple -- Simple Apachce PDFBox Wrapper
**  Copyright (c) 2018 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*  internal requirements  */
const path           = require("path")
const fs             = require("mz/fs")

/*  external requirements  */
const which          = require("which")
const EventEmitter   = require("eventemitter3")
const execa          = require("execa")

/*  the API class  */
class PDFBox extends EventEmitter {
    constructor (options = {}) {
        super()

        /*  determine options  */
        this.options = Object.assign({}, {
            javaBinary:  "java",
            javaOptions: "-server -Xms1G -Xmx1G",
            pdfbox:      path.join(__dirname, "pdfbox-cli.jar")
        }, options)
    }
    async exec (...args) {
        /*  resolve path to Java binary  */
        let javaBinary = await new Promise((resolve, reject) => {
            which(this.options.javaBinary, (error, filename) => {
                if (error)
                    reject(new Error("unable to find mandatory Java binary " +
                        `"${this.options.javaBinary}" in your $PATH`))
                else
                    resolve(filename)
            })
        })
        let result = { code: -1, stdout: "", stderr: "" }
        return new Promise((resolve, reject) => {
            /*  spawn the process  */
            this.emit("start")
            this.emit("debug", "pdfbox: starting")
            this.proc = execa(javaBinary, [
                ...this.options.javaOptions.split(/\s+/),
                "-jar", `${this.options.pdfbox}`,
                ...args
            ], { stdio: [ "pipe", "pipe", "pipe" ] })

            /*  detect shutdown of process  */
            this.proc.on("close", (code) => {
                this.emit("close", code)
                this.emit("debug", `pdfbox: close (code: ${code})`)
                this.proc = null
                result.code = code
                resolve(result)
            })

            /*  receive data on stdout from process  */
            this.proc.stdout.on("data", (chunk) => {
                let data = chunk.toString()
                data = data.replace(/\r?\n/g, "\n")
                this.emit("stdout", data)
                this.emit("debug", `pdfbox: stdout: "${data}"`)
                result.stdout += data
            })

            /*  receive data on stderr from process  */
            this.proc.stderr.on("data", (chunk) => {
                let data = chunk.toString()
                data = data.replace(/\r?\n/g, "\n")
                this.emit("stderr", data)
                this.emit("debug", `pdfbox: stderr: "${data}"`)
                result.stderr += data
            })
        })
    }
}

/*  export API class  */
module.exports = PDFBox


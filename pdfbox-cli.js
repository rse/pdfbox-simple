#!/usr/bin/env node
/*!
**  PDFBox-Simple -- Simple Apache PDFBox Wrapper
**  Copyright (c) 2018-2024 Dr. Ralf S. Engelschall <rse@engelschall.com>
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

const PDFBox = require("./pdfbox-api.js")

;(async () => {
    const pdfbox = new PDFBox()
    pdfbox.on("stdout", (data) => { process.stdout.write(data) })
    pdfbox.on("stderr", (data) => { process.stderr.write(data) })
    const args = process.argv.slice(2)
    await pdfbox.exec(...args)
})().catch((err) => {
    process.stderr.write(`pdfbox: ERROR: ${err}\n`)
    process.exit(1)
})


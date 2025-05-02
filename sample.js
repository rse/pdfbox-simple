
(async () => {

    const PDFBox = require(".")
    const pdfbox = new PDFBox()
    await pdfbox.exec("merge", "-i=sample1.pdf", "-i=sample2.pdf", "-o=sample.pdf")

})().catch((err) => {
    console.log(`ERROR: ${err}`)
})



(async () => {

    const PDFBox = require(".")
    const pdfbox = new PDFBox()
    await pdfbox.exec("PDFMerger", "sample1.pdf", "sample2.pdf", "sample.pdf")

})().catch((err) => {
    console.log(`ERROR: ${err}`)
})


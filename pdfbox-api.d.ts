/*
**  PDFBox-Simple -- Simple Apache PDFBox Wrapper
**  Copyright (c) 2018-2021 Dr. Ralf S. Engelschall <rse@engelschall.com>
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

declare class PDFBox {
    constructor(options?: {
        javaBinary?: string   /* default: "/usr/opkg/bin/java" */
        javaOptions?: string  /* default: "-server -Xms1G -Xmx1G" */
        pdfbox?: string       /* default: "${__dirname}/pdfbox-cli.jar" */
    })

    public on(
        event: string,
        callback: (event: any) => void
    ): void

    public exec(
        ...args
    ): Promise<{
        code: number,
        stdout: string,
        stderr: string
    }>
}


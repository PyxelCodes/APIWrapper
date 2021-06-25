import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

class Document extends NextDocument {
    static async getInitialProps(ctx) {
        const initialProps = await NextDocument.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="description" content="ReefRaid APIWrapper" />
                    <link rel="manifest" href="/manifest.json" />

                    <link rel="preconnect" href="https://s3.amazonaws.com" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default Document

import showdown from 'showdown'


const client = new showdown.Converter({
    emoji: true,
    strikethrough: true,
    tables: true,
    ghCodeBlocks: true,
    backslashEscapesHTMLTags: true,
    completeHTMLDocument: true
})



export function Parser(md: string) {

    return client.makeHtml(md)

}
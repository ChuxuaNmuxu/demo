const layout = ({html, path, initialState}) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <title>demo</title>
        <!--<link rel="stylesheet" href="styles.css"/>-->
    </head>
    <body>
        <div id='root'>${html}</div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src='${path}'></script>
    </body>
    </html>
`
module.exports = layout;
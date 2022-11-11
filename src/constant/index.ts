export const IFRAME_SRCDOC = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MeBox</title>
    </head>
    <body style='background-color: #fff;'>
        <div id="root"></div>
        <script>
            const handleError = (error) => {
                const root = document.querySelector('#root');
                root.innerHTML = '<div style="color: crimson;"><h4>Runtime Error:</h4>' + error + '</div>';
                console.error(error);
            };

            // async error handling
            window.addEventListener('error', (event) => {
                // cancel default behavior
                event.preventDefault();
                handleError(event.error);
            });

            // sync error handling
            window.addEventListener("message", (event) => {
                try{
                    eval(event.data);
                } catch(error){
                    handleError(error);
                }
            }, false);
        </script>
    </body>
    </html>
`;

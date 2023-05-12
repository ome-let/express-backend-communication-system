const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
require('dotenv').config();

const post = process.env.PORT || 4000;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

const routers = fs.readdirSync('./routers')
routers.forEach((router) => {
    try {
        const routerPath = `./routers/${router}`
        const routerName = router.replace('.js', '')
        console.log(`✔️  Router /${routerName} is created`);
        app.use(`/${routerName}`, require(routerPath).router)
    } catch (error) {
        console.log(`❌  Router /${router} is not created with error: ${error}`);
    }  
})

app.listen(post, async () => {
    try {
        console.log(`🤖 Server is running on port ${post}`);
    } catch (error) {
        console.error(error);
    }
});
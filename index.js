const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); //{type: 'application/json?!'} 
app.use(express.urlencoded( {extended : false } )) //false: url 인코딩 안함

const ejs = require("ejs");
const path = require("path");
app.set("view engine", "ejs") // app에 view eingine 설치, ejs를 템풀릿으로
app.use(express.static(path.join(__dirname, '/'))) ;
app.use(express.static(path.join(__dirname, 'views')));

const dialogflow = require('dialogflow');
const fs = require('fs')

async function runSample(projectId = 'bandibot-beta1-ycnrog') {
    const keyfile = JSON.parse(fs.readFileSync('//Users/ijihye/dialogflowkey/bandibot-beta1-ycnrog-6a87a34a6caf.json'))
    const privateKey = keyfile['private_key']
    const clientEmail = keyfile['client_email']
    let sessionId = '123456'
    let config = {
        credentials: {
            private_key: privateKey,
            client_email: clientEmail
        }
    }

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient(config);
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        // user의 질문이 들어가야 합니다.!!!!!!!!
        // 질문 어떻게 연결할 수 있을까요???????????!!!!!
        text: '저소득층 전기요금 지원사업은 어디에 문의 해야 하나요?', 
        languageCode: 'ko',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
}
const run = runSample();


app.get('/', (req, res) => {
    console.log("main ejs");
    //res.render('run') //질문 화면에 그리고 싶은데 안됩니다. ㅠㅠ 
    res.render("main", {}); //질문 ejs말고 create-react-app 생성해서 연결할수있을까요?
})


app.listen(port, () => {
    console.log(`Server is runnint at https://localhost:${port}`)
})

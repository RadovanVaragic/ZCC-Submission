// Hi, this is my submission for the Zendesk Intern Coding challenge.
// Thank you for looking through this and looking through my code, unfortunately I wasn't able to 
// properly process the data stream from the Zendesk site thanks to my limited abilities with JS
// but regardless I hope this is a decent presentation of my simple and yet effective approach
// to JS. I have commented the code as well as I could. Further info is available in the readme.
const https = require('https')
const api_token = "so9YN0B422pgkVJnvn761qozvPNzrrFvffqiWLYk"
const email = "rvaragic.work@gmail.com"
const user_id = "rvaragic"
const pagesize = "?page[size]=20"
const query = 'type:ticket%20status:open' //https://developer.zendesk.com/api-reference/ticketing/ticket-management/search/#list-search-results
let authHeader = Buffer.from(`${email}/token:${api_token}`).toString('base64') //encoded as per docs https://developer.zendesk.com/api-reference/ticketing/introduction/#api-token
//https://zcccodingchallenge2353.zendesk.com
//GET /api/v2/users/{user_id}/tickets/assigned
function resolveAfter5Seconds() {  //for testing chunks from buffer
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  }
const options = {
    host: 'zcccodingchallenge2353.zendesk.com', //db data
    path: `/api/v2/search?query=${query}.json${pagesize}`, //query and page size limitation
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':  `Basic ${authHeader}`
    }
} 
const req = https.request(options, res => {  //get request of ticket
    resolveAfter5Seconds(console.log(`Status Code: ${res.statusCode}`))
    res.on('data', d => {
        let result = d
        console.log(result.toString('utf8')) //conversion of buffer to utf8 string
    })
})
req.on('error', error => { //basic error handler
    console.error(error)
})

req.end()

// req.end('end', () => {
//     // console.log(printthis.toString('utf8'))
// });
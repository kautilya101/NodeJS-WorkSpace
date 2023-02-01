// var sh = require("superheroes");
// console.log(sh.random());

// const fetch = require('node-fetch')

const http = require('http');
let fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;


 const data = fetch('https://randomuser.me/api/')
    .then(res => res.json())
    .then(data => {
        let d = JSON.stringify(data.results[0]);
        let person = JSON.parse(d);
        http.createServer((req,res) =>{
            if(req.url === "/"){
                
                res.writeHead(200,{'Content-Type': 'text/html'});
                res.end(`

                    <a href="/profile"> Profile</a>
                    <a href="/search"> Search</a>
                    <a href="/sort"> Sort</a>
                
                `)
            }
            else if(req.url === "/profile"){
                // fetch('https://randomuser.me/api/')
                // .then(res => res.json())
                // .then(data => {
                //     let d = JSON.stringify(data.results[0]);
                //     let person = JSON.parse(d);
                  
                res.statusCode = 200;
                res.setHeader('Content-Type',"text/html");
                res.end(
                `
                    <center><div>
                    <a href = "/"> Back </a>
                    </div></center>

                    <img src= ${person.picture.large} at = "me"/>
                    <h1>${person.name.title} ${person.name.first} ${person.name.last} </h1>
                    <div>
                        ${person.gender}
                    </div>
                    <div>
                        ${person.email}
                    </div>
                    <div>
                        ${person.phone}
                    </div>
                `
                    );
                }
                else if(req.url === '/search'){
                    fetch('https://randomuser.me/api/?page=1&results=10&seed=abc')
                    .then(res => res.json())
                    .then(data => {
                        let d = JSON.stringify(data.results);
                        let person = JSON.parse(d);
                        const namesval = person.map((p) => p.name.first + " " + p.name.last );
                        
                            res.writeHead(200,{'Content-Type': 'text/html'});
                            res.end(`
                            <html lang="en">    
                            <head>
                                <meta charset="UTF-8">
                                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Document</title>
                            </head>
                            <body>

                                <center><div>
                                <a href = "/"> Back </a>
                                </div></center>
                                <input type="search" placeholder = "Name..." id = "sval">
                                <button onclick = "myfu()" > Search </button>

                                <input type="searchCountry" placeholder = "Country..." id = "sval1">
                                <button onclick = "myfu1()" > Search </button>
                                
                            
                                <div id= "contain"> 
                                    
                                </div>
                            
                            
                                <script>
                            
                                ${JSON.stringify(namesval)}.map((name) => {
                                    var p = document.createElement('p');
                                    p.innerText += name;
                                    document.getElementById('contain').appendChild(p);
                                })
                            
                                    let searchInput = document.getElementById("sval");
                                    let searchCountry = document.getElementById("sval1");

                                    function myfu(){
                                        document.getElementById("contain").innerHTML = ' ';
                                       
                                        let diffNames = ${JSON.stringify(namesval)}.filter((value) => {
                                            console.log("hello");
                                            return value.toLowerCase().includes(searchInput.value.toLowerCase())
                                        })
                            
                                        diffNames.map((x) => {
                                            let p = document.createElement('p');
                                            p.innerText = x;
                                            document.getElementById('contain').appendChild(p);
                                        })
                                                                        
                                    }

                                    function myfu1(){
                                        document.getElementById("contain").innerHTML = ' ';
                                       
                                        let diffNames = ${JSON.stringify(person)}.filter((value) => {
                                            
                                            return value.location.country.toLowerCase().includes(searchCountry.value.toLowerCase())
                                        })
                                        console.log(diffNames);
                                        diffNames.map((x) => {
                                            let p = document.createElement('p');
                                            p.innerText = x.name.first + " "+ x.name.last;
                                            document.getElementById('contain').appendChild(p);
                                        })
                                                                        
                                    }
                                </script>
                                </body>
                            </html>
                            
                            `);
                            
                            
                        // fs.readFile('./page.html',null, (error,data) => {
                        //     if(error){
                        //         res.writeHead(404);
                        //         res.write('Whoops! File not found!');
                        //     }
                        //     else{
                        //         res.write(data);
                        //     }
                        //     res.end();
                        // });
                        
                                
                            }
                        
                        )
                    
                }
                else if(req.url === '/sort' ){
                    fetch('https://randomuser.me/api/?page=1&results=10&seed=abc')
                    .then(res => res.json())
                    .then(data => {
                        let d = JSON.stringify(data.results);
                        let person = JSON.parse(d);
                        const namesval = person.map((p) => p.name.first + " " + p.name.last );
                            res.writeHead(200,{'Content-Type': 'text/html'});
                            res.end(`
                            <body>

                                <center><div>
                                <a href = "/"> Back </a>
                                </div></center>
                                
                                <button onclick = "asce()" > Ascend </button>
                                <button onclick = "desc()" > Descend </button>
                            
                                <div id= "contain"> </div>
                                <script>
                            
                                ${JSON.stringify(namesval)}.map((name) => {
                                    var p = document.createElement('p');
                                    p.innerText += name;
                                    document.getElementById('contain').appendChild(p);
                                })
                            
                                   
                                    
                                    function asce(){
                                        document.getElementById("contain").innerHTML = ' ';
                                       
                                        let diffNames =  ${JSON.stringify(namesval)}.sort();
                                        console.log(diffNames);
                                        diffNames.map((x) => {
                                            let p = document.createElement('p');
                                            p.innerText = x;
                                            document.getElementById('contain').appendChild(p);
                                        })
                            
                                    }

                                    function desc(){
                                        document.getElementById("contain").innerHTML = ' ';
                                       
                                        let diffNames =  ${JSON.stringify(namesval)}.sort().reverse();
                            
                                        diffNames.map((x) => {
                                            let p = document.createElement('p');
                                            p.innerText = x;
                                            document.getElementById('contain').appendChild(p);
                                        })
                                    }

                                </script>
                                </body>
                            </html>
                            
                            `);
                            }
                        )
                }
            }).listen(port,hostname, () =>{
                    console.log(`Server running on port : ${port}`);
                })
    });
 


// const server = http.createServer((req,res) =>{
//     res.statusCode = 200;
//     res.setHeader('Content-Type','text/plain');
//     res.end(fet());
// })

// server.listen(port,hostname, () =>{
//     console.log(`Server running on port : ${port}`);
// })
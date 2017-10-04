# Bakery
## Background
A bakery used to base the price of their produce on an individual item cost. So if a customer ordered 10
cross buns then they would be charged 10x the cost of single bun. The bakery has decided to start
selling their produce prepackaged in bunches and charging the customer on a per pack basis. So if the
shop sold vegemite scroll in packs of 3 and 5 and a customer ordered 8 they would get a pack of 3 and
a pack of 5. The bakery currently sells the following products:

| Name             | Code          | Packs                                      |
| ---------------- |---------------| ------------------------------------------ |
| Vegemite Scroll  | VS5           | 3 @ $6.99<br> 5 @ $8.99                    |
| Blueberry Muffin | MB11          | 2 @ $9.95<br> 5 @ $16.95<br> 8 @ $24.95    |
| Croissant        | CF            | 3 @ $5.95<br> 5 @ $9.95<br>  9 @ 16.995    | 

## Task

Given​ ​a​ ​customer​ ​order​ ​you​ ​are​ ​required​ ​to​ ​determine​ ​the​ ​cost​ ​and​ ​pack​ ​breakdown​ ​for​ ​each​ ​product.
To​ ​save​ ​on​ ​shipping​ ​space​ ​each​ ​order​ ​should​ ​contain​ ​the​ ​minimal​ ​number​ ​of​ ​packs.

## Input

Each​ ​order​ ​has​ ​a​ ​series​ ​of​ ​lines​ ​with​ ​each​ ​line​ ​containing​ ​the​ ​number​ ​of​ ​items​ ​followed​ ​by​ ​the​ ​product
code.​ ​An​ ​example​ ​input:\
10 ​ ​VS\
14 ​ ​MB\
13 ​ ​CF


## Output

A​ ​successfully​ ​passing​ ​test(s)​ ​that​ ​demonstrates​ ​the​ ​following​ ​output:

10 ​ ​VS5​ ​$17.98\
&nbsp;&nbsp;&nbsp;&nbsp;2 ​ ​x​ ​ 5 ​ ​$8.99\
14 ​ ​MB11​ ​$54.8\
&nbsp;&nbsp;&nbsp;&nbsp;1 ​ ​x​ ​ 8 ​ ​$24.95\
&nbsp;&nbsp;&nbsp;&nbsp;3 ​ ​x​ ​ 2 ​ ​$9.95\
13 ​ ​CF​ ​$25.85\
&nbsp;&nbsp;&nbsp;&nbsp;2 ​ ​x​ ​ 5 ​ ​$9.95\
&nbsp;&nbsp;&nbsp;&nbsp;1 ​ ​x​ ​ 3 ​ ​$5.95

## Advice

* Choose​ ​whatever​ ​language​ ​you’re​ ​comfortable​ ​with​ ​but​ ​please​ remember​ ​that​ ​we’re​ ​better equipped​ ​to​ ​assess​ ​your​ ​skills​ ​in​ ​JavaScript,​ ​Java​ ​or​ ​Ruby
* Please​ ​adhere​ ​to​ ​the​ ​input/output​ ​specified
* The​ ​input​ ​can​ ​be​ ​from​ ​a​ ​file
  * The​ ​output​ ​goes​ ​to​ ​the​ ​console
  * Make​ ​sure​ ​you​ ​include​ ​tests,​ ​we​ ​would​ ​like​ ​to​ ​see​ ​how​ ​you​ ​do​ ​them
* We​ ​expect​ ​the​ ​see​ ​code​ ​which​ ​you​ ​would​ ​be​ ​happy​ ​to​ ​put​ ​in​ ​production
  * That​ ​doesn’t​ ​mean​ ​you​ ​need​ ​to​ ​use​ ​a​ ​database
  * That​ ​doesn’t​ ​mean​ ​you​ ​need​ ​to​ ​build​ ​a​ ​web-app​ ​or​ ​an​ ​API
  * It​ ​can​ ​be​ ​a​ ​simple​ ​console​ ​application
  * You​ ​can​ ​do​ ​everything​ ​in​ ​memory​ ​or​ ​use​ ​files​ ​to​ ​store​ ​your​ ​configuration
  * This​ ​covers​ ​all​ ​aspects​ ​of​ ​code​ ​maintainability,​ ​readability​ ​and​ ​modelling
* If​ ​something​ ​is​ ​not​ ​clear​ ​don’t​ ​hesitate​ ​to​ ​ask​ ​or​ ​just​ ​make​ an​ ​assumption​ ​and​ ​go​ ​with​ ​it PredictiveHire​ ​-​ ​Bakery

## Development Assumptions
* Assume the bakery code (e.g. VS5) is the unique identifer.
* For input 14 MB11, actually there is another 4-pack combination: "2 x 2 ​​$9.95 + 2 x 5 $16.95". As the requirement expects the output should be "1 ​x​​ 8​ ​$24.95 + 3 x 2 $9.95", assume that if the number of packs are the same, system should try to use pack with bigger size first. This is done by pass in the pack options in descending order.
* Assume input is in a plain text file 'input.txt', each line contains one code and one quantity, separated by space(s).

## Installation, test and run
* Installation: npm install
* Unit testing: npm test
* Run: npm start (system will based on NODE_ENV environment variable to load env specific bakery metadata)
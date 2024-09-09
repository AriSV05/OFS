
let fifty =  50 

const printIt =  it =>console.log(it)

const fifty_nats = Stream.iterate( 0 , n =>n +  1 ).cut(fifty)

const fiftyDivisibleBy2And3 = fifty_nats.filter( n =>n %  2  ==  0  && n %  3  ==  0 )
fiftyDivisibleBy2And3.map(printIt)
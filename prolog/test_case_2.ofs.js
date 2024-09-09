
const FOUR =  9 

let ten =  2  * FOUR +  1 

const printIt =  it =>console.log(it)

const tenNats = Stream.iterate( 0 , n =>n +  1 ).cut(ten)
tenNats.map(printIt)
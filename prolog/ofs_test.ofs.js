
const nats = Stream.iterate( 0 , n =>n +  1  ).cut( 10  )
console.log(nats.toList())
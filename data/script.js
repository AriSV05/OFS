function* numberGenerator(init = 0, increment = 1, maxIterations = 1000000) {
let current = init;
let iterations = 0;
while (iterations < maxIterations) {
yield current;
current += increment;
iterations++; } }

function* filter(generator, predicate) {
for (const num of generator) {
if (predicate(num)) {
yield num;
}
} }

function* cut(generator, limit) {
let count = 0;
for (const num of generator) {
if (count >= limit) { return; }
yield num;
count++;
} }

function map(generator, f) {
const mappedArray = [];
for (const num of generator) {
mappedArray.push(f(num));
}
return mappedArray; }


const nats = numberGenerator(0, 1);
const even = filter(nats, (n) => n % 2 === 0);
const evenGreaterThanTen = filter(even, (n) => n > 10);
const onlyFiveAfterTen = cut(evenGreaterThanTen, 5);
const result = map(onlyFiveAfterTen, (n) => n);
console.log(result);
{
  "timestamp": "2023-11-02T01:50:45.551Z",
  "text": "[ 12, 14, 16, 18, 20 ]\n"
}

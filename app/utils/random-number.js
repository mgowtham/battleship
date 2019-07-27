export default function randomNumber(start, end) {
  let diff = end - start;
  let decNumber = (Math.random() * diff) + start;
  return Math.floor(decNumber);
}
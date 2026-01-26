const persons = [
  { name: "Hermine", age: 14, gender: "f" },
  { name: "Harry", age: 15, gender: "m" },
  { name: "Ron", age: 13, gender: "m" },
  { name: "Luna", age: 12, gender: "f" },
  { name: "Draco", age: 16, gender: "m" }
];

const females = persons.filter(p => p.gender === "f");

console.log("Nur weibliche Personen:", females);


persons.sort((a, b) => a.age - b.age);

console.log("Sortiert nach Alter:", persons);
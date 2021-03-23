function greetings(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString}`);
}

greetings("Sakib", new Date());
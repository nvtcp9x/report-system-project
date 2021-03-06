var faker = require('faker');
var moment = require('moment');

var database = {
  users: [],
  reports: [],
  weekly_reports: [],
  messages: [],
  teams: []
};

const emojis = [
  // positive icon
  {
    id: 'smiley',
    name: 'Smiling Face with Open Mouth',
    colons: ':smiley:',
    text: ':)',
    emoticons: [
      '=)',
      '=-)'
    ],
    skin: null,
    native: '😃'
  },

  {
    id: "heart_eyes",
    name: "Smiling Face with Heart-Shaped Eyes",
    colons: ":heart_eyes:",
    emoticons: [],
    skin: null,
    native: "😍"
  },
  {
    id: "stuck_out_tongue_winking_eye",
    name: "Face with Stuck-out Tongue and Winking Eye",
    colons: ":stuck_out_tongue_winking_eye:",
    emoticons: [],
    skin: null,
    native: "😜"
  },

  {
    id: "laughing",
    name: "Smiling Face with Open Mouth and Tightly-Closed Eyes",
    colons: ":laughing:",
    emoticons: [
      ":>", ":->"
    ],
    native: "😆",
    skin: null,
    unified: "1f606"
  },


  // negative icon:
  {
    id: "white_frowning_face",
    name: "White Frowning Face",
    colons: ":white_frowning_face:",
    emoticons: [],
    skin: null,
    native: "☹️",
    unified: "2639-fe0f"
  },

  {
    id: "disappointed",
    name: "Disappointed Face",
    colons: ":disappointed:",
    emoticons: ["):", ":(", ":-("],
    skin: null,
    native: "😞",
    unified: "1f61e"
  },
  {
    id: "worried",
    name: "Worried Face",
    colons: ":worried:",
    emoticons: Array(0),
    native: "😟",
    skin: null,
    unified: "1f61f"
  }
];

const division = [
  'Front End Team 1',
  'Front End Team 2',
  'Front End Team 3',
  'Front End Team 4',
];

const issues = [
  'Hard for Debugging',
  'Keeping up with Technology',
  'Communication with others',
  'Time Estimation',
  'Security Threats'
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

for (let i=1; i<=20; i++) {
  database.users.push({
    id: i,
    email: "member" + i + "@gmail.com",
    firstName: faker.name.prefix() + ' ' + faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatar: faker.image.avatar(),
    address: faker.address.streetAddress("###") + ' ' + faker.address.city() + ' ' + faker.address.county(),
    phone: faker.phone.phoneNumberFormat(),
    division: faker.random.arrayElement(division),
    password: "123456",
    role: "member"
  });
}

for (let i=21; i<=24; i++) {
  database.users.push({
    id: i,
    email: "teamleader" + i + "@gmail.com",
    firstName: faker.name.prefix() + ' ' + faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatar: faker.image.avatar(),
    address: faker.address.streetAddress("###") + ' ' + faker.address.city() + ' ' + faker.address.county(),
    phone: faker.phone.phoneNumberFormat(),
    division: `Front End Team ${25-i}`,
    password: "123456",
    role: "team_leader"
  });
}

database.users.push({
  id: 25,
  email: "groupleader@gmail.com",
  firstName: faker.name.prefix() + ' ' + faker.name.firstName(),
  lastName: faker.name.lastName(),
  avatar: faker.image.avatar(),
  address: faker.address.streetAddress("###") + ' ' + faker.address.city() + ' ' + faker.address.county(),
  phone: faker.phone.phoneNumberFormat(),
  division: 'Design Marketing Group A',
  password: "123456",
  role: "group_leader"
});

for (let i=1; i<=2000; i++) {
  database.reports.push({
    id: i,
    userId: getRandomInt(1, 20),
    emotion: faker.random.arrayElement(emojis),
    title: faker.lorem.sentence(),
    date: moment(faker.date.between('2018-06-01', '2018-09-31')).format("YYYY-MM-DD"),
    achievement: faker.lorem.sentence(),
    plan: faker.lorem.sentences(),
    issues: getRandom(issues, getRandomInt(1, 5)),
    description: faker.lorem.paragraphs(),
    comment: faker.lorem.sentences()
  });
}

for (let i=1; i<=20; i++) {
  database.weekly_reports.push({
    id: i,
    userId: getRandomInt(21, 24),
    issue: faker.lorem.sentence(),
    solution: faker.lorem.sentence(),
    date: moment(faker.date.between('2018-06-01', '2018-09-31')).format("YYYY-MM-DD"),
    description: faker.lorem.paragraphs(),
    summary: faker.lorem.sentences()
  });
}

for (let i=1; i<=50; i++) {
  database.messages.push({
    id: i,
    userId: getRandomInt(21, 24),
    toUser: getRandomInt(1, 20),
    title: faker.lorem.sentence(),
    message: faker.lorem.sentence(),
    date: faker.date.between('2018-06-01', '2018-09-31'),
  });
}

for (let i=1; i<=4; i++) {
  database.teams.push({
    id: i,
    name: "Front End Team " + i,
    userId: (25-i),
    description: faker.lorem.paragraphs()
  });
}

console.log(JSON.stringify(database));
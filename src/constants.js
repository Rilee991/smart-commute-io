export const companies = ["Microsoft", "Google", "Intel"];
export const departments = ["HR", "Engineeing", "Marketing", "Operations"];
export const employeesPerCompany = 100;
export const shuttlePercentage = 0.4;
export const shuttleEquivalentVehicles = 5;
export const shuttleCapacity = 40;
export const trafficPrediction = {
    morning: { '7-8': 20, '8-9': 60, '9-10': 70, '10-11': 33 },
    evening: { '18-19': 33, '19-20': 70, '20-21': 60, '21-22': 20 }
};
export const morningSlots = Object.keys(trafficPrediction.morning);
export const eveningSlots = Object.keys(trafficPrediction.evening);
export const firstNames = [
    "John", "Jane", "Alex", "Emily", "Michael", "Sarah", "David", "Laura",
    "Chris", "Emma", "Daniel", "Olivia", "James", "Sophia", "Matthew", "Isabella",
    "Liam", "Noah", "Ethan", "Mason", "Logan", "Lucas", "Jackson", "Aiden",
    "Ava", "Mia", "Harper", "Ella", "Abigail", "Avery", "Scarlett", "Lily",
    "Benjamin", "Oliver", "Elijah", "Lucas", "Mason", "Sebastian", "Henry",
    "Jackson", "Grayson", "Wyatt", "Carter", "Dylan", "Luke", "Levi", "Gabriel",
    "Zoe", "Riley", "Aria", "Chloe", "Layla", "Amelia", "Hannah", "Charlotte",
    "Jacob", "William", "Alexander", "Samuel", "Nathan", "Hunter", "Owen", 
    "Jack", "Ryan", "Isaac", "Lincoln", "Joshua", "Caleb", "Jonathan", 
    "Adrian", "Thomas", "Eli", "Connor", "Aaron", "Christian", "Ezra", 
    "Robert", "Joseph", "Charles", "Anthony", "Isaiah", "Andrew", "Nicholas",
    "Tyler", "Kayla", "Maya", "Aubrey", "Violet", "Aurora", "Savannah", "Leah",
    "Mila", "Eleanor", "Ellie", "Stella", "Grace", "Victoria", "Hazel", 
    "Penelope", "Luna", "Nora", "Camila", "Madison", "Brooklyn", "Ariana", 
    "Eva", "Bella", "Ruby", "Paisley", "Alice", "Ivy", "Everly", "Lillian",
    "Addison", "Lucy", "Anna", "Natalie", "Caroline", "Mackenzie", "Skylar", 
    "Alyssa", "Peyton", "Allison", "Arianna", "Genesis", "Kinsley", "Kylie",
    "Eva", "Naomi", "Clara", "Charlie", "Emilia", "Vivian", "Gabriella", 
    "Madelyn", "Julia", "Sophie", "Sadie", "Delilah", "Willow", "Cora",
    "Bailey", "Harmony", "Autumn", "Maddox", "Emerson", "Dakota", "Cameron", 
    "Brielle", "Gianna", "Paisley", "Kennedy", "Melody", "Aubree", "Raelynn",
    "Reagan", "Elena", "Sarah", "Samantha", "Allison", "Isabelle", "Delaney",
    "Adeline", "Lydia", "Mabel", "Ophelia", "Pearl", "Ruby", "Sage", "Valentina",
    "Fiona", "Giselle", "Haven", "Imogen", "Jasmine", "Kendall", "Lena", 
    "Maeve", "Opal", "Parker", "Quinn", "Rosalie", "Saylor", "Teagan", "Vera",
    "Wren", "Ximena", "Yara", "Zara"
];

export const lastNames = [
    "Smith", "Johnson", "Brown", "Taylor", "Anderson", "Thomas", "Jackson",
    "White", "Harris", "Martin", "Garcia", "Martinez", "Robinson", "Clark",
    "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez",
    "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", 
    "Gonzalez", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner",
    "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart",
    "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy",
    "Bailey", "Rivera", "Cooper", "Richardson", "Cox", "Howard", "Ward", 
    "Torres", "Peterson", "Gray", "Ramirez", "James", "Watson", "Brooks", 
    "Kelly", "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross", "Henderson",
    "Coleman", "Jenkins", "Perry", "Powell", "Long", "Patterson", "Hughes", 
    "Flores", "Washington", "Butler", "Simmons", "Foster", "Gonzales", 
    "Bryant", "Alexander", "Russell", "Griffin", "Diaz", "Hayes", "Myers", 
    "Ford", "Hamilton", "Graham", "Sullivan", "Wallace", "Woods", "Cole", 
    "West", "Jordan", "Owens", "Reynolds", "Fisher", "Ellis", "Harrison",
    "Gibson", "Mcdonald", "Cruz", "Marshall", "Ortiz", "Gomez", "Murray", 
    "Freeman", "Wells", "Webb", "Simpson", "Stevens", "Tucker", "Porter", 
    "Hunter", "Hicks", "Crawford", "Henry", "Boyd", "Mason", "Morales", 
    "Kennedy", "Warren", "Dixon", "Ramos", "Reyes", "Burns", "Gordon", 
    "Shaw", "Holmes", "Rice", "Robertson", "Hunt", "Black", "Daniels", 
    "Palmer", "Mills", "Nichols", "Grant", "Knight", "Ferguson", "Rose", 
    "Stone", "Hawkins", "Dunn", "Perkins", "Hudson", "Spencer", "Gardner", 
    "Stephens", "Payne", "Pierce", "Berry", "Matthews", "Arnold", "Wagner", 
    "Willis", "Ray", "Watkins", "Olson", "Carroll", "Duncan", "Snyder", 
    "Hart", "Cunningham", "Bradley", "Lane", "Andrews", "Ruiz", "Harper"
];
export function generateRandomName() {
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return `${randomFirstName} ${randomLastName}`;
}
export function groupByDepartmentAndCompany(employees) {
    const groupedData = {};
    const total = { department: 'Total' };
  
    employees.forEach(employee => {
      const { department, company } = employee;
  
      if (!groupedData[department]) {
        groupedData[department] = { department };
      }
  
      if (!groupedData[department][company]) {
        groupedData[department][company] = 0;
      }
  
      if (!total[company]) {
        total[company] = 0;
      }
  
      groupedData[department][company]++;
      total[company]++;
    });
  
    const result = Object.values(groupedData);
    result.push(total); // Add the total object at the end of the result array
  
    return result;
}
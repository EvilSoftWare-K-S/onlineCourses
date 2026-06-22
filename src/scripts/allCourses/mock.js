import { buildPositionMap } from '../utils/helpers.js';

const rawData = [
  {
    url: "./src/mocks/man1.png",
    position: "Marketing",
    title: "The Ultimate Google Ads Training Course",
    price: "$100",
    name: "by Jerome Bell",
    color: "#03CEA4",
  },
  {
    url: "./src/mocks/man2.png",
    position: "Management",
    title: "Prduct Management Fundamentals",
    price: "$480",
    name: "by Marvin McKinney",
    color: "#5A87FC",
  },

  {
    url: "./src/mocks/man3.png",
    position: "HR & Recruting",
    title: "HR  Management and Analytics",
    price: "$200",
    name: "by Leslie Alexander Li",
    color: "#F89828",
  },
  {
    url: "./src/mocks/woman1.png",
    position: "Marketing",
    title: "Brand Management & PR Communications",
    price: "$530",
    name: "by Kristin Watson",
    color: "#03CEA4",
  },
  {
    url: "./src/mocks/man4.png",
    position: "Design",
    title: "Graphic Design Basic",
    price: "$500",
    name: "by Guy Hawkins",
    color: "#F52F6E",
  },
  {
    url: "./src/mocks/woman2.png",
    position: "Management",
    title: "Business Development Management",
    price: "$400",
    name: "by Dianne Russell",
    color: "#5A87FC",
  },
  {
    url: "./src/mocks/man5.png",
    position: "Development",
    title: "Highload Software Architecture",
    price: "$600",
    name: "by Brooklyn Simmons",
    color: "#7772F1",
  },
  {
    url: "./src/mocks/woman3.png",
    position: "HR & Recruting",
    title: "Human Resources – Selection and Recruitment",
    price: "$150",
    name: "by Kathryn Murphy",
    color: "#F89828",
  },
  {
    url: "./src/mocks/man6.png",
    position: "Design",
    title: "User Experience. Human-centered Design",
    price: "$240",
    name: "by Cody Fisher",
    color: "#F52F6E",
  },

  {
    url: "./src/mocks/man5.png",
    position: "Development",
    title: "Highload Software Architecture 2",
    price: "$400",
    name: "by Brooklyn Simmons",
    color: "#7772F1",
  },
  {
    url: "./src/mocks/man5.png",
    position: "Development",
    title: "Highload Software Architecture 3",
    price: "$500",
    name: "by Brooklyn Simmons",
    color: "#7772F1",
  },

  {
    url: "./src/mocks/woman3.png",
    position: "HR & Recruting",
    title: "Human Resources – Selection and Recruitment 2",
    price: "$350",
    name: "by Kathryn Murphy",
    color: "#F89828",
  },
  {
    url: "./src/mocks/woman3.png",
    position: "HR & Recruting",
    title: "Human Resources – Selection and Recruitment 3",
    price: "$250",
    name: "by Kathryn Murphy",
    color: "#F89828",
  },
  {
    url: "./src/mocks/woman3.png",
    position: "HR & Recruting",
    title: "Human Resources – Selection and Recruitment 4",
    price: "$450",
    name: "by Kathryn Murphy",
    color: "#F89828",
  },

  {
    url: "./src/mocks/woman2.png",
    position: "Management",
    title: "Business Development Management 2",
    price: "$400",
    name: "by Dianne Russell",
    color: "#5A87FC",
  },

  {
    url: "./src/mocks/man1.png",
    position: "Marketing",
    title: "The Ultimate Google Ads Training Course 2",
    price: "$200",
    name: "by Jerome Bell",
    color: "#03CEA4",
  },
  {
    url: "./src/mocks/man1.png",
    position: "Marketing",
    title: "The Ultimate Google Ads Training Course 3",
    price: "$300",
    name: "by Jerome Bell",
    color: "#03CEA4",
  },
];

export function getRawData(){
    return rawData;
}
export function getPaginationData(){
    return rawData;
}
export function getPositionMap(){

    return buildPositionMap(rawData);
}
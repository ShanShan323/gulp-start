const flats = [
    {
      floor: 3,
      rooms: 2,
      project: {
        id: 1,
        name: 'Foriver',
      },
    },
    {
      floor: 1,
      rooms: 3,
      project: {
        id: 2,
        name: 'Riversky',
      },
    },
    {
      floor: 5,
      rooms: 4,
      project: {
        id: 1,
        name: 'Foriver',
      },
    },
    {
      floor: 2,
      rooms: 2,
      project: {
        id: 2,
        name: 'Riversky',
      },
    },
  ];


const uniqProjectsById = {};

flats.forEach(element => {
    uniqProjectsById[element.project.id] = {
      id: element.project.id,
      name: element.project.name,
      flats: [],
    };
});

const project = Object.values(uniqProjectsById);

// for (let i = 1; i <= project.length; i ++) {
//     flats.filter(element => element.project.id === i)
//          .forEach(element => project[i - 1].flats.push({floor: element.floor, rooms: element.rooms}));
// }


const map = new Map();

project.forEach(element => {
    map.set(element.id, {...element});
});


flats.forEach(element => {
    map.get(element.project.id).flats.push({floor: element.floor, rooms: element.rooms});
})

const projects = [...map.values()];

console.log(projects);

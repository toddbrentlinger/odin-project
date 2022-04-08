const findTheOldest = function(peopleArr) {
    const currYear = (new Date()).getFullYear();
    let tempYearOfDeath, currYearOfDeath;
    return peopleArr.reduce((youngestPerson, currPerson) => {
        tempYearOfDeath = 'yearOfDeath' in youngestPerson ? youngestPerson.yearOfDeath : currYear;
        currYearOfDeath = 'yearOfDeath' in currPerson ? currPerson.yearOfDeath : currYear;
        if ((currYearOfDeath - currPerson.yearOfBirth) > (tempYearOfDeath - youngestPerson.yearOfBirth)) {
            return currPerson;
        } else {
            return youngestPerson;
        }
    });
};

// Do not edit below this line
module.exports = findTheOldest;

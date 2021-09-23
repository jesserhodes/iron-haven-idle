// VARS & OBJECTS
var ore = 0;
var fish = 0;

// mining skill object
let mining = {
    active: false,
    skillName: "mining",
    actionName: "Mine",
    level: 1,
    experience: 0,
    resource: ore,
    resourceElement: "ore",
    progress: 0, // progressBar width
    progressBar: "miningBar"
};

// fishing skill object
let fishing = {
    active: false,
    skillName: "fishing",
    actionName: "Fish",
    level: 1,
    experience: 0,
    resource: fish,
    resourceElement: "fish",
    progress: 0, // progressBar width
    progressBar: "fishingBar"
};

const skills = [mining, fishing];


// FUNCTIONS

// startAction function (triggered by skill button press)
function startAction(action) {
    if (action.active) {
        action.active = false;
    }
    else {
        for (let i = 0; i < skills.length; i++){
            skills[i].active = false;
        }
        action.active = true;
        doAction(action);
    }
}

// completed skill actions roll an attempt at getting a resource
function resourceAttempt(action) {
    var roll = Math.floor(Math.random() * 100) + 1;

    // default chance is 25% and increases by 1% per level
    if (roll > 76 - action.level) {
        action.resource++;
        document.getElementById(action.resourceElement).innerHTML = action.resource;
    }
}

// add skill experience on completed action
function addExperience(action) {
    action.experience++;

    // check for level up
    if (action.experience >= action.level * 5) {
        action.level++;
        document.getElementById(action.skillName + "Level").innerHTML = action.level;
        document.getElementById(action.skillName + "ExpReq").innerHTML = action.level * 5;
        action.experience = 0;
        document.getElementById(action.skillName + "Exp").innerHTML = action.experience;
    } else {
        document.getElementById(action.skillName + "Exp").innerHTML = action.experience;
    }
}

// primary action function that updates progress bar and increments resources
function doAction(action) {
    var elem = document.getElementById(action.progressBar);
    var id = setInterval(frame, 10);
    function frame() {
        if (action.progress >= 100) {
            clearInterval(id);
            resourceAttempt(action);
            addExperience(action);
            action.progress = 0;
            doAction(action);
        } else {
            if (action.active){
                action.progress++;
                elem.style.width = action.progress + "%";
            } else {
                clearInterval(id);
                return;
            }
        }
    }
}

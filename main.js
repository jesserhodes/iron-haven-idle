
// to-do: clean up these variables, organize code better
var ore = 0;
var fish = 0;

var action = "";

// to-do: turn these functions into one function that takes the action as a parameter
function startMining(){
    action = "mine";
}

function startFishing(){
    action = "fish";
}

// to-do: DRY this function up, make it compatible with any active action
var i = 0;
function addOre() {
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("miningBar");
        var width = 1;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
                ore += 1;
                document.getElementById('ore').innerHTML = ore;
            } else {
                width++;
                elem.style.width = width + "%";
            }
        }
    }
}

function addFish(){
    fish +=1;
    document.getElementById('fish').innerHTML = fish;
}

// to-do: find a better way to handle this
function completeAction(){
    switch(action){
        case "mine":
            addOre();
            break;
        case "fish":
            addFish();
            break;
        default:
            console.log("no action");
    }
}

// bare-bones game loop. not ideal for continuous actions.
window.setInterval(function(){
	
	completeAction();
	
}, 1000);

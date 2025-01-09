
const gameCategories = [
    "A book",
    "A film",
    "A fictional character",
    "A country",
    "A colour",
    "A mode of transport",
    "Something in this room",
    "An animal",
    "A boys name",
    "A girls name",
    "A weapon",
    "A game",
    "A herb",
    "A song",
    "Something related to space",
    "A flower",
    "A brand",
    "A vegetable",
    "A female singer",
    "A male singer",
    "A insect",
    "A profession",
    "A drink",
    "An artist",
    "A famous female",
    "A famous male",
    "A number",
    "Someone historical",
    "A food",
    "A musical instrument",
    "Something related to water",
    "A tree",
    "A disease",
    "A sport",
    "A recreational activity",
    "A tool",
    "A fish",
    "A female actor",
    "A male actor",
    "A city",
    "A drug",
    "A bird",
    "A dog breed",
    "A liquid",
    "An invention",
    "A body part",
    "Something on a keyboard",
    "A material",
    "A fruit",
    "An element of the periodic table",
    "A mythical being",
    "Something related to weather",
    "An historical event",
    "Something that makes you feel better",
    "A villain",
    "A toy",
    "A cartoon character",
    "Something you wear",
    "A make of car",
    "Something you bet on",
    "A piece of sporting equipment",
    "A way of communicating",
    "A kitchen implement",
    "Something that makes an impression",
    "An exercise",
    "A band",
    "A Disney character",
    "Something you cook",
    "Something that holds something",
    "A building material",
    "Something that can grow",
    "Something breakable",
    "Something you win",
    "Something related to flight",
    "A part of a car",
    "A language",
    "Something you open"
    ];
    
function getAllCategories(){
        return gameCategories
    }

let context = {
    "DefaultCategories":getAllCategories(),
    "AvailableCategories":[],
    "CurrentCategories":[]
}


const alphabet = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

let flattenButton = document.querySelector("button.flatButton");
let loadButton = document.querySelector("button.loadButton");
let showButton = document.querySelector("button.showButton");
let getCategoryButton = document.querySelector("button.getCategory");
let resetButton = document.querySelector("button.resetGame");
let updateButton = document.querySelector("button.updateButton");

let categoryList = document.querySelector("p.categoryList");
let newestCategory = document.querySelector("h1.newCategory");

function flattenJson(jsonFile){
        localStorage.setItem("Context", JSON.stringify(jsonFile));
}

function loadJson(){
    context = JSON.parse(localStorage.getItem("Context"));
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRandomCategory(){
    if (context["CurrentCategories"].length < 26){

        randomNumber = getRndInteger(0,context["AvailableCategories"].length - 1);
        context["CurrentCategories"].push(context["AvailableCategories"][randomNumber]);
        context["AvailableCategories"] = context["AvailableCategories"].filter(item => item !== context["AvailableCategories"][randomNumber]);

        newestCategory.textContent = alphabet[context["CurrentCategories"].length - 1] + ": " + context["CurrentCategories"][context["CurrentCategories"].length - 1]

        updateCategoryList();
    }

}

function resetGame(confirmFirst){

    if (confirmFirst) {
        run = confirm("Are you sure you want to reset the game?");
    }
    else {
        run = true
    }

    if (run == true){
        context["CurrentCategories"] = [];
        context["AvailableCategories"] = context["DefaultCategories"];
        flattenJson(context);
        updateCategoryList();
    }
}

function updateCategoryList(){
    
    TextHolder = "Categories: ";

    for(let i = 0; i < context["CurrentCategories"].length; i++ ){
        TextHolder = TextHolder + "\n" + alphabet[i] + ": " + context["CurrentCategories"][i];
    }
    categoryList.textContent = TextHolder; 
}

function updateDefaultCategories(){
    context["DefaultCategories"] = getAllCategories();
    flattenJson(context);
}

flattenButton.onclick = () => {
    flattenJson(context);
}

loadButton.onclick = () => {
    loadJson();
}

showButton.onclick = () => {
    alert("Context: " + JSON.stringify(context));
    alert("Stored: " + localStorage.getItem("Context"));
}

getCategoryButton.onclick = () =>{
    getRandomCategory();
    flattenJson(context);
}

resetButton.onclick = () => {
    updateDefaultCategories();
    resetGame(true);
}

updateButton.onclick = () => {
    updateDefaultCategories();
}

function checkDebugToolsVisible()
{
    var urlHash = window.location.hash;
    if (urlHash && urlHash == '#debug') {
        var emtDebugTools = document.getElementById("debugTools");
        emtDebugTools.style.display = "block";
    }
}

/* -------------------- */

if (Object.is(localStorage.getItem("Context"),null) == false ){
    loadJson();
}else{
    resetGame(false);
}


updateCategoryList();

// debug visible?
checkDebugToolsVisible();
export {playerIdle, playerWalk, playerAttack, playerDeath, tiles, swordsmanEnemy, spearmanEnemy, archerEnemy, archmageEnemy, level1Tiles, dungeonDoor1}

let playerIdle =  new Image(), playerWalk = new Image(), playerAttack = new Image(), playerDeath = new Image();
let grassTile = new Image(), dirtTile = new Image(), wallTile = new Image(); // OpenGameArt
let swordsmanEnemy = new Image(), spearmanEnemy = new Image(), archmageEnemy = new Image(), archerEnemy = new Image;
let dungeonDoor1= new Image();
playerIdle.src = "Images/Itchio/Player/IDLE.png";
playerWalk.src = "Images/Itchio/Player/WALK.png";
playerAttack.src = "Images/Itchio/Player/ATTACK 1.png";
playerDeath.src = "Images/Itchio/Player/DEATH.png";

grassTile.src = "Images/OpenGameArt/Set1/grass_flowers_blue1.png";
dirtTile.src = "Images/OpenGameArt/Set1/dirt0.png";
wallTile.src = "Images/OpenGameArt/Set1/cobble_blood1.png";

swordsmanEnemy.src = "Images/Itchio/[Common] MiniSwordMan.png";
spearmanEnemy.src = "Images/Itchio/[Common] MiniSpearMan.png";
archmageEnemy.src = "Images/Itchio/[Common] MiniArchMage.png";
archerEnemy.src = "Images/Itchio/[Common] MiniArcher.png";

dungeonDoor1.src = "Images/OpenGameArt/Set1/dngn_enter_dis.png";

playerIdle.onload = () =>{
    console.log("Hellow");
}
playerWalk.onload = () =>{
    console.log("Hellow");
}
playerAttack.onload = () =>{
    console.log("Hellow");
}
playerDeath.onload = () =>{
    console.log("Hellow");
}

wallTile.onload = () =>{
    console.log("Hellow");
}

dirtTile.onload = () =>{
    console.log("Hellow");
}
grassTile.onload = () =>{
    console.log("Hellow");
}       

swordsmanEnemy.onload = () =>{
    console.log("Hellow");
}

spearmanEnemy.onload = () =>{
    console.log("Hellow");
}
archmageEnemy.onload = () =>{
    console.log("Hellow");
} 
archerEnemy.onload = () =>{
    console.log("Hellow");
}

dungeonDoor1.onload = () =>{
    console.log("Hellow");
} 

let tiles = {
    1: grassTile,
    2: wallTile,
    3: dirtTile
};

// Level 1 images
let floor2 = new Image(), wall2 = new Image();
floor2.src = "Images/OpenGameArt/Set1/Level1/tomb0.png";
wall2.src = "Images/OpenGameArt/Set1/Level1/brick_dark0.png";
floor2.onload = () =>{
    console.log("Hellow");
}
wall2.onload = () =>{
    console.log("Hellow");
}
let level1Tiles = {
    1: floor2,
    2: wall2
};
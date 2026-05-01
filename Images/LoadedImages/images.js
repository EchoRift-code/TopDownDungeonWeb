export {playerIdle, playerWalk, playerAttack, playerDeath, tiles, swordsmanEnemy, spearmanEnemy, archerEnemy, archmageEnemy, 
    level1Tiles, dungeonDoor1, chestAnimation, hpPotionImg, mpPotionImg, weaponImg, armorImage, weaponImages
}

let playerIdle =  new Image(), playerWalk = new Image(), playerAttack = new Image(), playerDeath = new Image();
let grassTile = new Image(), dirtTile = new Image(), wallTile = new Image(); // OpenGameArt
let swordsmanEnemy = new Image(), spearmanEnemy = new Image(), archmageEnemy = new Image(), archerEnemy = new Image;
let dungeonDoor1= new Image();
playerIdle.src = "Images/Itchio/Player/IDLE.png";
playerWalk.src = "Images/Itchio/Player/WALK.png";
playerAttack.src = "Images/Itchio/Player/ATTACK 1.png";
playerDeath.src = "Images/Itchio/Player/DEATH.png";

grassTile.src = "Images/OpenGameArt/Set1/StarterMap/grass_flowers_blue1.png";
dirtTile.src = "Images/OpenGameArt/Set1/StarterMap/dirt0.png";
wallTile.src = "Images/OpenGameArt/Set1/StarterMap/cobble_blood1.png";

swordsmanEnemy.src = "Images/Itchio/[Common] MiniSwordMan.png";
spearmanEnemy.src = "Images/Itchio/[Common] MiniSpearMan.png";
archmageEnemy.src = "Images/Itchio/[Common] MiniArchMage.png";
archerEnemy.src = "Images/Itchio/[Common] MiniArcher.png";

dungeonDoor1.src = "Images/OpenGameArt/Set1/StarterMap/dngn_enter_dis.png";

playerIdle.onload = () =>{
    console.log("Player Idle");
}
playerWalk.onload = () =>{
    console.log("Player Walk");
}
playerAttack.onload = () =>{
    console.log("Player Attack");
}
playerDeath.onload = () =>{
    console.log("Player Death");
}

wallTile.onload = () =>{
    console.log("Wall");
}

dirtTile.onload = () =>{
    console.log("Dirt");
}
grassTile.onload = () =>{
    console.log("Grass");
}       

swordsmanEnemy.onload = () =>{
    console.log("Swordman");
}

spearmanEnemy.onload = () =>{
    console.log("Spearman");
}
archmageEnemy.onload = () =>{
    console.log("Archmage");
} 
archerEnemy.onload = () =>{
    console.log("Archer");
}

dungeonDoor1.onload = () =>{
    console.log("Dungeon");
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
    console.log("Floor2");
}
wall2.onload = () =>{
    console.log("Wall2");
}
let level1Tiles = {
    1: floor2,
    2: wall2
};

let chestAnimation = [];
let chestClosed = new Image(), chestOpened = new Image();
chestOpened.src = "Images/OpenGameArt/Set1/chest2_open.png";
chestClosed.src = "Images/OpenGameArt/Set1/chest2_closed.png";

chestOpened.onload = () =>{
    console.log("Chest Open");
}
chestClosed.onload = () =>{
    console.log("Chest Closed");
}

chestAnimation.push(chestClosed);
chestAnimation.push(chestOpened);

let hpPotionImg = new Image(), mpPotionImg = new Image(), weaponImg = new Image(), armorImage = new Image();
hpPotionImg.src = "Images/OpenGameArt/ruby.png";
mpPotionImg.src = "Images/OpenGameArt/brilliant_blue.png";
weaponImg.src = "Images/OpenGameArt/double_sword.png";
armorImage.src = "Images/OpenGameArt/elven_scalemail.png";

hpPotionImg.onload = () =>{
    console.log("HP");
}
mpPotionImg.onload = () =>{
    console.log("MP");
}
weaponImg.onload = () =>{
    console.log("Weapon");
}
armorImage.onload = () =>{
    console.log("Armor");
}

let weaponImages = [];
let greatswordImg = new Image(), hammerImg = new Image();
greatswordImg.src = "Images/OpenGameArt/Set1/Weapons/greatsword1.png";
hammerImg.src = "Images/OpenGameArt/Set1/Weapons/hammer1.png";

greatswordImg.onload = () =>{
    console.log("Greatsword");
}
hammerImg.onload = () =>{
    console.log("Hammer");
}

weaponImages.push(greatswordImg);
weaponImages.push(hammerImg);
import {map} from "./Maps/map.js"
import {map2} from "./Maps/map2.js"
import { playerIdle, playerWalk, playerAttack, playerDeath, tiles, level1Tiles, dungeonDoor1, swordsmanEnemy, archerEnemy, archmageEnemy, spearmanEnemy, chestAnimation } from "./Images/LoadedImages/images.js";
const canvas = document.getElementById('gameCanvas');
/**@type {CanvasRenderingContext2D*/
const draw = canvas.getContext("2d"); // add the line above this to be able to see all the methods available when you type draw.
draw.imageSmoothingEnabled = false; // Sprites will look blurry after resizing if this is true

let startMap = map.map(row => [...row]), level1 = map2.map(row => [...row]);

// The number = starting location on tilemap and sets the enemy name
let enemyRegistry = {
    6: 'swordsman',
    7: 'spearman',
    8: 'archmage',
    9: 'archer'
};

// using the designated enemy name, call the image for it
let enemySprites = {
    'swordsman' : swordsmanEnemy,
    'spearman' : spearmanEnemy,
    'archmage' : archmageEnemy,
    'archer' : archerEnemy
};

// create the empy array to hold the enemy
let enemies = [];
function spawnEnemies(levelMap) { 
    switch(levelMap){
        case startMap:
            enemies = []; 
            for (let row = 0; row < levelMap.length; row++) {
                for (let col = 0; col < levelMap[row].length; col++) {
                    let tile = levelMap[row][col]; // gets the tile number at the location
                    if (enemyRegistry[tile]) { // if the tile number matches a number in the registry
                        let typeName = enemyRegistry[tile]; // gets the second value in the registry
                        enemies.push({ // add all the values to the enemy array
                            type: typeName,
                            x: col * tileSize,
                            y: row * tileSize,
                            image: enemySprites[typeName], // using the type name, (second value in enemySprite), get the image
                            
                            health: 50, // base health for all enemies, multiply when drawing health to increase value
                            moneyValue: 5, // base amount on how much the player will earn on kill

                            frameIndex: 0,
                            tickCount: 0,
                            ticksPerFrame: 10, // Lower number means faster movement
                            moveState: { movingLeft: true, movingRight: false }
                        });

                        levelMap[row][col] = 3; // Resets the value at the tile in the tilemap to this value
                    }
                }
            }
            break;
        case map2:
            enemies = []; 
            for (let row = 0; row < levelMap.length; row++) {
                for (let col = 0; col < levelMap[row].length; col++) {
                    let tile = levelMap[row][col]; // gets the tile number at the location
                    if (enemyRegistry[tile]) { // if the tile number matches a number in the registry
                        let typeName = enemyRegistry[tile]; // gets the second value in the registry
                        enemies.push({ // add all the values to the enemy array
                            type: typeName,
                            x: col * tileSize,
                            y: row * tileSize,
                            image: enemySprites[typeName], // using the type name, (second value in enemySprite), get the image
                            
                            health: 50, // base health for all enemies, multiply when drawing health to increase value
                            moneyValue: 5, // base amount on how much the player will earn on kill

                            frameIndex: 0,
                            tickCount: 0,
                            ticksPerFrame: 10, // Lower number means faster movement
                            moveState: { movingLeft: true, movingRight: false }
                        });

                        levelMap[row][col] = 1; // Resets the value at the tile in the tilemap to this value
                    }
                }
            }
            break;
    }
}

// updates the npx movement
function updateNPC(npc, moveState, levelMap) {
    let checkX = npc.x + (moveState.movingLeft ? -5 : hitbox.width + 5);
    let checkY = npc.y + hitbox.height + 5; // Look 5 pixels below feet

    let tileCol = Math.floor(checkX / tileSize);
    let tileRow = Math.floor(checkY / tileSize);
    let wallRow = Math.floor(npc.y / tileSize);

    
    let grassTile = (levelMap[tileRow] && levelMap[tileRow][tileCol]);
    let wallTile = (levelMap[wallRow] && levelMap[wallRow][tileCol]);

    
    if (grassTile == 1 || wallTile == 2) {
        moveState.movingLeft = !moveState.movingLeft;
        moveState.movingRight = !moveState.movingRight;
    }

    if (moveState.movingLeft) {
        npc.x -= 1;
    } else {
        npc.x += 1;
    }
}

// updates the drawing of the npc
function updateAndDrawEnemy(npc, state) {
    switch(npc.type){
        case "swordsman":
            switch(state){
                case 1:
                    npc.tickCount++;
                    if (npc.tickCount > npc.ticksPerFrame) {
                        npc.tickCount = 0;
                        npc.frameIndex++;
                        if (npc.frameIndex >= 3) { npc.frameIndex = 0; }
                    }

                    let sw = npc.image.width / 7; 
                    
                    let sh = npc.image.height / 6;
                    let sx = npc.frameIndex * 32;

                    draw.save(); 
                    if (npc.moveState.movingLeft) { 
                        draw.translate(npc.x - camera.x + tileSize, 0); 
                        draw.scale(-1, 1);   
                        draw.drawImage(npc.image, sx, 0, sw, sh, 0 - 32, npc.y - camera.y - 28, 144, 144);
                    } 
                    else {
                        draw.drawImage(npc.image, sx, 0, sw, sh, npc.x - camera.x-32, npc.y - camera.y-28, 144, 144);
                    }

                    draw.restore();
                    break;
                case 2: // npc fighting sprite
                    npc.tickCount++;
                    if (npc.tickCount > npc.ticksPerFrame) {
                        npc.tickCount = 0;
                        npc.frameIndex++;
                        if (npc.frameIndex >= 7) { npc.frameIndex = 0; }
                    }

                    let swf = npc.image.width / 7; 
                    let shf = npc.image.height / 6;
                    let sxf = npc.frameIndex * 32;
                    let syf = 3 * shf;

                    draw.save(); 
                    if (player.x < npc.x ) { 
                        draw.translate(npc.x - camera.x + tileSize, 0); 
                        draw.scale(-1, 1);   
                        draw.drawImage(npc.image, sxf, syf, swf, shf, 0-32, npc.y - camera.y-28, 144, 144);
                    } 
                    else {
                        draw.drawImage(npc.image, sxf, syf, swf, shf, npc.x - camera.x-32, npc.y - camera.y-28, 144, 144);
                    }

                    draw.restore();
                    break;
                case 3: // npc fighting sprite
                    npc.tickCount++;
                    if (npc.tickCount > npc.ticksPerFrame) {
                        npc.tickCount = 0;
                        npc.frameIndex++;
                        if (npc.frameIndex >= 4) { 
                            npc.frameIndex = 4; 
                        }
                    }

                    let swd = npc.image.width / 7; 
                    let shd = npc.image.height / 6;
                    let sxd = npc.frameIndex * 32;
                    let syd = 5 * shd;

                    draw.save(); 
                    if (player.x < npc.x ) { 
                        draw.translate(npc.x - camera.x + tileSize, 0); 
                        draw.scale(-1, 1);   
                        draw.drawImage(npc.image, sxd, syd, swd, shd, 0-32, npc.y - camera.y-28, 144, 144);
                    } 
                    else {
                        draw.drawImage(npc.image, sxd, syd, swd, shd, npc.x - camera.x-32, npc.y - camera.y-28, 144, 144);
                    }

                    draw.restore();
                    break;
            }
            break;
        case "spearman":
            switch(state){
                case 1:
                    npc.tickCount++;
                    if (npc.tickCount > npc.ticksPerFrame) {
                        npc.tickCount = 0;
                        npc.frameIndex++;
                        if (npc.frameIndex >= 3) { npc.frameIndex = 0; }
                    }

                    let sw = npc.image.width / 7; 
                    let sh = npc.image.height / 6;
                    let sx = npc.frameIndex * 32;

                    draw.save(); 
                    if (npc.moveState.movingLeft) { 
                        draw.translate(npc.x - camera.x + tileSize, 0); 
                        draw.scale(-1, 1);   
                        draw.drawImage(npc.image, sx, 0, sw, sh, 0 - 22, npc.y - camera.y - 28, 144, 144);
                    } 
                    else {
                        draw.drawImage(npc.image, sx, 0, sw, sh, npc.x - camera.x-22, npc.y - camera.y-28, 144, 144);
                    }

                    draw.restore();
                    break;
                case 2: // npc fighting sprite
                    npc.tickCount++;
                    if (npc.tickCount > npc.ticksPerFrame) {
                        npc.tickCount = 0;
                        npc.frameIndex++;
                        if (npc.frameIndex >= 7) { npc.frameIndex = 0; }
                    }

                    let swf = npc.image.width / 7; 
                    
                    let shf = npc.image.height / 6;
                    let sxf = npc.frameIndex * 32;
                    let syf = 3 * shf;

                    draw.save(); 
                    if (player.x < npc.x ) { 
                        draw.translate(npc.x - camera.x + tileSize, 0); 
                        draw.scale(-1, 1);   
                        draw.drawImage(npc.image, sxf, syf, swf, shf, 0-22, npc.y - camera.y-28, 144, 144);
                    } 
                    else {
                        draw.drawImage(npc.image, sxf, syf, swf, shf, npc.x - camera.x-22, npc.y - camera.y-28, 144, 144);
                    }

                    draw.restore();
                    break;
                case 3: // npc fighting sprite
                    npc.tickCount++;
                    if (npc.tickCount > npc.ticksPerFrame) {
                        npc.tickCount = 0;
                        npc.frameIndex++;
                        if (npc.frameIndex >= 4) { 
                            npc.frameIndex = 4; 
                        }
                    }

                    let swd = npc.image.width / 7; 
                    let shd = npc.image.height / 6;
                    let sxd = npc.frameIndex * 32;
                    let syd = 5 * shd;

                    draw.save(); 
                    if (player.x < npc.x ) { 
                        draw.translate(npc.x - camera.x + tileSize, 0); 
                        draw.scale(-1, 1);   
                        draw.drawImage(npc.image, sxd, syd, swd, shd, 0-22, npc.y - camera.y-28, 144, 144);
                    } 
                    else {
                        draw.drawImage(npc.image, sxd, syd, swd, shd, npc.x - camera.x-22, npc.y - camera.y-28, 144, 144);
                    }

                    draw.restore();
                    break;
            }
            break;
        case "archer":
            switch(state){
                case 1:
                    npc.tickCount++;
                    if (npc.tickCount > npc.ticksPerFrame) {
                        npc.tickCount = 0;
                        npc.frameIndex++;
                        if (npc.frameIndex >= 3) { npc.frameIndex = 0; }
                    }

                    let sw = npc.image.width / 12; 
                    
                    let sh = npc.image.height / 7;
                    let sx = npc.frameIndex * 32;

                    draw.save(); 
                    if (npc.moveState.movingLeft) { 
                        draw.translate(npc.x - camera.x + tileSize, 0); 
                        draw.scale(-1, 1);   
                        draw.drawImage(npc.image, sx, 0, sw, sh, 0 - 24, npc.y - camera.y - 28, 144, 144);
                    } 
                    else {
                        draw.drawImage(npc.image, sx, 0, sw, sh, npc.x - camera.x-24, npc.y - camera.y-28, 144, 144);
                    }

                    draw.restore();
                    break;
                case 2: // npc fighting sprite
                    npc.tickCount++;
                    if (npc.tickCount > npc.ticksPerFrame) {
                        npc.tickCount = 0;
                        npc.frameIndex++;
                        if (npc.frameIndex >= 12) { npc.frameIndex = 0; }
                    }

                    let swf = npc.image.width / 12; 
                    let shf = npc.image.height / 7;
                    let sxf = npc.frameIndex * 32;
                    let syf = 3 * shf;

                    draw.save(); 
                    if (player.x < npc.x ) { 
                        draw.translate(npc.x - camera.x + tileSize, 0); 
                        draw.scale(-1, 1);   
                        draw.drawImage(npc.image, sxf, syf, swf, shf, 0-24, npc.y - camera.y-28, 144, 144);
                    } 
                    else {
                        draw.drawImage(npc.image, sxf, syf, swf, shf, npc.x - camera.x-24, npc.y - camera.y-28, 144, 144);
                    }

                    draw.restore();
                    break;
                case 3: // npc fighting sprite
                    npc.tickCount++;
                    if (npc.tickCount > npc.ticksPerFrame) {
                        npc.tickCount = 0;
                        npc.frameIndex++;
                        if (npc.frameIndex >= 4) { 
                            npc.frameIndex = 4; 
                        }
                    }

                    let swd = npc.image.width / 12; 
                    let shd = npc.image.height / 7;
                    let sxd = npc.frameIndex * 32;
                    let syd = 6 * shd; // counting index starts at 0

                    draw.save(); 
                    if (player.x < npc.x ) { 
                        draw.translate(npc.x - camera.x + tileSize, 0); 
                        draw.scale(-1, 1);   
                        draw.drawImage(npc.image, sxd, syd, swd, shd, 0-24, npc.y - camera.y-28, 144, 144);
                    } 
                    else {
                        draw.drawImage(npc.image, sxd, syd, swd, shd, npc.x - camera.x-24, npc.y - camera.y-28, 144, 144);
                    }

                    draw.restore();
                    break;
            }
            break;
        case "archmage":
            switch(state){
                case 1:
                    npc.tickCount++;
                    if (npc.tickCount > npc.ticksPerFrame) {
                        npc.tickCount = 0;
                        npc.frameIndex++;
                        if (npc.frameIndex >= 3) { npc.frameIndex = 0; }
                    }

                    let sw = npc.image.width / 12; 
                    let sh = npc.image.height / 9;
                    let sx = npc.frameIndex * 32;

                    draw.save(); 
                    if (npc.moveState.movingLeft) { 
                        draw.translate(npc.x - camera.x + tileSize, 0); 
                        draw.scale(-1, 1);   
                        draw.drawImage(npc.image, sx, 0, sw, sh, 0-32, npc.y - camera.y - 28, 144, 144);
                    } 
                    else {
                        draw.drawImage(npc.image, sx, 0, sw, sh, npc.x - camera.x-32, npc.y - camera.y-28, 144, 144);
                    }

                    draw.restore();
                    break;
                case 2: // npc fighting sprite
                    npc.tickCount++;
                    if (npc.tickCount > npc.ticksPerFrame) {
                        npc.tickCount = 0;
                        npc.frameIndex++;
                        if (npc.frameIndex >= 10) { npc.frameIndex = 0; }
                    }

                    let swf = npc.image.width / 12; 
                    let shf = npc.image.height / 9;
                    let sxf = npc.frameIndex * 32;
                    let syf = 4 * shf;

                    draw.save(); 
                    if (player.x < npc.x ) { 
                        draw.translate(npc.x - camera.x + tileSize, 0); 
                        draw.scale(-1, 1);   
                        draw.drawImage(npc.image, sxf, syf, swf, shf, 0-32, npc.y - camera.y-28, 144, 144);
                    } 
                    else {
                        draw.drawImage(npc.image, sxf, syf, swf, shf, npc.x - camera.x-32, npc.y - camera.y-28, 144, 144);
                    }

                    draw.restore();
                    break;
                case 3: // npc died
                    npc.tickCount++;
                    if (npc.tickCount > npc.ticksPerFrame) {
                        npc.tickCount = 0;
                        npc.frameIndex++;
                        if (npc.frameIndex >= 9) { 
                            npc.frameIndex = 9; 
                        }
                    }

                    let swd = npc.image.width / 12; 
                    let shd = npc.image.height / 9;
                    let sxd = npc.frameIndex * 32;
                    let syd = 8 * shd;

                    draw.save(); 
                    if (player.x < npc.x ) { 
                        draw.translate(npc.x - camera.x + tileSize, 0); 
                        draw.scale(-1, 1);   
                        draw.drawImage(npc.image, sxd, syd, swd, shd, 0-32, npc.y - camera.y-28, 144, 144);
                    } 
                    else {
                        draw.drawImage(npc.image, sxd, syd, swd, shd, npc.x - camera.x-32, npc.y - camera.y-28, 144, 144);
                    }

                    draw.restore();
                    break;
            }
            break;
        }
}

const tileSize = 80;
const mapWidthInPixels = startMap[0].length * tileSize;
const mapHeightInPixels = startMap.length * tileSize;

let camera = { x: 0, y: 0 };
// -32 so it'll actually be lined up with a tiled location rather than being on the lower corner of it
let player = { x: mapWidthInPixels/2-16, y: mapHeightInPixels/2-128, width: 168, height: 168, health: 100, attack: .5, money: 0, speed: 4, state: "idle", healthPotion: 2, manaPotions: 0};
let hitbox = { x: 0, y: 0, width: 32, height: 72};
let vendor = { x: 80, y: 400+16, width: 64, height: 64};

let chestSize = { width: 70, height: 60};
let invisibleOffset = 20;
let chest1Btn = { x: 160, y: 160, money: 5, hp: 0, mp: 0, width: 75, height: 35, touching: false, closed: true };
let chest2Btn = { x: 160, y: 1440, money: 5, hp: 0, mp: 0, width: 75, height: 35, touching: false, closed: true };
let chest3Btn = { x: 720, y: 960, money: 5, hp: 0, mp: 0, width: 75, height: 35, touching: false, closed: true };
let chest4Btn = { x: 960, y: 2240, money: 5, hp: 0, mp: 0, width: 75, height: 35, touching: false, closed: true };
let chest5Btn = { x: 2240, y: 160, money: 5, hp: 0, mp: 0, width: 75, height: 35, touching: false, closed: true };
let chest6Btn = { x: 2240, y: 1440, money: 5, hp: 0, mp: 0, width: 75, height: 35, touching: false, closed: true };
let chest7Btn = { x: 2240, y: 2240, money: 5, hp: 0, mp: 0, width: 75, height: 35, touching: false, closed: true };

let dungeonDoor = { x: 1200, y: 40, width: 92, height:35};

let mobilejmpbtn = { x: 500, y: 500, radius: 50, width: 100, height: 100};

let drawMap1 = true;
let drawMap2 = false;
let mapChange = false;
let movingLeft = false;
let openInventory = false;
let exitbtn = { x: 490, y: 35, width: 30, height: 30};

// Track Keys
let keys={};
document.addEventListener("keydown", (e)=>{
    keys[e.key]=true;
});
document.addEventListener("keyup", (e)=>{
    player.state = "idle";

    // Having this in here will make it so the player can only use 1 potion at a time and cannot exceed max health
    if(keys["h"] && player.healthPotion >= 1){
        player.health += 20;
        if(player.health >= 100){
            player.health = 100;
        }
        player.healthPotion -= 1;
    }
    keys[e.key]=false;
});
document.addEventListener("click", (e) =>{
    // Get the coordinates relative the screen/canvas
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left; // X relative to canvas
    const mouseY = e.clientY - rect.top; // Y relative to canvas

    // Convert them to world coordinates to account for things not on the screen yet
    let worldMouseX = mouseX + camera.x;
    let worldMouseY = mouseY + camera.y;

    //console.log("Mouse X:", worldMouseX, "Mouse Y: ", worldMouseY);
    //console.log("Mouse X:", mouseX, "Mouse Y: ", mouseY);
    //console.log("Player X:", player.x, "Player Y: ", player.y);
    if(drawMap1){
        if(worldMouseX >= chest1Btn.x && worldMouseX <= chest1Btn.x + chest1Btn.width && worldMouseY <=  chest1Btn.y + chest1Btn.height - invisibleOffset && worldMouseY >= chest1Btn.y - invisibleOffset){
            chest1Btn.closed = false;
            player.money += chest1Btn.money;
            //console.log("Clicked")
        }
        if(worldMouseX >= chest2Btn.x && worldMouseX <= chest2Btn.x + chest2Btn.width && worldMouseY <=  chest2Btn.y + chest2Btn.height - invisibleOffset && worldMouseY >= chest2Btn.y - invisibleOffset){
            chest2Btn.closed = false;
            player.money += chest2Btn.money;
        }
        if(worldMouseX >= chest3Btn.x && worldMouseX <= chest3Btn.x + chest3Btn.width && worldMouseY <=  chest3Btn.y + chest3Btn.height - invisibleOffset && worldMouseY >= chest3Btn.y - invisibleOffset){
            chest3Btn.closed = false;
            player.money += chest3Btn.money;
        }
        if(worldMouseX >= chest4Btn.x && worldMouseX <= chest4Btn.x + chest4Btn.width && worldMouseY <=  chest4Btn.y + chest4Btn.height - invisibleOffset && worldMouseY >= chest4Btn.y - invisibleOffset){
            chest4Btn.closed = false;
            player.money += chest4Btn.money;
        }
        if(worldMouseX >= chest5Btn.x && worldMouseX <= chest5Btn.x + chest5Btn.width && worldMouseY <=  chest5Btn.y + chest5Btn.height - invisibleOffset && worldMouseY >= chest5Btn.y - invisibleOffset){
            chest5Btn.closed = false;
            player.money += chest5Btn.money;
        }
        if(worldMouseX >= chest6Btn.x && worldMouseX <= chest6Btn.x + chest6Btn.width && worldMouseY <=  chest6Btn.y + chest6Btn.height - invisibleOffset && worldMouseY >= chest6Btn.y - invisibleOffset){
            chest6Btn.closed = false;
            player.money += chest6Btn.money;
        }
        if(worldMouseX >= chest7Btn.x && worldMouseX <= chest7Btn.x + chest7Btn.width && worldMouseY <=  chest7Btn.y + chest7Btn.height - invisibleOffset && worldMouseY >= chest7Btn.y - invisibleOffset){
            chest7Btn.closed = false;
            player.money += chest7Btn.money;
        }
        
        if(worldMouseX <= dungeonDoor.x + dungeonDoor.width && worldMouseX >= dungeonDoor.x && worldMouseY <=  dungeonDoor.y + dungeonDoor.height && worldMouseY >= dungeonDoor.y){
            console.log("Enter Dungeon")
            drawMap1 = false;
            drawMap2 = true;
            player.x = 1200;
            player.y = 80;
        }
    }
    if(openInventory){
        if(worldMouseX >= exitbtn.x && worldMouseX <= exitbtn.x + exitbtn.width && worldMouseY <=  exitbtn.y + exitbtn.height && worldMouseY >= exitbtn){
            openInventory = false;
            console.log("Clicked")
        }
    }
});

// Mobile Controls
document.addEventListener("touchstart", (e) =>{
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0]; // Gets the values of the first finger that touches the screen
    const touchX = touch.clientX - rect.left; // X relative to canvas
    const touchY = touch.clientY - rect.top; // Y relative to canvas

    // Convert them to world coordinates to account for things not on the screen yet
    let worldTouchX = touchX + camera.x;
    let worldTouchY = touchY + camera.y;

    draw.fillStyle = "yellow";
    draw.font = "50px arial";
    draw.fillText(`Touching the screen`, 5, 260);
    // Use touchX/touchY because the button stays on the screen, it doesn't move with the camera
    if (touchX >= mobilejmpbtn.x && 
        touchX <= mobilejmpbtn.x + mobilejmpbtn.width &&
        touchY >= mobilejmpbtn.y && 
        touchY <= mobilejmpbtn.y + mobilejmpbtn.height) {
        
        keys["f"] = true;
        player.state = "attack";
    }
    
    //keys[e.key]=true;
});
document.addEventListener("touchend", (e) => {
    keys[e.key]=false;
})
 
function movementKeys(dt){
    // Define a base movement speed (pixels per second)
    // Since your current speed is '2', 2 * 60fps = 120. 
    // Try setting player.speed to 120 or 150 for a similar feel.
    const moveAmount = player.speed * dt * 60; // Multiplying by 60 keeps your current '2' feel consistent
    
    if(keys["ArrowRight"]){
        movingLeft = false;
        player.state = "walk";
        player.x += moveAmount;
    }
    if(keys["ArrowLeft"]){
        movingLeft = true;
        player.state = "walk";
        player.x -= moveAmount;
    }
    if(keys["ArrowUp"]){
        player.state = "walk";
        player.y -= moveAmount;
    }
    if(keys["ArrowDown"]){
        player.state = "walk";
        player.y += moveAmount;
    }
    if(keys["d"]){
        player.state = "walk";
        movingLeft = false;
        player.x += moveAmount;
    }
    if(keys["a"]){
        player.state = "walk";
        movingLeft = true;
        player.x -= moveAmount;
    }
    if(keys["w"]){
        player.state = "walk";
        player.y -= moveAmount;
    }
    if(keys["s"]){
        player.state = "walk";
        player.y += moveAmount;
    }
    // Triggers fighting animation
    if(keys["f"]){
        player.state = "attack";
    }
    // Open inventory
    if(keys["i"]){
        openInventory = true;
    }
    // Close inventory
    if(keys["c"]){
        openInventory = false;
    }
}

let frameIndex = 0;
let frameCount = 0;
let drawX = 0;
let drawY = 0;
let offsetX = (player.width - hitbox.width) / 2;
let offsetY = (player.height - hitbox.height) / 2;

function animatePlayer(state){
    switch(state){
        case "idle":
            frameCount++;
    
            if(frameCount >= 20){
                frameIndex++;
                if(frameIndex >= 4){
                    frameIndex = 0;
                }
                frameCount = 0;
            }
            let sw = playerIdle.width/7;
            let sh = playerIdle.height;
            let sx = frameIndex * sw;
            
            drawX = player.x - offsetX - camera.x;
            drawY = player.y - offsetY - camera.y;
            draw.save(); 
            if (movingLeft) { 
                draw.translate(drawX + player.width, drawY); 
                draw.scale(-1, 1);   
                draw.drawImage(playerIdle, sx, 0, sw, sh, 0, 0, player.width, player.height);
            } 
            else {
                draw.drawImage(playerIdle, sx, 0, sw, sh, drawX, drawY, player.width, player.height);//console.log(sw*1.8)
            }

            draw.restore();
            break;
        case "walk":
            frameCount++;
    
            if(frameCount >= 20){
                frameIndex++;
                if(frameIndex >= 7){
                    frameIndex = 0;
                }
                frameCount = 0;
            }
            let sww = playerWalk.width/8;
            let shw = playerWalk.height;
            let sxw = frameIndex * sww;
            
            drawX = player.x - offsetX - camera.x;
            drawY = player.y - offsetY - camera.y;
            draw.save(); 
            if (movingLeft) { 
                draw.translate(drawX + player.width, drawY); 
                draw.scale(-1, 1);   
                draw.drawImage(playerWalk, sxw, 0, sww, shw, 0, 0, player.width, player.height);
            } 
            else {
                draw.drawImage(playerWalk, sxw, 0, sww, shw, drawX, drawY, player.width, player.height);
            }

            draw.restore();
            break;
        case "attack":
            frameCount++;
    
            if(frameCount >= 8){
                frameIndex++;
                if(frameIndex >= 6){
                    frameIndex = 0;
                }
                frameCount = 0;
            }
            let swa = playerAttack.width/6;
            let sha = playerAttack.height;
            let sxa = frameIndex * swa;
            
            drawX = player.x - offsetX - camera.x;
            drawY = player.y - offsetY - camera.y;
            draw.save(); 
            if (movingLeft) { 
                draw.translate(drawX + player.width, drawY); 
                draw.scale(-1, 1);   
                draw.drawImage(playerAttack, sxa, 0, swa, sha, 0, 0, player.width, player.height);
            } 
            else {
                draw.drawImage(playerAttack, sxa, 0, swa, sha, drawX, drawY, player.width, player.height);
            }

            draw.restore();
            break;
        case "death":
            frameCount++;
    
            if(frameCount >= 15){
                frameIndex++;
                if(frameIndex >= 12){
                    frameIndex = 0;
                    player.x = mapWidthInPixels/2-64; // when player dies after animation is complete, reset at beginning location
                    player.y = mapHeightInPixels/2-48;
                    player.state = "idle"; // reset characters state
                    player.health = 100;
                    if(drawMap2){
                        drawMap1 = true;
                        drawMap2 = false;
                    }
                }
                frameCount = 0;
            }
            let swd = playerDeath.width/12;
            let shd = playerDeath.height;
            let sxd = frameIndex * swd;
            
            drawX = player.x - offsetX - camera.x;
            drawY = player.y - offsetY - camera.y;
            draw.save(); 
            if (movingLeft) { 
                draw.translate(drawX + player.width, drawY); 
                draw.scale(-1, 1);   
                draw.drawImage(playerDeath, sxd, 0, swd, shd, 0, 0, player.width, player.height);
            } 
            else {
                draw.drawImage(playerDeath, sxd, 0, swd, shd, drawX, drawY, player.width, player.height);//console.log(sw*1.8)
            }

            draw.restore();
            break;
    }
    
}

// gemini method
function drawLighting() {
    
    // Subtract offsetX and offsetY so the light centers on the SPRITE, not the hitbox
    let centerX = (player.x - offsetX - camera.x) + (player.width / 2);
    let centerY = (player.y - offsetY - camera.y) + (player.height / 2);
    
    let radius = 120;

    // ... rest of your clipping logic remains the same ...
    draw.save();
    draw.beginPath();
    draw.rect(0, 0, canvas.width, canvas.height);
    draw.arc(centerX, centerY, radius, 0, Math.PI * 2);
    draw.clip("evenodd"); 
    draw.fillStyle = "black";
    draw.fillRect(0, 0, canvas.width, canvas.height);
    draw.restore();

    draw.save();
    draw.beginPath();
    draw.arc(centerX, centerY, radius, 0, Math.PI * 2);
    draw.clip(); 
    draw.fillStyle = "rgba(0, 0, 0, 0.4)"; 
    draw.fillRect(0, 0, canvas.width, canvas.height);
    draw.restore();

    /* draw.save();

    // 1. Define the center and size of the circle
    let radius = 100; // Adjust this to make the light bigger or smaller
    let centerX = (player.x - camera.x) + (player.width / 2);
    let centerY = (player.y - camera.y) + (player.height / 2);

    // 2. Start the path
    draw.beginPath();

    // 3. Add the entire screen to the path (the "darkness" area)
    draw.rect(0, 0, canvas.width, canvas.height);

    // 4. Add the circle hole to the path
    // The "evenodd" rule will treat the circle as a hole cut out of the rectangle
    draw.arc(centerX, centerY, radius, 0, Math.PI * 2);

    // 5. Clip everything to this path
    draw.clip("evenodd");

    // 6. Fill the "darkness"
    // Because of the clipping, this black only fills the space OUTSIDE the circle
    draw.fillStyle = "black";
    draw.fillRect(0, 0, canvas.width, canvas.height);

    draw.restore(); */

    /* draw.save();

    // 1. Define the hole properties
    let maskSize = 160;
    let radius = 20;
    let holeX = (player.x - camera.x) + (player.width / 2) - (maskSize / 2);
    let holeY = (player.y - camera.y) + (player.height / 2) - (maskSize / 2);

    // 2. Start a new path
    draw.beginPath();

    // 3. Add the entire screen to the path
    draw.rect(0, 0, canvas.width, canvas.height);

    // 4. Add the hole to the path (rounded rectangle)
    // By using "evenodd" later, this will subtract the hole from the screen rect
    draw.roundRect(holeX, holeY, maskSize, maskSize, radius);

    // 5. Clip everything to this path
    // "evenodd" tells the canvas to ignore the overlapping parts (the hole)
    draw.clip("evenodd");

    // 6. Fill the "darkness"
    // Since we clipped the hole, this black will only draw everywhere ELSE
    draw.fillStyle = "black";
    draw.fillRect(0, 0, canvas.width, canvas.height);

    draw.restore(); */
}

function chests(map){
    switch(map){
        case startMap:
            if(chest1Btn.closed){
                //draw.strokeStyle = "blue";
                //draw.strokeRect(chest1Btn.x -camera.x, chest1Btn.y -camera.y, tileSize, tileSize);
                //draw.drawImage(tiles[3], chest1Btn.x -camera.x, chest1Btn.y -camera.y, tileSize, tileSize);
                draw.drawImage(chestAnimation[0], chest1Btn.x -camera.x, chest1Btn.y -camera.y, tileSize, tileSize);
            }else{
                draw.drawImage(chestAnimation[1], chest1Btn.x -camera.x, chest1Btn.y -camera.y, tileSize, tileSize);
            }
            if(chest2Btn.closed){
                draw.drawImage(chestAnimation[0], chest2Btn.x -camera.x, chest2Btn.y -camera.y, tileSize, tileSize);
            }else{
                draw.drawImage(chestAnimation[1], chest2Btn.x -camera.x, chest2Btn.y -camera.y, tileSize, tileSize);
            }
            if(chest3Btn.closed){
                draw.drawImage(chestAnimation[0], chest3Btn.x -camera.x, chest3Btn.y -camera.y, tileSize, tileSize);
            }else{
                draw.drawImage(chestAnimation[1], chest3Btn.x -camera.x, chest3Btn.y -camera.y, tileSize, tileSize);
            }
            if(chest4Btn.closed){
                draw.drawImage(chestAnimation[0], chest4Btn.x -camera.x, chest4Btn.y -camera.y, tileSize, tileSize);
            }else{
                draw.drawImage(chestAnimation[1], chest4Btn.x -camera.x, chest4Btn.y -camera.y, tileSize, tileSize);
            }
            if(chest5Btn.closed){
                draw.drawImage(chestAnimation[0], chest5Btn.x -camera.x, chest5Btn.y -camera.y, tileSize, tileSize);
            }else{
                draw.drawImage(chestAnimation[1], chest5Btn.x -camera.x, chest5Btn.y -camera.y, tileSize, tileSize);
            }
            if(chest6Btn.closed){
                draw.drawImage(chestAnimation[0], chest6Btn.x -camera.x, chest6Btn.y -camera.y, tileSize, tileSize);
            }else{
                draw.drawImage(chestAnimation[1], chest6Btn.x -camera.x, chest6Btn.y -camera.y, tileSize, tileSize);
            }
            if(chest7Btn.closed){
                draw.drawImage(chestAnimation[0], chest7Btn.x -camera.x, chest7Btn.y -camera.y, tileSize, tileSize);
            }else{
                draw.drawImage(chestAnimation[1], chest7Btn.x -camera.x, chest7Btn.y -camera.y, tileSize, tileSize);
            } 

            if(player.x >= chest1Btn.x && player.x <= chest1Btn.x + chestSize.width && player.y <=  chest1Btn.y + chestSize.height && player.y >= chest1Btn.y && chest1Btn.closed){
                draw.fillStyle = "black";
                draw.fillRect(chest1Btn.x - camera.x, chest1Btn.y - camera.y-20, chest1Btn.width, chest1Btn.height);
                draw.strokeStyle = "yellow"
                draw.strokeRect(chest1Btn.x - camera.x, chest1Btn.y - camera.y-20, chest1Btn.width, chest1Btn.height);

                draw.fillStyle = "white";
                draw.font= ('25px arial');
                draw.fillText("Open?", chest1Btn.x - camera.x, chest1Btn.y - camera.y+5);
            }
            if(player.x >= chest2Btn.x && player.x <= chest2Btn.x + chestSize.width && player.y <=  chest2Btn.y + chestSize.height && player.y >= chest2Btn.y && chest2Btn.closed){
                draw.fillStyle = "black";
                draw.fillRect(chest2Btn.x - camera.x, chest2Btn.y - camera.y-20, chest2Btn.width, chest2Btn.height);
                draw.strokeStyle = "yellow"
                draw.strokeRect(chest2Btn.x - camera.x, chest2Btn.y - camera.y-20, chest2Btn.width, chest2Btn.height);

                draw.fillStyle = "white";
                draw.font= ('25px arial');
                draw.fillText("Open?", chest2Btn.x - camera.x, chest2Btn.y - camera.y+5);
            }
            if(player.x >= chest3Btn.x && player.x <= chest3Btn.x + chestSize.width && player.y <=  chest3Btn.y + chestSize.height && player.y >= chest3Btn.y && chest3Btn.closed){
                draw.fillStyle = "black";
                draw.fillRect(chest3Btn.x - camera.x, chest3Btn.y - camera.y-20, chest3Btn.width, chest3Btn.height);
                draw.strokeStyle = "yellow"
                draw.strokeRect(chest3Btn.x - camera.x, chest3Btn.y - camera.y-20, chest3Btn.width, chest3Btn.height);

                draw.fillStyle = "white";
                draw.font= ('25px arial');
                draw.fillText("Open?", chest3Btn.x - camera.x, chest3Btn.y - camera.y+5);
            }
            if(player.x >= chest4Btn.x && player.x <= chest4Btn.x + chestSize.width && player.y <=  chest4Btn.y + chestSize.height && player.y >= chest4Btn.y && chest4Btn.closed){
                draw.fillStyle = "black";
                draw.fillRect(chest4Btn.x - camera.x, chest4Btn.y - camera.y-20, chest4Btn.width, chest4Btn.height);
                draw.strokeStyle = "yellow"
                draw.strokeRect(chest4Btn.x - camera.x, chest4Btn.y - camera.y-20, chest4Btn.width, chest4Btn.height);

                draw.fillStyle = "white";
                draw.font= ('25px arial');
                draw.fillText("Open?", chest4Btn.x - camera.x, chest4Btn.y - camera.y+5);
            }
            if(player.x >= chest5Btn.x && player.x <= chest5Btn.x + chestSize.width && player.y <=  chest5Btn.y + chestSize.height && player.y >= chest5Btn.y && chest5Btn.closed){
                draw.fillStyle = "black";
                draw.fillRect(chest5Btn.x - camera.x, chest5Btn.y - camera.y-20, chest5Btn.width, chest5Btn.height);
                draw.strokeStyle = "yellow"
                draw.strokeRect(chest5Btn.x - camera.x, chest5Btn.y - camera.y-20, chest5Btn.width, chest5Btn.height);

                draw.fillStyle = "white";
                draw.font= ('25px arial');
                draw.fillText("Open?", chest5Btn.x - camera.x, chest5Btn.y - camera.y+5);
            }
            if(player.x >= chest6Btn.x && player.x <= chest6Btn.x + chestSize.width && player.y <=  chest6Btn.y + chestSize.height && player.y >= chest6Btn.y && chest6Btn.closed){
                draw.fillStyle = "black";
                draw.fillRect(chest6Btn.x - camera.x, chest6Btn.y - camera.y-20, chest6Btn.width, chest6Btn.height);
                draw.strokeStyle = "yellow"
                draw.strokeRect(chest6Btn.x - camera.x, chest6Btn.y - camera.y-20, chest6Btn.width, chest6Btn.height);

                draw.fillStyle = "white";
                draw.font= ('25px arial');
                draw.fillText("Open?", chest6Btn.x - camera.x, chest6Btn.y - camera.y+5);
            }
            if(player.x >= chest7Btn.x && player.x <= chest7Btn.x + chestSize.width && player.y <=  chest7Btn.y + chestSize.height && player.y >= chest7Btn.y && chest7Btn.closed){
                draw.fillStyle = "black";
                draw.fillRect(chest7Btn.x - camera.x, chest7Btn.y - camera.y-20, chest7Btn.width, chest7Btn.height);
                draw.strokeStyle = "yellow"
                draw.strokeRect(chest7Btn.x - camera.x, chest7Btn.y - camera.y-20, chest7Btn.width, chest7Btn.height);

                draw.fillStyle = "white";
                draw.font= ('25px arial');
                draw.fillText("Open?", chest7Btn.x - camera.x, chest7Btn.y - camera.y+5);
            }
            break;
        case map2:
            break;
    }
    
}

let timer = 120;
let transitionTimer = 300;
let levelLoaded = false;
let enemyState = 1;
let walkTimer = 20;
let touchingDoor = false;

let lastTime = 0;

function gameLoop(currentTime){
    // Gemini method for FPS
    // 1. Calculate Delta Time (in seconds)
    // If it's the first frame, set delta to 0 to avoid a massive jump
    const deltaTime = (currentTime - lastTime) / 1000; 
    lastTime = currentTime;

    // 2. Cap Delta Time
    // This prevents the player from "teleporting" if the game lags or the tab is hidden
    const dt = Math.min(deltaTime, 0.1);

    // FPS Debug
    //const fps = Math.round(1 / dt);
    //console.log("Fps:", fps);
    
    timer--;
    let oldX = player.x;
    let oldY = player.y;
    // Background
    draw.fillStyle = "orange";
    draw.fillRect(0, 0, canvas.width, canvas.height);

    // Camera is gemini method
    // Calculate the visual center of the sprite
    let spriteCenterX = player.x - offsetX + (player.width / 2);
    let spriteCenterY = player.y - offsetY + (player.height / 2);

    // Center the camera on that visual point
    let targetCameraX = spriteCenterX - (canvas.width / 2);
    let targetCameraY = spriteCenterY - (canvas.height / 2);

    // Apply the clamp
    camera.x = Math.max(0, Math.min(targetCameraX, mapWidthInPixels - canvas.width));
    camera.y = Math.max(0, Math.min(targetCameraY, mapHeightInPixels - canvas.height));

    movementKeys(dt);
    hitbox.x = player.x;
    hitbox.y = player.y+3;

    if(drawMap1){
        if (!levelLoaded) {
            spawnEnemies(startMap); 
            levelLoaded = true; // This prevents it from running again next frame
        }

        // Draw the map
        for(let row = 0; row < startMap.length; row++){
            for(let col = 0; col < startMap[row].length; col++){
                let tileX = col * tileSize;
                if(startMap[row][col] == 1){ // Grass
                    draw.drawImage(tiles[1], col*tileSize -camera.x, row*tileSize -camera.y, tileSize, tileSize);
                }
                else if(startMap[row][col] == 2){ // Wall
                    draw.drawImage(tiles[2], col*tileSize -camera.x, row*tileSize -camera.y, tileSize, tileSize);
                }
                else if(startMap[row][col] == 3){ // Dirt
                    draw.drawImage(tiles[3], col*tileSize -camera.x, row*tileSize -camera.y, tileSize, tileSize);
                }
                else if(startMap[row][col] == 4){ // Dungeon Entrance
                    draw.drawImage(dungeonDoor1, col*tileSize -camera.x, row*tileSize -camera.y, tileSize, tileSize);
                }
            }
        }

        // Collision with tiles
        for(let row = 0; row < startMap.length; row++){
            for(let col = 0; col < startMap[row].length; col++){
                let tileX = col * tileSize;
                let tileY = row * tileSize;
                if(startMap[row][col] == 1 || startMap[row][col] == 2){ // Grass
                    if (player.x < tileX + tileSize && player.x + hitbox.width > tileX && player.y < tileY + tileSize && player.y + hitbox.height > tileY) {
                        // Resolve Vertical (Top/Bottom)
                        if (oldY + hitbox.height <= tileY) { // Landed on Top
                            player.y = tileY - hitbox.height;
                        } 
                        else if (oldY >= tileY + tileSize) { // Hit Head
                            player.y = tileY + tileSize;
                        }
                        // Resolve Horizontal (Sides)
                        else if (oldX + hitbox.width <= tileX) { // Left Wall
                            player.x = tileX - hitbox.width;
                        }
                        else if (oldX >= tileX + tileSize) { // Right Wall
                            player.x = tileX + tileSize;
                        }
                    }
                }
                if(startMap[row][col] == 4){ // dungeon entrance
                    if (player.x < tileX + tileSize && player.x + hitbox.width > tileX && player.y < tileY + tileSize && player.y + hitbox.height > tileY) {
                       touchingDoor = true;
                    }else{
                        touchingDoor = false;
                    }
                }
            }
        }

        enemies.forEach(npc => {
            if (player.x < npc.x + tileSize && player.x + tileSize > npc.x && 
                player.y < npc.y + tileSize && player.y + tileSize > npc.y) {
                
                if(player.health <= 0){
                    player.health = 0;
                    player.state = "death";
                }
                else{
                    if(!npc.health == 0){
                        enemyState = 2; // Fighting animation
                        if(npc.type == "swordsman"){
                            draw.fillStyle = "red";
                            draw.fillRect( npc.x - camera.x, npc.y - camera.y-20, npc.health, 25);
                        }
                        player.health -= .1;
                        if(player.state == "attack"){
                            npc.health -= player.attack;
                        }
                    }
                }
            }
            else{
                enemyState = 1; // Idle animation
            }
            if(npc.health <= 0){
                npc.health = 0;
                enemyState = 3; // Death animation
            }
           
            if(walkTimer >= 0){
                updateNPC(npc, npc.moveState, startMap);
            }
            walkTimer--; 
            updateAndDrawEnemy(npc, enemyState);
        });

        // mobile jump button
        draw.beginPath();
        draw.arc( mobilejmpbtn.x, mobilejmpbtn.y, mobilejmpbtn.radius, 0, Math.PI*2);
        draw.fill();
        draw.closePath();

        chests(startMap); // Draw the chests and ask to open it if players near it
        animatePlayer(player.state);

        // draw money
        draw.fillStyle = "yellow";
        draw.font = "30px arial";
        draw.fillText(`$`, 5, 60);

        draw.fillStyle = "white";
        draw.font = "30px arial";
        draw.fillText(`${player.money}`, 25, 60);

        if(touchingDoor){
            draw.fillStyle = "black";
            draw.fillRect(dungeonDoor.x- camera.x, dungeonDoor.y-camera.y, dungeonDoor.width, dungeonDoor.height);
            
            draw.fillStyle = "white";
            draw.font = "30px arial"
            draw.fillText("Enter?", dungeonDoor.x - camera.x+2, dungeonDoor.y - camera.y+30);
        }
    } 
    else if(drawMap2){
        if (!levelLoaded) {
            spawnEnemies(map2); 
            levelLoaded = true; // This prevents it from running again next frame
        }
        for(let row = 0; row < map2.length; row++){
            for(let col = 0; col < map2[row].length; col++){
                if(map2[row][col] == 1){ // Floor
                    draw.drawImage(level1Tiles[1], col*tileSize -camera.x, row*tileSize -camera.y, tileSize, tileSize)
                }else if(map2[row][col] == 2){ // Wall
                    draw.drawImage(level1Tiles[2], col*tileSize -camera.x, row*tileSize -camera.y, tileSize, tileSize)
                }
                
                else if(map2[row][col] == 4){ // Dungeon Entrance
                    draw.drawImage(dungeonDoor1, col*tileSize -camera.x, row*tileSize -camera.y, tileSize, tileSize);
                }
                else if(map2[row][col] == 5){ // Chest
                    draw.fillRect(col*tileSize -camera.x, row*tileSize -camera.y, tileSize, tileSize);
                }
            }
        }

        for(let row = 0; row < map2.length; row++){
            for(let col = 0; col < map2[row].length; col++){
                let tileX = col * tileSize;
                let tileY = row * tileSize;
                
                if(map2[row][col] == 2){
                    if (player.x < tileX + tileSize && player.x + hitbox.width > tileX && player.y < tileY + tileSize && player.y + hitbox.height > tileY) {
                        // Resolve Vertical (Top/Bottom)
                        if (oldY + hitbox.height <= tileY) { // Landed on Top
                            player.y = tileY - hitbox.height;
                        } 
                        else if (oldY >= tileY + tileSize) { // Hit Head
                            player.y = tileY + tileSize;
                        }
                        // Resolve Horizontal (Sides)
                        else if (oldX + hitbox.width <= tileX) { // Left Wall
                            player.x = tileX - hitbox.width;
                        }
                        else if (oldX >= tileX + tileSize) { // Right Wall
                            player.x = tileX + tileSize;
                        }
                    }
                }
                
            }
        }
        enemies.forEach(npc => {
            if (player.x < npc.x + tileSize && player.x + tileSize > npc.x && 
                player.y < npc.y + tileSize && player.y + tileSize > npc.y) {
                
                if(player.health <= 0){
                    player.health = 0;
                    player.state = "death";
                }
                else{
                    if(!npc.health == 0){
                        enemyState = 2; // Fighting animation
                        if(npc.type == "swordsman"){ // Draw health bar for swordsman
                            draw.fillStyle = "red";
                            draw.fillRect( npc.x - camera.x, npc.y - camera.y-20, npc.health, 25);
                        }
                        if(npc.type == "spearman"){ 
                            draw.fillStyle = "red";
                            draw.fillRect( npc.x - camera.x, npc.y - camera.y-20, npc.health*1.2, 25);
                        }
                        if(npc.type == "archmage"){ 
                            draw.fillStyle = "red";
                            draw.fillRect( npc.x - camera.x, npc.y - camera.y-20, npc.health*1.4, 25);
                        }
                        if(npc.type == "archer"){ 
                            draw.fillStyle = "red";
                            draw.fillRect( npc.x - camera.x, npc.y - camera.y-20, npc.health*1.6, 25);
                        }
                        player.health -= .1;
                        if(player.state == "attack"){
                            npc.health -= player.attack;
                        }
                    }
                }
            }
            else{
                enemyState = 1; // Idle animation
            }
            if(npc.health <= 0){
                npc.health = 0;
                enemyState = 3; // Death animation
            }
           
            if(walkTimer >= 0){
                updateNPC(npc, npc.moveState, map2);
            }
            walkTimer--; 
            updateAndDrawEnemy(npc, enemyState);
        });

        animatePlayer(player.state);
        drawLighting();

        // draw money
        draw.fillStyle = "White";
        draw.font = "30px arial";
        draw.fillText(`$ ${player.money}`, 5, 55);
    }
    //touchingChest = false; // Reset the value so it doesnt get stuck on when the player walks away from a chest
    //touchingDoor = false;
    
    // Draw hitbox around player for debugging
    //draw.strokeRect(hitbox.x-camera.x, hitbox.y-camera.y, hitbox.width, hitbox.height);
    //draw.strokeRect(player.x-camera.x, player.y-camera.y, player.width, player.height);
    
    // draw player health bar
    draw.strokeStyle = "black";
    draw.strokeRect( 5, 5, 100, 25);
    draw.fillStyle = "red";
    draw.fillRect( 5, 5, player.health, 25);

    // dont draw the player during map change
    if(!mapChange){
        //draw.fillStyle = "red";
        //draw.fillRect(player.x-camera.x, player.y-camera.y, player.width, player.height);
        
    }
    
    // interacting with the vendor
    if(player.x <= vendor.x + vendor.width && player.x + player.width >= vendor.x && player.y <= vendor.y + vendor.height && player.y + player.height >= vendor.y){
        // Buy, sell buttons, click them open vendor inventory
        
    }

    // Inventory
    if(openInventory){
        draw.fillStyle = "white";
        draw.fillRect(70, 70, 420, 420);

        draw.fillStyle = "red";
        draw.fillRect(exitbtn.x, exitbtn.y, exitbtn.width, exitbtn.height);

        draw.fillStyle = "Black";
        draw.font = "30px arial";
        draw.fillText(`Health Potions: ${player.healthPotion}`, 75, 95);
        draw.fillText(`Mana Potions: ${player.manaPotions}`, 75, 130);
        draw.fillText(`Weapon: ${player.attack}`, 75, 165); // display weapon name and attack value
        draw.fillText("X", 495, 60);
    }

    requestAnimationFrame(gameLoop); // Loops the frames
}
gameLoop()
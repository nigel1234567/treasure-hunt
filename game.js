// Note: Bombs are left as placeholder, to work on it at a later stage of development

// Part 1: Core Features
// Declare default variables
    // Game Area
        // Level
        var level = 1
        var levelEnd = false
        var gameEnded = false

        // Loot remaining
        var lootRemaining = level + 2

        // Bombs remaining
        var bomb = 0


    // Player UI
        // Gold (default = 0)
        var gold = 1000

        // Life (default = 1)
        var life = 1

        // Shovel (default = 5 per level)
        var shovel = 5

        // Scanner (default = 0)
        var scanner = 0

        // Max inventory
        var maxInventory = 5
        var maxScanner = 1


// Create UIs
    function createUIs(level) {
        // Game UI
        // Level
        levelUI = document.getElementsByClassName("level")
        levelUI[0].innerHTML = `Level: ${level}`

        // Loot
        lootRemaining = level + 2
        lootRemainingUI = document.getElementsByClassName("loot-remaining")
        lootRemainingUI[0].innerHTML = `Loot remaining: ${lootRemaining}`

        // Bombs
        if (level >= 3) {
            bomb = 1 + 2 * (level - 3)
        } else {
            bomb = 0
        }
        bombRemainingUI = document.getElementsByClassName("bombs-remaining")
        bombRemainingUI[0].innerHTML = `Bomb remaining: ${bomb}`

        // Player UI
        // Gold
        goldUI = document.getElementsByClassName("gold")
        goldUI[0].innerHTML = `Gold: ${gold}`
        
        // Life
        lifeUI = document.getElementsByClassName("life")
        lifeUI[0].innerHTML = `Life: ${life}`

        // Shovel
        shovelUI = document.getElementsByClassName("shovel")
        shovelUI[0].innerHTML = `Shovels: ${shovel}`

        // Scanner
        scannerUI = document.getElementsByClassName("scanner")
        scannerUI[0].innerHTML = `Scanners: ${scanner}`

        // Max inventory
        maxInventoryUI = document.getElementsByClassName("max-inventory")
        maxInventoryUI[0].innerHTML = `Max shovels: ${maxInventory}`

        // Max scanner
        maxScannerUI = document.getElementsByClassName("max-scanner")
        maxScannerUI[0].innerHTML = `Max scanners: ${maxScanner}`
    }

createUIs(level)

// Loot and Bomb objects
    // Loot objects
    // Reward
    const lootReward ={
        "common": 50,
        "uncommon": 100,
        "rare": 300,
        "mythical": 1000
    };
    // Chance
    const lootChance ={
        "common": .5,
        "uncommon": .3,
        "rare": .15,
        "mythical": .05
    };

    // Create Game Grid (varies by level)
    function createLevel(level) {
    // Create cells (by level)
        // Declare gridNumber and container
        gridNumber = level + 2;
        var container = document.querySelector('.game-grid')

        // Function to makeRows
        function makeRows(rows, cols) {
            container.style.setProperty('--grid-rows', rows);
            container.style.setProperty('--grid-cols', cols);
            for (c = 0; c < (rows * cols); c++) {
                let cell = document.createElement("div");
                container.appendChild(cell).className = "grid-item";
            }
        }
        // Run function to generate grid
        makeRows(gridNumber, gridNumber)

    // Place loot
        // Function to generate array for loot
        var lootArray = []
        var lootTrue = gridNumber
        for(var i=0 ; i < (gridNumber * gridNumber) ; i++){
            if (lootTrue > 0) {
                lootArray.push(true)
                lootTrue -= 1
            } else {
                lootArray.push(false)
            }
        }

        // Generate bombs
        var bombTrue = bomb
        for(var i=0 ; i < (gridNumber * gridNumber) ; i++) {
            if (bombTrue > 0) {
                lootArray.pop(false)
                lootArray.push("bomb")
            }
        }

        // Create function to shuffle array
        function shuffle(array) {
            let currentIndex = array.length,  randomIndex;
            // While there remain elements to shuffle.
            while (currentIndex != 0) {
              // Pick a remaining element.
              randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
              // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
            return array;
        }

        // Shuffle lootArray
        shuffle(lootArray)

        // Add loot class to cells
        chosenCell = document.getElementsByClassName('grid-item')
        for (i = 0; i < (gridNumber * gridNumber); i++) {
            if (lootArray[i] == true) {
                chosenCell[i].classList.add('loot')
            } else if (lootArray[i] == "bomb") {
                chosenCell[i].classList.add('bomb')
            }
        }
    }

    // Run function to create game level
    createLevel(level)

// Gameplay mechanics
    function gameplay() {
    // Click on cell to uncover it
        for (i = 0; i < (gridNumber * gridNumber); i++) {
            chosenCell[i].addEventListener('click', function(e) {
                // If game has ended
                if (gameEnded == true) {
                    gameEnd()
                }
                // If cell is opened
                else if (e.target.className == "grid-item opened" || e.target.className == "grid-item loot opened") {
                    alert("You have already opened this cell!")
                } else if (e.target.className == "grid-item bomb") { // If player clicks a bomb
                    alert(`You have hit a bomb! You lose a life!`)
                    // Update life
                    life -= 1
                    lifeUI = document.getElementsByClassName("life")
                    lifeUI[0].innerHTML = `Life: ${life}`
                    // Update bomb
                    bomb -= 1
                    bombRemainingUI = document.getElementsByClassName("bombs-remaining")
                    bombRemainingUI[0].innerHTML = `Bomb remaining: ${bomb}`
                    e.target.style.backgroundColor = "red";
                    e.target.classList.add('opened')
                    // Check if there is still lives
                    if (life == 0) {
                        gameEnd()
                    }
                } 
                else {
                    // If still have shovels
                    if (shovel > 0) {
                        // Change selected cell color based on loot
                        // If there is loot
                        if (e.target.className == "grid-item loot") {
                            // Add rarity of loot
                            var rng = Math.random();
                            var rarity = ""
                            var reward = 0
                            if (rng <= 0.01) {
                                rarity = "mythical"
                                reward = 1000;
                                e.target.style.backgroundColor = "purple";
                            } else if (rng <= 0.11) {
                                rarity = "rare"
                                reward = 300;
                                e.target.style.backgroundColor = "blue";
                            } else if (rng <= 0.28) {
                                rarity = "uncommon"
                                reward = 100;
                                e.target.style.backgroundColor = "green";
                            } else {
                                rarity = "common"
                                reward = 50;
                                e.target.style.backgroundColor = "yellow";
                            }
                            // Alert player once they found a loot
                            alert(`You found 1 ${rarity} chest! You have gained ${reward} gold!`)
                            // Update UI for found loot
                            gold += reward
                            goldUI[0].innerHTML = `Gold: ${gold}`
                            lootRemaining -= 1;
                            lootRemainingUI[0].innerHTML = `Loot remaining: ${lootRemaining}`
                            // Update class of opened cells
                            e.target.classList.add('opened')
                        } 
                        // If there is no loot
                        else {
                            e.target.style.backgroundColor = "white";
                            // Update class of opened cells
                            e.target.classList.add('opened')
                        }
                        // Update shovelUI
                        shovel -= 1
                        shovelUI[0].innerHTML = `Shovels: ${shovel}`
                        // If no more shovels
                        if (shovel == 0) {
                            alert(`You have run out of shovels!`)
                            if (gold != 0) { // Check if player still has gold to buy new shovels
                                levelEnd = true
                            } else { 
                                gameEnd()
                            }
                        }
                        // No more loot
                        if (lootRemaining == 0) {
                            alert("You have cleared the area of loot!")
                            levelEnd = true
                        }
                    } 
                    // When player tries to click when no shovels remaining
                    else {
                        alert(`You have no more shovels remaining!`)
                    }
                    // Level end
                    if (levelEnd == true) {
                        createButtons()
                        level += 1
                    }
                }
            }, false);
        }
    }
    
    gameplay()
    

// Part 2: Level progression and shop
    // Reveal next level and shop buttons
    function createButtons() {
        // Add active class to show hidden buttons (shop and next level)
        let optionBtns = document.querySelectorAll('.option')
        for (let i = 0; i < optionBtns.length; i++) {
            optionBtns[i].className += ' active'
        }
    }

        // Hide next level and shop buttons
        function hideButtons() {
            // Add active class to show hidden buttons (shop and next level)
            let optionBtns = document.querySelectorAll('.active')
            for (let i = 0; i < optionBtns.length; i++) {
                optionBtns[i].className = optionBtns[i].className.replace(' active', '')
            }
        }

    // Create next level
    function nextLevel(level) {
        
        // Reset levelEnd status
        levelEnd = false
        // Remove child nodes
        let gameGrid = document.querySelector('.game-grid')
        while (gameGrid.firstChild) {
            gameGrid.removeChild(gameGrid.firstChild);
        }
        // Update UI
        createUIs(level)

        // Add new level
        createLevel(level)
        
        shovel = 5 // to delete
        gameplay()

        // Hide shop and next level buttons
        hideButtons()
    }

// Part 3: Create items for shop
    // Create shop screen
    shopBtn = document.querySelector('.shop')
    shopBtn.addEventListener("click", () => {
        // Declare shopScreen
        shopScreen = document.querySelector('.shop-screen')
        // If shopScreen is opened, close it
        if (shopScreen.style.zIndex == "1") {
            shopScreen.style.zIndex = "-1"
        } else {
            shopScreen.style.zIndex = "1"
        }
    })

// Create shop buy functions
let itemBtn = document.querySelectorAll('.item')
for (let i = 0; i < itemBtn.length; i++) {
    itemBtn[i].addEventListener("click", (e) => {
        // Buy shovel
        if (e.target.classList.contains("shop-shovel")) {
            // Check if enough money
            if (gold >= 10) {
                // Check if bag is full
                if (shovel == maxInventory) {
                    alert("Your bag is full!")
                } else {
                    // Successful purchase
                    alert("You bought a shovel!")
                    // Update UI
                    gold -= 10
                    goldUI[0].innerHTML = `Gold: ${gold}`
                    shovel += 1
                    shovelUI[0].innerHTML = `Shovels: ${shovel}`
                }
            } else {
                // Purchase fail
                alert("You don't have enough gold for that!")
            }
        }
        // Buy scanner
        if (e.target.classList.contains("shop-scanner")) {
            // Check if enough money
            if (gold >= 50) {
                // Check if bag is full
                if (scanner == maxScanner) {
                    alert("Your bag is full!")
                } else {
                    // Successful purchase
                    alert("You bought a scanner!")
                    // Update UI
                    gold -= 50
                    goldUI[0].innerHTML = `Gold: ${gold}`
                    scanner += 1
                    scannerUI[0].innerHTML = `Scanners: ${scanner}`
                }
            } else {
                // Purchase fail
                alert("You don't have enough gold for that!")
            }
        }
        // Buy bag
        if (e.target.classList.contains("shop-bag")) {
            // Check if enough money
            if (gold >= 300) {
                // Successful purchase
                alert("You upgraded your bag!")
                // Update UI
                gold -= 300
                goldUI[0].innerHTML = `Gold: ${gold}`
                maxInventory += 2
                maxInventoryUI[0].innerHTML = `Max shovels: ${maxInventory}`
                maxScanner += 1
                maxScannerUI[0].innerHTML = `Max scanners: ${maxScanner}`
            } else {
                // Purchase fail
                alert("You don't have enough gold for that!")
            }
        }
        // Buy heart (life)
        if (e.target.classList.contains("shop-heart")) {
            // Check if enough money
            if (gold >= 1000) {
                alert("You bought a heart!")
                // Update UI
                gold -= 1000
                goldUI[0].innerHTML = `Gold: ${gold}`
                life += 1
                lifeUI[0].innerHTML = `Life: ${life}`
            } else {
                // Purchase fail
                alert("You don't have enough gold for that!")
            }
        }
    })
}




    // Next Level Button
    nextLevelBtn = document.querySelector('.next-level')
    nextLevelBtn.addEventListener("click", () => {
        nextLevel(level) 
    })

    // Restart level
    restart = document.querySelector('.restart')
    restart.addEventListener("click", () => {
        location.reload();
    })


// Game end
function gameEnd() {
    alert(`Your game has ended. The highest level you have reached is level ${level}!`)
    gameEnded = true
}


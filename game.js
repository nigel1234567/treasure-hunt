// Note: Bombs are left as placeholder, to work on it at a later stage of development

// Stage 1: Core Features
// Declare default variables
    // Game Area
        // Level
        var level = 1
        levelUI = document.getElementsByClassName("level")
        levelUI[0].innerHTML = `Level: ${level}`
        // Loot remaining
        var lootRemaining = level + 2
        lootRemainingUI = document.getElementsByClassName("loot-remaining")
        lootRemainingUI[0].innerHTML = `Loot remaining: ${lootRemaining}`
        // Bombs remaining
        var bomb = 0
        if (level >= 3) {
            bomb = 1 + 2 * (level - 3)
        } else {
            bomb = 0
        }
        bombRemainingUI = document.getElementsByClassName("bombs-remaining")
        bombRemainingUI[0].innerHTML = `Bomb remaining: ${bomb}`

    // Player UI
        // Gold (default = 0)
        var gold = 0
        goldUI = document.getElementsByClassName("gold")
        goldUI[0].innerHTML = `Gold: ${gold}`
        // Life (default = 1)
        var life = 1
        lifeUI = document.getElementsByClassName("life")
        lifeUI[0].innerHTML = `Life: ${life}`

        // Shovel (default = 5 per level)
        var shovel = 5
        shovelUI = document.getElementsByClassName("shovel")
        shovelUI[0].innerHTML = `Shovels: ${shovel}`

        // Max inventory
        var maxInventory = 5
        maxInventoryUI = document.getElementsByClassName("max-inventory")
        maxInventoryUI[0].innerHTML = `Max shovels: ${maxInventory}`

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
        console.log(lootArray)

        // Add loot class to cells
        chosenCell = document.getElementsByClassName('grid-item')
        for (i = 0; i < (gridNumber * gridNumber); i++) {
            if (lootArray[i] == true) {
                chosenCell[i].classList.add('loot')
            }
        }
        

// Gameplay mechanics
    // Click on cell to uncover it
    for (i = 0; i < (gridNumber * gridNumber); i++) {
        chosenCell[i].addEventListener('click', function(e) {
            // If still have shovels
            if (shovel > 0) {
                // Change selected cell color based on loot
                // If there is loot
                // console.log(e.target.className == "grid-item loot")
                if (e.target.className == "grid-item loot") {
                    // Add rarity of loot
                    var rng = Math.random();
                    var rarity = ""
                    var reward = 0
                    if (rng <= 0.05) {
                        rarity = "mythical"
                        reward = 1000;
                        e.target.style.backgroundColor = "purple";
                    } else if (rng <= 0.15) {
                        rarity = "rare"
                        reward = 300;
                        e.target.style.backgroundColor = "blue";
                    } else if (rng <= 0.3) {
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
                } 
                // If there is no loot
                else {
                    e.target.style.backgroundColor = "white";
                }
                // Update shovelUI
                shovel -= 1
                shovelUI[0].innerHTML = `Shovels: ${shovel}`
                // If no more shovels
                if (shovel == 0) {
                    alert(`You have run out of shovels!`)
                    // Part 2: To create next round or gameover screen
                }
            } 
            // When player tries to click when no shovels remaining
            else {
                alert(`You have no more shovels remaining!`)
            }
            // Level end
            if (lootRemaining == 0) {
                alert("You have cleared the area of loot!")
            }
        }, false);
    }
    // Gain loot




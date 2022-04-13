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
        // Add class to cells


// Gameplay mechanics
    // Click on cell to uncover it
    chosenCell = document.getElementsByClassName('grid-item')
    for (i = 0; i < (gridNumber * gridNumber); i++) {
        chosenCell[i].addEventListener('click', function(e) {
            if (shovel > 0) {
                // Change selected cell color
                e.target.style.backgroundColor = "yellow";
                // Update shovels
                shovel -= 1
                shovelUI[0].innerHTML = `Shovels: ${shovel}`
            } else {
                alert(`You have no more shovels remaining!`)
            }

        }, false);
    }
    // Gain loot


// Game end

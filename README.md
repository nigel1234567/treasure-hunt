# Capstone Project: Treasure Hunt v1
Personal capstone project for the end of foundations for HTML, CSS and JavaScript.

# Purpose of project
To create a simple game on a website to test my knowledge and skills of developing a web app using HTML, CSS and JavaScript.

## Stages of development
Part 1: Play area and functional round.
Part 2: Level progression and shop.
Part 3: Game end conditions, bombs and new shop items (bag, scanner and heart).

# Game information
## Objective of game
Get to the highest amount of gold by the end of the highest level possible (8) with each round increasing in difficulty.

## How to play
### Gameplay
On a grid of n * n (min n = 3) number of cells, there are n number of treasure chests hidden randomly in any of the cells.
You have a limited (min: 5) number of shovels (attempts) to dig out the loot from each stage.
Each loot contains a different amount of gold, which can be used to purchase upgrades.
From level 3 onwards, bombs will start appearing at a n out of n^2 chance.

### Round end
The round ends when there are either no more loot in the area, or if there are no more shovels left.
You will proceed to each round if you still have gold or shovels left in your inventory.
Each level will increase the number of rows and columns by 1.

### Game end
Your game ends when you either run out of gold and shovels, lose your life from a bomb, or reach level 8.
Your final score is the max level you have reached.

## Level info (where level number is n)
### Number of cells
#### For each level: (n+2)^2
1: 3x3, 
2: 4x4, 
3: 5x5, 
...

### Number of loot per round (and chance of appearing per cell)
#### For each level: n+2
Every level increase by 1
1: 3 (33.3%), 
2: 4 (25%), 
3: 5 (20%)
...

### Number of bombs per round (and chance of appearing per cell)
#### Every level increase by 2
1: 0, 
2: 0, 
3: 1 (4%), 
4: 3 (8.3%), 
5: 5 (10.2%)
...

## Shop and Loots
### Loot chances
| Loot          | Chance        | Gold  |
| ------------- |:-------------:| -----:|
| Common        | 60%           | 50    |
| Uncommon      | 28%           | 100   |
| Rare          | 11%           | 300   |
| Mythical      | 1%            | 1000  |

## Shop
| Loot          | Cost          | Description                                                      |
| ------------- |:-------------:| ----------------------------------------------------------------:|
| Shovel        | 10            | To dig a selected cell                                           |
| Scanner       | 100           | Scan selected cell for loot or bombs. Adds 1 use per round       |
| Bag upgrade   | 300           | Increases max shovel by 2                                        |
| Extra Life    | 1000          | Gain extra lives                                                 |

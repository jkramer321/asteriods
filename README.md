# Asteroids Game Remake
This is a modern remake of the class **Asteroids** arcade game, originally released in 1979. The game is built using HTML, CSS, and JavaScript, providing an interactive and nostalgic experience with some added features.

## Controls
- [w]: move forward
- [a]: turn left
- [d]: turn right
- [spacebar] shoot projectile

## Features
- Difficulty Settings:
  - **Double Speed**: Increases the speed of asteroids and projectiles.
  - **Half Speed**: Reduces the speed of asteroids and projectiles.
  - **Reset Speed**: Resets the speed to the default value. 
- Dynamic Gameplay:
  - Asteroids spawn dynamically from random edges of the screen.
  - Projectile and asteroid collision detection.
- Scoring System:
  - Keep track of your score and aim to set a new high score.
  - Scores are saved locally and displated on the "Game Over" screen.
 
## Getting Started
- Prerequisites
  - A modern web browser (e.g., Chrom, Firefox).
  - No installation required; the game runs directly in the browser
 
## How to Run the Game
1. Clone the repository:
  - git clone https://github.com/jkramer321/asteroids.git
  - cd asteroids
2. Open index.html in your web browser.
3. Play game and enjoy!

## Development Details
- Canvas API: Used to render the player, projectiles, and asteroids.
- Local Storage: Saves and retrieves the high score and final score.
- Event Listeners: Handles keyboard inputs for player movement and shooting.
- Dynamic Styling:
  - Difficulty buttons adjust gameplay in real-time.
  - gameover.html styled with CSS for a clean, immersive interface.

## License
This project is licensed under the **MIT License**. See the LICENSE file for details.

## Credits
- Original game concept: Atari, 1979.
- Remake by: Jared Kramer.
- Inspired by the classic arace experience. 

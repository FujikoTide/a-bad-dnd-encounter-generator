# A (Bad) D&D Encounter Generator

#### Video Demo: <URL HERE>

#### Functional Website: [A (Bad) D&D Encounter Generator](https://a-bad-dnd-encounter-generator.netlify.app/)

## Description

This Project is a website that helps the DM to create encounters for those playing Dungeons & Dragons. It is made with vanilla Javascript, HTML and CSS, without any external libraries. It aims to be fully responsive and should have full functionality and usability on a mobile device.

### Site Functionality

#### Reset:

Refreshing the page will reset an encounter, as will clicking the 'cross' symbol button at the head of the Encounter section.

#### Dark/Light Mode:

Click the Sun/Moon button in the top right corner to switch between light and dark modes.

### Party Details

#### Adding Party Members:

You can add up to 10 players to your party, with varying levels. If you wish to add multiple players of the same level, change their level to the appropriate value by using the level input to the right of the player label, and then click the 'plus' symbol button at the head of the Party Details section. This will add players of that level to the party. The player level can be changed at any time, however this will not change a previously generated encounter.

#### Removing Party Members:

You can remove a party member by clicking the 'minus' symbol button at the head of the Party Details section.

### Encounter Settings

#### Adding a Monster:

Select the monster you wish to add to the encounter in the drop down selection and then select the quantity you wish to add of the selected monster, then click the **Add Monster** button. This will add a monster in that quantity to an encounter, empty or otherwise.

#### Encounter Difficulty:

Move the slider to select a difficulty of **Easy/Medium/Hard/Deadly**. The last position in the slider control is for **Random**. If Random is selected, the encounter genetrated will not be based on the settings in the Encounter Settings menu.

#### Fewer, Tougher Monsters:

Checking the 'Favour Fewer, Tougher Monsters' check box will mean that the encounter generated will try to pick tougher monsters in fewer numbers if possible.

#### Generate Encounter:

Click the **Generate Encounter** button to create the encounter, it will use the settings in the Encounter Settings menu, as well as taking party composition into account, unless Random has been selected on the slider.

### Encounter

Within the Encounter output, you will see a 'cross' symbol button to the right of each monster entry. Clicking this button will delete that entry from the encounter and update the experience for the encounter accordingly.

##

Play around and have fun !

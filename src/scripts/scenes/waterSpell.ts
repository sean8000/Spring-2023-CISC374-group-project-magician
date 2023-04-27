import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene';
import Inventory_Items from '../objects/Inventory_Items'


export default class waterSpell extends Phaser.Scene {
    private waterSpellScore?: Phaser.GameObjects.Text
    public blueGemsCollected: number
    public inventory!: Inventory_Items
	protected prev_scene!: string	
	
	constructor() {
		super('waterSpell')
        this.blueGemsCollected = 0
	}

    init(data: any) {
		console.log("water spell scene = ", data);
		this.inventory = data.inventory_items
		this.prev_scene = data.prev_scene
	}

	create() {	
		//making background
        const bg = this.add.image(
            this.cameras.main.width/2, this.cameras.main.height/2, 'background-waterspell');
       bg.setScale(
           this.cameras.main.width/(0.5 * bg.width), this.cameras.main.height/(0.5 * bg.height));

        //telling the location
        this.add.text(10, 40, 'Currently at Water Spell\nPress the Back Button to go to Craft\nSpell', {
            fontSize: '32px',
            color: '#ffffff'
        });

        //making buttons
        this.add.existing(new Click_Change_Scene(this, 50, 560, 'backbutton', () => {		// back button
			this.scene.start('level_1', {inventory_items: this.inventory, prev_scene: this.scene.key})
			this.scene.stop('waterSpell')
		}));

        this.add.existing(new Click_Change_Scene(this, 655, 560, 'map_marker', () => {			// create button to go to map
			this.scene.start('map', {inventory_items: this.inventory, prev_scene: this.scene.key})											
			this.scene.stop('waterSpell')
		}));

        this.add.existing(new Click_Change_Scene(this, 760, 560, 'inventory_icon', () => {		// inventory button
			this.scene.start('inventory', {inventory_items: this.inventory, prev_scene: this.scene.key})
			this.scene.stop('waterSpell')
		}));

        //telling how to make loop
        this.add.text(20, 150, 'You need to use 4 Blue Gems to make this Spell\nEnter the number of Water Spells you want', {
            fontSize: '28px',
            color: '#ffffff',
        });

        this.add.text(20,250, 'For(int i = 0; i < number; i++){\n let blueGemsCollected = blueGemsCollected - 4;\n int WaterSpell = WaterSpell + 1\n}\nreturn WaterSpell', {
            fontSize: '26px',
            color: '#ffffff',
        });
        
        this.time.delayedCall(10000, () => {
        const userInput = window.prompt('Enter the number of Water Spells you want:');
        
        // Check if the user input is not null
        if (userInput !== null) {
            // Parse the user input as an integer
            const numWaterSpells = parseInt(userInput);

            // Perform the loop based on the user input
            let waterSpell = 0;
            for (let i = 0; i < numWaterSpells; i++) {
                this.blueGemsCollected -= 4;
                waterSpell += 1;
            }
            this.blueGemsCollected = this.blueGemsCollected - numWaterSpells
            this.add.text(20, 400, `You now have ${waterSpell} Water Spells.\nThey are now in your inventory`, {
                fontSize: '28px',
                color: '#ffffff',
            });
            this.waterSpellScore?.setText('Water Loop Spell: ' + waterSpell)


        } else {
            // Handle the case where the user input is null
            console.log('User canceled input dialog');
        }

        })      

	}
    
}
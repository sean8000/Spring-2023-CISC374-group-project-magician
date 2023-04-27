import Phaser from 'phaser'
import CommonLevel from './CommonLevel'
import MainCharacter from '../objects/MainCharacter'
import Click_Change_Scene from '../objects/Click_Change_Scene'

export default class level_1 extends CommonLevel {
	private player?: MainCharacter
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys

	constructor() {
		super('level_1')
	}
  
  preload() {
		// load background image
		//this.load.image('background-level1', 'assets/background/night_forest.png');
		//this.load.image('resource1', 'assets/Icons/resource_icon.png');
		//this.load.image('wand', 'assets/Icons/newand.png')
		
	}
	create() {		
    const bg = this.add.image(
			this.cameras.main.width/2, this.cameras.main.height/2, 'background-level1')
		bg.setScale(
			this.cameras.main.width/(1.0005 * bg.width), this.cameras.main.height/(1.0005 * bg.height))

		super.createInformation()
		super.createButtons(this.scene.scene)

		this.add.text(20, 120, 'Press the Resource Icon to go to collect some\nresources', {
			fontSize: '28px',
			color: '#ffffff'
		})

		this.add.text(20, 170, 'Press the Wand Icon to go to make some spells', {
			fontSize: '28px',
			color: '#ffffff'
		})

		this.add.existing(new Click_Change_Scene(this, 50, 400, 'resource1', () => {		// resource button
			console.log("entering resource", this.inventory)
			this.scene.start('resource', {inventory_items: this.inventory, prev_scene: this.scene.key})
			this.scene.stop('level_1')
		}));

		this.add.existing(new Click_Change_Scene(this, 50, 500, 'wand', () => {		// wand button
			this.scene.start('craftSpells', {inventory_items: this.inventory, prev_scene: this.scene.key})
			this.scene.stop('level_1')
		}));


		const enemy = this.physics.add.sprite(300, 485, 'dragon');
		this.player = new MainCharacter(this, 80, 480,this.currentHealth)
		this.player.displayHealth()
		this.cursors = this.input.keyboard.createCursorKeys()

		this.player.handleEnemyCollision(this.player, enemy, 'level_1', 'combat_1', this.inventory) 			// enemy  
	}

	update() {
		//this.handleMoving();
		if (!this.player || !this.cursors) {
			return
		}
		this.player.handleMoving(this.player, this.cursors);
	}

	
}
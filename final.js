class FinalCena extends Phaser.Scene{

  constructor(){
	super("FinalCena");
  }
  
  create(){
    this.add.image(0,0,"Tfinal").setOrigin(0,0);
  }
}
class Historia extends Phaser.Scene{
  constructor(){
	super("Historia");
  }
  create(){
    this.add.image(0,0,"telaHistoria").setOrigin(0,0);
    setTimeout(()=>{
    var btnAceito = this.add.image(380, 435, "btnAceito").setScale(1.5).setOrigin(0,0);
    btnAceito.setInteractive();
    btnAceito.on("pointerdown", ()=>this.scene.start("Floresta"))
    },1500);
  }

}
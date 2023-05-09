class Floresta extends Phaser.Scene{
  constructor(){
	 super("Floresta");
  }


  create(){
    this.plataformafloresta = this.physics.add.staticGroup();
    this.plataformafloresta.create(0,570,     'plataformafloresta').setScale(2.5,1.8).setOrigin(0,0.6).refreshBody();
    //this.plataformafloresta.displayWidth =2780;
    //this.plataformafloresta.displayHeigth = 112;
    
    this.cidade = this.add.image(0,0, "floresta").setOrigin(0);
    this.cidade.displayWidth =2780;
    this.cidade.displayHeigth = 591;

    this.personagem = this.physics.add.sprite(200, 400, 'personagem', 16).setCollideWorldBounds(true)
    .setScale(1);
    
    this.personagem.canJump = true;

    // GHOSTFACE
    this.ghostface = this.physics.add.sprite(2700, 400, 'ghostface', 4.5).setCollideWorldBounds(true)
    .setScale(1);

    //ESQUELETO
    this.esqueletoflo = this.physics.add.sprite(400, 400, 'esqueletoflo', 4.5).setCollideWorldBounds(true)
    .setScale(1.5);
    
    this.controles = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.personagem, this.plataformafloresta);
    //this.physics.add.collider(this.personagem, this.ghostface);
    this.physics.add.collider(this.ghostface, this.plataformafloresta);
    this.physics.add.collider(this.esqueletoflo, this.plataformafloresta);
    
    this.physics.world.setBounds(0,0,2780,591);
    this.cameras.main.setBounds(0,0,2780,591).startFollow(this.personagem);

    this.personagem.body.setCollideWorldBounds(true);
    
  //Movimentação
  this.anims.create({
    key:'andar',
    frames: this.anims.generateFrameNumbers('personagem', {start:3, end: 5}),
    frameRate:10,
    repeat: -1
  });
  this.anims.create({
    key:'cima',
    frames: [{ key : 'personagem', frame :15}],
    frameRate:10,
    repeat: -1
  });
  this.anims.create({
    key:'baixo',
    frames: [{ key : 'personagem', frame :13}],
    frameRate:10,
    repeat: -1
  });

}
    
  update(){
    if(this.controles.left.isDown){
      this.personagem.flipX = true;
      this.personagem.setVelocityX(-200);
      this.personagem.anims.play('andar', true);
    }else
    if(this.controles.right.isDown){
      this.personagem.flipX = false;
      this.personagem.setVelocityX(1200);
      this.personagem.anims.play('andar', true);
    } else 
    if(this.controles.down.isDown){
      this.personagem.setVelocityY(300);
      this.personagem.setVelocityX(0);
      this.personagem.anims.play('baixo', true);
    }else 
    if(!this.personagem.body.touching.down && this.controles.down.isDown){
      this.personagem.setVelocityY(300).setFrame(15);
    }else{
  this.personagem.setVelocityX(0).setFrame(0);
    }
    if(!this.personagem.body.touching.down){
      this.personagem.setFrame(
        this.personagem.body.velocity.y < 0 ? 3 : 9
      )
    }
    if(this.controles.up.isDown && this.personagem.canJump && this.personagem.body.touching.down){
      this.personagem.setVelocityY(-500);
      this.personagem.canJump = false;
    }
    if(!this.controles.up.isDown && !this.personagem.canJump && !this.personagem.body.touching.down){
      this.personagem.canJump = true;
    }
  if(this.personagem.x >= this.cidade.displayWidth-100){
  this.scene.start("Cidade");
  }
  }
}
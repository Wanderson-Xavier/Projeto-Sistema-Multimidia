class Cidade extends Phaser.Scene{
  constructor(){
	 super("Cidade");
  }

  create(){
    this.cidade = this.add.image(0,0, "cidade").setOrigin(0);
    this.cidade.displayWidth = 2780;
    this.cidade.displayHeigth = 591;

    this.personagem = this.physics.add.sprite(100, 420, 'personagem', 16).setCollideWorldBounds(true)
    .setScale(1);
    
    this.personagem.canJump = true;

    // RAMBO
    this.rambo = this.physics.add.sprite(2700, 400, 'rambo', 16).setCollideWorldBounds(true)
    .setScale(1.62);
    
    this.esqueletocity = this.physics.add.sprite(400, 300, 'esqueletocity', 16).setCollideWorldBounds(true)
    .setScale(2.5);
    
    this.controles = this.input.keyboard.createCursorKeys();
    
    this.plataformas = this.physics.add.staticGroup();
    this.plataformas.create(0,560, 'plataforma').setScale(2.5,1).setOrigin(0,1).refreshBody();


    this.physics.add.collider(this.personagem, this.plataformas);
    this.physics.add.collider(this.rambo, this.plataformas);
    this.physics.add.collider(this.esqueletocity, this.plataformas);
    
    this.physics.world.setBounds(0,0,2780,591);
    this.cameras.main.setBounds(0,0,2780,591).startFollow(this.personagem);

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
      this.personagem.setVelocityX(800);
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
  this.scene.start("Cemiterio");
  }
  }
}
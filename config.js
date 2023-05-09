var game;

window.onload = function()
  {
    let gameConfig = {
      scale:{
        width:928,
        height:591,
        autoCenter:Phaser.Scale.CENTER_BOTH
      },
      physics:{
        default: 'arcade',
          arcade:{
          gravity: {y: 900},
          }
      },
      scene:[Inicial, Historia, Floresta, Cidade, Cemiterio, FinalCena]
    };
    game = new Phaser.Game(gameConfig);

    window.focus();
  }
  

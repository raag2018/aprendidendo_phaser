let juego = new Phaser.Game(370, 550, Phaser.CANVAS, 'flappy');
juego.state.add('Menu', Menu);
juego.state.add('Juego', Juego);
juego.state.add('Game', Game);
juego.state.start('Menu');
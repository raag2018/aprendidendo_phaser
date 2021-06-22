let animacion, nave, cursores, balas, bala, tiempoBala, botonDisparo, enemigos, enemigo;
let juego = new Phaser.Game(370, 550, Phaser.CANVAS, 'space');
tiempoBala = 0;
let estadoPrincipal = {
    preload: function() {
        juego.load.image('fondo', 'img/space.png');
        juego.load.image('personaje', 'img/nave.png');
        juego.load.image('laser', 'img/laser.png');
        juego.load.image('enemigos', 'img/pajaro2.png');
    },
    create: function() {
        fondoJuego = juego.add.tileSprite(0, 0, 370, 550, 'fondo');
        nave = juego.add.sprite(juego.width / 2, 500, 'personaje');
        //sistema en mecanicas para arcade
        juego.physics.startSystem(Phaser.Physics.ARCADE);
        //habilitar el personaje
        juego.physics.arcade.enable(nave);
        //para que la imagen no salga del recuadro del juego
        nave.body.collideWorldBounds = true;
        nave.anchor.setTo(0.5);
        cursores = juego.input.keyboard.createCursorKeys();
        botonDisparo = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //crear un grupo de balas
        balas = juego.add.group();
        balas.enableBody = true;
        balas.physcsBodyType = Phaser.Physics.ARCADE;
        balas.createMultiple(50, 'laser');
        balas.setAll('anchor.x', 0.5);
        balas.setAll('anchor.y', 1);
        balas.setAll('autOfBoundsKill', true);
        balas.setAll('checkWorldBounds', true);
        enemigos = juego.add.group();
        enemigos.enableBody = true;
        enemigos.physcsBodyType = Phaser.Physics.ARCADE;
        for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 7; x++) {
                enemigo = enemigos.create(x * 40, y * 20, 'enemigos');
                enemigo.anchor.setTo(0.5);
            }
            enemigos.x = 50;
            enemigos.y = 30;
            animacion = juego.add.tween(enemigos).to({ x: 100 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
            animacion.onLoop.add(descender, this);
        }
    },
    update: function() {
        if (cursores.right.isDown) {
            nave.position.x += 3;
        } else if (cursores.left.isDown) {
            nave.position.x -= 3;
        }
        if (botonDisparo.isDown) {
            if (juego.time.now > tiempoBala) {
                bala = balas.getFirstExists(false);
            }
            if (bala) {
                bala.reset(nave.x, nave.y);
                bala.body.velocity.y = -300;
                tiempoBala = juego.time.now + 20;
            }
        }
        juego.physics.arcade.overlap(balas, enemigos, colision, null, this);;
    }
}

function descender() {
    enemigos.y += 10;
}

function colision(bala, enemigo) {
    bala.kill();
    enemigo.kill();
}
juego.state.add('principal', estadoPrincipal);
juego.state.start('principal');
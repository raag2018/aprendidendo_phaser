let juego = new Phaser.Game(370, 550, Phaser.CANVAS, 'bloque_juego');
let fondoJuego, boton, flappy, pajaros, teclaDerecha, cursosres, personas, mirando;
mirando = "arriba";
let estadoPrincipal = {
    preload: function() {
        //carga todos los recursos
        juego.load.image('fondo', 'img/bg.jpeg');
        //juego.stage.backgroundColor = '#000';
        juego.load.image('pajaro', 'img/pajaro1.png');
        juego.load.image('btn', 'img/btn.png');
        juego.load.spritesheet('pajaros', 'img/pajaro.png', 43, 30);
        juego.load.spritesheet('personas', 'img/persona.png', 64, 64);
    },
    create: function() {
        //mostrar en pantalla los recursos
        fondoJuego = juego.add.tileSprite(0, 0, 370, 550, 'fondo');
        pajaros = juego.add.sprite(100, 100, 'pajaros');
        //la posicion de la imagen
        pajaros.frame = 1;
        //animacion de la imagen
        pajaros.animations.add('vuelo', [0, 1, 2], 10, true);
        flappy = juego.add.sprite(juego.width / 2, juego.height / 2, 'pajaro');
        flappy.anchor.setTo(0.5);
        //aumentar o disminuir el tamaño de la imagen 
        flappy.scale.setTo(2);
        //ANCHOR POINT = PUNTO DE APOYO
        //boton = juego.add.sprite(juego.width / 2, juego.height / 2, 'btn');
        //posicionar la imagen al centro
        //boton.anchor.setTo(0.5);
        //capturar teclado
        //teclaDerecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        cursosres = juego.input.keyboard.createCursorKeys();
        //sistema en mecanicas para arcade
        juego.physics.startSystem(Phaser.Physics.ARCADE);
        //habilitar el personaje
        juego.physics.arcade.enable(pajaros);
        //para que la imagen no salga del recuadro del juego
        pajaros.body.collideWorldBounds = true;
        //agregar animaciones
        personas = juego.add.sprite(juego.width / 2, juego.height / 2, 'personas');
        personas.anchor.setTo(1.5);
        personas.animations.add('arriba', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        personas.animations.add('derecha', [27, 28, 29, 30, 31, 32, 33, 34], 10, true);
        personas.animations.add('izquierda', [9, 10, 11, 12, 13, 14, 15, 16], 10, true);
        personas.animations.add('abajo', [18, 19, 20, 21, 22, 23, 24, 25], 10, true);
        juego.physics.arcade.enable(personas);
        personas.body.collideWorldBounds = true;
    },
    update: function() {
        //animamos el juego
        //rotar imagen
        flappy.angle += 0.2;
        //fondoJuego.tilePosition.x -= 1;
        pajaros.animations.play('vuelo');
        //verificar si la tecla esta siendo presionada
        //isDown = tecla presionada
        //isUp = tecla no esta presionada
        /*if (teclaDerecha.isDown) {
            pajaros.position.x += 1;
        }*/
        if (cursosres.right.isDown) {
            //pajaros.position.x += 1;
            personas.animations.play('derecha');
            personas.position.x += 2;
            if (mirando != "derecha") {
                mirando = "derecha";
            }
        } else if (cursosres.left.isDown) {
            personas.animations.play('izquierda');
            personas.position.x -= 2;
            if (mirando != "izquierda") {
                mirando = "izquierda";
            }
            //pajaros.position.x -= 1;
        } else if (cursosres.up.isDown) {
            //pajaros.position.y -= 1;
            personas.animations.play('arriba');
            personas.position.y -= 2;
            if (mirando != "arriba") {
                mirando = "arriba";
            }
        } else if (cursosres.down.isDown) {
            personas.animations.play('abajo');
            personas.position.y += 2;
            //pajaros.position.y += 1;
            if (mirando != "abajo") {
                mirando = "abajo";
            }
        } else {
            if (mirando != "espera") {
                personas.animations.stop();
            }
            mirando = "espera";
        }
    }
}
juego.state.add('principal', estadoPrincipal);
juego.state.start('principal');
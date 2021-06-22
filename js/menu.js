let boton, titulo, txtIniciar;
let Menu = {
    preload: function() {
        juego.stage.backgroundColor = "#fff";
        juego.load.image("boton", "img/btn.png");
    },
    create: function() {
        txtIniciar = juego.add.text(juego.width / 2, juego.height - 400, "Iniciar Juego", { font: "bold 24px sans-serif", fill: "black", align: "center" });
        txtIniciar.anchor.setTo(0.5);
        titulo = juego.add.text(juego.width / 2, juego.height - 425, "Flappy Bird", { font: "bold 30px sans-serif", fill: "black", align: "center" });
        titulo.anchor.setTo(0.5);
        boton = this.add.button(juego.width / 2, juego.height / 2, "boton", this.iniciarJuego, this);
        boton.anchor.setTo(0.5);
    },
    iniciarJuego: function() {
        this.state.start("Juego");
        //alert("Se ha hecho click");
    }
}
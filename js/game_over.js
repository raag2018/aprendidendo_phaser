let boton_over, titulo_over, txtFin, txtPuntosLabel, txtPuntosNumero;
let Game = {
    preload: function() {
        juego.stage.backgroundColor = "#fff";
        juego.load.image("boton", "img/btn.png");
    },
    create: function() {
        boton_over = this.add.button(juego.width / 2, juego.height / 2, "boton", this.iniciarJuego, this);
        boton_over.anchor.setTo(0.5);
        if (puntos == -1)
            puntos = 0;
        txtPuntosLabel = juego.add.text(juego.width / 2 - 50, juego.height - 375, "Puntos: ", { font: "bold 20px sans-serif", fill: "black", align: "center" });
        txtPuntosLabel.anchor.setTo(0.5);
        txtPuntosNumero = juego.add.text(juego.width / 2 + 50, juego.height - 375, puntos.toString(), { font: "bold 20px sans-serif", fill: "black", align: "center" });
        txtPuntosNumero.anchor.setTo(0.5);
        titulo_over = juego.add.text(juego.width / 2, juego.height - 425, "Juego Terminado", { font: "bold 30px sans-serif", fill: "black", align: "center" });
        titulo_over.anchor.setTo(0.5);


    },
    iniciarJuego: function() {
        this.state.start('Juego');
    }
}
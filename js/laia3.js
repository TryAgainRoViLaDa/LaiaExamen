var map;
var tileset;
var capa ;
var obstaculos;
var KeyA;
var KeyD;
var KeyW;
var KeyS;
var SPACE;
var KeyE;
var KeyB;
var texto;
var KeyQ;
var KeyC;
var KeyP;
var player;
var velocidd;
var enemigo;
var direccion2;
var npc;
var interaccion;
var hablar;
var pasar;
//var seguir = false;

var scoreText;
var scorecd;
var cd3;
var seguir;
var cerd;
var createEnemy;
var enemigos;
var mascota;
var npc;
var seguir;
var cambio;
var scoreText;
var disparo;
var adri;
var mensaje;
var inicio;
var texto2;
var cd2;
var hola;
var finalconversacion;
var cd;
var scorecd;
var texto;
var mascotas;
var tileSpawner;
var contador = 50;
var enemigosList;
var boomerangList;
var mascotaList;
var disparostList;
var contadorCorazones = 0;
var serpiente;
var furro;
var temporizador = 0;
var temporizadorenemigo = 0;
var vidas;
var marcavidas;
var klk;
var CoolDownHeal = 0;
var corazones;
var contadorCorazones;
var perseguir;
var KeyV;



class laia3 extends Phaser.Scene
{
	constructor()
	{
		super("laia3");
		
		var dinero=0;
		var comida=0;

		var direccion1=1;
		var direccion2=1;
		var mensaje=0;
		var scorecd=0;
		var final=20;
		var inicio=0;
		var cd3=0;
		var vidas=7;
		var finalconversacion=true;

		var velocidad=3;

		var seguir=false;
	}

	preload() {

	    this.load.image('gameTiles3', 'tileset/NatureTileset.png');

	    this.load.tilemapTiledJSON('tilemap3', 'maps/nivel3.json');

	    this.load.atlas('attack','assets/attack.png', 'assets/attack_atlas.json');

	    this.load.image('moneda', 'assets/monedas.png');

	    this.load.image('cerdo', 'assets/tenor.png');

	    this.load.image('heart', 'assets/heart.png');

	    this.load.image('panamiguel', 'assets/panamiguel.png');

	    this.load.image('laser', 'assets/disparo.png');

	    this.load.image('inventario', 'assets/inventario.png');

	    this.load.image('chuleta', 'assets/chuleta.png');

	    this.load.image('m', 'assets/m.png');

	    this.load.image('npc', 'assets/npc.png');

	    this.load.image('texto', 'assets/bafarada1.png');

	    this.load.image('texto2', 'assets/bafarada2.png');

	    this.load.image('cerd', 'assets/tenor.png');

	    this.load.image('cambio', 'assets/enemy.png');

	   	this.load.image('furro', 'assets/cerdo.png');

	   	this.load.image('serpiente', 'assets/serpiente.png');

	    //game.load.spritesheet('furro', 'assets/furrp.png', 37, 45, 18);
	}
	   
	create() {

	    map = this.make.tilemap({key:'tilemap3'});

	    tileset = map.addTilesetImage('nature','gameTiles3');

	    capa = map.createLayer(0, tileset);

	   // furro = game.add.sprite(300,200, 'furro');

	   
	   enemigosList = this.physics.add.group();
	   
	   boomerangList = this.physics.add.group();
	   
	   mascotaList = this.physics.add.group();

	   heartList = this.physics.add.group();

	   disparostList = this.physics.add.group();

	    obstaculos = map.createLayer(1, tileset);
	    obstaculos.setCollisionByProperty({colisiones: true});
	    obstaculos.setCollisionByProperty({collides: true});

	    tileSpawner = map.createFromObjects('enemigos');
	    tileSpawner.forEach(obj => 
	    {
        	//this.physics.world.enable(obj);
        	obj.setAlpha(0);
        		if(obj.name == 'enemigos')
        		{
            		this.enemigos(obj);
        		}
   		})

   		


	    KeyV=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
	    KeyA=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	    KeyD=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	    KeyW=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	    KeyS=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	    SPACE=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	    KeyE=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
	    KeyQ=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
	    KeyC=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
	    KeyB=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);

	    player = this.physics.add.sprite(20,2450, 'attack').setScale(0.07);
	    fetch("http:/ProyectoActual/recuperarDatos2.php").then(response=>{
                    if (response.ok) {
                        return response;
                    }
                }).then(async respuesta=>{
                    var texto = await respuesta.text();
                    var posiciones = texto.split(" - ");
                    player.x = posiciones[0] * 1;
                    player.y = posiciones[1] * 1;
                });
	    player.setBounce(0.2);
	    player.setCollideWorldBounds(true);

	   this.anims.create({
	        key:'attack',
	        frames: this.anims.generateFrameNames('attack', {
	            prefix: 'attack',
	            star: 0,
	            end: 10,
	        }),
	        repeat:0,
	        frameRate:15
	    });

	    velocidd = 150;
	    vidas = 5;
	   // cartera = this.add.sprite(40,50,'moneda').setScale(0.1);

	   // monedaList = this.physics.add.group();

	    //this.physics.add.overlap(player, monedaList, recolectar, null, this);

	   // dineros = this.add.text(70, 50,+ dinero, { fontSize: '20px', fill: 'white' });

	 //   cerdo1 = this.physics.add.sprite(2140,2365,'cerdo').setScale(0.2);
	   // this.physics.add.overlap(player, cerdo1, ataque1, null, this);

	  //  cerdo2 = this.physics.add.sprite(2120,2430,'cerdo').setScale(0.1);
	  //  this.physics.add.overlap(player, cerdo2, ataque2, null, this);

	    this.cameras.main.setBounds(0, 0, 1280 * 2, 1280 * 2);
	    this.physics.world.setBounds(0, 0, 1280 * 2, 1280 * 2);
	    this.cameras.main.startFollow(player, true, 0.05, 0.05);

	    //inventario = this.add.sprite(700,80, 'inventario').setScale(0.3);
	    //inventario.setScrollFactor(0);

	    cambio = this.physics.add.sprite(2500,0, 'cambio').setScale(0.1);
	    cambio.setCollideWorldBounds(true);
	    cambio.body.setSize(100, 300, 50, 25);
	    cambio.setImmovable(true);

	    /*serpiente = this.physics.add.sprite(200,2200, 'serpiente').setScale(0.1);
	    serpiente.setCollideWorldBounds(true);
	    serpiente.body.setSize(100, 300, 50, 25);
	    serpiente.setImmovable(true);*/
	    //chuleta = this.add.sprite(595,40, 'chuleta').setScale(0.3);
	    //scoreText1 = this.add.text(605, 45,+ chuleta, { fontSize: '20px', fill: 'white' });

	    this.physics.add.collider(player, obstaculos);
	    //this.physics.add.collider(player, capa);
	    //this.physics.add.collider(player, cambio);

	    //Sprites del npc
	    

	    //Colision con el final de la pantalla
	    player.setBounce(0.2);
	    player.setCollideWorldBounds(true);
	    player.body.setSize(100, 300, 50, 25);

		//Interacciones
	    this.physics.add.overlap(player, npc, this.interaccion, null, this);
	    this.physics.add.overlap(player, npc, this.hablar, null, this);
	    this.physics.add.overlap(player, npc, this.pasar, null, this);

	    this.physics.add.overlap(player, enemigosList, function(player, cerd){cerd.seguir = true; console.log(cerd)}, null, this);
	   // this.physics.add.overlap(player, cerd, this.movimientoenemigo, null, this);
	    this.physics.add.overlap(player, cambio, this.hola, null, this);
	    this.physics.add.overlap(player, serpiente, this.inventory, null, this);
	    this.physics.add.overlap(boomerangList, enemigosList, this.boom, null, this);
	    this.physics.add.overlap(mascotaList, enemigosList, this.brims, null, this);
	    this.physics.add.overlap(player, heartList, this.vida, null, this);
	    this.physics.add.overlap(player, disparostList, this.destruirplayer, null, this);
	    this.physics.add.overlap(player, heartList, this.VidaI, null, this);
        this.physics.add.overlap(player, heartList, this.consumir, null, this);

	   // console.log(cambio)

	   	inventario = this.physics.add.sprite(750,90, 'inventario');
	    inventario.setScale(0.3,0.3); 
	    inventario.setScrollFactor(0);
		inventario.huecos =new Array;
	    //this.physics.add.overlap(player, cambio, null, this);


		npc = this.physics.add.sprite(120,130, 'npc');
	    npc.setScale(0.2);
		npc.body.setSize(100, 300, 50, 25);
		npc.seguir = false;
		this.movimientonpc();

	    

	    this.physics.add.overlap(player,enemigo,perseguir, null, this);

	    direccion2 =new Phaser.Math.Vector2(1, 0);
	    direccion2.normalize();

	    this.mascotas();

	    marcavidas = this.add.text(0, 0, 'Vidas = 7' , { fontSize: '20px', fill: 'black' }).setScrollFactor(0);
	    
	    //.call(this);
	    /*chuleta1 = this.add.sprite(1730,1050, 'chuleta').setScale(0.3);
	    chuleta2 = this.add.sprite(595,40, 'chuleta').setScale(0.3);
	    chuleta3 = this.add.sprite(595,40, 'chuleta').setScale(0.3);
	    chuleta4 = this.add.sprite(595,40, 'chuleta').setScale(0.3);*/

	   /* */
		this.physics.add.collider(enemigosList, obstaculos);
		this.physics.add.collider(heartList, obstaculos);
		this.physics.add.collider(mascotaList, obstaculos);
	    
	}

	update()
	{
		if (temporizador > 0) 
		{
			temporizador--;
		}

		Phaser.Actions.Call(disparostList.getChildren(), function(a) {
			if (a.temporizadorenemigo <= 0) 
			{
				a.destroy();
				a.temporizadorenemigo = 1;
			}
			a.temporizadorenemigo--;
		})

	   if(cd>0)
	    {
	        cd=cd-1;
	    }

	    if(cd3==1) 
	    {
	        scorecd=scorecd-1;
	    } 

	    if (contador > 0) 
   		{
       		contador--;
   		}

	    if (player.move == true) 
	    {
	    	var mover = mascota.huecos.pop();
	    	mover.setTo(player.x, player.y);

	    	mascota.huecos.unshift(mover);

	    	mascota.x = mascota.huecos[15].x;
	    	mascota.y = mascota.huecos[15].y + 15;
	    }
	    player.move = false; 

	    if (KeyA.isDown )
	    {
	        player.setVelocityX(-200);
	        player.move = true;
	        player.mirar = 'left';
	    }
	    else if(KeyD.isDown)
	    {
	        player.setVelocityX(200);
	        player.move = true;
	        player.mirar = 'right';
	    }
	    else
	    {
	        player.setVelocityX(0);
	    }

	    if (KeyW.isDown)
	    {
	        player.setVelocityY(-200);
	        player.move = true;
	        player.mirar = 'up';
	    }
	    else if (KeyS.isDown)
	    {
	        player.setVelocityY(200);
	        player.move = true;
	        player.mirar = 'down';
	    }
	    else
	    {
	        player.setVelocityY(0);
	    }

	    if (KeyC.isDown)
	    {
	        this.mascotita();
	    }


	    if (KeyQ.isDown && temporizador == 0)
	    {
	    	this.basico();
	    	temporizador = 400;
	    	//ataque2.call(this); 
	    }

	    if (SPACE.isDown && finalconversacion==false)
	    {
	        final=final-1;
	        if (SPACE.isDown && final<=0 )
	        {
	            this.destruir();
	            final=10;
	        }
	    } 

	   //movercerdo();
	   //girar();
	   //movercerdo2();
	   //girar2();
	   //this.atacar();
	   //this.hablar();
	   //this.hola();
	   	this.hablar();
		this.pasar();
		this.updateDatos();
		this.interaccion();
		this.consumir();
		this.movimientoenemigo();
		this.movimientonpc();
		this.updateboom();
	    
	}



	updateboom()
	{
		Phaser.Actions.Call(mascotaList.getChildren(), function(b){
			if (b.body.velocity.x == 0 && b.body.velocity.y == 0) 
			{
				b.destroy();
			}
		})
	}

	crearpowerup()
	{
		heart = heartList.create(enemigo.x, enemigo.y, 'heart');
    	heart.setScale(0.1,0.1);
	}

	movimientonpc()
	{
		if (npc.seguir == true) 
            {
            	npc.direccion = new Phaser.Math.Vector2(player.x-npc.x,player.y-npc.y); 
                npc.setVelocityX(velocidad * npc.direccion.x/2);
                npc.setVelocityY(velocidad * npc.direccion.y/2);
            }
	}
	

	movimientoenemigo()
	{
		//console.log('hola');
		for (var i = 0; i < enemigosList.getChildren().length; i++) 
        {   
            var enemigos = enemigosList.getChildren()[i];
            if (enemigos.seguir == true) 
            {
            	enemigos.direccion = new Phaser.Math.Vector2(player.x-enemigos.x,player.y-enemigos.y); 
                enemigos.setVelocityX(velocidad * enemigos.direccion.x/2);
                enemigos.setVelocityY(velocidad * enemigos.direccion.y/2);
               for(i = 0; i < enemigosList.getChildren().length; i++)
        		{
            		var enemicdis = disparostList.create(enemigos.x, enemigos.y, 'm');
            		enemicdis.setScale(0.3,0.3);
            		enemicdis.angle = 360/8 * i;
					enemicdis.direccio =new Phaser.Math.Vector2(Math.cos(enemicdis.angle * Math.PI/180), Math.sin(enemicdis.angle * Math.PI/180));
            		enemicdis.direccio.normalize(); 
            		enemicdis.temporizadorenemigo = 0;           		
            	}
        	}   
		}
		
	}



	VidaI(objeto1, objeto2)
	{
		 /*for (var i = 0 ; i < 4; i++) 
        {
            inventario.huecos[i] = new Object;
            inventario.huecos[i].y = inventario.y - 25;
            inventario.huecos[i].x = (inventario.x - 70) + 12 * i;
        }*/

        objeto2.x = (inventario.x - 115) + 12;
        objeto2.y = inventario.y - 35;
        objeto2.setScrollFactor(0);
        heart = true;

        if (contadorCorazones == 0) 
        {
            corazones = this.add.text((inventario.x - 115) + 23, inventario.y - 35, '0', { fontSize: '20px', fill: 'black' }).setScrollFactor(0);
            contadorCorazones++;
            corazones = corazones.setText('' +contadorCorazones);
        }
        else if (contadorCorazones >= 0) 
        {
            contadorCorazones++;
            corazones = corazones.setText('' +contadorCorazones);
        }
        //objeto2.x = inventario.huecos[0].x;
        //objeto2.y = inventario.huecos[0].y;
	}

	consumir(objeto1, objeto2)
	{
		if (KeyV.isDown && heartList.getLength() > 0 && CoolDownHeal <= 0)
        {
            heartList.remove(heartList.getChildren()[heartList.getLength() - 1], true, true);
            vidas = vidas + 3;
            marcavidas = marcavidas.setText('Vidas = ' + vidas);
            contadorCorazones--;
            corazones = corazones.setText('' +contadorCorazones);
            CoolDownHeal = 30;
            console.log(heartList.getLength());

            if (contadorCorazones == 0) 
            {
                corazones.destroy();
                contadorCorazones = 0;
            }
        }       
	}

	boom(disparo, enemigo)
	{
		enemigo.disableBody(true, true);
		enemigo.destroy();    
        
        heart = heartList.create(enemigo.x, enemigo.y, 'heart');
    	heart.setScale(0.1,0.1);

       	marcavidas = marcavidas.setText('Vidas = ' + vidas);
    	
   	// vidas.setText('Vidas: '+ vidas);
	}

	brims(disparo, enemigo)
	{
		enemigo.disableBody(true, true);
		enemigo.destroy();    

   		if (vidas <= 0) 
    	{
        	player.destroy();
    	}
    	marcavidas = marcavidas.setText('Vidas = ' + vidas);
	}

	vida(player, heart)
	{
			heart.x = (inventario.x - 115) + 12;
			heart.y = inventario.y - 35;
			heart.setScrollFactor(0);

			if (KeyB.isDown )
		    {
		    	heart.destroy();
		    	//ataque2.call(this);
		    }
	}

	inventory(player, serpiente)
	{
		//while(player != serpiente)
		//{
			serpiente.x = (inventario.x - 115) + 12;
			serpiente.y = inventario.y - 35;
			serpiente.setScrollFactor(0);

			if (KeyB.isDown )
		    {
		    	serpiente.destroy();
		    	//ataque2.call(this);
		    }
		//}

		//this.klk();

	}	

	hola()
	{
		//console.log(p);
		/*this.input.once('inventario');
	   	this.scene.pause('game');
	    this.scene.launch('inventario');
	    this.scene.start('inventario');*/
	    Phaser.Scene.call(this, { key: 'inventario', active: true });	   

        this.scene.transition({ target: 'inventario', duration: 2000 });

       
	}

	basico() 
	{
		//player.play('attack');

		disparo = boomerangList.create(player.x, player.y, 'm');
	    disparo.setScale(0.1,0.1);
	    /*disparo.setVelocityX(1000);
	    setTimeout(function() {disparo.setVelocityX(-1000)}, 1000);*/

	    if (player.mirar == 'right') 
	    {
	    	disparo.setVelocityX(1000);
	    	setTimeout(function() {disparo.setVelocityX(-1000)}, 500);
	    }
	    else if(player.mirar == 'up')
	    {
	    	disparo.setVelocityY(-1000);
	    	setTimeout(function() {disparo.setVelocityY(1000)}, 500);
	    }
	    else if (player.mirar == 'left') 
	    {
	    	disparo.setVelocityX(-1000);
	    	setTimeout(function() {disparo.setVelocityX(1000)}, 500);
	    }
	    else if (player.mirar == 'down') 
	    {
	    	disparo.setVelocityY(1000);
	    	setTimeout(function() {disparo.setVelocityY(-1000)}, 500);
	    }
	}

	mascotita()
	{
		var mirar;
	    disparo = mascotaList.create(mascota.x, mascota.y, 'laser');
	    disparo.setScale(0.1,0.1);

	    if (player.mirar == 'right') 
	    {
	    	disparo.setVelocityX(1000);
	    }
	    else if(player.mirar == 'up')
	    {
	    	disparo.setVelocityY(-1000);
	    }
	    else if (player.mirar == 'left') 
	    {
	    	disparo.setVelocityX(-1000);
	    }
	    else if (player.mirar == 'down') 
	    {
	    	disparo.setVelocityY(1000);
	    }

	    
	}

	mascotas()
	{
		mascota = this.add.sprite(player.x, player.y, 'panamiguel');
	    mascota.setScale(0.1,0.1);

	    mascota.huecos =new Array;
	    for (var i = 0 ; i < 16; i++) 
	    {
	    	mascota.huecos[i] =new Phaser.Geom.Point(player.x, player.y);
	    }
	}

	enemigos(obj)
	{
		//console.log('hola');
		enemigo = enemigosList.create(obj.x, obj.y,'cerd').setScale(0.1);
	    enemigo.body.setSize(1000,1000);
	    enemigo.seguir = false;
	    //npc.seguir = false;
	}

	//Funcion para iniciar conversación
	hablar()
	{
	    if(KeyE.isDown && cd==0 && mensaje==0 && inicio==0)
	    {
	        texto = this.physics.add.sprite(npc.x+50, npc.y-100, 'texto');
	        texto.setScale(0.3);
	        cd=100;
	        mensaje=1;
	        inicio=1;
	        npc.seguir = true;
	    }
	}

	//Funcion para pasar de frase
	pasar()    
	{
	    if(SPACE.isDown && mensaje==1)
	    {
	        texto.destroy();
	        scoreText.destroy();
	        texto2 = this.physics.add.sprite(npc.x+50, npc.y-100, 'texto2');
	        texto2.setScale(0.3);
	        cd2=200;
	        mensaje=0;
	        finalconversacion=false;
	    }   
	}

	//Funcion para que aparezca el texto de ayuda 
	interaccion()
	{
	    if(scorecd<=0)
	    {
	        scoreText = this.add.text(npc.x-220, npc.y + 50, 'Pulsa E para hablar y SPACE para continuar', { fontSize: '20px', fill: 'white' });
	        scorecd=100;
	        cd3=0;
	    }
	}

	//Funcion para eliminar cualquier texto
	destruir()
	{ 
	    scoreText.destroy();
	    texto2.destroy();
	    inicio=0;
	    cd3=1;
	    finalconversacion=true;
	}

	seguir()
	{
	   seguir=true;
	   this.movimientoenemigo();
	   this.movimientonpc();
	}

	updateDatos()
    {
        if (KeyP.isDown) 
        {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http:/ProyectoActual/insertarDatos.php", true);
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            //xhr.open("GET", "fichero.php", true);
            xhr.onreadystatechange=function()
            {
                if (xhr.readyState==4 && xhr.status==200) 
                {
                    //var response=JSON.parse(this.responseText);
                    //console.log(this.responseText);
                }
            }
            xhr.send("posX="+player.x+"&posY="+player.y);
            //xhr.send();
            //header("location:web/index.html");
            //window.location.href = window.location.href + "?w1=" + this.player.x + "&w2=" + this.player.y;
        }
    }
}
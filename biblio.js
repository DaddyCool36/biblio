// un livre contient une couleur, des dimensions et un titre.
var Livre = function(){
	this.couleur = {"teinte":0, "saturation":0, "luminosite":50};
	this.dimensions = {"hauteur":10, "largeur":10, "epaisseur":10};
	this.titre = "Nouveau livre";
	this.position = {"x":0, "y":0};
	
	// coloration du livre : une couleur aléatoire
	this.colorer = function() {
		var teinte = Math.floor((Math.random()*360)+0);
		var saturation = Math.floor((Math.random()*70)+30);
		var luminosite = Math.floor((Math.random()*50)+20);
		this.couleur = {"teinte":teinte, "saturation":saturation, "luminosite":luminosite};
	};
	
	// dessin du livre
	this.draw = function (ctx) {
	
		var degrade = ctx.createLinearGradient(this.position.x, this.position.y, this.position.x + this.dimensions.epaisseur, this.position.y);
		degrade.addColorStop(0, "hsl(" + this.couleur.teinte + ", " + (this.couleur.saturation + 10) + "%, " + (this.couleur.luminosite + 10) + "%)");
		degrade.addColorStop(1, "hsl(" + this.couleur.teinte + ", " + (this.couleur.saturation - 10) + "%, " + (this.couleur.luminosite - 20) + "%)");

		ctx.fillStyle = degrade;

		ctx.fillRect(this.position.x, this.position.y, this.dimensions.epaisseur, -this.dimensions.hauteur);

        // etiquettes
        let typeEtiquette = Math.floor(Math.random()*4);

        ctx.fillStyle = "rgba(255,255,255,0.5)";
        let marge = 3;

        switch (typeEtiquette) {
            case 0:
                ctx.fillRect(this.position.x + marge, this.position.y -5, this.dimensions.epaisseur - (2 * marge), -this.dimensions.hauteur + 10);
                break;
        
            case 1:
                ctx.fillRect(this.position.x + marge, this.position.y -3, this.dimensions.epaisseur - (2 * marge), -this.dimensions.hauteur + 20);
                ctx.fillRect(this.position.x + marge, this.position.y - this.dimensions.hauteur + marge, this.dimensions.epaisseur - (2 * marge), 10);
                break;
            case 2:
                ctx.fillRect(this.position.x + marge, this.position.y - 8, this.dimensions.epaisseur - (2 * marge), -this.dimensions.hauteur + 25);
                ctx.fillRect(this.position.x + marge, this.position.y - this.dimensions.hauteur + marge, this.dimensions.epaisseur - (2 * marge), 3);
                break;
            case 3:
                ctx.fillRect(this.position.x + marge, this.position.y - this.dimensions.hauteur + marge, this.dimensions.epaisseur - (2 * marge), 3);
                ctx.fillRect(this.position.x + marge, this.position.y - 12, this.dimensions.epaisseur - (2 * marge), -this.dimensions.hauteur + 25);
                ctx.fillRect(this.position.x + marge, this.position.y - marge, this.dimensions.epaisseur - (2 * marge), - 5);
                break;
            default:
                break;
        }
	};
	
};

// la bibliothèque
var Bibliotheque = function() {
	this.couleur = {"teinte":20, "saturation":40, "luminosite":40};
	this.dimensions = {"largeur":400, "epaisseur":8};
	this.nbEtageres = 1;
	this.hauteurEtagere = 80;
	this.pos = {"x" : 10, "y" : 10};
	
	// dessin de la bibliotheque
	this.draw = function (ctx, posX, posY) {
	
		ctx.lineWidth = this.dimensions.epaisseur;
		ctx.strokeStyle = "hsl(" + this.couleur.teinte + ", " + (this.couleur.saturation) + "%, " + (this.couleur.luminosite) + "%)";

		// les piliers
		ctx.moveTo(this.pos.x, this.pos.y);
		ctx.lineTo(this.pos.x, this.pos.y + (this.nbEtageres * this.hauteurEtagere) + 10);
		ctx.moveTo(this.pos.x + this.dimensions.largeur, this.pos.y);
		ctx.lineTo(this.pos.x + this.dimensions.largeur, this.pos.y + (this.nbEtageres * this.hauteurEtagere) + 10);
		//ctx.stroke();
		
		// les etageres
		for (var i = 1 ; i <= this.nbEtageres ; i ++) {
			ctx.moveTo(posX, posY + (i * this.hauteurEtagere));
			ctx.lineTo(posX + this.dimensions.largeur, posY + (i * this.hauteurEtagere));
		}
		ctx.stroke();
	};
	
	this.ajouterEtagere = function(ctx) {
	
		this.nbEtageres ++;
		
		ctx.lineWidth = this.dimensions.epaisseur;
		ctx.strokeStyle = "hsl(" + this.couleur.teinte + ", " + (this.couleur.saturation) + "%, " + (this.couleur.luminosite) + "%)";
		
		// les etageres
		ctx.moveTo(this.pos.x, this.pos.y + (this.nbEtageres * this.hauteurEtagere));
		ctx.lineTo(this.pos.x + this.dimensions.largeur, this.pos.y + (this.nbEtageres * this.hauteurEtagere));
		
		// les piliers
		ctx.moveTo(this.pos.x, this.pos.y);
		ctx.lineTo(this.pos.x, this.pos.y + (this.nbEtageres * this.hauteurEtagere) + 10);
		ctx.moveTo(this.pos.x + this.dimensions.largeur, this.pos.y);
		ctx.lineTo(this.pos.x + this.dimensions.largeur, this.pos.y + (this.nbEtageres * this.hauteurEtagere) + 10);
		
		ctx.stroke();

	};
	
	// dessin des livres posés sur les étagères
	this.poserLivres = function(ctx, posX, posY, tabLivres) {
		var posXDepart = posX;
		posX += Math.floor(this.dimensions.epaisseur / 2);
		
		
		for (var i in tabLivres) {
			// s'il y a trop de livres pour l'étagère, on descend d'une étagère
			if (posX + tabLivres[i].dimensions.epaisseur > posXDepart + this.dimensions.largeur - Math.floor(this.dimensions.epaisseur)) {
				posX = posXDepart + Math.floor(this.dimensions.epaisseur / 2);
				posY += this.hauteurEtagere;
				// dessin d'une étagère en plus
				this.ajouterEtagere(ctx);
				
			}
			tabLivres[i].position.x = posX;
			tabLivres[i].position.y = posY + this.hauteurEtagere - Math.floor(this.dimensions.epaisseur / 2);
			tabLivres[i].draw(ctx);
			posX += tabLivres[i].dimensions.epaisseur;
		};
		
		
	}
}

// génération de livres puis insertion en tableau.
var genererLivres = function (nbLivres) {
	var tabLivres = new Array();
	
	for (var i = 0 ; i < nbLivres ; i ++ ) {
		var unLivre = new Livre();
		unLivre.colorer();
		unLivre.dimensions.hauteur = Math.floor((Math.random()*30)+30);
		unLivre.dimensions.largeur = Math.floor((Math.random()*50)+20);
		unLivre.dimensions.epaisseur = Math.floor((Math.random()*15)+10);
		tabLivres.push(unLivre);
	}
	return tabLivres;
};



var MasterCanvas = function () {

    var canvas = document.getElementById('mon_canvas');
        if(!canvas)
        {
            alert("Impossible de récupérer le canvas");
            return;
        }

    var ctx = canvas.getContext('2d');
        if(!ctx)
        {
            alert("Impossible de récupérer le context du canvas");
            return;
        }

	// tableau qui contiendra tous les livres
	var tabLivres = genererLivres(200);
	
	var posX = 10;
	var posY = 10;
	
	var biblio = new Bibliotheque();
	biblio.draw(ctx, posX, posY);
	
	biblio.poserLivres(ctx, posX, posY, tabLivres);
	
	

	

}





function changerCouleur()  {
	var teinte = Math.floor((Math.random()*360)+0);
	var saturation = Math.floor((Math.random()*70)+30);
	var luminosite = Math.floor((Math.random()*50)+20);
	var couleur = {"teinte":teinte, "saturation":saturation, "luminosite":luminosite};
	
	return couleur;
}

function degraderCouleur(contexte, xSource, ySource, xDestination, yDestination, couleur) {
	var degrade = contexte.createLinearGradient(xSource, ySource, xDestination, yDestination);
	degrade.addColorStop(0, "hsl(" + couleur["teinte"] + ", " + (couleur["saturation"] + 1) + "%, " + (couleur["luminosite"] + 10) + "%)");
	degrade.addColorStop(1, "hsl(" + couleur["teinte"] + ", " + (couleur["saturation"] - 1) + "%, " + (couleur["luminosite"] - 20) + "%)");

	return degrade;
}

window.onload = function()
{
	var master = new MasterCanvas();
	

};
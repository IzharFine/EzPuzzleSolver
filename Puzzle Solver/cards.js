class Card {
    
    constructor(id, top, right, bottom, left){
        this.id=id;
        this.top=top;
        this.right=right;
        this.bottom=bottom;
        this.left=left;
        this.spins=0;
        this.type;
        this.domObj=this.buildDomObject();
        this.board = board;
    }

    spin(){
        let temp = this.right;
        this.right=this.top;
        this.top=this.left;
        this.left=this.bottom;
        this.bottom=temp;
        this.spins++;
        this.spins %= 4;
        this.rotateCard();
    }

    buildDomObject(){
        let card = document.createElement('div');
        let cardCorner = document.createElement('span');
        cardCorner.className = 'ez-top-card-corner';
        cardCorner.textContent = this.top;
        card.appendChild(cardCorner);
        cardCorner = document.createElement('span');
        cardCorner.className = 'ez-left-card-corner';
        cardCorner.textContent = this.left;
        card.appendChild(cardCorner);
        cardCorner = document.createElement('span');
        cardCorner.className = 'ez-right-card-corner';
        cardCorner.textContent = this.right;
        card.appendChild(cardCorner);
        cardCorner = document.createElement('span');
        cardCorner.className = 'ez-bottom-card-corner';
        cardCorner.textContent = this.bottom;
        card.appendChild(cardCorner);
        card.className = 'ez-card';
        return card;
    }

    rotateCard(){
        setTimeout(() => {
            if(this.domObj.style.transform){
                let deg = this.domObj.style.transform.split("rotateZ(")[1].split("deg)")[0]*1+90;
                this.domObj.style.transform = "rotateZ(" + deg + "deg)";
            }
            else{
                this.domObj.style.transform = "rotateZ(90deg)";
            }
        }, 0);
    }
}
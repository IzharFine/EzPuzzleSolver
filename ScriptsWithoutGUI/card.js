class Card {
    
    constructor(id, top, right, bottom, left){
        this.id=id;
        this.top=top;
        this.right=right;
        this.bottom=bottom;
        this.left=left;
        this.spins=0;
        this.type;
    }

    spin(){
        let temp = this.right;
        this.right=this.top;
        this.top=this.left;
        this.left=this.bottom;
        this.bottom=temp;
        this.spins++;
        this.spins %= 4;
    }
}

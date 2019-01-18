class Board {
    constructor(speedTime){
        this.board=[];
        this.regularcards=[];
        this.sidecards=[];
        this.cornercards=[];
        this.size=0;
        this.length=0;
        this.max=0;
        this.cardsBeenHere=[];
        this.speedTime = speedTime || 0;
    }

 

    insertCards(cards){
        let cardsArr = cards.split(';');
        for(let i=0 ; i < cardsArr.length ; i++){
            let tempcard = cardsArr[i].replace("["," ").replace("]","").split(", ");
            let counter=0;
            for(let y=1 ; y <=4 ; y++){
                if(tempcard[y]=="0")
                    counter++;
            }
            let card = new Card(tempcard[0].trim(),tempcard[1],tempcard[2],tempcard[3],tempcard[4]);
            switch(counter){
                case 0:
                    card.type=CardType.REGULAR;
                    this.regularcards.push(card);
                break;
                case 1:
                    card.type=CardType.SIDE;
                    this.sidecards.push(card);
                break;
                case 2:
                    card.type=CardType.CORNER;
                    this.cornercards.push(card);
                break;
            }
        }
        this.size=Math.sqrt(cardsArr.length);
        this.length=cardsArr.length;
    }

    orderCards(position){
        setTimeout(()=>{
            if(this.max<this.board.length)
                this.max=this.board.length;
            console.log("[Currect Length]:" + this.board.length + " [Currect Recored]:" + this.max);
            this.reverseFlag=false;
        
            if(this.regularcards.length == 0 && this.cornercards.length == 0 && this.sidecards.length == 0)
                return this.board;
            
            if(this.board[position]!=undefined){
                let outputBoard = this.printSolution(this.board);
                for(let i=0 ; i < this.cardsBeenHere.length ; i++){
                    if(outputBoard == this.cardsBeenHere[i]){
                        this.reverseFlag=true;
                        break;
                    }
                }
                if(this.reverseFlag!=true){
                    this.cardsBeenHere.push(this.printSolution(this.board))
                }
                else{
                    console.log("Reverse ON!");
                    this.reverseFlag=true;
                }
                let card = this.board.pop();
                document.getElementById('ez-board').removeChild(card.domObj);
                switch(card.type){
                    case 0:
                        this.regularcards.push(card);
                    break;
                    case 1:
                        this.sidecards.push(card);
                    break;
                    case 2:
                        this.cornercards.push(card);
                    break;
                }
            }
            if(this.reverseFlag){
                this.orderCards(--position);
            }
            else{
            let card;
            if(this.isCorner(position)){ // CORNER CARDS
                var foundFlag = false;
                for(let i=0;i<this.cornercards.length;i++){
                    card = this.cornercards[i];
                    document.getElementById('ez-board').appendChild(card.domObj);
                    if(position==0){ // Check left corners.
                        for(var y = 0 ; y < 4 ; y++){
                        if(card.top==0 && card.left ==0){
                            this.board.push(card);
                            this.cornercards.splice(i,1);
                            foundFlag=true;
                            break;
                        }
                        else
                            card.spin();
                    }
                    }
                    else if(position==this.size-1){ // Check top right corners and card before.
                        for(var y = 0 ; y < 4 ; y++){
                            if(card.top==0 && card.right ==0 && this.board[position-1].right == card.left){
                                this.board.push(card);
                                this.cornercards.splice(i,1);
                                foundFlag=true;
                                break;
                            }
                            else
                                card.spin();
                        }
                    }
                    else if(position%this.size==0){ // Check left corners and card above
                        for(var y = 0 ; y < 4 ; y++){
                            if(card.left==0 && card.bottom ==0 && this.board[position-this.size].bottom == card.top){
                                this.board.push(card);
                                this.cornercards.splice(i,1);
                                foundFlag=true;
                                break;
                            }
                            else
                                card.spin();
                        }
                    }
                    else{ // Check bottom right corners, card before and card above.
                        for(var y = 0 ; y < 4 ; y++){
                            if(card.right==0 && card.bottom ==0 && this.board[position-this.size].bottom == card.top && this.board[position-1].right == card.left){
                                this.board.push(card);
                                this.cornercards.splice(i,1);
                                foundFlag=true;
                                break;
                            }
                            else
                                card.spin();
                        }
                    }
                    if(foundFlag){
                        this.orderCards(++position);
                        break;
                    }
                    else if(i == this.cornercards.length-1){
                        document.getElementById('ez-board').removeChild(card.domObj);
                        this.orderCards(--position);
                        break;
                    }
                    else{
                        document.getElementById('ez-board').removeChild(card.domObj);
                    }
                }
            }
            else if(this.isSide(position)){ // SIDE CARDS
                var foundFlag = false;
                for(let i=0;i<this.sidecards.length ;i++){
                    card = this.sidecards[i];
                    document.getElementById('ez-board').appendChild(card.domObj);
                    if(position<this.size-1){ // Check only top side and card before.
                        for(var y = 0 ; y < 4 ; y++){
                            if(card.top == 0 && this.board[position-1].right == card.left){
                                this.board.push(card);
                                this.sidecards.splice(i,1);
                                foundFlag=true;
                                break;
                            }
                            else
                                card.spin();
                        }
                    }
                    else if(position%this.size==0){// Check only left side and card above.
                        for(var y = 0 ; y < 4 ; y++){
                            if(card.left == 0 && this.board[position-this.size].bottom == card.top){
                                this.board.push(card);
                                this.sidecards.splice(i,1);
                                foundFlag=true;
                                break;
                            }
                            else
                                card.spin();
                        }
                    }
                    else if(position%this.size == this.size-1){ // Check only right side, card before and card above.
                        for(var y = 0 ; y < 4 ; y++){
                            if(card.right == 0 && this.board[position-this.size].bottom == card.top && this.board[position-1].right == card.left){
                                this.board.push(card);
                                this.sidecards.splice(i,1);
                                foundFlag=true;
                                break;
                            }
                            else
                                card.spin();
                        }
                    }
                    else{ // Check only bottom side, card before and card above.
                        for(var y = 0 ; y < 4 ; y++){
                            if(card.bottom == 0 && this.board[position-this.size].bottom == card.top && this.board[position-1].right == card.left){
                                this.board.push(card);
                                this.sidecards.splice(i,1);
                                foundFlag=true;
                                break;
                            }
                            else
                                card.spin();
                        }
                    }
                    if(foundFlag){
                        this.orderCards(++position);
                        break;
                    }
                    else if(i == this.sidecards.length-1){
                        document.getElementById('ez-board').removeChild(card.domObj);
                        this.orderCards(--position);
                        break;
                    }
                    else{
                        document.getElementById('ez-board').removeChild(card.domObj);
                    }
                }
            }
            else{ // REGULAR CARDS
                var foundFlag = false;
                for(let i=0 ; i<this.regularcards.length ; i++){ // Check before and above
                    card = this.regularcards[i];
                    document.getElementById('ez-board').appendChild(card.domObj);
                    for(var y = 0 ; y < 4 ; y++){
                        if(this.board[position-this.size].bottom == card.top && this.board[position-1].right == card.left){
                            this.board.push(card);
                            this.regularcards.splice(i,1);
                            foundFlag=true;
                            break;
                        }
                        else
                            card.spin();
                    }
                    if(foundFlag){
                        this.orderCards(++position);
                        break;
                    }
                    else if(i == this.regularcards.length-1){
                        document.getElementById('ez-board').removeChild(card.domObj);
                        this.orderCards(--position);
                        break;
                    }
                    else{
                        document.getElementById('ez-board').removeChild(card.domObj);
                    }
                }
            }
        }},this.speedTime)
    }


    isCorner(index){
        if(index == 0 || index == this.length-1 || index == this.size-1 || index == this.length-this.size)
            return true;
        return false;
    }
    
    isSide(index){
        if(index%this.size == 0 || index%this.size == this.size-1 || index <= this.size || index >= this.length-this.size)
            return true;
        return false;
    }

    printSolution(){
        let output="";
        this.board.forEach(function(card){
            output+= card.id + "," + card.spins + "; ";
        });
        return output;
    }

}


const CardType = {
    REGULAR: 0,
    SIDE: 1,
    CORNER: 2
};

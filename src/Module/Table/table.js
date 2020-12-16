import { makeAutoObservable } from "mobx";
import { Card } from "../Card/card";

export class Table {
    id = 0;
    name = '';
    cards = [];
    maxTableIndex = 0;

    constructor( table ){

        Object.assign(this, table);

        makeAutoObservable( this );
    }

    addCard(name){
        this.cards.push(
            new Card({tableId: this.id, index: this.maxTableIndex,name})
        );
        this.maxTableIndex++;
    }
    addCardAtIndex(name, index){
        this.cards.splice(index, 0, new Card({tableId: this.id, index:this.maxTableIndex,name}));
        
        this.updateCardsIndexes(index, true);

        this.maxTableIndex++;
    }
    deleteCard(card, fromCard){
        const index = card?this.cards.indexOf(this.cards.find(el => el.id == card.id)):fromCard.index;
        this.cards.splice(index, 1);
        this.updateCardsIndexes(index !== -1?index: 0, false);

        this.maxTableIndex--;
    }
    updateCardsIndexes(index, increase){
        let isFirstСoincidence = true;

        this.cards = this.cards.map(el => {
            if(el.index >= index){
                if(isFirstСoincidence){
                    isFirstСoincidence = false;
                    return Object.assign(el, {index});
                }
                else{
                    return Object.assign(el, {index: increase?index + 1: index - 1});
                }
            }
            return el;
        })
    }
}
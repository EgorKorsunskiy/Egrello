import { makeAutoObservable } from "mobx"
import { Board } from "../Module/Board";

export class BoardState {
    boards = [];
    availableColors = ['rgb(0, 121, 191)', 'rgb(176, 70, 50)','rgb(81, 152, 57)', 'rgb(137, 96, 158)', 'rgb(205, 90, 145)', 'rgb(210, 144, 52)']
    currentColor = this.defaultColor;

    constructor(){
        makeAutoObservable( this );
    }

    deleteBoard(BoardId){
        const index = this.boards.findIndex(board => board.id === BoardId);
        this.boards.splice(index, 1);
    }

    addBoard(title, color){
        this.boards.push(new Board({title,color,defaultColor: this.availableColors[0]}));
    }

    get defaultColor(){
        return this.availableColors[0];
    }
}
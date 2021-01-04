import { makeAutoObservable } from "mobx";
import { UID } from "../../utilits";
import { Table } from "../Table/table";

export class Board {
    id = UID();
    title = '';
    color = '';
    tables = [];

    constructor( board ){

        this.setDefaultColor(board.defaultColor);

        Object.assign( this, board );

        makeAutoObservable( this );
    }

    addTable(name){
        this.tables.push(new Table({name}))
    }
    addTableAtIndex(name, index, cards){
        this.tables.splice(index, 0, new Table({name,cards}));
    }
    deleteTable(tableId){
        const index = this.tables.findIndex(table => table.id === tableId);
        this.tables.splice(index, 1);
    }
    swapTables(fromTableIndex,tableIndex){
        const temp = this.tables[fromTableIndex];

        this.tables[fromTableIndex] = this.tables[tableIndex];
        this.tables[tableIndex] = temp;
    }
    setDefaultColor(color){
        this.color = color;
    }
}
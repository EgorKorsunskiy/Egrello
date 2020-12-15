import { makeAutoObservable } from "mobx";
import { Table } from "./Table/table";

export class Board {
    id = 0;
    title = '';
    color = 'rgb(0, 121, 191)';
    tables = []

    constructor( board ){

        Object.assign( this, board );

        makeAutoObservable( this );
    }

    addTable(name){
        this.tables.push(new Table({id: this.tables.length, name}))
    }
}
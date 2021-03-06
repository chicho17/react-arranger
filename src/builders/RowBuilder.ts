import { Row, Cell, Column, CellSpan, CellSpanTuple } from "../types";

function makeIdGenerator() {
  let id = 1;
  return function generateId() {
    return `${id++}`;
  };
}

const idGenerator = makeIdGenerator();

function getCellId(cell: Cell | Column) {
  return typeof cell === "string" ? cell : cell.id;
}

function sanitizeCellSpan(cellSpan: CellSpan | CellSpanTuple): CellSpanTuple {
  if (Array.isArray(cellSpan)) {
    return cellSpan;
  }
  return [cellSpan, cellSpan, cellSpan];
}

class RowBuilder {
  id: Row["id"] = idGenerator();
  containerType: Row["containerType"] = ["ROW", "ROW", "ROW"];
  isHidden: Row["isHidden"] = false;
  additional: Row["additional"] = {};
  columnGap: Row["columnGap"];
  rowGap: Row["rowGap"];
  cells: Row["cells"] = [];
  cellIdToIndex = new Map<string, number>();

  static getRowBuilder(row: Row) {
    return new RowBuilder({
      xGap: row.columnGap,
      yGap: row.rowGap,
      containerType: row.containerType,
      isHidden: row.isHidden,
      additional: row.additional,
      cells: row.cells,
      id: row.id,
    });
  }

  constructor(input: {
    xGap: Row["columnGap"];
    yGap: Row["rowGap"];
    containerType?: Row["containerType"];
    isHidden?: Row["isHidden"];
    additional?: Row["additional"];
    cells?: Row["cells"];
    id?: Row["id"];
  }) {
    this.columnGap = input.xGap;
    this.rowGap = input.yGap;

    if (input.containerType != null) {
      this.containerType = input.containerType;
    }

    if (input.isHidden != null) {
      this.isHidden = input.isHidden;
    }

    if (input.additional != null) {
      this.additional = input.additional;
    }

    if (input.cells != null) {
      this.cells = input.cells;
      this.cellIdToIndex = new Map(
        input.cells.map((cell, index) => [getCellId(cell.cellItem), index])
      );
    }

    if (input.id != null) {
      this.id = input.id;
    }

    return this;
  }

  addCell(cell: Cell | Column, cellSpan: CellSpan | CellSpanTuple) {
    this.cells = this.cells.concat({
      cellItem: cell,
      cellSpan: sanitizeCellSpan(cellSpan),
    });
    this.cellIdToIndex.set(getCellId(cell), this.cells.length - 1);
    return this;
  }

  removeCell(cellId: string) {
    const index = this.cellIdToIndex.get(cellId);
    if (index == null) {
      return this;
    }
    this.cells = [
      ...this.cells.slice(0, index),
      ...this.cells.slice(index + 1),
    ];
    this.cellIdToIndex.delete(cellId);
    return this;
  }

  setAdditional(additional: any) {
    this.additional = additional;
    return this;
  }

  markHidden() {
    this.isHidden = true;
    return this;
  }

  markVisible() {
    this.isHidden = false;
    return this;
  }

  build(): Row {
    return {
      id: this.id,
      isHidden: this.isHidden,
      additional: this.additional,
      columnGap: this.columnGap,
      rowGap: this.rowGap,
      containerType: this.containerType,
      cells: this.cells,
    };
  }
}

export { RowBuilder };

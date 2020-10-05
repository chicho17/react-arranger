import React from "react";

export type Dict<T> = {
  [k: string]: T;
};

export type CellConfig<P = {}> = {
  cellId: string;
  Component: React.ComponentType<P>;
  componentProps: P;
  isHidden: boolean;
};

export type Cell = string;

export type CellSpan = number | "1fr";
export type CellSpanTuple = [CellSpan, CellSpan, CellSpan];

type RowContainerType = "COLUMN" | "ROW";
type RowContainerTypeTuple = [
  RowContainerType,
  RowContainerType,
  RowContainerType
];

export type Row = {
  id: string;
  isHidden: boolean;
  additional: Dict<any>;
  containerType: RowContainerTypeTuple;
  columnGap: [number, number, number];
  rowGap: [number, number, number];
  cells: { cellItem: Cell | Column; cellSpan: CellSpanTuple }[];
};

export type Column = {
  id: string;
  isHidden: boolean;
  additional: Dict<any>;
  rowGap: [number, number, number];
  cells: { cellItem: Cell | Row }[];
};

import React from "react";
import { CellConfig } from "../types";

type Props = {
  cellConfig: CellConfig;
};

const Cell = ({ cellConfig }: Props) => {
  const { Component, componentProps, cellId } = cellConfig;

  return <Component {...componentProps} />;
};

export { Cell };

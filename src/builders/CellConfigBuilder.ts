import React from "react";
import { CellConfig } from "../types";

function Null() {
  return null;
}

class CellConfigBuilder<P extends {}> {
  cellId: string = "";
  Component: React.ComponentType<P> = Null;
  componentProps: P = {} as P;
  isHidden = false;

  constructor(cellItem?: CellConfig<P>) {
    if (cellItem) {
      this.cellId = cellItem.cellId;
      this.Component = cellItem.Component;
      this.componentProps = cellItem.componentProps;
      this.isHidden = cellItem.isHidden;
    }
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

  setComponentProps(componentProps: P) {
    this.componentProps = componentProps;
    return this;
  }

  build(): CellConfig<P> {
    return {
      cellId: this.cellId,
      Component: this.Component,
      componentProps: this.componentProps,
      isHidden: this.isHidden
    };
  }
}

export { CellConfigBuilder };

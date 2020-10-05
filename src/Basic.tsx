import React from "react";
import { RowBuilder } from "./builders/RowBuilder";
import { CellConfigMapBuilder } from "./builders/CellConfigMapBuilder";
import { CellConfigBuilder } from "./builders/CellConfigBuilder";
import { Box } from "theme-ui";
import { RowArranger } from "./components/RowArranger";
import { ColumnBuilder } from "./builders/ColumnBuilder";

const Block = ({ text, backgroundColor, textColor }) => {
  return (
    <Box
      backgroundColor={backgroundColor}
      color={textColor}
      sx={{
        height: "100%",
        borderColor: "primary",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {text}
    </Box>
  );
};

const row = new RowBuilder({
  xGap: [0, 2, 4],
  yGap: [4, 0, 0]
})
  .addCell("blue", ["full", 50, 50])
  .addCell("purple", ["full", "1fr", "1fr"])
  .addCell(
    new ColumnBuilder({ yGap: [4, 4, 6] })
      .addCell("gray1")
      .addCell("gray2")
      .build(),
    ["full", 80, 80]
  )
  .build();

const cellConfigMap = new CellConfigMapBuilder()
  .addCellConfig(
    new CellConfigBuilder({
      cellId: "blue",
      Component: Block,
      componentProps: {
        text: "block 1",
        backgroundColor: "highlight",
        textColor: "text"
      },
      isHidden: false
    }).build()
  )
  .addCellConfig(
    new CellConfigBuilder({
      cellId: "purple",
      Component: Block,
      componentProps: {
        text: "block 2",
        backgroundColor: "primary",
        textColor: "background"
      },
      isHidden: false
    }).build()
  )
  .addCellConfig(
    new CellConfigBuilder({
      cellId: "gray1",
      Component: Block,
      componentProps: {
        text: "block 3",
        backgroundColor: "gray",
        textColor: "background"
      },
      isHidden: false
    }).build()
  )
  .addCellConfig(
    new CellConfigBuilder({
      cellId: "gray2",
      Component: Block,
      componentProps: {
        text: "block 4",
        backgroundColor: "muted",
        textColor: "text"
      },
      isHidden: false
    }).build()
  )
  .build();

const Basic = () => {
  return (
    <Box sx={{ border: "5px solid pink" }}>
      <RowArranger row={row} cellConfigMap={cellConfigMap} />
    </Box>
  );
};

export { Basic };

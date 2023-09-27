import { GridColumnMenuContainer } from "@mui/x-data-grid";

const CustomColumnMenu = (props) => {
  const { hideMenu, open, currentColumn } = props;
  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      open={open}
      currentColumn={currentColumn}
    >
      {/* <GridFilterMenuItem onCLick={hideMenu} column={currentColumn} /> */}
      {/* <HideGridColMenuItem onCLick={hideMenu} column={currentColumn} /> */}
    </GridColumnMenuContainer>
  );
};

export default CustomColumnMenu;

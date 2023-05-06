import React, { useState } from "react";
// import all material UI components and function
import {
  AppBar,
  IconButton,
  Stack,
  Button,
  SwipeableDrawer,
  MenuItem,
  Collapse,
  Autocomplete,
  TextField,
  InputAdornment,
  Tooltip,
  useScrollTrigger,
  Slide,
  Badge,
} from "@mui/material";
// import all icons from material icons
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
// import assets for logo Image
import Image from "next/image";
import logo from "../../assets/logoElmart.svg";
import { top100Films } from "../test";

export default function Navbar() {
  // define a state for toggling the drawer navigation on mobile view
  const [openNav, setOpenNav] = useState(false);
  // set expand state to togggling expand for categories components
  const [expand, setExpand] = useState(false);
  //  set search value
  const [value, setValue] = useState("");

  // set function to toggle the expand categories element
  const handleExpand = () => {
    setExpand(!expand);
  };

  const pages = ["All Products"];
  const categoryLists = [
    "handphone",
    "laptop/computer",
    "TV & monitor",
    "Appliances",
    "Accesories",
  ];

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} in={!trigger} direction="down">
      {/* // create appbar components for wrapping all components */}
      <AppBar className="bg-white p-2 shadow-2xl flex items-center flex-row justify-between gap-2">
        {/* create image logo elements using next image for optimization */}
        <a href="/">
          <Image src={logo} alt="elmart logo" width={100} height={37} />
        </a>

        <Autocomplete
          id="grouped-demo"
          onInputChange={(e, value) => setValue(value)}
          freeSolo
          options={top100Films.map((option) => option.title)}
          sx={{ width: 300 }}
          open={value?.length > 0}
          renderInput={(params) => (
            <TextField
              className="mlg:w-[30rem]"
              {...params}
              InputProps={{
                ...params.InputProps,
                size: "small",
                placeholder: "Search Elemart products...",
                startAdornment: (
                  <InputAdornment position="start" className="mr-0 ml-1">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Stack direction="row" alignItems="center" className="md:gap-2">
          {/* using stack to wrap all navigation links and categories link */}
          <Stack direction="row" spacing={1} className="xmd:flex hidden ">
            {/* special categories link that containing all categories using tooltip */}

            <Tooltip
              PopperProps={{
                sx: {
                  padding: 0,
                  margin: 0,
                  "& .MuiTooltip-tooltip": {
                    bgcolor: "#ffff",
                  },
                },
              }}
              title={
                <Stack direction="column" className="bg-white">
                  {categoryLists.map((item) => (
                    <Button className="capitalize text-left block" key={item}>
                      {item}
                    </Button>
                  ))}
                </Stack>
              }
            >
              <Button className="text-black py-1 px-2 rounded-[15px] capitalize">
                Categories
                <AppsRoundedIcon fontSize="small" />
              </Button>
            </Tooltip>

            {/* mapping all links with button and href link so it can be used to navigate all pages */}
            {pages.map((menu) => (
              <Button
                className="text-black py-1 px-2 rounded-[15px] capitalize overflow-ellipsis cursor-pointer "
                href={`/${menu.toLowerCase()}`}
                key={menu}
              >
                {menu}
              </Button>
            ))}
          </Stack>

          <IconButton>
            <Badge
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              badgeContent={1}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  color: "#fff",
                },
              }}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton
            className="flex xmd:hidden"
            onClick={() => setOpenNav(true)}
          >
            <MenuIcon />
          </IconButton>
        </Stack>

        <SwipeableDrawer
          anchor="left"
          open={openNav}
          onOpen={() => setOpenNav(true)}
          onClose={() => setOpenNav(false)}
          sx={{
            "& .MuiDrawer-paper": {
              p: "1rem",
              width: "230px",
            },
          }}
        >
          <MenuItem onClick={handleExpand}>
            Categories
            <>{expand ? <ExpandLess /> : <ExpandMore />}</>
          </MenuItem>
          <Collapse in={expand}>
            <Stack direction="column">
              {categoryLists.map((item) => (
                <Button key={item} className="text-left block capitalize">
                  {item}
                </Button>
              ))}
            </Stack>
          </Collapse>
          {pages.map((item) => (
            <MenuItem key={item}>{item}</MenuItem>
          ))}
        </SwipeableDrawer>
      </AppBar>
    </Slide>
  );
}

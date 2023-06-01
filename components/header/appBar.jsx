import React, { useState } from "react";
// import all material UI components and function
import {
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
  createFilterOptions,
  Avatar,
} from "@mui/material";
// import all icons from material icons
import SearchIcon from "@mui/icons-material/Search";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
// import assets for logo Image
import Image from "next/image";
import logo from "../../assets/logoElmart.svg";
import Cart from "./cart";
import Link from "next/link";
import { State } from "@/context/Provider";
import { useRouter } from "next/router";

export default function Navbar({ category, products }) {
  // define a state for toggling the drawer navigation on mobile view
  const [openNav, setOpenNav] = useState(false);
  // set expand state to togggling expand for categories components
  const [expand, setExpand] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const {
    state: { searchQuery },
    dispatch,
  } = State();

  function handleOpen() {
    if (searchQuery.length > 0) {
      setOpen(true);
    }
  }

  function handleInputChange(e, value) {
    dispatch({
      type: "SET_QUERY",
      payload: value,
    });
    if (searchQuery.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }

  // set function to toggle the expand categories element
  const handleExpand = () => {
    setExpand(!expand);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/all-products");
  };

  const OPTIONS_LIMIT = 4;
  const filterOptions = createFilterOptions({
    limit: OPTIONS_LIMIT,
  });

  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} in={!trigger} direction="down">
      <nav className="bg-white p-2 shadow-2xl flex items-center fixed top-0 left-auto z-10 flex-row justify-between gap-2 main-padding w-full">
        <Link href="/">
          <Image
            src={logo}
            alt="elmart logo"
            width={100}
            height={37}
            className="w-auto h-auto cursor-pointer max-[335px]:hidden"
          />
        </Link>

        <Autocomplete
          onChange={handleSubmit}
          filterOptions={filterOptions}
          onInputChange={handleInputChange}
          onClose={() => setOpen(false)}
          onOpen={handleOpen}
          open={open}
          freeSolo
          options={products.map((option) => option.fields.title)}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <form onSubmit={handleSubmit}>
              <TextField
                className="mlg:w-[30rem]"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  size: "small",
                  placeholder: "Search Elmart products...",
                  startAdornment: (
                    <InputAdornment position="start" className="mr-0 ml-1">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </form>
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
                <Stack className="bg-white grid grid-cols-2 gap-1">
                  {category.map((item, i) => {
                    const {title, slug, categoryImage} = item.fields
                    return (
                      <Link key={i} href={"/categories/" + slug} className="flex items-center gap-2">
                    <Avatar src={"https://" + categoryImage.fields.file.url} className="border-[1px]"/>
                      <Button className="text-left block capitalize leading-[1rem]">
                        {title}
                      </Button>
                    </Link>
                    )
                  })}
                </Stack>
              }
            >
              <Button className="text-black py-1 px-2 rounded-[15px] capitalize">
                Categories
                <AppsRoundedIcon fontSize="small" />
              </Button>
            </Tooltip>

            <Link href="/all-products">
              <Button className="text-black py-1 px-2 rounded-[15px] capitalize overflow-ellipsis cursor-pointer ">
                All Products
              </Button>
            </Link>
          </Stack>

          <Cart />

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
              {category.map((item, i) => (
                <Button
                  key={i}
                  className="text-left block capitalize"
                  href={"/categories/" + item.fields.slug}
                >
                  {item.fields.title}
                </Button>
              ))}
            </Stack>
          </Collapse>
          <MenuItem>
            <Link href="/all-products">All Products</Link>
          </MenuItem>
        </SwipeableDrawer>
      </nav>
    </Slide>
  );
}

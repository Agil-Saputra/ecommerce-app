import React from "react";
import { IconButton, Badge, Tooltip, Avatar, Divider, NoSsr } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { cartState } from "@/context/cartProvider";
import Link from "next/link";
import Image from "next/image";
import visa from "../../assets/emptyCart.svg";


const cart = () => {
  const {
    state: { cart },
  } = cartState();
  const productData = cart.map((item) => item);

  return (
    <Tooltip
      PopperProps={{
        sx: {
          padding: 0,
          paddingRight: 2,
          margin: 0,
          "& .MuiTooltip-tooltip": {
            bgcolor: "#ffff",
            border: 1,
            borderColor: "primary.main",
            p: "6px",
          },
        },
      }}
      title={
        cart.length == 0 ? (
          <div className="text-center grid place-items-center">
          <Image 
            src={visa}
            width={100}
            height={100}
            priority
            alt="empty cart ilustration"
          />
            <p className="text-black font-bold text-lg">
              Oops, your shopping cart is empty!
            </p>
            <p className="text-black text-left">
              Instead of being idle, just fill it with interesting stuff. Have a
              look, who knows there's something you like!
            </p>
          </div>
        ) : (
          <>
            <div className="flex gap-[2.5rem] text-black text-[15px] p-[2px]">
              <p className="font-bold">Your Cart ({cart.length})</p>
              <Link href="/mycart" className="text-primary hover:underline">
                See Now
              </Link>
            </div>
            <Divider />
            {productData.map((item, i) => {
              const {
                title,
                productImages,
                price,
                choosedVariant,
                quantity,
              } = item;
              return (
                <Link
                  href="/mycart"
                  key={i}
                >
                    <div className="text-black flex justify-between gap-1 items-center py-2">
                      <Avatar
                        src={"https:" + productImages[0].fields.file.url}
                        alt={productImages[0].fields.title}
                      />

                      <div className="hover:text-primary md:text-[13px]">
                        <p className="handle-text-overflow w-[11.5ch] line-clamp-1">
                          {title}
                        </p>
                        <p className="handle-text-overflow w-[11.5ch] line-clamp-1">
                          {choosedVariant.toUpperCase()}
                        </p>
                      </div>
                      <p className="text-primary font-bold text-[1rem] handle-text-overflow line-clamp-1 w-[4ch]">
                        ${price * quantity}
                      </p>
                    </div>
                    <Divider />
                </Link>
              );
            })}
          </>
        )
      }
    >
     <Link href="/mycart">
         <IconButton >
         <NoSsr>
            <Badge
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              badgeContent={cart.length}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  color: "#fff",
                },
              }}
            >
              <ShoppingCart />
            </Badge>
         </NoSsr>
         </IconButton>
     </Link>

    </Tooltip>
  );
};

export default cart;

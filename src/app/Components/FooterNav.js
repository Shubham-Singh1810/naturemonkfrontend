import React from "react";

function FooterNav({selectedItem}) {
  const navItem = [
    {
      name: "Home",
      link: "/",
      image: "https://cdn-icons-png.flaticon.com/128/1946/1946436.png",
    },
    {
      name: "Shop",
      link: "/",
      image: "https://cdn-icons-png.flaticon.com/128/151/151773.png",
    },
    {
      name: "Menu",
      link: "/",
      image: "https://cdn-icons-png.flaticon.com/128/2976/2976215.png",
    },
    {
      name: "Me",
      link: "/",
      image: "https://cdn-icons-png.flaticon.com/128/1077/1077114.png",
    },
  ];
  return (
    <div className="footerNav d-md-none d-block ">
      <div className="row">
        {navItem?.map((v, i) => {
          return (
            <div className="col footerItem" style={{borderColor : selectedItem==v?.name ? "black": "transparent", opacity:selectedItem==v?.name  ? "0.8":"0.6"}}>
              <img src={v?.image} />
              <p>{v?.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FooterNav;

import React from "react";
import Tippy from "@tippyjs/react/headless";
import PopperWrapper from "../PopperWrapper";
import styles from "./menu.module.css";
import MenuItems from "./MenuItems";

const Menu = ({children, items = []}) => {

  const renderItems = () => {
    return items.map((item, index) => (
      <MenuItems key={index} data={item} />
    ))
  }
  return (
    <Tippy
      interactive
      placement="bottom-end"
      render={(attrs) => (
        <div className={styles.menu} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            {renderItems()}
          </PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
};

export default Menu;

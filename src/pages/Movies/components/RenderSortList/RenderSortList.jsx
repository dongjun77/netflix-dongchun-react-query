import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./RenderSortList.style.css";

const RenderSortList = ({ selectedSortMenu, setSelectedSortMenu }) => {
  const sortMenuList = [
    "original_title.asc",
    "original_title.desc",
    "popularity.asc",
    "popularity.desc",
    "revenue.asc",
    "revenue.desc",
    "primary_release_date.asc",
    "primary_release_date.desc",
    "title.asc",
    "title.desc",
    "vote_average.asc",
    "vote_average.desc",
    "vote_count.asc",
    "vote_count.desc",
  ];
  return (
    <div>
      <DropdownButton id="dropdown-basic-button" title={selectedSortMenu}>
        {sortMenuList.map((menu) => (
          <Dropdown.Item onClick={() => setSelectedSortMenu(menu)}>
            {menu}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
};

export default RenderSortList;

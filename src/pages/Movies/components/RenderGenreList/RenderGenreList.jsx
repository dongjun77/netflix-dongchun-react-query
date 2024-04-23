import React from "react";
import { ToggleButton, ToggleButtonGroup, Row } from "react-bootstrap";

const RenderGenreList = ({
  genreList,
  selectedTabList,
  setSelectedTabList,
}) => {
  const getDataBySelectedTab = (tabKey) => {
    setSelectedTabList(tabKey);
  };

  return (
    <div>
      <Row>
        {/* 단일선택, 잘 동작함 단 다중선택이 안된다*/}
        {/* <Nav variant="pills" className="flex-column">
          {genreList.map((genre) => (
            <Nav.Item>
              <Nav.Link
                eventKey={genre.name}
                onClick={() => getDataBySelectedTab(genre.id)}
              >
                {genre.name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav> */}

        {/* 다중체크 됨 허나 어떻게 정보를 쌓을지 고민중 */}
        <ToggleButtonGroup
          type="checkbox"
          value={selectedTabList}
          onChange={getDataBySelectedTab}
          vertical
        >
          {genreList?.map((genre) => (
            <ToggleButton
              variant="outline-danger"
              id={genre.name}
              value={genre.id}
            >
              {genre.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Row>
    </div>
  );
};

export default RenderGenreList;

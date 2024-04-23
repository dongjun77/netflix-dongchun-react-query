import "./MovieVideo.style.css";
import React, { useState } from "react";

import { Alert, Button, Modal } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

import YouTube from "react-youtube";

const MovieVideo = ({ movieVideoData }) => {
  const [show, setShow] = useState(false);
  console.log("movieVideoData", movieVideoData);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <FontAwesomeIcon
        icon={faVideo}
        size="2x"
        onClick={handleShow}
        className="video-icon"
      />

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        className="modal-custom"
      >
        <Modal.Header closeButton>
          <Modal.Title>{movieVideoData?.results[0].name}</Modal.Title>
        </Modal.Header>
        <YouTube
          //videoId : https://www.youtube.com/watch?v={videoId} 유튜브 링크의 끝부분에 있는 고유한 아이디
          videoId={movieVideoData?.results[0].key}
          //opts(옵션들): 플레이어의 크기나 다양한 플레이어 매개 변수를 사용할 수 있음.
          //밑에서 더 설명하겠습니다.
          opts={{
            width: "100%",
            height: "600",
            playerVars: {
              autoplay: 1, //자동재생 O
              rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
              modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
            },
          }}
          //이벤트 리스너
          onEnd={(e) => {
            e.target.stopVideo(0);
          }}
        />
      </Modal>
    </div>
  );
};

export default MovieVideo;

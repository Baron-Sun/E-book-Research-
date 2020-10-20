import React from 'react';
import Webcam from "react-webcam";
import axios from 'axios';
import { Button, Row, Col, notification } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, CloudUploadOutlined, PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';


export const WebcamStreamCapture = (props) => {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);

  const videoConstraints = {
    width: 320,
    height: 240,
    facingMode: "user"
  };

  const handleStartCaptureClick = React.useCallback(() => {
    console.log("Start Capture");
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    console.log("Stop Capture");
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = React.useCallback(() => {
    console.log("Upload Video");
    if (recordedChunks.length) {
      console.log("Creating blob");
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
    var formData = new FormData();
    formData.append("blob", blob);
    console.log("Username inside the webcam capture: ");
    console.log(props);
    formData.append("username", props.username ? props.username : "No Username Provided");

    axios({
      method: 'post',
      url: "/_api2/video/upload",
      data: formData, 
    }).then(function (response) {
      console.log("Success");
      console.log(response);
      notification.open({
        message: 'Successfully uploaded video',
        icon: <CheckCircleOutlined  style={{ color: '#a0d911' }} />,
      });
    })
    .catch(function (error) {
      console.log("Failed");
      console.log(error.response.data.message);
      notification.open({
        message: 'Failed to upload video',
        icon: <CloseCircleOutlined  style={{ color: '#f5222d' }} />,
      });
    });

    setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const stopAndDownload = React.useCallback(() => { 
    handleStopCaptureClick();
    if (recordedChunks.length > 0){
      handleDownload();
    }
  });

  return (
    <>
      <div>
        <Row justify="space-around" align="middle">
          <Col flex={1}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
              {capturing ? (
              <Button onClick={handleStopCaptureClick} type="primary" icon={<PauseCircleOutlined />} danger>结束录制并上传</Button>
              ) : (
                <Button onClick={handleStartCaptureClick}
                  type="primary"
                  icon={<PlayCircleOutlined />}
                >开始录制</Button>
              )}
            </div>
          </Col>

          <Col flex={3}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
              <Webcam audio={true} ref={webcamRef} videoConstraints={videoConstraints} width="180"/>
            </div>
          </Col>

          <Col flex={1}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
              {recordedChunks.length > 0 && (
                <Button onClick={handleDownload} 
                type="primary"
                icon={<CloudUploadOutlined />}
                >开始上传</Button>
              )}
              {recordedChunks.length <= 0 && (
                <Button disabled
                type="primary"
                icon={<CloudUploadOutlined />}
                >开始上传</Button>
              )}
            </div>
          </Col>
        </Row>

        <Row style={{ marginBottom: 8 }}></Row>

      </div>
      
    </>
  );
};
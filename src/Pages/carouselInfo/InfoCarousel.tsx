import React from "react";
import { RootState } from "../../Storage/Redux/store";
import { useSelector } from "react-redux";
import { Carousel, Col, Row } from "antd";
import { Typography } from "antd";
import { userModel } from "../../Interfaces";
import infoModel from "../../Interfaces/infoModel";
import { dateformat } from "../../Utility/SD";
import dayjs from "dayjs";

const { Title, Paragraph } = Typography;

interface Props {
    infoItem: infoModel[];
}

function InfoCarousel(props: Props) {
    const userData: userModel = useSelector(
        (state: RootState) => state.userAuthStore
    );

    // const contentStyle: React.CSSProperties = {
    //     margin: 0,
    //     height: "300px",
    //     color: "#fff",
    //     lineHeight: "300px",
    //     textAlign: "left",
    //     background: "transparent",
    //     padding: "20px",
    //     borderRadius: "20px",
    //     position: "relative",
    //     overflow: "hidden",
    // };

    const imageStyle: React.CSSProperties = {
        //position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        //height: "100%",
        objectFit: "contain",
        opacity: 0.6,
        margin: 20
    };

    const textStyle: React.CSSProperties = {
        position: "relative",
        alignContent: "justify",
        color: "white",
        textAlign: "justify",
        zIndex: 1
    };

    return (
        <Carousel style={{backgroundColor: "#0f0e77", }} arrows infinite={false} autoplay>
            {props.infoItem.map((infoItem: infoModel, index: number) => (
                <Row>
                    <Col xs={24} md={{ span: 16, offset: 4 }}>
                        <div key={index} >
                            <img height={400} style={imageStyle} alt="no context"
                                src={infoItem.imageId ? `http://localhost:7152/api/storage/${infoItem.imageId}`
                                    : require("../../Assets/nocontent.png")} />
                            <Title level={1} style={{ fontSize: "4em", color: "lightgreen" }}>
                                {infoItem.title}
                            </Title>
                            <Paragraph style={textStyle}>
                                {infoItem.text}
                            </Paragraph>
                            <Paragraph style={{ fontSize: "1em", color: "lightblue", textAlign: "right",}}>
                                {dayjs(infoItem.date).format(dateformat)}
                            </Paragraph>                       
                        </div>
                    </Col>
                </Row>
            ))}
        </Carousel>
    );
}

export default InfoCarousel;
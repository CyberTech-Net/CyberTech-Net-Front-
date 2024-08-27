import { Row, Col } from 'antd'
import { useEffect, useState } from 'react';
import { MainLoader } from '../Common';
import InfoCarousel from './carouselInfo/InfoCarousel';
import { useDispatch } from 'react-redux';
import infoModel from '../Interfaces/infoModel';
import { useGetInfoQuery } from '../Api/infoApi';

function HomePage() {
    const [infoItems, setInfoItems] = useState<infoModel[]>([]);
    const dispatch = useDispatch();
    const { data, isLoading } = useGetInfoQuery(null);

    useEffect(() => {
        if (!isLoading && data) {
            setInfoItems(data);
        }
    }, [isLoading, data]);

    if (isLoading) {
        return <MainLoader />;
    }
    return (
        <div style={{ paddingTop: "1em", height: "Auto" }}>
            <Row>
                <Col xs={24} md={{ span: 16, offset: 4 }}>
                    <InfoCarousel infoItem={infoItems} />
                </Col>
            </Row>
        </div>
    );
}

export default HomePage;
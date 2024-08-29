import { Col, Row } from "antd";

let picBack = require("../Assets/logo.png");

const AboutPage: React.FC = () => {

    return (

        <div className="p-5">
            <Row>
                <Col xs={24} md={{ span: 16, offset: 4 }}>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h1 className="text-success">О проекте</h1>
                    </div>

                    <div style={{textAlign:"center"}}>
                        <h1> Проект был выполнен в рамках обучения на курсе <p>"C# ASP.NET Core разработчик" (Онлайн-образование OTUS) командой CyberTech Team</p> 
                        </h1>
                    </div>
<br/><br/>
                    <div style={{fontSize:20}}>
                        Значительный вклад в развитие проекта внесли: 
                        <li> Павел Самбурский (PashaSamb)</li>
                        <li> Алексей Сергеев (proggy-al)</li>
                        <li> Алексей Никифоров (Bimka09)</li>
                    </div>
                    <br/><br/>
                    <div style={{fontSize:20, textAlign:"center"}}>
                        2024 год
                    </div>

                </Col>
            </Row>
        </div>
    )
}

export default AboutPage;
import { Col, Row, Space, Card } from 'antd';
import { MainLoader } from '../../Common';
import dayjs from 'dayjs';
import { datetimeformat } from '../../Utility/SD';
import MatchCardModel from '../../Interfaces/matchCardModel';
import { useGetMatchCardQuery } from '../../Api/matchCardApi';

const MatchCardsPage: React.FC = () => {
    const { data, isLoading } = useGetMatchCardQuery(null);
    const { Meta } = Card;

    return (
        <>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className="p-5">
                    <Row>
                        <Col xs={24} md={{ span: 14, offset: 4 }}>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h1 className="text-success">Матчи</h1>
                            </div>
                            <Space size={[20, 20]} wrap>
                                {data.map((cardItem: MatchCardModel, index: number) => (
                                    <Card
                                        hoverable={true}
                                        key={index}
                                        style={{ width: 400 }}
                                        actions={[

                                        ]}
                                        cover={
                                            <div
                                                style={{
                                                    height: 100,
                                                    width: "100%",
                                                    background: "linear-gradient(#0f0e77,#FF4516",
                                                    color: "white",
                                                    fontSize: 20,
                                                    paddingTop: 10,
                                                    paddingLeft: 10,
                                                    fontFamily: "revert",
                                                    display: "flex",
                                                    flexDirection: "row"
                                                }}>
                                                {cardItem.tournament.titleTournament}
                                                <img src=
                                                    {cardItem.tournament.gameType.imageId ? `http://localhost:7152/api/storage/${cardItem.tournament.gameType.imageId}` : require("../../Assets/nocontent.png")}
                                                    alt="no content"
                                                    style={{ width: '80%', maxWidth: '100px', paddingRight: 0, paddingTop: 0, float:"right"}}
                                                />
                                            </div>
                                        }
                                    >
                                        <Meta
                                            style={{
                                                alignContent: "center",
                                                textAlign: "center",
                                                marginTop: -30,
                                                fontSize: 30,
                                                color: "white",
                                                background: "skyblue"
                                            }}
                                            description={dayjs(cardItem.startDateTime).format(datetimeformat)}
                                        />
                                        <Meta
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                background: "skyblue"
                                                //marginTop: -40
                                            }}
                                            title={
                                                <Meta
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        //marginTop: -40
                                                    }}
                                                    title={
                                                        <table align='center' style={{ fontSize: 20, textAlign: "center" }}>
                                                            <tr>
                                                                <td>
                                                                    <img src=
                                                                        {cardItem.firstTeam.imageId ? `http://localhost:7152/api/storage/${cardItem.firstTeam.imageId}` : require("../../Assets/nocontent.png")}
                                                                        alt="no content"
                                                                        style={{ width: '100%', maxWidth: '120px', paddingRight: 20, paddingTop: 10, paddingBottom: 10 }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    VS
                                                                </td>
                                                                <td>
                                                                    <img src=
                                                                        {cardItem.secondTeam.imageId ? `http://localhost:7152/api/storage/${cardItem.secondTeam.imageId}` : require("../../Assets/nocontent.png")}
                                                                        alt="no content"
                                                                        style={{ width: '100%', maxWidth: '120px', paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }}
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr style={{ alignContent: "center" }}>
                                                                <td>
                                                                    <p>{cardItem.firstTeam.titleTeam}</p>
                                                                </td>
                                                                <td></td>
                                                                <td>
                                                                    <p>{cardItem.secondTeam.titleTeam}</p>
                                                                </td>
                                                            </tr>
                                                            <tr></tr>
                                                            <tr>
                                                                <td>
                                                                    <p style=
                                                                        {{
                                                                            borderWidth: 5,
                                                                            borderColor: cardItem.firstTeamResult === "Lose" ? "red" :
                                                                            (cardItem.firstTeamResult === "Win" ? "green" : "transparent"),
                                                                            background: cardItem.firstTeamResult === "Lose" ? "pink" : 
                                                                            (cardItem.firstTeamResult === "Win" ? "lightgreen" : "transparent"),
                                                                            borderStyle: "double",
                                                                            borderRadius: 5
                                                                        }}>
                                                                        {cardItem.firstTeamResult}
                                                                    </p>
                                                                </td>
                                                                <td></td>
                                                                <td>
                                                                    <p style=
                                                                        {{
                                                                            borderWidth: 5,
                                                                            borderColor: cardItem.secondTeamResult === "Lose" ? "red" :
                                                                            (cardItem.secondTeamResult === "Win" ? "green" : "transparent"),
                                                                            background: cardItem.secondTeamResult === "Lose" ? "pink" : 
                                                                            (cardItem.secondTeamResult === "Win" ? "lightgreen" : "transparent"),
                                                                            borderStyle: "double",
                                                                            borderRadius: 5
                                                                        }}>
                                                                        {cardItem.secondTeamResult}
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p>{cardItem.firstTeamScore}</p>
                                                                </td>
                                                                <td></td>
                                                                <td>
                                                                    <p>{cardItem.secondTeamScore}</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    }
                                                />
                                            }
                                        />
                                    </Card>)
                                )}
                            </Space>
                        </Col>
                    </Row>
                </div>
            )}
        </>
    )
}
export default MatchCardsPage;
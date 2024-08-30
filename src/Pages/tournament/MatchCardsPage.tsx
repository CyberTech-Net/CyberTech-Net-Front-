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
                        <Col xs={24} md={{ span: 18, offset: 3 }}>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h1 style={{fontFamily:"cursive"}}>Матчи</h1>
                            </div>
                            <Space size={[20, 20]} wrap>
                                {data.map((cardItem: MatchCardModel, index: number) => (
                                    <Card
                                        hoverable={true}
                                        key={index}
                                        style={{ width: 400, height: 450, fontFamily: "cursive", background:"#C0C0C0" }}
                                        actions={[

                                        ]}
                                        cover={
                                            <Space  direction="horizontal" size="small">                                            
                                            <div
                                                style={{
                                                    height: 100,
                                                    width: "100%",
                                                    background: "linear-gradient(#0f0e77,",
                                                    fontSize: 20,
                                                    paddingTop: 10,
                                                    paddingLeft: 10,
                                                    paddingRight: 50,
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    borderRadius:5
                                                }}>
                                                {cardItem.tournament.titleTournament}
                                                
                                            </div>
                                            <img src=
                                                    {`http://localhost:7152/api/storage/${cardItem.tournament.gameType.imageId}`}
                                                    alt="no content"
                                                    style={{ width: 50, paddingRight: 0, paddingTop: 0, position:"absolute", top:"0px",right:"0px"}}
                                                />
                                            </Space>
                                        }
                                    >
                                        
                                        <Meta
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                background: "#696969",
                                                height:300
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
                                                                        {`http://localhost:7152/api/storage/${cardItem.firstTeam.imageId}`}
                                                                        alt="no content"
                                                                        style={{ width: 200, maxWidth: '120px', paddingRight: 20, paddingTop: 10, paddingBottom: 10 }}
                                                                    />
                                                                </td>
                                                                <td style={{color:"lightblue"}}>
                                                                    VS
                                                                </td>
                                                                <td>
                                                                    <img src=
                                                                        {`http://localhost:7152/api/storage/${cardItem.secondTeam.imageId}`}
                                                                        alt="no content"
                                                                        style={{ width: 200, maxWidth: '120px', paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }}
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
                                                                            (cardItem.firstTeamResult === "Win" ? "green" : "lightblue"),
                                                                            background: cardItem.firstTeamResult === "Lose" ? "pink" : 
                                                                            (cardItem.firstTeamResult === "Win" ? "lightgreen" : "transparent"),
                                                                            borderStyle: "double",
                                                                            borderRadius: 5,
                                                                            height:45
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
                                                                            (cardItem.secondTeamResult === "Win" ? "green" : "lightblue"),
                                                                            background: cardItem.secondTeamResult === "Lose" ? "pink" : 
                                                                            (cardItem.secondTeamResult === "Win" ? "lightgreen" : "transparent"),
                                                                            borderStyle: "double",
                                                                            borderRadius: 5,
                                                                            height: 45
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
                                        <Meta
                                            style={{
                                                alignContent: "center",
                                                textAlign: "right",
                                                marginTop: -25,
                                                paddingRight:10,
                                                fontSize: 20,
                                                color: "white",
                                                background: "#696969",
                                                height:40,
                                                fontWeight:"bold"
                                            }}
                                            description={dayjs(cardItem.startDateTime).format(datetimeformat)}
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
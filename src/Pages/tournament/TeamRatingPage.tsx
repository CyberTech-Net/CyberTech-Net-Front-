import React, { useState } from 'react';
import { Table, Col, Image, Row, Space } from 'antd';
import { MainLoader } from '../../Common';
import dayjs from 'dayjs';
import { dateformat } from '../../Utility/SD';
import { useGetTeamPlayersQuery } from '../../Api/teamPlayerApi';
import { useGetTeamRatingQuery } from '../../Api/teamRatingApi';
import TeamRatingModel from '../../Interfaces/teamRatingModel';
import teamPlayerModel from '../../Interfaces/teamPlayerModel';

const TeamRatingPage: React.FC = () => {
    const { data: dataTeamPlayer } = useGetTeamPlayersQuery(null);
    const { data, isLoading } = useGetTeamRatingQuery(null);
    const [selectedTeamId, setSelectedTeamId] = useState<string>("");

    const columns = [
        {
            title: <div className="centered-header">Команда</div>,
            dataIndex: 'teamNaim',
            key: 'teamNaim',
            render:
                (_: any, record: TeamRatingModel) => {
                    return (
                        <Space size={20}>
                            <Image src=
                                {`http://localhost:7152/api/storage/${record.imageId}`}
                                alt="no content"
                                style={{ width: '100%', maxWidth: '120px' }} />
                            <p style={{ textAlign: "center", marginTop:20  }}>{record.teamNaim}</p>
                        </Space>)
                }
        },
        {
            title: <div className="centered-header">Очки</div>,
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: <div className="centered-header">Кол-во побед</div>,
            dataIndex: 'winCount',
            key: 'winCount',
        },
        {
            title: <div className="centered-header">Кол-во поражений</div>,
            dataIndex: 'loseCount',
            key: 'loseCount',
        },
        {
            title: <div className="centered-header">Всего матчей</div>,
            dataIndex: 'matchCount',
            key: 'matchCount',
        },
        {
            title: <div className="centered-header">Прошедшая игра</div>,
            dataIndex: 'lastMatch',
            key: 'lastMatch',
            render: (text: string) => {
                return text ? dayjs(text).format(dateformat) : ""
            }
        },
        {
            title: <div className="centered-header">Предстоящая игра</div>,
            dataIndex: 'futureMatch',
            key: 'futureMatch',
            render: (text: string) => {
                return text ? dayjs(text).format(dateformat) : ""
            }
        },
    ];

    const columnsRender = [
        {
            title: <div className="centered-header">ФИО</div>,
            dataIndex: 'fio',
            key: 'fio',
            render: (_: any, record: teamPlayerModel) => {
                return (
                    <Space size={20}>
                        <Image src=
                            {`http://localhost:7152/api/storage/${record.player.imageId}`}
                            alt="no content"
                            style={{ width: '100%', maxWidth: '120px' }} />
                        <p style={{ textAlign: "center", marginTop: 20 }}>{record.fio}</p>
                        <Image src=
                            {`http://localhost:7152/api/storage/${record.player.country.imageId}`}
                            alt="no content"
                            style={{ width: '100%', maxWidth: '120px' }} />
                    </Space>)
            }
        },
        {
            title: <div className="centered-header">Год вступления</div>,
            dataIndex: 'year1',
            key: 'year1',
        },
        {
            title: <div className="centered-header">Год выхода</div>,
            dataIndex: 'year2',
            key: 'year2',
        },
    ];

    return (
        <>
            {isLoading ? (
                <MainLoader />
            ) : (
                <div className="p-5">
                    <Row>
                        <Col xs={24} md={{ span: 16, offset: 4 }}>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h1 style={{fontFamily:"cursive"}}>Рейтинг команд</h1>
                            </div>
                            <Table className="custom-table" dataSource={data} columns={columns} rowKey="id" expandable={
                                {
                                    rowExpandable: (record) => true,
                                    defaultExpandAllRows: false,
                                    defaultExpandedRowKeys: [],
                                    expandRowByClick: true,
                                    onExpandedRowsChange(expandedKeys) {
                                        console.log("expendedKeys:" + expandedKeys)
                                        // берем последний 
                                        setSelectedTeamId(expandedKeys[expandedKeys.length - 1]?.toString())
                                    },
                                    // раскрывается только 1 узел
                                    expandedRowKeys: [selectedTeamId],
                                    expandedRowRender: (record: TeamRatingModel) => {
                                        return (
                                            <div style={{ paddingTop: "1em", paddingBottom: "1em" }}>
                                                <Row>
                                                    <Col xs={24} md={{ span: 20, offset: 2}}>
                                                        <Table 
                                                            className="custom-table"
                                                            rowKey="id"
                                                            columns={columnsRender}
                                                            dataSource={dataTeamPlayer.filter((item: { team: { id: string; }; }) => item.team.id === selectedTeamId)}
                                                            pagination={false}
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>)
                                    }
                                }
                            }
                                size="small" />
                        </Col>
                    </Row>
                </div>
            )}
        </>
    );
};

export default TeamRatingPage;
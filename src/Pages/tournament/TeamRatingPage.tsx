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
            title: 'Команда',
            dataIndex: 'teamNaim',
            key: 'teamNaim',
            render:
                (_: any, record: TeamRatingModel) => {
                    return (
                        <Space size={20}>
                            <Image src=
                                {record.imageId ? `http://localhost:7152/api/storage/${record.imageId}` : require("../../Assets/nocontent.png")}
                                alt="no content"
                                style={{ width: '100%', maxWidth: '120px' }} />
                            <p style={{ textAlign: "center" }}>{record.teamNaim}</p>
                        </Space>)
                }
        },
        {
            title: 'Очки',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Кол-во побед',
            dataIndex: 'winCount',
            key: 'winCount',
        },
        {
            title: 'Кол-во поражений',
            dataIndex: 'loseCount',
            key: 'loseCount',
        },
        {
            title: 'Всего матчей',
            dataIndex: 'matchCount',
            key: 'matchCount',
        },
        {
            title: 'Последняя игра',
            dataIndex: 'lastMatch',
            key: 'lastMatch',
            render: (text: string) => {
                return text ? dayjs(text).format(dateformat) : ""
            }
        },
        {
            title: 'Предстоящая игра',
            dataIndex: 'futureMatch',
            key: 'futureMatch',
            render: (text: string) => {
                return text ? dayjs(text).format(dateformat) : ""
            }
        },
    ];

    const columnsRender = [
        {
            title: 'ФИО',
            dataIndex: 'fio',
            key: 'fio',
            render: (_: any, record: teamPlayerModel) =>
                {
                    return (
                        <Space size={10}>
                <Image src=
                    {record.player.imageId ? `http://localhost:7152/api/storage/${record.player.imageId}` : require("../../Assets/nocontent.png")}
                    alt="no content"
                    style={{ width: '100%', maxWidth: '120px' }} />
                    <p style={{ textAlign: "center" }}>{record.fio}</p>
                <Image src=
                    {record.player.country.imageId ? `http://localhost:7152/api/storage/${record.player.country.imageId}` : require("../../Assets/nocontent.png")}
                    alt="no content"
                    style={{ width: '100%', maxWidth: '120px', marginTop:-25 }} />
                    
                </Space>)}
        },
        {
            title: 'Год вступления',
            dataIndex: 'year1',
            key: 'year1',
        },
        {
            title: 'Год выхода',
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
                                <h1 className="text-success">Рейтинг команд</h1>
                            </div>
                            <Table dataSource={data} columns={columns} rowKey="id" expandable={
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
                                            <div style={{ paddingTop: "1em", height: "Auto" }}>
                                                <Row>
                                                    <Col xs={24} md={{ span: 20, offset: 2 }}>
                                                        <Table
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
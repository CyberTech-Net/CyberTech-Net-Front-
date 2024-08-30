import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Col, Row, InputNumber } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetTournamentsQuery, useDeleteTournamentMutation, useCreateTournamentMutation, useUpdateTournamentMutation } from '../../Api/tournamentApi';
import TournamentModel from '../../Interfaces/tournamentModel';
import MatchModel from '../../Interfaces/matchModel';
import { MainLoader } from '../../Common';
import { useDispatch } from 'react-redux';
import { setTournament } from '../../Storage/Redux/tournamentSlice';
import { toastNotify } from '../../Helper';
import { toast } from 'react-toastify';
import { ButtonGroup } from 'react-bootstrap';
import dayjs from 'dayjs';
import { dateformat, datetimeformat, tournamentType } from '../../Utility/SD';
import { useCreateMatchMutation, useDeleteMatchMutation, useGetMatchesQuery, useUpdateMatchMutation } from '../../Api/matchApi';
import { setMatch } from '../../Storage/Redux/matchSlice';
import { useGetTeamsQuery } from '../../Api/teamApi';
import teamModel from '../../Interfaces/teamModel';
import gameTypeModel from '../../Interfaces/gameTypeModel';
import { useGetGameTypesQuery } from '../../Api/gameTypeApi';

const TournamentPage: React.FC = () => {
  const [formTournament] = Form.useForm<TournamentModel>();
  const [formMatch] = Form.useForm<MatchModel>();
  const [isModalMatchVisible, setIsModalMatchVisible] = useState<boolean>(false);
  const [isModalTournamentVisible, setIsModalTournamentVisible] = useState<boolean>(false);
  const [editingItemTournament, setEditingItemTournament] = useState<TournamentModel | null>(null);
  const [editingItemMatch, setEditingItemMatch] = useState<MatchModel | null>(null);
  const dispatch = useDispatch();
  const [deleteTournament] = useDeleteTournamentMutation();
  const [createTournament] = useCreateTournamentMutation();
  const [updateTournament] = useUpdateTournamentMutation();
  const [deleteMatch] = useDeleteMatchMutation();
  const [createMatch] = useCreateMatchMutation();
  const [updateMatch] = useUpdateMatchMutation();
  const { data: dataMatch } = useGetMatchesQuery(null);
  const { data, isLoading, refetch } = useGetTournamentsQuery(null);
  const { data: dataTeam } = useGetTeamsQuery(null);
  const { data: dataGameType } = useGetGameTypesQuery(null);
  const [selectedTournamentId, setSelectedTournamentId] = useState<string>("");

  const handleTournamentDelete = async (id: string) => {
    Modal.confirm({
      title: "Подтверждаете удаление записи?",
      okText: "Да",
      cancelText: "Нет",
      okType: "danger",
      onOk: () => {
        toast.promise(
          deleteTournament(id),
          {
            pending: 'Processing your request...',
            success: 'Tournament has been deleted Successfully 👌',
            error: 'Error encountered 🤯',
          },
          {
            theme: 'dark',
          }
        );
      }
    })
  };

  const handleMatchDelete = async (id: string) => {
    Modal.confirm({
      title: "Подтверждаете удаление записи?",
      okText: "Да",
      cancelText: "Нет",
      okType: "danger",
      onOk: () => {
        toast.promise(
          deleteMatch(id),
          {
            pending: 'Processing your request...',
            success: 'Match has been deleted Successfully 👌',
            error: 'Error encountered 🤯',
          },
          {
            theme: 'dark',
          }
        );
      }
    })
  };

  const showModalTournament = (item: TournamentModel | null) => {
    setEditingItemTournament(item);
    const itemNew = { ...item, gameTypeId: item?.gameType.id }
    formTournament.setFieldsValue(itemNew || {});
    formTournament.setFieldValue(["gameType"], itemNew.gameTypeId);
    formTournament.setFieldValue(["dateTournamentInit"], dayjs(itemNew.dateTournamentInit).format("YYYY-MM-DD"))
    formTournament.setFieldValue(["dateTournamentEnd"], dayjs(itemNew.dateTournamentEnd).format("YYYY-MM-DD"))
    setIsModalTournamentVisible(true);
  };

  const showModalMatch = (item: MatchModel | null) => {
    setEditingItemMatch(item);
    const itemNew = { ...item, firstTeamId: item?.firstTeam.id, secondTeamId: item?.secondTeam.id }
    formMatch.setFieldsValue(itemNew || {});
    formMatch.setFieldValue(["firstTeam"], itemNew.firstTeamId);
    formMatch.setFieldValue(["secondTeam"], itemNew.secondTeamId);
    formMatch.setFieldValue(["startDateTime"], dayjs(itemNew.startDateTime).format("YYYY-MM-DD HH:mm"))
    setIsModalMatchVisible(true);
  };

  const handleTournamentCancel = () => {
    setIsModalTournamentVisible(false);
    formTournament.resetFields();
    setEditingItemTournament(null);
  };

  const handleMatchCancel = () => {
    setIsModalMatchVisible(false);
    formMatch.resetFields();
    setEditingItemMatch(null);
  };

  const onFinishTournament = async (values: TournamentModel) => {
    const dataNew = { ...values, gameTypeId: values.gameType }
    try {
      if (editingItemTournament) {
        await updateTournament({ data: dataNew, id: editingItemTournament.id }).unwrap();
        toastNotify('Record updated successfully');
      } else {
        console.log(values);
        await createTournament(dataNew).unwrap();
        toastNotify('Record created successfully');
      }
      setIsModalTournamentVisible(false);
      formTournament.resetFields();
      setEditingItemTournament(null);
      // Refresh the data
      const updatedData = await refetch();
      if (updatedData.data) {
        dispatch(setTournament(updatedData.data));
      }
    } catch (error) {
      toastNotify('An error occurred', "error");
    }
  };

  const onFinishMatch = async (values: MatchModel) => {
    const dataNew = { ...values, firstTeamId: values.firstTeam, secondTeamId: values.secondTeam, tournamentId: selectedTournamentId }
    try {
      console.log(dataNew);
      if (editingItemMatch) {
        await updateMatch({ data: dataNew, id: editingItemMatch.id }).unwrap();
        toastNotify('Record updated successfully');
      } else {
        console.log(values);
        await createMatch(dataNew).unwrap();
        toastNotify('Record created successfully');
      }
      setIsModalMatchVisible(false);
      formMatch.resetFields();
      setEditingItemMatch(null);
      // Refresh the data
      const updatedData = await refetch();
      if (updatedData.data) {
        dispatch(setMatch(updatedData.data));
      }
    } catch (error) {
      toastNotify('An error occurred', "error");
    }
  };

  const columns = [
    {
      title: <div className="centered-header">Наименование</div>,
      dataIndex: 'titleTournament',
      key: 'titleTournament',
    },
    {
      title: <div className="centered-header">Вид игры</div>,
      dataIndex: 'gameType',
      key: 'gameType',
      render: (gameType: gameTypeModel) => {
        return gameType.titleGame;
      }
    },
    {
      title: <div className="centered-header">Тип</div>,
      dataIndex: 'typeTournament',
      key: 'typeTournament',
    },
    {
      title: <div className="centered-header">Дата начала</div>,
      dataIndex: 'dateTournamentInit',
      key: 'dateTournamentInit',
      render: (text: string) => {
        return text ? dayjs(text).format(dateformat) : ""
      }
    },
    {
      title: <div className="centered-header">Дата окончания</div>,
      dataIndex: 'dateTournamentEnd',
      key: 'dateTournamentEnd',
      render: (text: string) => {
        return text ? dayjs(text).format(dateformat) : ""
      }
    },
    {
      title: <div className="centered-header">Место проведения</div>,
      dataIndex: 'placeName',
      key: 'placeName',
    },
    {
      title: <div className="centered-header">Призовой фонд</div>,
      dataIndex: 'earndTournament',
      key: 'earndTournament',
      render: (text: string) => {
        return text ? "$" + text : ""
      }
    },
    {
      title: '',
      key: 'action',
      render: (_: any, record: TournamentModel) => (
        <>
          <ButtonGroup aria-label="Basic example">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModalTournament(record)} />
            <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} className="mx-2" onClick={() => handleTournamentDelete(record.id)} />
          </ButtonGroup>
        </>
      ),
    },
  ];

  const columnsRender = [
    {
      title: <div className="centered-header">Команда 1</div>,
      dataIndex: 'firstTeam',
      key: 'firstTeam',
      render: (firstTeam: teamModel) => {
        return firstTeam.titleTeam;
      }
    },
    {
      title: <div className="centered-header">Команда 2</div>,
      dataIndex: 'secondTeam',
      key: 'secondTeam',
      render: (secondTeam: teamModel) => {
        return secondTeam.titleTeam;
      }
    },
    {
      title: <div className="centered-header">Старт</div>,
      dataIndex: 'startDateTime',
      key: 'startDateTime',
      render: (text: string) => {
        return dayjs(text).format(datetimeformat)
      }
    },
    {
      title: '',
      key: 'action',
      render: (_: any, record: MatchModel) => (
        <>
          <ButtonGroup aria-label="Basic example">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModalMatch(record)} />
            <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} className="mx-2" onClick={() => handleMatchDelete(record.id)} />
          </ButtonGroup>
        </>
      ),
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
                <h1 style={{ fontFamily: "cursive" }}>Турниры и матчи</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => showModalTournament(null)}>
                  Добавить турнир
                </Button>
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
                    setSelectedTournamentId(expandedKeys[expandedKeys.length - 1]?.toString())
                  },
                  // раскрывается только 1 узел
                  expandedRowKeys: [selectedTournamentId],
                  expandedRowRender: (record: TournamentModel) => {
                    return (
                      <div style={{ paddingTop: "1em", height: "Auto" }}>
                        <Row>
                          <Col xs={24} md={{ span: 20, offset: 2 }}>
                            <div style={{ float: 'right', paddingBottom: 10 }}>
                              <Button type="primary" icon={<PlusOutlined />} onClick={() => showModalMatch(null)}>
                                Добавить матч
                              </Button>
                            </div>
                            <Table className="custom-table"
                              rowKey="id"
                              columns={columnsRender}
                              dataSource={dataMatch.filter((item: { tournament: { id: string; }; }) => item.tournament.id === selectedTournamentId)}
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
          <Modal
            title={editingItemTournament ? "Изменение записи" : "Добавление записи"}
            open={isModalTournamentVisible}
            onCancel={handleTournamentCancel}
            footer={null}
          >
            <Form<TournamentModel> form={formTournament} onFinish={onFinishTournament} layout="vertical">
              <Form.Item name="titleTournament" label="Наименование турнира" rules={[{ required: true }]}>
                <Input maxLength={150} />
              </Form.Item>
              <Form.Item name="gameType" label="Вид игры" rules={[{ required: true }]}>
                <Select
                  placeholder="Выберите вид игры">
                  {dataGameType?.map((gameType: gameTypeModel) => (
                    <Select.Option key={gameType.id} value={gameType.id}>
                      {gameType.titleGame}
                    </Select.Option>))}
                </Select>
              </Form.Item>
              <Form.Item name="typeTournament" label="Тип турнира" rules={[{ required: true }]}>
                <Select
                  placeholder="Выберите тип"
                >
                  {tournamentType?.map((Item) =>
                  (
                    <option key={Item} value={Item}>
                      {Item}
                    </option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="dateTournamentInit" label="Дата начала" rules={[{ required: true }]}>
                <Input type="date" />
              </Form.Item>
              <Form.Item name="dateTournamentEnd" label="Дата окончания" rules={[{ required: true }]}>
                <Input type="date" />
              </Form.Item>
              <Form.Item name="placeName" label="Место проведения" rules={[{ required: true }]}>
                <Input maxLength={150} />
              </Form.Item>
              <Form.Item name="earndTournament" label="Призовой фонд" rules={[{ required: true }]}>
                <InputNumber prefix="$" style={{ width: '50%' }} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {editingItemTournament ? "Update" : "Create"}
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title={editingItemMatch ? "Изменение записи" : "Добавление записи"}
            open={isModalMatchVisible}
            onCancel={handleMatchCancel}
            footer={null}
          >
            <Form<MatchModel> form={formMatch} onFinish={onFinishMatch} layout="vertical">
              <Form.Item name="firstTeam" label="Команда 1" rules={[{ required: true }]}>
                <Select
                  placeholder="Выберите команду 1">
                  {dataTeam?.map((team: teamModel) => (
                    <Select.Option key={team.id} value={team.id}>
                      {team.titleTeam}
                    </Select.Option>))}
                </Select>
              </Form.Item>
              <Form.Item name="secondTeam" label="Команда 2" rules={[{ required: true }]}>
                <Select
                  placeholder="Выберите команду 2">
                  {dataTeam?.map((team: teamModel) => (
                    <Select.Option key={team.id} value={team.id}>
                      {team.titleTeam}
                    </Select.Option>))}
                </Select>
              </Form.Item>
              <Form.Item name="startDateTime" label="Старт" rules={[{ required: true }]}>
                <Input type="datetime-local" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {editingItemMatch ? "Update" : "Create"}
                </Button>
              </Form.Item>
            </Form>
          </Modal>

        </div>
      )}
    </>
  );
};

export default TournamentPage;
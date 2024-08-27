import React, { useState } from 'react';
import { Table, Button, Image, Modal, Form, Input, Select, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetTeamsQuery, useDeleteTeamMutation, useCreateTeamMutation, useUpdateTeamMutation } from '../../Api/teamApi';
import TeamModel from '../../Interfaces/teamModel';
import TeamPlayerModel from '../../Interfaces/teamPlayerModel';
import { MainLoader } from '../../Common';
import { useDispatch } from 'react-redux';
import { setTeam } from '../../Storage/Redux/teamSlice';
import ImageUploader from '../../Common/ImageUploader';
import { toastNotify } from '../../Helper';
import { toast } from 'react-toastify';
import { ButtonGroup } from 'react-bootstrap';
import dayjs from 'dayjs';
import { dateformat } from '../../Utility/SD';
import { useCreateTeamPlayerMutation, useDeleteTeamPlayerMutation, useGetTeamPlayersQuery, useUpdateTeamPlayerMutation } from '../../Api/teamPlayerApi';
import { setTeamPlayer } from '../../Storage/Redux/teamPlayerSlice';
import { useGetPlayersQuery } from '../../Api/playerApi';
import playerModel from '../../Interfaces/playerModel';

const TeamPage: React.FC = () => {
  const [formTeam] = Form.useForm<TeamModel>();
  const [formTeamPlayer] = Form.useForm<TeamPlayerModel>();
  const [isModalTeamPlayerVisible, setIsModalTeamPlayerVisible] = useState<boolean>(false);
  const [isModalTeamVisible, setIsModalTeamVisible] = useState<boolean>(false);
  const [editingItemTeam, setEditingItemTeam] = useState<TeamModel | null>(null);
  const [editingItemTeamPlayer, setEditingItemTeamPlayer] = useState<TeamPlayerModel | null>(null);
  const dispatch = useDispatch();
  const [deleteTeam] = useDeleteTeamMutation();
  const [createTeam] = useCreateTeamMutation();
  const [updateTeam] = useUpdateTeamMutation();
  const [deleteTeamPlayer] = useDeleteTeamPlayerMutation();
  const [createTeamPlayer] = useCreateTeamPlayerMutation();
  const [updateTeamPlayer] = useUpdateTeamPlayerMutation();
  const { data: dataTeamPlayer } = useGetTeamPlayersQuery(null);
  const { data, isLoading, refetch } = useGetTeamsQuery(null);
  const { data: dataPlayer } = useGetPlayersQuery(null);
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");

  const handleImageIdChange = (id: string | null) => {
    formTeam.setFieldsValue({ imageId: id || undefined });
    console.log('Image ID in parent component:', id);
  };

  const handleTeamDelete = async (id: string) => {
    toast.promise(
      deleteTeam(id),
      {
        pending: 'Processing your request...',
        success: 'Team has been deleted Successfully 👌',
        error: 'Error encountered 🤯',
      },
      {
        theme: 'dark',
      }
    );
  };

  const handleTeamPlayerDelete = async (id: string) => {
    toast.promise(
      deleteTeamPlayer(id),
      {
        pending: 'Processing your request...',
        success: 'TeamPlayer has been deleted Successfully 👌',
        error: 'Error encountered 🤯',
      },
      {
        theme: 'dark',
      }
    );
  };

  const showModalTeam = (item: TeamModel | null) => {
    setEditingItemTeam(item);
    formTeam.setFieldsValue(item || {});
    formTeam.setFieldValue(["founded"], dayjs(item?.founded).format("YYYY-MM-DD"))
    setIsModalTeamVisible(true);
  };

  const showModalTeamPlayer = (item: TeamPlayerModel | null) => {
    setEditingItemTeamPlayer(item);
    const itemNew = { ...item, playerId: item?.player.id }
    formTeamPlayer.setFieldsValue(itemNew || {});
    formTeamPlayer.setFieldValue(["player"], itemNew.playerId);
    setIsModalTeamPlayerVisible(true);
  };

  const handleTeamCancel = () => {
    setIsModalTeamVisible(false);
    formTeam.resetFields();
    setEditingItemTeam(null);
  };

  const handleTeamPlayerCancel = () => {
    setIsModalTeamPlayerVisible(false);
    formTeamPlayer.resetFields();
    setEditingItemTeamPlayer(null);
  };

  const onFinishTeam = async (values: TeamModel) => {
    try {
      if (editingItemTeam) {
        await updateTeam({ data: values, id: editingItemTeam.id }).unwrap();
        toastNotify('Record updated successfully');
      } else {
        console.log(values);
        await createTeam(values).unwrap();
        toastNotify('Record created successfully');
      }
      setIsModalTeamVisible(false);
      formTeam.resetFields();
      setEditingItemTeam(null);
      // Refresh the data
      const updatedData = await refetch();
      if (updatedData.data) {
        dispatch(setTeam(updatedData.data));
      }
    } catch (error) {
      toastNotify('An error occurred', "error");
    }
  };

  const onFinishTeamPlayer = async (values: TeamPlayerModel) => {
    try {
      const dataNew = { ...values, playerId: values.player, teamId: selectedTeamId }
      console.log(dataNew);
      if (editingItemTeamPlayer) {
        await updateTeamPlayer({ data: dataNew, id: editingItemTeamPlayer.id }).unwrap();
        toastNotify('Record updated successfully');
      } else {
        console.log(values);
        await createTeamPlayer(dataNew).unwrap();
        toastNotify('Record created successfully');
      }
      setIsModalTeamPlayerVisible(false);
      formTeamPlayer.resetFields();
      setEditingItemTeamPlayer(null);
      // Refresh the data
      const updatedData = await refetch();
      if (updatedData.data) {
        dispatch(setTeamPlayer(updatedData.data));
      }
    } catch (error) {
      toastNotify('An error occurred', "error");
    }
  };

  const columns = [
    {
      title: 'Наименование',
      dataIndex: 'titleTeam',
      key: 'titleTeam',
    },
    {
      title: 'Дата образования',
      dataIndex: 'founded',
      key: 'founded',
      render: (text: string) => {
        return dayjs(text).format(dateformat)
      }
    },
    {
      title: 'Эмблема',
      dataIndex: 'imageId',
      key: 'imageId',
      render: (imageId: string) =>
        <Image src=
          {imageId ? `http://localhost:7152/api/storage/${imageId}` : require("../../Assets/nocontent.png")}
          alt="no content"
          style={{ width: '100%', maxWidth: '120px' }} />,
    },
    {
      title: '',
      key: 'action',
      render: (_: any, record: TeamModel) => (
        <>
          <ButtonGroup aria-label="Basic example">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModalTeam(record)} />
            <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} className="mx-2" onClick={() => handleTeamDelete(record.id)} />
          </ButtonGroup>
        </>
      ),
    },
  ];

  const columnsRender = [
    {
      title: 'ФИО',
      dataIndex: 'fio',
      key: 'fio',
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
    {
      title: '',
      key: 'action',
      render: (_: any, record: TeamPlayerModel) => (
        <>
          <ButtonGroup aria-label="Basic example">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModalTeamPlayer(record)} />
            <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} className="mx-2" onClick={() => handleTeamPlayerDelete(record.id)} />
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
                <h1 className="text-success">Команды</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => showModalTeam(null)}>
                  Добавить команду
                </Button>
              </div>
              <Table dataSource={data} columns={columns} rowKey="id" expandable={
                {
                  rowExpandable: (record) => true,
                  defaultExpandAllRows: false,
                  defaultExpandedRowKeys: [],
                  expandRowByClick: true,

                  onExpandedRowsChange(expandedKeys) {
                    // берем последний 
                    setSelectedTeamId(expandedKeys[expandedKeys.length - 1]?.toString())

                  },
                  // раскрывается только 1 узел
                  expandedRowKeys: [selectedTeamId],
                  expandedRowRender: (record: TeamModel) => {
                    return (
                      <div style={{ paddingTop: "1em", height: "Auto" }}>
                        <Row>
                          <Col xs={24} md={{ span: 20, offset: 2}}>

                            <div style={{ float: 'right' }}>
                              <Button type="primary" icon={<PlusOutlined />} onClick={() => showModalTeamPlayer(null)}>
                                Добавить игрока
                              </Button>
                            </div>
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
          <Modal
            title={editingItemTeam ? "Изменение записи" : "Добавление записи"}
            open={isModalTeamVisible}
            onCancel={handleTeamCancel}
            footer={null}
          >
            <Form<TeamModel> form={formTeam} onFinish={onFinishTeam} layout="vertical">
              <Form.Item name="titleTeam" label="Наименование" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="founded" label="Дата образования" rules={[{ required: true }]}>
                <Input type="date" />
              </Form.Item>
              <Form.Item name="imageId" label="Ссылка на эмблему" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <ImageUploader onImageIdChange={handleImageIdChange} />
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {editingItemTeam ? "Update" : "Create"}
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title={editingItemTeamPlayer ? "Изменение записи" : "Добавление записи"}
            open={isModalTeamPlayerVisible}
            onCancel={handleTeamPlayerCancel}
            footer={null}
          >
            <Form<TeamPlayerModel> form={formTeamPlayer} onFinish={onFinishTeamPlayer} layout="vertical">
              <Form.Item name="player" label="ФИО игрока" rules={[{ required: true }]}>
                <Select
                  placeholder="Select player">
                  {dataPlayer?.map((player: playerModel) => (
                    <Select.Option key={player.id} value={player.id}>
                      {player.firstName + ' ' + player.secondName}
                    </Select.Option>))}
                </Select>
              </Form.Item>
              <Form.Item name="year1" label="Год вступления" rules={[{ required: true }]}>
                <Input type="number"/>
              </Form.Item>
              <Form.Item name="year2" label="Год выхода">
                <Input type="number"/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {editingItemTeamPlayer ? "Update" : "Create"}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default TeamPage;

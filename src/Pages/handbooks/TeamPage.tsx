import React, { useState } from 'react';
import { Table, Button, Image, Modal, Form, Input } from 'antd';
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
  const { data: dataTeamPlayer, isLoading: isLoadingTeamPlayer, refetch: refetchTeamPlayer  } = useGetTeamPlayersQuery(null);
  const { data, isLoading, refetch } = useGetTeamsQuery(null);

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

  const showModalTeamPlayer = (item: TeamModel | null) => {
    /*setEditingItemTeam(item);
    formTeam.setFieldsValue(item || {});
    formTeam.setFieldValue(["founded"], dayjs(item?.founded).format("YYYY-MM-DD"))
    setIsModalTeamVisible(true);*/
  };

  const handleTeamCancel = () => {
    setIsModalTeamVisible(false);
    formTeam.resetFields();
    setEditingItemTeam(null);
  };

  const onFinishTeam = async (values: TeamModel) => {
    try {
      if (editingItemTeam) {
        await updateTeam({ data: values, id: editingItemTeam.id }).unwrap();
        toastNotify('Team updated successfully');
      } else {
        console.log(values);
        await createTeam(values).unwrap();
        toastNotify('Team created successfully');
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

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Team',
      dataIndex: 'titleTeam',
      key: 'titleTeam',
    },
    {
      title: 'Founded',
      dataIndex: 'founded',
      key: 'founded',
      render:(text:string)=>
        {
          return dayjs(text).format(dateformat)
        }
    },
    {
      title: 'Image',
      dataIndex: 'imageId',
      key: 'imageId',
      render: (imageId: string) =>
        <Image src=
          {imageId ? `http://localhost:7152/api/storage/${imageId}` : require("../../Assets/nocontent.png")}
          alt="no content"
          style={{ width: '100%', maxWidth: '120px' }} />,
    },
    {
      title: 'Action',
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

  const expandedRowRender = () => {
    const columns = [
      {
        title: 'TeamId',
        dataIndex: 'TeamId',
        key: 'TeamId',
      },
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Fio',
        dataIndex: 'fio',
        key: 'fio',
      },
      {
        title: 'Year1',
        dataIndex: 'year1',
        key: 'year1',
      },
      {
        title: 'Year2',
        dataIndex: 'year2',
        key: 'year2',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_: any, record: TeamModel) => (
          <>
            <ButtonGroup aria-label="Basic example">
              <Button type="primary" shape="circle" icon={<PlusOutlined />} className="mx-2" onClick={() => showModalTeamPlayer(null)} />
              <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModalTeamPlayer(record)} />
              <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} className="mx-2" onClick={() => handleTeamPlayerDelete(record.id)} />
            </ButtonGroup>
          </>
        ),
      },
    ];
    return <Table columns={columns} dataSource={dataTeamPlayer} pagination ={false} />;
  }


  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <div className="p-5">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h1 className="text-success">List of Teams</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModalTeam(null)}>
              Add Team
            </Button>
          </div>
          <Table dataSource={data} columns={columns} rowKey="id" expandable={
            {
              expandedRowRender,
              defaultExpandedRowKeys:['10'],
            }
          }
          size="small" />
          <Modal
            title={editingItemTeam ? "Edit Team" : "Add new Team"}
            open={isModalTeamVisible}
            onCancel={handleTeamCancel}
            footer={null}
          >
            <Form<TeamModel> form={formTeam} onFinish={onFinishTeam} layout="vertical">
              <Form.Item name="titleTeam" label="Team" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="founded" label="Founded" rules={[{ required: true }]}>
                <Input type="date" />
              </Form.Item>
              <Form.Item name="imageId" label="Image ID" rules={[{ required: true }]}>
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
        </div>
      )}
    </>
  );
};

export default TeamPage;

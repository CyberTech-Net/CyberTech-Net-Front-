import React, { useState } from 'react';
import { Table, Button, Image, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetGameTypesQuery, useDeleteGameTypeMutation, useCreateGameTypeMutation, useUpdateGameTypeMutation } from '../../Api/gameTypeApi';
import GameTypeModel from '../../Interfaces/gameTypeModel';
import { MainLoader } from '../../Common';
import { useDispatch } from 'react-redux';
import { setGameType } from '../../Storage/Redux/gameTypeSlice';
import ImageUploader from '../../Common/ImageUploader';
import { toastNotify } from '../../Helper';
import { toast } from 'react-toastify';
import { ButtonGroup } from 'react-bootstrap';
import { gameCategory } from '../../Utility/SD';

const GameTypePage: React.FC = () => {
  const [form] = Form.useForm<GameTypeModel>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<GameTypeModel | null>(null);
  const dispatch = useDispatch();
  const [deleteGameType] = useDeleteGameTypeMutation();
  const [createGameType] = useCreateGameTypeMutation();
  const [updateGameType] = useUpdateGameTypeMutation();
  const { data, isLoading, refetch } = useGetGameTypesQuery(null);

  const handleImageIdChange = (id: string | null) => {
    form.setFieldsValue({ imageId: id || undefined });
    console.log('Image ID in parent component:', id);
  };

  const handleGameTypeDelete = async (id: string) => {
    toast.promise(
      deleteGameType(id),
      {
        pending: 'Processing your request...',
        success: 'GameType has been deleted Successfully 👌',
        error: 'Error encountered 🤯',
      },
      {
        theme: 'dark',
      }
    );
  };

  const showModal = (item: GameTypeModel | null) => {
    setEditingItem(item);
    form.setFieldsValue(item || {});
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);
  };

  const onFinish = async (values: GameTypeModel) => {
    try {
      if (editingItem) {
        await updateGameType({ data: values, id: editingItem.id }).unwrap();
        toastNotify('GameType updated successfully');
      } else {
        console.log(values);
        await createGameType(values).unwrap();
        toastNotify('GameType created successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingItem(null);
      // Refresh the data
      const updatedData = await refetch();
      if (updatedData.data) {
        dispatch(setGameType(updatedData.data));
      }
    } catch (error) {
      toastNotify('An error occurred', "error");
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'titleGame',
      key: 'titleGame',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
      render: (_: any, record: GameTypeModel) => (
        <>
          <ButtonGroup aria-label="Basic example">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModal(record)} />
            <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} className="mx-2" onClick={() => handleGameTypeDelete(record.id)} />
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
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h1 className="text-success">List of GameTypes</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(null)}>
              Add GameType
            </Button>
          </div>
          <Table dataSource={data} columns={columns} rowKey="id" />
          <Modal
            title={editingItem ? "Edit GameType" : "Add new GameType"}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <Form<GameTypeModel> form={form} onFinish={onFinish} layout="vertical">
              <Form.Item name="titleGame" label="Title" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                <Select 
                  placeholder="Select category"
                >                
                  {gameCategory?.map((Item) => 
                  (
                    <option key={Item} value={Item}>
                      {Item}
                      </option>
                  ))}                
                </Select>
              </Form.Item>

              <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="imageId" label="Image ID" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <ImageUploader onImageIdChange={handleImageIdChange} />
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {editingItem ? "Update" : "Create"}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default GameTypePage;

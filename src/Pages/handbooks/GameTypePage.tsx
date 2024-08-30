import React, { useState } from 'react';
import { Table, Button, Image, Modal, Form, Input, Select, Row, Col } from 'antd';
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
import TextArea from 'antd/es/input/TextArea';

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
    Modal.confirm({
      title: "Подтверждаете удаление записи?",
      okText: "Да",
      cancelText: "Нет",
      okType: "danger",
      onOk: () => {
        toast.promise(
          deleteGameType(id),
          {
            pending: 'Processing your request...',
            success: 'GameType has been deleted Successfully 👌',
            error: 'Error encountered 🤯',
          },
          {
            theme: 'dark',
          });
      }
    })
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
        toastNotify('Record updated successfully');
      } else {
        console.log(values);
        await createGameType(values).unwrap();
        toastNotify('Record created successfully');
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
      title: <div className="centered-header">Наименование</div>,
      dataIndex: 'titleGame',
      key: 'titleGame',
    },
    {
      title: <div className="centered-header">Категория</div>,
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: <div className="centered-header">Описание</div>,
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: <div className="centered-header">Картинка</div>,
      dataIndex: 'imageId',
      key: 'imageId',
      render: (imageId: string) =>
        <Image src=
          {`http://localhost:7152/api/storage/${imageId}`}
          alt="no content"
          style={{ width: '100%', maxWidth: '120px' }} />,
    },
    {
      title: '',
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
          <Row>
            <Col xs={24} md={{ span: 16, offset: 4 }}>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h1 style={{ fontFamily: "cursive" }}>Виды игр</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(null)}>
                  Добавить
                </Button>
              </div>
              <Table className="custom-table" dataSource={data} columns={columns} rowKey="id" />
            </Col>
          </Row>
          <Modal
            title={editingItem ? "Изменение записи" : "Добавление записи"}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <Form<GameTypeModel> form={form} onFinish={onFinish} layout="vertical">
              <Form.Item name="titleGame" label="Наименование" rules={[{ required: true }]}>
                <Input maxLength={50} />
              </Form.Item>
              <Form.Item name="category" label="Категория" rules={[{ required: true }]}>
                <Select
                  placeholder="Выберите категорию"
                >
                  {gameCategory?.map((Item) =>
                  (
                    <option key={Item} value={Item}>
                      {Item}
                    </option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="description" label="Описание" rules={[{ required: true }]}>
                <TextArea rows={4} maxLength={500} />
              </Form.Item>
              <Form.Item name="imageId" label="Ссылка на картинку" rules={[{ required: true }]}>
                <Input maxLength={50} />
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

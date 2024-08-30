import React, { useState } from 'react';
import { Table, Button, Image, Modal, Form, Input, Select, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetPlayersQuery, useDeletePlayerMutation, useCreatePlayerMutation, useUpdatePlayerMutation } from '../../Api/playerApi';
import PlayerModel from '../../Interfaces/playerModel';
import { MainLoader } from '../../Common';
import { useDispatch } from 'react-redux';
import { setPlayer } from '../../Storage/Redux/playerSlice';
import ImageUploader from '../../Common/ImageUploader';
import { toastNotify } from '../../Helper';
import { toast } from 'react-toastify';
import { ButtonGroup } from 'react-bootstrap';
import { useGetCountriesQuery } from '../../Api/countryApi';
import countryModel from '../../Interfaces/countryModel';
import { dateformat } from '../../Utility/SD';
import dayjs from 'dayjs';

const PlayerPage: React.FC = () => {
  const [form] = Form.useForm<PlayerModel>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<PlayerModel | null>(null);

  const dispatch = useDispatch();
  const [deletePlayer] = useDeletePlayerMutation();
  const [createPlayer] = useCreatePlayerMutation();
  const [updatePlayer] = useUpdatePlayerMutation();
  const { data, isLoading, refetch } = useGetPlayersQuery(null);
  const { data: dataCountry } = useGetCountriesQuery(null);

  const handlePlayerDelete = async (id: string) => {
    Modal.confirm({
      title: "Подтверждаете удаление записи?",
      okText: "Да",
      cancelText: "Нет",
      okType: "danger",
      onOk: () => {
        toast.promise(
          deletePlayer(id),
          {
            pending: 'Processing your request...',
            success: 'Player has been deleted Successfully 👌',
            error: 'Error encountered 🤯',
          },
          {
            theme: 'dark',
          });
      }
    })
  };

  const handleImageIdChange = (id: string | null) => {
    form.setFieldsValue({ imageId: id || undefined }); // Convert null to undefined
    console.log('Image ID in parent component:', id);
  };

  const showModal = (item: PlayerModel | null) => {
    setEditingItem(item);
    const itemNew = { ...item, countryId: item?.country.id }
    form.setFieldsValue(itemNew || {});
    form.setFieldValue(["country"], itemNew.countryId);
    form.setFieldValue(["birthDate"], dayjs(itemNew.birthDate).format("YYYY-MM-DD"))
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);
  };

  const onFinish = async (values: PlayerModel) => {
    try {
      const dataNew = { ...values, countryId: values.country }
      if (editingItem) {
        console.log(dataNew);
        console.log(editingItem.id);
        await updatePlayer({ data: dataNew, id: editingItem.id }).unwrap();
        toastNotify('Record updated successfully');
      } else {
        await createPlayer(dataNew).unwrap();
        toastNotify('Record created successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingItem(null);
      // Refresh the data
      const updatedData = await refetch();
      if (updatedData.data) {
        dispatch(setPlayer(updatedData.data));
      }
    } catch (error) {
      toastNotify('An error occurred', "error");
    }
  };

  const columns = [
    {
      title: <div className="centered-header">Имя</div>,
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: <div className="centered-header">Фамилия</div>,
      dataIndex: 'secondName',
      key: 'secondName',
    },
    {
      title: <div className="centered-header">Ник</div>,
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: <div className="centered-header">Дата рождения</div>,
      dataIndex: 'birthDate',
      key: 'birthDate',
      render: (text: string) => {
        return text ? dayjs(text).format(dateformat) : ""
      }
    },
    {
      title: <div className="centered-header">Страна</div>,
      dataIndex: 'country',
      key: 'country',
      render: (country: countryModel) => {
        return country.titleCountry;
      }
    },
    {
      title: <div className="centered-header">Фото</div>,
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
      render: (_: any, record: PlayerModel) => (
        <>
          <ButtonGroup aria-label="Basic example">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModal(record)} />
            <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} className="mx-2" onClick={() => handlePlayerDelete(record.id)} />
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
                <h1 style={{ fontFamily: "cursive" }}>Игроки</h1>
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
            <Form<PlayerModel> form={form} onFinish={onFinish} layout="vertical">
              <Form.Item name="firstName" label="Имя" rules={[{ required: true }]}>
                <Input maxLength={50} />
              </Form.Item>
              <Form.Item name="secondName" label="Фамилия" rules={[{ required: true }]}>
                <Input maxLength={50} />
              </Form.Item>
              <Form.Item name="nickName" label="Ник" rules={[{ required: true }]}>
                <Input maxLength={10} />
              </Form.Item>
              <Form.Item name="country" label="Страна" rules={[{ required: true }]}>
                <Select
                  placeholder="Выберите страну">
                  {dataCountry?.map((country: countryModel) => (
                    <Select.Option key={country.id} value={country.id}>
                      {country.titleCountry}
                    </Select.Option>))}
                </Select>
              </Form.Item>
              <Form.Item name="birthDate" label="Дата рождения" rules={[{ required: true }]}>
                <Input type="date" />
              </Form.Item>
              <Form.Item name="imageId" label="Ссылка на фото" rules={[{ required: true }]}>
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

export default PlayerPage;
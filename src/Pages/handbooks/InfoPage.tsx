import React, { useState } from 'react';
import { Table, Button, Image, Modal, Form, Input, Col, Row } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetInfoQuery, useDeleteInfoMutation, useCreateInfoMutation, useUpdateInfoMutation } from '../../Api/infoApi';
import InfoModel from '../../Interfaces/infoModel';
import { MainLoader } from '../../Common';
import { useDispatch } from 'react-redux';
import { setInfo } from '../../Storage/Redux/infoSlice';
import ImageUploader from '../../Common/ImageUploader';
import { toastNotify } from '../../Helper';
import { toast } from 'react-toastify';
import { ButtonGroup } from 'react-bootstrap';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { dateformat } from '../../Utility/SD';
import TextArea from 'antd/es/input/TextArea';


const InfoPage: React.FC = () => {
  const [form] = Form.useForm<InfoModel>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<InfoModel | null>(null);

  const dispatch = useDispatch();
  const [deleteInfo] = useDeleteInfoMutation();
  const [createInfo] = useCreateInfoMutation();
  const [updateInfo] = useUpdateInfoMutation();
  const { data, isLoading, refetch } = useGetInfoQuery(null);

  const handleImageIdChange = (id: string | null) => {
    form.setFieldsValue({ imageId: id || undefined }); // Convert null to undefined
    console.log('Image ID in parent component:', id);
  };

  const handleInfoDelete = async (id: string) => {
    toast.promise(
      deleteInfo(id),
      {
        pending: 'Processing your request...',
        success: 'Info has been deleted Successfully 👌',
        error: 'Error encountered 🤯',
      },
      {
        theme: 'dark',
      }
    );
  };

  const showModal = (item: InfoModel | null) => {
    setEditingItem(item);
    form.setFieldsValue(item || {});
    form.setFieldValue(["date"], dayjs(item?.date).format("YYYY-MM-DD"))
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);
  };

  const onFinish = async (values: InfoModel) => {
    try {
      if (editingItem) {
        await updateInfo({ data: values, id: editingItem.id }).unwrap();
        toastNotify('Record updated successfully');
      } else {
        console.log(values);
        await createInfo(values).unwrap();
        toastNotify('Record created successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingItem(null);
      // Refresh the data
      const updatedData = await refetch();
      if (updatedData.data) {
        dispatch(setInfo(updatedData.data));
      }
    } catch (error) {
      toastNotify('An error occurred:', "error");
    }
  };

  const columns: ColumnsType<InfoModel> = [
    {
      title: 'Заголовок',
      dataIndex: 'title',
      key: 'titleInfo',
    },
    {
      title: 'Текст',
      dataIndex: 'text',
      key: 'textInfo',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'dataInfo',
      render: (text: string) => {
        return text ? dayjs(text).format(dateformat) : ""
      }
    },
    {
      title: 'Картинка',
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
      render: (_: any, record: InfoModel) => (
        <>
          <ButtonGroup aria-label="Basic example">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModal(record)} />
            <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} className="mx-2" onClick={() => handleInfoDelete(record.id)} />
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
                <h1 className="text-success">Новости</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(null)}>
                  Add Info
                </Button>
              </div>
              <Table dataSource={data} columns={columns} rowKey="id" />
            </Col>
          </Row>
          <Modal
            title={editingItem ? "Изменение записи" : "Добавление записи"}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <Form<InfoModel> form={form} onFinish={onFinish} layout="vertical" >
              <Form.Item name="title" label="Заголовк" rules={[{ required: true }]}>
                <Input maxLength={50}/>
              </Form.Item>
              <Form.Item name="text" label="Текст" rules={[{ required: true }]}>
                <TextArea rows={8} maxLength={5000}/>
              </Form.Item>
              <Form.Item name="date" label="Дата" rules={[{ required: true }]}>
                <Input type='date' />
              </Form.Item>
              <Form.Item name="imageId" label="Ссылка на картинку" rules={[{ required: true }]}>
                <Input maxLength={50}/>
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

export default InfoPage;

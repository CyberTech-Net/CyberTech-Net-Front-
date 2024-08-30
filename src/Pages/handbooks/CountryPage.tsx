import React, { useState } from 'react';
import { Table, Button, Image, Modal, Form, Input, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetCountriesQuery, useDeleteCountryMutation, useCreateCountryMutation, useUpdateCountryMutation } from '../../Api/countryApi';
import CountryModel from '../../Interfaces/countryModel';
import { MainLoader } from '../../Common';
import { useDispatch } from 'react-redux';
import { setCountry } from '../../Storage/Redux/countrySlice';
import ImageUploader from '../../Common/ImageUploader';
import { toastNotify } from '../../Helper';
import { toast } from 'react-toastify';
import { ButtonGroup } from 'react-bootstrap';

const CountryPage: React.FC = () => {
  const [form] = Form.useForm<CountryModel>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<CountryModel | null>(null);
  const dispatch = useDispatch();
  const [deleteCountry] = useDeleteCountryMutation();
  const [createCountry] = useCreateCountryMutation();
  const [updateCountry] = useUpdateCountryMutation();
  const { data, isLoading, refetch } = useGetCountriesQuery(null);

  const handleImageIdChange = (id: string | null) => {
    form.setFieldsValue({ imageId: id || undefined });
    console.log('Image ID in parent component:', id);
  };

  const handleCountryDelete = async (id: string) => {
    Modal.confirm({
      title: "Подтверждаете удаление записи?",
      okText: "Да",
      cancelText: "Нет",
      okType: "danger",
      onOk: () => {
        toast.promise(
          deleteCountry(id),
          {
            pending: 'Processing your request...',
            success: 'Country has been deleted Successfully 👌',
            error: 'Error encountered 🤯',
          },
          {
            theme: 'dark',
          });
      }
    })};

    const showModal = (item: CountryModel | null) => {
      setEditingItem(item);
      form.setFieldsValue(item || {});
      setIsModalVisible(true);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
      form.resetFields();
      setEditingItem(null);
    };

    const onFinish = async (values: CountryModel) => {
      try {
        if (editingItem) {
          await updateCountry({ data: values, id: editingItem.id }).unwrap();
          toastNotify('Record updated successfully');
        } else {
          console.log(values);
          await createCountry(values).unwrap();
          toastNotify('Record created successfully');
        }
        setIsModalVisible(false);
        form.resetFields();
        setEditingItem(null);
        // Refresh the data
        const updatedData = await refetch();
        if (updatedData.data) {
          dispatch(setCountry(updatedData.data));
        }
      } catch (error) {
        toastNotify('An error occurred', "error");
      }
    };

    const columns = [
      {
        title: <div className="centered-header">Наименование</div>,
        dataIndex: 'titleCountry',
        key: 'titleCountry',
      },
      {
        title: <div className="centered-header">Флаг</div>,
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
        render: (_: any, record: CountryModel) => (
          <>
            <ButtonGroup aria-label="Basic example">
              <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModal(record)} />
              <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} className="mx-2" onClick={() => handleCountryDelete(record.id)} />
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
                <div className="d-flex align-items-center justify-content-between mb-4" >
                  <h1 style={{ fontFamily: "cursive" }}>Страны</h1>
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
              <Form<CountryModel> form={form} onFinish={onFinish} layout="vertical">
                <Form.Item name="titleCountry" label="Наименование" rules={[{ required: true }]}>
                  <Input maxLength={50} />
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

  export default CountryPage;

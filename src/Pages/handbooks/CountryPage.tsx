import React, { useState } from 'react';
import { Table, Button, Image, Modal, Form, Input } from 'antd';
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
    toast.promise(
      deleteCountry(id),
      {
        pending: 'Processing your request...',
        success: 'Country has been deleted Successfully 👌',
        error: 'Error encountered 🤯',
      },
      {
        theme: 'dark',
      }
    );
  };

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
        toastNotify('Country updated successfully');
      } else {
        console.log(values);
        await createCountry(values).unwrap();
        toastNotify('Country created successfully');
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
      title: 'Country',
      dataIndex: 'titleCountry',
      key: 'titleCountry',
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
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h1 className="text-success">List of Countries</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(null)}>
              Add Country
            </Button>
          </div>
          <Table dataSource={data} columns={columns} rowKey="id" />
          <Modal
            title={editingItem ? "Edit country" : "Add new country"}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <Form<CountryModel> form={form} onFinish={onFinish} layout="vertical">
              <Form.Item name="titleCountry" label="Country" rules={[{ required: true }]}>
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

export default CountryPage;

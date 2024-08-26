import React, { useState } from 'react';
import { Table, Button, Image, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetPlayersQuery, useDeletePlayerMutation, useCreatePlayerMutation, useUpdatePlayerMutation} from '../../Api/playerApi';
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
    toast.promise(
      deletePlayer(id),
      {
        pending: 'Processing your request...',
        success: 'Player has been deleted Successfully 👌',
        error: 'Error encountered 🤯',
      },
      {
        theme: 'dark',
      }
    );
  };

  const handleImageIdChange = (id: string | null) => {
    form.setFieldsValue({ imageId: id || undefined }); // Convert null to undefined
    console.log('Image ID in parent component:', id);
  };

  const showModal = (item: PlayerModel | null ) => {
    setEditingItem(item);
    const itemNew = {...item, countryId: item?.country.id}
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
      const dataNew = {...values,  countryId: values.country}
      if (editingItem) {
        console.log(dataNew);
        console.log(editingItem.id );
        await updatePlayer({ data:dataNew, id: editingItem.id }).unwrap();
        toastNotify('Player updated successfully');    
      } else {
        await createPlayer(dataNew).unwrap();
        toastNotify('Player created successfully');
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
      toastNotify('An error occurred',"error");
    }
  };

  const columns = [
    {
      title: 'firstName',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'secondName',
      dataIndex: 'secondName',
      key: 'secondName',
    },
    {
      title: 'NickName',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: 'birthDate',
      dataIndex: 'birthDate',
      key: 'birthDate',
      render:(text:string)=>
        {
          return dayjs(text).format(dateformat)
        }
    },
    {
      title: 'country',
      dataIndex: 'country',
      key: 'country',
      render: (country: countryModel) =>
        {
          return country.titleCountry;
        }
    },
    {
      title: 'Image',
      dataIndex: 'imageId',
      key: 'imageId',
      render: (imageId: string) => 
      <Image src=
          { imageId ? `http://localhost:7152/api/storage/${imageId}` : require("../../Assets/nocontent.png")} 
          alt="no content" 
          style={{ width: '100%', maxWidth: '120px' }} />,
    },
    {
      title: 'Action',
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
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h1 className="text-success">List of Players</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(null)}>
              Add Player
            </Button>
          </div>
          <Table dataSource={data} columns={columns} rowKey="id" />
          <Modal
            title={editingItem ? "Edit player" : "Add new player"}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
          <Form<PlayerModel> form={form} onFinish={onFinish} layout="vertical">
              <Form.Item name="firstName" label="First name" rules={[{ required: true }]}>
                <Input />
              </Form.Item> 
              <Form.Item name="secondName" label="Second name" rules={[{ required: true }]}>
                <Input />
              </Form.Item> 
              <Form.Item name="nickName" label="Nick name" rules={[{ required: true }]}>
                <Input />
              </Form.Item> 
              <Form.Item name="country" label="Country" rules={[{ required: true }]}>
                <Select 
                  placeholder="Select country">                
                  {dataCountry?.map((country: countryModel) => (
                  <Select.Option key={country.id} value={country.id}>
                    {country.titleCountry}
                  </Select.Option>))}
                </Select>
              </Form.Item>
              <Form.Item name="birthDate" label="BirthDate" rules={[{ required: true }]}>
                <Input type="date" />
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

export default PlayerPage;

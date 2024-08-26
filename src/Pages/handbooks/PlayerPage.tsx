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
import { text } from 'stream/consumers';

const PlayerPage: React.FC = () => {
  const [form] = Form.useForm<PlayerModel>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<PlayerModel | null>(null);

  const dispatch = useDispatch();
  const [deletePlayer] = useDeletePlayerMutation();
  const [createPlayer] = useCreatePlayerMutation();
  const [updatePlayer] = useUpdatePlayerMutation();
  const { data, isLoading, refetch } = useGetPlayersQuery(null);
  const { data: dataCountry, isLoading: isLoadingCountry, refetch: refetchCountry } = useGetCountriesQuery(null);
  const [countryId, setCountryId] = useState<string | null>(null);
 
// for img
  const [imageId, setImageId] = useState<string | null>(null);

  const handleImageIdChange = (id: string | null) => {
    setImageId(id);
    form.setFieldsValue({ imageId: id || undefined }); // Convert null to undefined
    console.log('Image ID in parent component:', id);
  };

  const handleCountryIdChange = (id: string | null) => {
    setCountryId(id);
    form.setFieldsValue({ country: data.find((s: { id: string | null; })=>s.id === id)});
    console.log('Country ID in parent component:', id);
  };
  
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

  const showModal = (item: PlayerModel | null ) => {
    
    setEditingItem(item);
    form.setFieldsValue(item || {});
    setCountryId(item ?  item.country.id : "");
    setImageId(item ?  item.imageId:"" );

    setIsModalVisible(true);
    
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingItem(null);   
  };

  const onFinish = async (values: PlayerModel) => {
    try {
      if (editingItem) {
        await updatePlayer({ data: values, id: editingItem.id }).unwrap();
        toastNotify('Player updated successfully');    
      } else {
        console.log(values);
        await createPlayer(values).unwrap();
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
                  onChange={handleCountryIdChange}
                  value = {countryId}
                  placeholder="Страна">
                    {dataCountry?.map((country: any)=> {return <Select.Option key ={country.id}>{country.titleCountry}</Select.Option>})}
                </Select>
              </Form.Item>
              <Form.Item name="birthDate" label="BirthDate" rules={[{ required: true }]}>
                <Input type="date" />
              </Form.Item> 
              <Form.Item name="imageId" label="Image ID" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <ImageUploader onImageIdChange={handleImageIdChange} />
              {/* {imageId && <p>File ID: {imageId}</p>}    */}

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
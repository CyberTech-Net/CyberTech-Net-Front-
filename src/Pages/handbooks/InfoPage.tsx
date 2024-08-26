import React, { useEffect, useState } from 'react';
import { Table, Button, Image, Modal, Form, Input, DatePicker, DatePickerProps } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetInfoQuery, useDeleteInfoMutation, useCreateInfoMutation, useUpdateInfoMutation} from '../../Api/infoApi';
import InfoModel from '../../Interfaces/infoModel';
import { MainLoader } from '../../Common';
import { useDispatch } from 'react-redux';
import { setInfo } from '../../Storage/Redux/infoSlice';
import ImageUploader from '../../Common/ImageUploader';
import { toastNotify } from '../../Helper';
import { toast } from 'react-toastify';
import { ButtonGroup } from 'react-bootstrap';
import moment from 'moment';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { dateformat } from '../../Utility/SD';


const InfoPage: React.FC = () => {
  const [form] = Form.useForm<InfoModel>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<InfoModel | null>(null);

  const dispatch = useDispatch();
  const [deleteInfo] = useDeleteInfoMutation();
  const [createInfo] = useCreateInfoMutation();
  const [updateInfo] = useUpdateInfoMutation();
  const { data, isLoading, refetch } = useGetInfoQuery(null);
/*
useEffect(()=>
{

  (data || []).forEach((item:InfoModel, id:string) => {
    item.date = "12-12-2000"
  });
},[data])
*/


// for img
  const [imageId, setImageId] = useState<string | null>(null);

// for data field
//  const [date, setDataVal] = useState<string>(new Date().toDateString());  

  const handleImageIdChange = (id: string | null) => {
    setImageId(id);
    form.setFieldsValue({ imageId: id || undefined }); // Convert null to undefined
    console.log('Image ID in parent component:', id);
  };
  //

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

  const showModal = (item: InfoModel | null ) => {    
    setImageId(item ?  item.imageId : "" );
    
    setEditingItem(item);
       
    

    form.setFieldsValue( item  || {});
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
        toastNotify('Info updated successfully');    
      } else {
        console.log(values);
        await createInfo(values).unwrap();
        toastNotify('Info created successfully');
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

  const columns:ColumnsType<InfoModel> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'titleInfo',
    },
    {
      title: 'Text',
      dataIndex: 'text',
      key: 'textInfo',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'dataInfo',
      /*render: (text:string) =>
        {
            return moment(new Date(text)).format('YYYY-MM-DD');
        }
      render: (text:string) =>
        {
            return dayjs(text).format(dateformat);
        }/*
        render: (text: string) => {
          const date = new Date(text);
          return date.toLocaleDateString();
        }*/

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
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h1 className="text-success">List of News</h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(null)}>
              Add Info
            </Button>
          </div>
          <Table dataSource={data} columns={columns} rowKey="id" />
          <Modal
            title={editingItem ? "Edit info" : "Add new info"}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}           
          >
          <Form<InfoModel> form={form} onFinish={onFinish} layout="vertical" >
              <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                <Input />
                </Form.Item> 
              <Form.Item name="text" label="Text" rules={[{ required: true }]}>
                <Input />
                </Form.Item>                
              <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                <Input type='datetime' />
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

export default InfoPage;

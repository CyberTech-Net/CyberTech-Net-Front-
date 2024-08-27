import React, { useCallback, useEffect, useState } from 'react';
import { Badge, NavDropdown } from 'react-bootstrap';
import { toast,Id  } from 'react-toastify';
import { signalRMessage, userModel } from '../Interfaces';
import { closeConnection, getConnection } from '../Common/signalRConnection';
import { HubConnection } from '@microsoft/signalr';


interface UserBadgeProps {
    userData: userModel;
    handleLogout: () => void;
  }

  const UserBadge: React.FC<UserBadgeProps> = ({ userData, handleLogout }) => {
    const [messages, setMessages] = useState<signalRMessage[]>([]);
    const [connection, setConnection] = useState<HubConnection | null>(null);
  
    useEffect(() => {
      let isMounted = true;
  
      const initConnection = async () => {
        try {
          const conn = await getConnection();
          if (isMounted) {
            setConnection(conn);
  
            conn.on("ReceiveMessage", (message: signalRMessage) => {
              setMessages(prevMessages => [...prevMessages, message]);
            });
  
            conn.on("ReceiveMultipleMessages", (newMessages: signalRMessage[]) => {
              setMessages(prevMessages => [...prevMessages, ...newMessages]);
            });
          }
        } catch (error) {
          console.error('Failed to establish connection', error);
        }
      };
  
      initConnection();
  
      return () => {
        isMounted = false;
        closeConnection();
      };
    }, []);
  
    const handleBadgeClick = useCallback(async (event: React.MouseEvent<HTMLDivElement>): Promise<void> => {
      event.stopPropagation();
  
      const promises = messages.map((message, index) => 
        new Promise<void>((resolve) => {
          toast.success(message.text, {
            autoClose: 3000 + index * 500,
            onClose: () => resolve()
          });
        })
      );
  
      toast.promise(
        Promise.all(promises).then(() => {
          setMessages([]);
        }),
        {
          pending: 'Загрузка...',
          success: 'На сегодня все!',
          error: 'ошибка обработки сообщений',
        }
      );
    }, [messages]);
  
    if (messages.length === 0) {
      return (
        <NavDropdown title={`Signed in as: ${userData.name}`} id="basic-nav-dropdown">
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      );
    }
  
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div 
          onClick={handleBadgeClick} 
          style={{ 
            position: 'absolute', 
            top: '-10px', 
            right: '-10px', 
            cursor: 'pointer',
            zIndex: 1
          }}
        >
          <Badge bg="success" pill>
            {messages.length}
          </Badge>
        </div>
        <NavDropdown title={`Signed in as: ${userData.name}`} id="basic-nav-dropdown">
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </div>
    );
  };
  
  export default UserBadge;
import React, { useCallback, useEffect, useState } from 'react';
import { Badge, NavDropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { signalRMessage, userModel } from '../Interfaces';
import { closeConnection, getConnection } from '../Common/signalRConnection';
import { HubConnection } from '@microsoft/signalr';

interface UserBadgeProps {
  userData: userModel;
  handleLogout: () => void;
}

const UserBadge: React.FC<UserBadgeProps> = ({ userData, handleLogout }) => {
  const [messages, setMessages] = useState<signalRMessage[]>([]);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
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
            setVisibleMessages(prev => prev + 1);
          });

          conn.on("ReceiveMultipleMessages", (newMessages: signalRMessage[]) => {
            setMessages(prevMessages => [...prevMessages, ...newMessages]);
            setVisibleMessages(prev => prev + newMessages.length);
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
          onClose: () => {
            setVisibleMessages(prev => Math.max(0, prev - 1));
            resolve();
          }
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
        error: 'Ошибка обработки сообщений',
      }
    );
  }, [messages]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {visibleMessages > 0 && (
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
            {visibleMessages}
          </Badge>
        </div>
      )}
      <NavDropdown 
        title={`Вход: ${userData.name}`}
        id="user-nav-dropdown"
      >
        <NavDropdown.Item onClick={handleLogout} className="text-light">Выйти</NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};

export default UserBadge;
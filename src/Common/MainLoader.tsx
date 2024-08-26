import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function MainLoader() {
  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 vw-100 fixed-top"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 90, color: "lightgreen" }} spin />}
      />
    </div>
  );
}

export default MainLoader;
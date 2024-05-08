import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Popconfirm,
  message,
  Space,
} from "antd";
import {
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "../css_class/AdminPage.css"; 

export function AdminUserPage() {
  const navigate = useNavigate();
  const [Users, setUser] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);

  useEffect(() => {
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (!accessToken) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    axios.get("/user/get-all-user").then((response) => {
      setUser(response.data);
    });
  }, [refresh]);

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "username",
      key: "username",
      className: "wrap-text",
      render: (text, record) => {
        return record.username !== "admin" ? <strong>{text}</strong> : null;
      },
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      className: "wrap-text",
      render: (text, record) => {
        return record.username !== "admin" ? <strong>{text}</strong> : null;
      },
    },
    {
      title: "Điện thoại liên lạc",
      dataIndex: "telephone",
      key: "telephone",
      className: "wrap-text",
      render: (text, record) => {
        return record.username !== "admin" ? <strong>{text}</strong> : null;
      },
    },
    {
      title: "",
      key: "action",
      render: (text, record) => {
        if (record.username !== "admin" && record.images) {
          return (
            <Button
              onClick={() => {
                console.log("selectedRecord", record);
              }}
            >
              Xem
            </Button>
          );
        }
        return null;
      },
    },
    {
      title: "",
      key: "actions",
      width: "1%",
      render: (text, record) => {
        if (record.username !== "admin") {
          return (
            <Space>
              {/*BUTTON XÓA DỮ LIỆU */}
              <Popconfirm
                style={{ width: 800 }}
                title="Are you sure to delete?"
                onConfirm={() => {
                  const id = record._id;
                  axios
                    .delete("/user/delete-user/" + id)
                    .then((response) => {
                      message.success("Xóa thành công!");
                      setRefresh((f) => f + 1);
                    })
                    .catch((err) => {
                      message.error("Xóa bị lỗi!");
                    });
                  console.log("DELETE", record);
                }}
                onCancel={() => {}}
                okText="Đồng ý"
                cancelText="Đóng"
              >
                <Button danger type="dashed" icon={<DeleteOutlined />} />
              </Popconfirm>
            </Space>
          );
        }
        return null; 
      },
    },
  ];
  
  
return (
    <div>
        <Table
        rowKey="_id"
        dataSource={Users}
        columns={columns}
        pagination={false}
      />
    </div>
)
}
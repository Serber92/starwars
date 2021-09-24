import React, { useContext } from "react";
import { Layout, Menu, Breadcrumb, Table, Button } from "antd";
import { useLazyQuery } from "@apollo/client";
import { get } from "lodash";
import { AppContext } from "../../App";
import { GET_STARWARS } from "../../helper/graphql";

const { Header, Content, Footer } = Layout;

const DashboardPage = () => {

  const [getStarwars, { loading, error, data = null }] = useLazyQuery(GET_STARWARS, { fetchPolicy: "network-only" });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "characters",
      dataIndex: "characters",
      render: (_, row, index) => {
        return (
          <div>
            <h4>Count of characters: {row.characters.count}</h4>
            <h4>
              Characters:{" "}
              {row.characters.results.map((result) => (
                <>
                  <h5>{result.name}</h5>
                </>
              ))}
            </h4>
          </div>
        );
      },
    },
    {
      title: "planets",
      dataIndex: "address",
      render: (_, row, index) => {
        return (
          <div>
            <h4>Count of planets: {row.planets.count}</h4>
            <h4>
              Planets:{" "}
              {row.planets.results.map((result) => (
                <>
                  <h5>{result.name}</h5>
                </>
              ))}
            </h4>
          </div>
        );
      },
    },
  ];

  const loadData = () => {
    getStarwars({
      variables: {},
    });
  }
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item>Andrii test</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" onClick={() => loadData()}>Load Now</Button>
        <div className="site-layout-content">{!loading && !error && <Table dataSource={get(data, "films.results", [])} columns={columns} />}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
};

export default DashboardPage;

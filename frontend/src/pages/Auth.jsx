import styles from "../styles/authComponents/Auth.module.scss";

import MainContainer from "../components/Containers/MainContainer";
import { Title } from "../components/Titles/Titles";
import { Button, Card, Form, Input, Row, Col } from "antd";
import { useState, useEffect, useContext } from "react";
import {
  MANDATORY_FIELD_CONF,
  NO_WHITESPACE_ONLY,
} from "../constants/formConstants";
import { useLoginUser, useRegisterUser } from "../queries/user";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Auth = () => {
  //LOGIN
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [isRegister, setIsRegister] = useState(false);
  //REGISTER
  const [regEmail, setRegEmail] = useState("");
  const [regPw, setRegPw] = useState("");
  const [regPwConfirm, setRegPwConfirm] = useState("");
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");

  //CONTEXT
  const { auth, setAuth } = useContext(AuthContext);

  //navigate
  const navigate = useNavigate();

  let body = {
    email: email,
    password: pw,
  };

  let regBody = {
    email: regEmail,
    password: regPw,
    passwordConfirm: regPwConfirm,
    firstName: regFirstName,
    lastName: regLastName,
  };

  const {
    mutate: loginHandler,
    isError: loginError,
    error: loginErr,
  } = useLoginUser();

  const {
    mutateAsync: registerHandler,
    isSuccess: registerSucc,
    isError: registerError,
    error: registerErr,
  } = useRegisterUser();

  useEffect(() => {
    if (auth) navigate("/");
  });

  return (
    <MainContainer>
      <Title>Log In/Sign Up</Title>

      {isRegister ? (
        <Card>
          {/* LOGIN */}
          <Form layout="vertical">
            <div className={styles.container}>
              <Row>
                <Col>
                  <Form.Item
                    label="Email"
                    name="userEmail"
                    rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
                  >
                    <Input
                      onChange={(e) => setRegEmail(e.target.value)}
                      type="email"
                      autoComplete="username"
                      value={regEmail}
                    />
                  </Form.Item>
                </Col>
                <Col> </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Item
                    label="First Name"
                    name="firstname"
                    rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
                  >
                    <Input
                      onChange={(e) => setRegFirstName(e.target.value)}
                      type="text"
                      autoComplete="firstname"
                      value={regFirstName}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    label="Last Name"
                    name="lastname"
                    rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
                  >
                    <Input
                      onChange={(e) => setRegLastName(e.target.value)}
                      type="text"
                      autoComplete="lastname"
                      value={regLastName}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  {" "}
                  <Form.Item
                    label="Password"
                    name="userPassword"
                    rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
                  >
                    <Input
                      onChange={(e) => setRegPw(e.target.value)}
                      type="password"
                      autoComplete="password"
                      value={regPw}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    label="Confirm Password"
                    name="userPasswordConfirm"
                    rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
                  >
                    <Input
                      onChange={(e) => setRegPwConfirm(e.target.value)}
                      type="password"
                      autoComplete="password"
                      value={regPwConfirm}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span="2">
                  <Button
                    onClick={() =>
                      registerHandler(regBody, {
                        //ONSUCCESS USE LOGINHANDLER
                        onSuccess: () => {
                          loginHandler(regBody, {
                            onSuccess: () => setAuth(true),
                            onError: () => {
                              console.log(loginErr);
                            },
                          });
                        },
                      })
                    }
                  >
                    Register Now
                  </Button>
{/* ADD ERROR */}
{registerError && (
            <div style={{ color: "red", marginTop: "2rem" }}>
              {registerErr.response.data.map((err, index) => {
                return (
                  <div
                    key={index}
                  >{`${err.instancePath} : ${err.message}`}</div>
                );
              })}
            </div>
          )}                  
                </Col>
              </Row>
            </div>
          </Form>
        </Card>
      ) : (
        <Card>
          {/* LOGIN */}
          <Form layout="vertical">
            <div className={styles.container}>
              <Row>
                <Col>
                  <Form.Item
                    label="Email"
                    name="userEmail"
                    rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
                  >
                    <Input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      autoComplete="username"
                      value={email}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Password"
                name="userPassword"
                rules={[MANDATORY_FIELD_CONF, NO_WHITESPACE_ONLY]}
              >
                <Row justify="space-between">
                  <Input
                    onChange={(e) => setPw(e.target.value)}
                    type="password"
                    autoComplete="password"
                    value={pw}
                  />
                </Row>
              </Form.Item>
              <Row>
                <Col>
                  {" "}
                  <Button
                    onClick={() =>
                      loginHandler(body, {
                        onError: () => {
                          console.log(loginErr);
                        },
                        onSuccess: () => setAuth(true),
                      })
                    }
                  >
                    Login Now
                  </Button>
                </Col>
                <Col>
                  <Button onClick={() => setIsRegister(true)}>Sign Up</Button>
                </Col>
              </Row>
            </div>
          </Form>
        </Card>
      )}
    </MainContainer>
  );
};

export default Auth;

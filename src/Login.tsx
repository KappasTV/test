import React from 'react';
import './Login.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import logo from './logo.png';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';


interface IProps {


}

interface IState {
  email?: string;
  password?: string;
  showDangerAlert?: boolean;
  showSuccessAlert?: boolean;
}


class Login extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showDangerAlert: false,
      showSuccessAlert: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleLogin() {
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post('http://127.0.0.1:5000/login', {user})
    .then(response => {
      if (response.status === 200) {
        this.setState({
          showSuccessAlert: true
        });
        setTimeout(() => {
          this.setState({
            showSuccessAlert: false
          })
        }, 3000);
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 403) {
        this.setState({
          showDangerAlert: true
        });
        setTimeout(() => {
          this.setState({
            showDangerAlert: false
          })
        }, 3000);
      }
    });
  }

  handleEmailChange(event:any) {
    this.setState({ email: event.target.value });
  }


  handlePasswordChange(event:any) {
    this.setState({ password: event.target.value });
  }


  render() {
    return (
      <Container className="content-wrapper">
        <Row>
          <Col>
            <img className="logo" src={logo} />
            <h3 className="heading">Welcome back</h3>
            <p className="subheading">Don't miss your next opportunity. Sign in to stay updated on your professional world.</p>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmailChange}/>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange} />
              </Form.Group>
              <Button className="rounded-pill" variant="primary" onClick={this.handleLogin}>
                Sign in
              </Button>
            </Form>
          </Col>
        </Row>
        <Alert variant="danger" show={this.state.showDangerAlert}>
          Bad credentials
        </Alert>
        <Alert variant="success" show={this.state.showSuccessAlert}>
          Success
        </Alert>
      </Container>
    )
  }
}

export default Login;

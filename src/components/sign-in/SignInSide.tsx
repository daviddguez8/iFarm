import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import  Image  from '../../assets/images/agri-drone-thermal.jpg';
import SpaIcon from '@mui/icons-material/Spa';
import ifarmTheme from '../../colorPalette';
import firebaseApp from '../../config';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import backgroundImage from '../../assets/images/agri_thermal_field.jpg'
import './SignInSide.css';
import { red } from '@mui/material/colors';
import { Button, FloatingLabel, Form} from 'react-bootstrap';

const db = getFirestore(firebaseApp);
const loginsRef = collection(db,"ifarm-logins");

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{'https://www.google.com'}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = ifarmTheme;

export default function SignInSide() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    getDocs(loginsRef).then((response)=>{
        const docs = response.docs;
        
        docs.forEach((doc)=>{
            let login = doc.data();
            console.log(login);
        })
    })
    return (
        <div>
            <h1>Logged in?</h1>
        </div>
    )
  };

  return (
    <Container className="background centered">
      <div className="overlay centered">
        <Container className="login-card centered">
          <Row>
            <h1>
              Sign In
            </h1>
          </Row>

          <Row style={{width:"100%"}}>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3 green-border"
              >
                <Form.Control type="email" placeholder="name@example.com" className="bg-transparent green-border"/>
              </FloatingLabel>
            </Form.Group>
            
            <Form.Group>
              <FloatingLabel controlId="floatingPassword" label="Password" className="green-border">
                <Form.Control type="password" placeholder="Password" className="bg-transparent green-border"/>
              </FloatingLabel>
            </Form.Group>
            
          </Row>
          
        </Container>
      </div>
    </Container>
  );
}
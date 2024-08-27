import React, { useState } from 'react';
import { Container, Form, Button, Col } from 'react-bootstrap';
import {useRegisterUserMutation} from "../../Api/authApi"
import { SD_Roles } from '../../Utility/SD';
import { inputHelper, toastNotify } from '../../Helper';
import { apiResponse } from '../../Interfaces';
import { useNavigate } from "react-router-dom";




function RegisterPage() {
    const navigate = useNavigate();
    const [registerUser] = useRegisterUserMutation();
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState({
        email: "",
        name: "",
        phoneNumber: "",
        password: "",
        role: "",
      
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        const tempData = inputHelper (e, userInput);
        setUserInput (tempData);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const response: apiResponse = await registerUser({
        email: userInput.email,
        name: userInput.name,
        phoneNumber: userInput.phoneNumber,
        password: userInput.password,
        role: userInput.role,
        
      });
      if (response.data) {
        toastNotify("Registeration successful! Please login to continue.");
        navigate("/login");
      } else if (response.error) {
        toastNotify(response.error.data.message, "error");
      }
  
      setLoading(false);
    };

    return (
        <Container className="text-center">
        <Form method='POST' onSubmit={handleSubmit}>
          <h1 className="mt-5">Регистрация</h1>
          <div className="mt-5">
          <Col sm={{ span: 6, offset: 3 }} xs={12} className="mt-4">
              <Form.Control 
               type="text" 
               placeholder="Введите e-mail" 
               required 
               name="email"
               value = {userInput.email} 
               onChange ={(e: React.ChangeEvent<HTMLInputElement>) => handleUserInput(e)}
            />
            </Col>
            <Col sm={{ span: 6, offset: 3 }} xs={12} className="mt-4">
              <Form.Control 
               type="text" 
               placeholder="Введите имя" 
               required 
               name="name"
               value = {userInput.name} 
               onChange ={(e: React.ChangeEvent<HTMLInputElement>) => handleUserInput(e)}
            />
            </Col>
            <Col sm={{ span: 6, offset: 3 }} xs={12} className="mt-4">
              <Form.Control 
              type="text" 
              placeholder="Введите телефон"
              required
              name="phoneNumber"
              value = {userInput.phoneNumber} 
              onChange ={(e: React.ChangeEvent<HTMLInputElement>) => handleUserInput(e)}
            />
             </Col>
            <Col sm={{ span: 6, offset: 3 }} xs={12} className="mt-4">
              <Form.Control 
              type="password" 
              placeholder="Введите пароль"
              required
              name="password"
              value = {userInput.password} 
              onChange ={(e: React.ChangeEvent<HTMLInputElement>) => handleUserInput(e)}
            />
            </Col>
            <Col sm={{ span: 6, offset: 3 }} xs={12} className="mt-4">
              <Form.Select className="form-select" required 
              name="role"
              value = {userInput.role} 
              onChange ={handleUserInput}>
                <option value="">Выберите роль</option>
                <option value={`${SD_Roles.CUSTOMER}`}>Customer</option>
                <option value={`${SD_Roles.ADMIN}`}>Admin</option>
              </Form.Select>
            </Col>
          </div>
          <div className="mt-5">
            <Button type="submit" variant="success">Register</Button>
          </div>
        </Form>
      </Container>
    )
}
export default RegisterPage;
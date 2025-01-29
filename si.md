Aquí tienes un ejemplo práctico basado en la estructura _DDD (Domain-Driven Design)_ que me explicaste, aplicada al registro de usuarios. Este ejemplo incluye las carpetas y archivos clave según tu arquitectura, y lo explico paso a paso para que sea fácil de entender y enseñar.

---

### _Estructura de carpetas_

plaintext
src/
├── core/
│ └── app/
│ └── useCases/
│ └── registerUser.ts
├── domain/
│ ├── entities/
│ │ └── User.ts
│ ├── request/
│ │ └── UserRegisterRequest.ts
│ ├── response/
│ │ └── UserRegisterResponse.ts
│ └── repositories/
│ └── UserRepository.ts
├── infrastructure/
│ ├── controllers/
│ │ └── UserController.ts
│ ├── implementations/
│ │ └── UserImplementation.ts
│ ├── services/
│ │ └── api.ts
├── presentation/
│ ├── hooks/
│ │ └── useUser.ts
│ └── screens/
│ └── RegisterScreen.tsx
└── common/
└── types/
└── env.d.ts

---

### _Archivos clave_

#### _1. Definimos la entidad (Domain/Entities)_

📂 src/domain/entities/User.ts
typescript
export interface User {
id: string;
name: string;
email: string;
password?: string; // El password se omite en respuestas del backend
}

---

#### _2. Definimos el tipo de request (Domain/Request)_

📂 src/domain/request/UserRegisterRequest.ts
typescript
export interface UserRegisterRequest {
name: string;
email: string;
password: string;
}

---

#### _3. Definimos el tipo de response (Domain/Response)_

📂 src/domain/response/UserRegisterResponse.ts
typescript
import {User} from '../entities/User';

export interface UserRegisterResponse {
message: string;
user: User;
}

---

#### _4. Definimos el contrato del repositorio (Domain/Repositories)_

📂 src/domain/repositories/UserRepository.ts
typescript
import {UserRegisterRequest} from '../request/UserRegisterRequest';
import {UserRegisterResponse} from '../response/UserRegisterResponse';

export interface UserRepository {
registerUser(data: UserRegisterRequest): Promise<UserRegisterResponse>;
}

---

#### _5. Implementamos el controlador para manejar la API (Infrastructure/Controllers)_

📂 src/infrastructure/controllers/UserController.ts
typescript
import axios from 'axios';
import {BASE_URL} from '@env';
import {UserRegisterRequest} from '../../domain/request/UserRegisterRequest';
import {UserRegisterResponse} from '../../domain/response/UserRegisterResponse';
import {UserRepository} from '../../domain/repositories/UserRepository';

export class UserController implements UserRepository {
private readonly baseUrl = BASE_URL;

async registerUser(data: UserRegisterRequest): Promise<UserRegisterResponse> {
const response = await axios.post<UserRegisterResponse>(
`${this.baseUrl}/users/register`,
data,
);
return response.data;
}
}

---

#### _6. Creamos la implementación del caso de uso (Infrastructure/Implementations)_

📂 src/infrastructure/implementations/UserImplementation.ts
typescript
import {UserController} from '../controllers/UserController';

const userController = new UserController();

export const userImplementation = {
registerUser: userController.registerUser.bind(userController),
};

---

#### _7. Caso de uso (Core/App/UseCases)_

📂 src/core/app/useCases/registerUser.ts
typescript
import {userImplementation} from '../../infrastructure/implementations/UserImplementation';
import {UserRegisterRequest} from '../../domain/request/UserRegisterRequest';
import {UserRegisterResponse} from '../../domain/response/UserRegisterResponse';

export const registerUserUseCase = async (
data: UserRegisterRequest,
): Promise<UserRegisterResponse> => {
return await userImplementation.registerUser(data);
};

---

#### _8. Creamos el hook para manejar el caso de uso (Presentation/Hooks)_

📂 src/presentation/hooks/useUser.ts
typescript
import {UserRegisterRequest} from '../../domain/request/UserRegisterRequest';
import {registerUserUseCase} from '../../core/app/useCases/registerUser';

export const useUser = () => {
const registerUser = async (data: UserRegisterRequest) => {
try {
const response = await registerUserUseCase(data);
console.log('User registered successfully:', response);
return response;
} catch (error: any) {
console.error('Error registering user:', error.message);
throw error;
}
};

return {registerUser};
};

---

#### _9. Pantalla de registro (Presentation/Screens)_

📂 src/presentation/screens/RegisterScreen.tsx
typescript
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useUser} from '../hooks/useUser';

export const RegisterScreen = () => {
const {registerUser} = useUser();

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleRegister = async () => {
try {
const response = await registerUser({name, email, password});
Alert.alert('Success', response.message);
// Aquí rediriges al Login o donde sea necesario
} catch (error: any) {
Alert.alert('Error', error.message || 'Registration failed');
}
};

return (
<View>
<Text>Register</Text>
<TextInput placeholder="Name" onChangeText={setName} value={name} />
<TextInput placeholder="Email" onChangeText={setEmail} value={email} />
<TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
<TouchableOpacity onPress={handleRegister}>
<Text>Register</Text>
</TouchableOpacity>
</View>
);
};

---

### _10. Configuración de variables de entorno (Common/Types)_

📂 src/common/types/env.d.ts
typescript
declare module '@env' {
export const BASE_URL: string;
}

---

### _Explicación del flujo_

1. _Entidad:_ Define al usuario (User) y sus propiedades.
2. _Request y Response:_ Estructura los datos que se envían y reciben.
3. _Repositorio:_ Define el contrato que deben implementar los controladores.
4. _Controlador:_ Implementa las funciones para realizar las solicitudes HTTP al backend.
5. _Implementación:_ Une los controladores con los casos de uso.
6. _Caso de uso:_ Lógica específica para registrar usuarios.
7. _Hook:_ Provee una interfaz simple para que las pantallas llamen el caso de uso.
8. _Pantalla:_ Interactúa con el usuario y utiliza el hook para registrar.

¡Esta estructura te ayudará a mantener tu código limpio, modular y escalable! 🚀

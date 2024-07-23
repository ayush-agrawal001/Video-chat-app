# Video-chat-app
A real-time video communication platform built using WebRTC. This app allows users to engage in seamless video calls directly from their browsers without the need for additional plugins or software.

## Features

- **Real-time Video Chat**: Experience high-quality video calls with low latency.
- **Peer-to-Peer Communication**: Utilizes WebRTC for direct peer-to-peer connections, ensuring efficient and secure communication.
- **Responsive Design**: Optimized for various devices, including desktops, tablets, and mobile phones.
- **Easy to Use**: Simple and intuitive interface for effortless navigation and usage.
- **Secure Connections**: Ensures privacy and security with encrypted data transfer.

## Technologies Used

- **WebRTC**: For real-time communication capabilities.
- **HTML5 & CSS3**: For the app's structure and styling.
- **JavaScript**: Core functionality and interaction handling.
- **Node.js & Express.js**: Backend server to facilitate signaling and connection setup.
- **Socket.io**: For real-time communication between the server and clients.

## Getting Started

### Prerequisites

- Node.js installed on your local machine.
- Basic knowledge of JavaScript and WebRTC.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/video-chat-app.git
  ```
2. Navigate to the project directory:
  ```bash
  cd video-chat-app
  ```
3. Install the dependencies:
  ```
  npm install
  ```
## Runningthe App

1.Start the server:
 ```bash
 nodemon index.js
 ```
2.Start the App:
```bash
npm run dev
```
### FILE STRUCTURE
video-chat-app/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server/
│   ├── server.js
│   ├── routes.js
│   └── socketHandler.js
├── .gitignore
├── package.json
└── README.md


### Contributing
Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

### License
This project is licensed under the MIT License.

## Acknowledgements
Special thanks to the developers of WebRTC, Socket.io, and other open-source libraries used in this project.
Feel free to explore, use, and enhance this video chat app. Happy coding

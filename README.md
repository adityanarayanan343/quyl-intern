# Quyl Dashboard

Quyl Dashboard is a web application that manages and displays student information, chapters, reports, and settings. It provides a user-friendly interface for administrators to manage student data and view various reports.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Dashboard**: Overview of the application.
- **Students Management**: Add, update, and delete student information.
- **Chapters**: Explore available chapters in the course.
- **Reports**: View detailed reports on student performance and course progress.
- **Settings**: Manage account settings and preferences.
- **Help Center**: Access to FAQs and support contact information.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/adityanarayanan343/quyl-intern.git
   cd quyl-intern
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`.

## Usage

- **Dashboard**: Provides an overview of the application.
- **Students**: Manage student data, including adding, editing, and deleting students.
- **Chapters**: View and explore chapters available in the course.
- **Reports**: Access detailed reports on student performance.
- **Settings**: Update account settings and preferences.
- **Help**: Get assistance and access FAQs.

## Project Structure

src/
├── components/
│ ├── Footer.jsx
│ ├── Header.jsx
│ ├── Layout.jsx
│ ├── Sidebar.jsx
│ └── StudentTable.jsx
├── pages/
│ ├── Dashboard.jsx
│ ├── StudentsPage.jsx
│ ├── ChaptersPage.jsx
│ ├── ReportsPage.jsx
│ ├── HelpPage.jsx
│ └── SettingsPage.jsx
├── App.jsx
└── index.css


### Key Components

- **Layout**: Provides a consistent layout with a sidebar, header, and footer.
- **StudentTable**: Displays and manages student information.
- **Sidebar**: Navigation menu for accessing different pages.
- **Header**: Displays the top navigation bar with options and notifications.
- **Footer**: Displays copyright and contact information.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.



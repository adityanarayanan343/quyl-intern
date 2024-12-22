import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStudent, fetchAllStudents, updateStudent, deleteStudent } from '../features/studentsApi';
import { Circle } from 'lucide-react';

const StudentTable = () => {
  const dispatch = useDispatch();
  const { list: students, error, status } = useSelector((state) => state.students);
  const [open, setOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    cohort: '',
    email: '',
    phone: '',
    courses: '',
    dateJoined: new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    lastLogin: new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  });
  const [searchQuery, setSearchQuery] = useState('');
  

  useEffect(() => {
    dispatch(fetchAllStudents());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    if (!/^\d{10}$/.test(formData.phone)) errors.phone = 'Phone must be 10 digits';
    if (!formData.cohort.trim()) errors.cohort = 'Cohort is required';
    return errors;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      cohort: '',
      email: '',
      phone: '',
      courses: ['CBSE 9 Science', 'CBSE 9 Math'],
      dateJoined: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      lastLogin: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    });
    setEditingStudent(null);
  };

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      alert(Object.values(errors).join('\n'));
      return;
    }
    
    if (editingStudent) {
      dispatch(updateStudent({ id: editingStudent.id, updates: formData }));
    } else {
      dispatch(createStudent({ ...formData, status: true }));
    }
    setOpen(false);
    resetForm();
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      cohort: student.cohort,
      email: student.email,
      phone: student.phone,
      courses: student.courses,
      dateJoined: student.dateJoined,
      lastLogin: student.lastLogin
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };
  
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.cohort.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.courses.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="border rounded-lg px-4 py-2 w-80"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>
        <button
          onClick={() => setOpen(true)}
          className="bg-[#F8F9FC] hover:bg-gray-100 text-[#475467] px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 border border-[#E4E7EC]"
        >
          <span className="text-lg">+</span> Add new Student
        </button>
      </div>

      <div className="bg-white rounded-lg border border-[#E4E7EC]">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b border-[#E4E7EC]">
              <th className="px-6 py-4 text-left text-xs font-medium text-[#475467]">Student Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#475467]">Cohort</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#475467]">Courses</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#475467]">Date Joined</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#475467]">Last Login</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#475467]">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#475467]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4E7EC]">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-[#F8F9FC]">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-[#101828]">{student.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-[#475467]">{student.cohort}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <span className="text-sm text-[#475467]">{student.courses}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-[#475467]">{student.dateJoined}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-[#475467]">{student.lastLogin}</span>
                </td>
                <td className="px-6 py-4">
                  <Circle 
                    className={`w-3 h-3 ${
                      student.status ? 'text-green-500 fill-green-500' : 'text-red-500 fill-red-500'
                    }`}
                  />
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingStudent ? 'Edit Student' : 'Add New Student'}
            </h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Student Name"
                className="block w-full px-4 py-2 mb-4 border border-[#E4E7EC] rounded-md"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="block w-full px-4 py-2 mb-4 border border-[#E4E7EC] rounded-md"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="block w-full px-4 py-2 mb-4 border border-[#E4E7EC] rounded-md"
              />
              <select
                name='courses'
                value={formData.courses}
                onChange={handleInputChange}
                className='block w-full px-4 py-2 mb-4 border border-[#E4E7EC] rounded-md'
              >
                <option value="">Select Courses</option>
                <option value="CBSE 9 Science">CBSE 9 Science</option>
                <option value="CBSE 9 Math">CBSE 9 Math</option>
              </select>
              <select
                name="cohort"
                value={formData.cohort}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mb-4 border border-[#E4E7EC] rounded-md"
              >
                <option value="">Select Cohort</option>
                <option value="AY 2024-25">AY 2024-25</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-[#475467] hover:text-[#101828] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F8F9FC] hover:bg-gray-100 text-[#475467] rounded-md border border-[#E4E7EC]"
                >
                  {editingStudent ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;

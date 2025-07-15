import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import dashboardStyle from './Dasboard.module.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


function Dashboard() {
  const [searchText, setSearchText] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchLevel, setSearchLevel] = useState('');

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);


const filteredStudents = students.filter((student) =>
  (
    (student.nationalId || '').includes(searchText) ||
    (student.phoneNumber || '').includes(searchText) ||
    (student.studentName || '').includes(searchText)
  ) &&
  (searchDate === '' || (student.management?.submissionDate || '') === searchDate) &&
  (searchLevel === '' || (student.acceptance?.lastSavingAmount || '').includes(searchLevel))
);

  useEffect(() => {
    axios.get('http://localhost:8085/api/users/all')
      .then(response => {
        setStudents(response.data);
        console.log(response.data);

      })
      .catch(error => {
        console.error('❌ Failed to fetch students:', error);
      });
  }, []);


  return (
    <div className="container mt-4" dir="rtl">
      <h4 className={`my-5 ${dashboardStyle.headTitle}`}>قائمة الطلاب</h4>

      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="ابحث بالرقم القومي أو الهاتف"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-2">
          <input
            type="date"
            className="form-control"
            placeholder="ابحث بتاريخ التقديم"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="ابحث بمستوى الطالب"
            value={searchLevel}
            onChange={(e) => setSearchLevel(e.target.value)}
          />
        </div>

      </div>

      {filteredStudents.length === 0 ? (
        <p className="text-muted">لا يوجد طلاب مطابقين.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>الاسم</th>
              <th>الرقم القومي</th>
              <th>رقم الهاتف</th>
              <th>المؤهل</th>
              <th>مستوى الطالب</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}
                onClick={() => navigate('/registrationForm', { state: { student } })}
                style={{ cursor: 'pointer' }} >
                <td>{student.studentName}</td>
                <td>{student.nationalId}</td>
                <td>{student.phoneNumber}</td>
                <td>{student.levelOfStudy}</td>
                <td>{student.memorizationLevel}</td>
                <td className='ps-3'
                  onClick={async (e) => {
                    e.stopPropagation();

                    const confirmed = window.confirm('هل أنت متأكد من حذف هذا الطالب؟');
                    if (!confirmed) return;

                    try {
                      await axios.delete(`http://localhost:8085/api/users/delete-user/${student.id}`);
                      alert('تم حذف الطالب بنجاح');
                      // بعد الحذف، حدّث القائمة
                      setStudents(prev => prev.filter(s => s.id !== student.id));
                    } catch (error) {
                      console.error('❌ فشل في حذف الطالب:', error);
                      alert('حدث خطأ أثناء حذف الطالب');
                    }
                  }}>
                  <FontAwesomeIcon className='' icon={faTrash} style={{ color: 'grey', cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;

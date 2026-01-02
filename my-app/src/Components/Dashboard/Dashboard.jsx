import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import dashboardStyle from './Dasboard.module.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();

  // ================== State ==================
  const [students, setStudents] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [examineTeacherName, setExamineTeacherName] = useState('');

  // Pagination
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // ================== Fetch Data ==================
  useEffect(() => {
    axios
      .get('http://localhost:8086/api/users/all')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('❌ Failed to fetch students:', error);
      });
  }, []);

  // ================== Search & Filter ==================
  const normalizedSearchText = (searchText || '').toLowerCase();
  const normalizedTeacher = (examineTeacherName || '').toLowerCase();

  const filteredStudents = students.filter((student) =>
    (
      (student.nationalId || '').toLowerCase().includes(normalizedSearchText) ||
      (student.phoneNumber || '').toLowerCase().includes(normalizedSearchText) ||
      (student.studentName || '').toLowerCase().includes(normalizedSearchText)
    ) &&
    (searchDate === '' ||
      (student.management?.submissionDate || '') === searchDate) &&
    (
      normalizedTeacher === '' ||
      (student.acceptance?.examineTeacherName || '')
        .toLowerCase()
        .includes(normalizedTeacher)
    )
  );

  // ================== Pagination Logic ==================
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, searchDate, examineTeacherName]);

  // ================== Render ==================
  return (
    <div className="container mt-4" dir="rtl">
      <h4 className={`my-5 ${dashboardStyle.headTitle}`}>قائمة الطلاب</h4>

      {/* ===== Search Inputs ===== */}
      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="ابحث بالرقم القومي أو الهاتف أو الاسم"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="ابحث باسم الشيخ الممتحن"
            value={examineTeacherName}
            onChange={(e) => setExamineTeacherName(e.target.value)}
          />
        </div>
      </div>

      {/* ===== Table ===== */}
      {paginatedStudents.length === 0 ? (
        <p className="text-muted">لا يوجد طلاب مطابقين.</p>
      ) : (
        <>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>الاسم</th>
                <th>الرقم القومي</th>
                <th>رقم الهاتف</th>
                <th>المؤهل</th>
                <th>اسم الشيخ</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student) => (
                <tr
                  key={student.id}
                  onClick={() =>
                    navigate('/registrationForm', { state: { student } })
                  }
                  style={{ cursor: 'pointer' }}
                >
                  <td>{student.studentName}</td>
                  <td>{student.nationalId}</td>
                  <td>{student.phoneNumber}</td>
                  <td>{student.levelOfStudy}</td>
                  <td>{student.acceptance?.examineTeacherName}</td>
                  <td
                    className="ps-3"
                    onClick={async (e) => {
                      e.stopPropagation();

                      const confirmed = window.confirm(
                        'هل أنت متأكد من حذف هذا الطالب؟'
                      );
                      if (!confirmed) return;

                      try {
                        await axios.delete(
                          `http://localhost:8086/api/users/delete-user/${student.id}`
                        );
                        alert('تم حذف الطالب بنجاح');
                        setStudents((prev) =>
                          prev.filter((s) => s.id !== student.id)
                        );
                      } catch (error) {
                        console.error('❌ فشل في حذف الطالب:', error);
                        alert('حدث خطأ أثناء حذف الطالب');
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: 'grey', cursor: 'pointer' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ===== Pagination Controls ===== */}
          {totalPages > 1 && (
            <nav className="mt-3">
              <ul className={`pagination justify-content-center ${dashboardStyle.paginationBlack}`}>
                
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  >
                    السابق
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <li
                    key={page}
                    className={`page-item ${currentPage === page ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  >
                    التالي
                  </button>
                </li>

              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;

import React, { useEffect, useState } from 'react';
import Joi from 'joi';
import { useLocation } from 'react-router-dom';
import registrationSchema from '../validation/registrationSchema';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import style from './RegisterationForm.module.css';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import StudentPdf from '../../assets/pdf/StudentPdf';
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
    const location = useLocation();
    const editingStudent = location.state?.student || null;
    const navigate = useNavigate();

    const emptyStudentData = {
        submissionDate: '',
        name: '',
        age: '',
        nationalId: '',
        phone: '',
        homePhone: '',
        degree: '',
        job: '',
        workplace: '',
        residence: '',
        memorizationLevel: '',
        examineTeacherName: '',
        signature: '',
        specifiedTime: '',
        actualAttendanceDate: '',
        studentGroupId: '',
        instituteFees: '',
        receiver: '',
        receiptNumber: '',
        level: '',
        status: ''
    };

    const mapResponseToFormData = (student) => ({
        name: student.studentName || '',
        age: student.age?.toString() || '',
        nationalId: student.nationalId || '',
        phone: student.phoneNumber || '',
        workplace: student.placeOfWork || '',
        job: student.job || '',
        residence: student.address || '',
        degree: student.levelOfStudy || '',
        status: student.status || '',
        submissionDate: student.management?.submissionDate || '',
        memorizationLevel: student.acceptance?.lastSavingAmount || '',
        examineTeacherName: student.acceptance?.examineTeacherName || '',
        level: student.acceptance?.level || '',
        actualAttendanceDate: student.management?.actualAttendanceDate || '',
        specifiedTime: student.management?.specifiedTime || '',
        instituteFees: student.management?.instituteFees || '',
        studentGroupId: student.management?.studentGroupId || '',
        receiptNumber: student.management?.receiptNumber || '',
        receiver: student.management?.receiver || '',
        signature: '',
        homePhone: ''
    });

    const [formData, setFormData] = useState(editingStudent ? mapResponseToFormData(editingStudent) : emptyStudentData);

    useEffect(() => {
        if (editingStudent) {
            setFormData(mapResponseToFormData(editingStudent));
        } else {
            setFormData(emptyStudentData);
        }
    }, [editingStudent]);

    const [errors, setErrors] = useState({});

    const validate = () => {
        const result = registrationSchema.validate(formData, { abortEarly: false });
        if (!result.error) return null;

        const validationErrors = {};
        result.error.details.forEach(item => {
            validationErrors[item.path[0]] = item.message;
        });
        return validationErrors;
    };

    const handleChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value });
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (validationErrors) {
        setErrors(validationErrors);
        console.log(validationErrors);
        return;
    }

    const apiPayload = {
        studentName: formData.name,
        age: parseInt(formData.age),
        nationalId: formData.nationalId,
        phoneNumber: formData.phone,
        placeOfWork: formData.workplace,
        job: formData.job,
        address: formData.residence,
        levelOfStudy: formData.degree,
        status: formData.status,
        lastSavingAmount: formData.memorizationLevel,
        examineTeacherName: formData.examineTeacherName,
        level: formData.level,
        actualAttendanceDate: formData.actualAttendanceDate,
        specifiedTime: formData.specifiedTime,
        instituteFees: formData.instituteFees,
        studentGroupId: formData.studentGroupId,
        receiptNumber: formData.receiptNumber,
        submissionDate: formData.submissionDate,
        receiver: formData.receiver,
    };

    try {
        if (editingStudent) {
            await axios.put(
                `http://localhost:8086/api/users/update-user/${editingStudent.id}`,
                apiPayload
            );
            alert('تم التعديل بنجاح');
        } else {
            await axios.post(
                'http://localhost:8086/api/users/register',
                apiPayload
            );
            alert('تم الإرسال بنجاح');
        }

        setFormData(emptyStudentData);
        handleClear();
        navigate("/dashboard");

    } catch (error) {
        console.log(error);
        alert('حدث خطأ أثناء الحفظ');
    }
};


    const handleClear = () => {
        setFormData(emptyStudentData);
        setErrors({});
    };

    return (
        <div dir="rtl" className="container my-5 border p-4 bg-light w-50" style={{ fontFamily: 'Cairo, sans-serif' }}>
            <h2 className={`mb-5 ${style.headTitle}`}>طلب التحاق</h2>
            <form className={`${style.formStyle}`}>
                <h3 className={`text-center pb-5 ${style.label}`}>بيانات الطالب</h3>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>اسم الطالب رباعي</label>
                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>السن</label>
                        <input type="text" className="form-control" name="age" value={formData.age} onChange={handleChange} />
                        {errors.age && <div className="text-danger">{errors.age}</div>}
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>الرقم القومي</label>
                        <input type="text" className="form-control" name="nationalId" value={formData.nationalId} onChange={handleChange} />
                        {errors.nationalId && <div className="text-danger">{errors.nationalId}</div>}
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>تاريخ التقديم</label>
                        <input type="date" className="form-control" name="submissionDate" value={formData.submissionDate} onChange={handleChange} />
                        {errors.submissionDate && <div className="text-danger">{errors.submissionDate}</div>}
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>رقم الهاتف</label>
                        <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
                        {errors.phone && <div className="text-danger">{errors.phone}</div>}
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>رقم المنزل</label>
                        <input type="text" className="form-control" name="homePhone" value={formData.homePhone} onChange={handleChange} />
                        {errors.homePhone && <div className="text-danger">{errors.homePhone}</div>}
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>الوظيفة</label>
                        <input type="text" className="form-control" name="job" value={formData.job} onChange={handleChange} />
                        {errors.job && <div className="text-danger">{errors.job}</div>}
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>جهة العمل</label>
                        <input type="text" className="form-control" name="workplace" value={formData.workplace} onChange={handleChange} />
                        {errors.workplace && <div className="text-danger">{errors.workplace}</div>}
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>عنوان الإقامة</label>
                        <input type="text" className="form-control" name="residence" value={formData.residence} onChange={handleChange} />
                        {errors.residence && <div className="text-danger">{errors.residence}</div>}
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>المؤهل الدراسي</label>
                        <input type="text" className="form-control" name="degree" value={formData.degree} onChange={handleChange} />
                        {errors.degree && <div className="text-danger">{errors.degree}</div>}
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>حالة الطالب</label>
                        <select
                            className="form-control"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="">-- اختر الحالة --</option>
                            <option value="ENROLLED_ACTIVE">مقيد/نشط</option>
                            <option value="TEMPORARILY_EXCLUDED">مستبعد مؤقت</option>
                            <option value="PENDING">قيد الانتظار</option>
                            <option value="ENROLLED">تم الالتحاق</option>
                            <option value="OVER_SIXTY">فوق الـ 60</option>
                            <option value="PERMANENTLY_EXCLUDED">مستبعد نهائي</option>
                            <option value="SUSPENDED">موقوف</option>
                        </select>
                        {errors.status && <div className="text-danger">{errors.status}</div>}
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>التوقيع</label>
                        <input type="text" className="form-control" name="signature" value={formData.signature} onChange={handleChange} />
                        {errors.signature && <div className="text-danger">{errors.signature}</div>}
                    </div>
                </div>
            </form>
            <form className={`${style.formStyle} my-4`}>
                <h3 className={`text-center pb-5 ${style.label}`}>بيانات اختبار القبول</h3>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>مقدار الحفظ السابق</label>
                        <input type="text" className="form-control" name="memorizationLevel" value={formData.memorizationLevel} onChange={handleChange} />
                        {errors.memorizationLevel && <div className="text-danger">{errors.memorizationLevel}</div>}
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>اسم الشيخ الممتحن</label>
                        <input type="text" className="form-control" name="examineTeacherName" value={formData.examineTeacherName} onChange={handleChange} />
                        {errors.examineTeacherName && <div className="text-danger">{errors.examineTeacherName}</div>}
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>مستوى الطالب</label>
                        <select
                            className="form-control"
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                        >
                            <option value="">-- اختر المستوى --</option>
                            <option value="ENROLLED_CTIVE">مقيد/نشط</option>
                            <option value="TEMPORARILY_EXCLUDED">مستبعد مؤقت</option>
                            <option value="TEMPORARILY_EXCLUDED">قيد الانتظار</option>
                            <option value="PERMANENTLY_EXCLUDED">مستبعد نهائي</option>
                            <option value="SUSPENDED">موقوف</option>
                        </select>
                        {errors.level && <div className="text-danger">{errors.level}</div>}
                    </div>
                </div>
            </form>
            <form className={`${style.formStyle} my-4`}>
                <h3 className={`text-center pb-5 ${style.label}`}>بيانات الادارة</h3>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>الوقت المحدد للحضور</label>
                        <input type="text" className="form-control" name="specifiedTime" value={formData.specifiedTime} onChange={handleChange} />
                        {errors.specifiedTime && <div className="text-danger">{errors.specifiedTime}</div>}
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>تاريخ الحضور الفعلي</label>
                        <input type="date" className="form-control" name="actualAttendanceDate" value={formData.actualAttendanceDate} onChange={handleChange} />
                        {errors.actualAttendanceDate && <div className="text-danger">{errors.actualAttendanceDate}</div>}
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>المجموعة</label>
                        <input type="text" className="form-control" name="studentGroupId" value={formData.studentGroupId} onChange={handleChange} />
                        {errors.studentGroupId && <div className="text-danger">{errors.studentGroupId}</div>}
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>الرسوم</label>
                        <input type="number" className="form-control" name="instituteFees" value={formData.instituteFees} onChange={handleChange} />
                        {errors.instituteFees && <div className="text-danger">{errors.instituteFees}</div>}
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>رقم الإيصال</label>
                        <input type="text" className="form-control" name="receiptNumber" value={formData.receiptNumber} onChange={handleChange} />
                        {errors.receiptNumber && <div className="text-danger">{errors.receiptNumber}</div>}
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className={`${style.label}`}>اسم المستلم</label>
                        <input type="text" className="form-control" name="receiver" value={formData.receiver} onChange={handleChange} />
                        {errors.receiver && <div className="text-danger">{errors.receiver}</div>}
                    </div>
                </div>
            </form>
            <div className="d-flex justify-content-center my-4 ">
                <button onClick={handleSubmit} className="btn btn-success mx-2">
                    {editingStudent ? 'تعديل' : 'إضافة / ترحيل'}
                </button>
                <button onClick={handleClear} type="button" className="btn btn-danger mx-2">تفريغ البيانات</button>
                {editingStudent && (
                    <div className="text-center mx-2">
                        <PDFDownloadLink
                            document={<StudentPdf student={editingStudent} />}
                            fileName={`${editingStudent.studentName}-بيانات.pdf`}
                            className="btn btn-primary"
                        >
                            بيانات الطالب PDF
                        </PDFDownloadLink>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RegistrationForm;

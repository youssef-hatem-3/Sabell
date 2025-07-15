import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font
} from "@react-pdf/renderer";
import cairoFont from "../../assets/fonts/Cairo-Regular.ttf";

Font.register({
    family: "Cairo",
    src: cairoFont,
});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Cairo',
        direction: 'rtl',
        textAlign: 'right',
    },
    section: {
        border: '1px solid #000',
        padding: 10,
        marginBottom: 10
    },
    heading: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 5,
        fontWeight: 'bold'
    },
    field: {
        fontSize: 12,
        marginBottom: 4,
        fontWeight: '800'
    },
    label: {
        fontWeight: '800'
    },
    footer: {
        marginTop: 20,
        fontSize: 12,
        textAlign: 'right'
    }
});

export default function StudentPdf({ student }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.heading}>طلب التحاق</Text>
                <Text style={styles.field}><Text style={styles.label}>تاريخ التقديم: </Text>{student.management?.submissionDate || '_________'}</Text>

                <View style={styles.section}>
                    <Text style={styles.heading}>بيانات الطالب</Text>
                    <Text style={styles.field}><Text style={styles.label}>اسم الطالب: </Text>{student.studentName}</Text>
                    <Text style={styles.field}><Text style={styles.label}>السن: </Text>{student.age}</Text>
                    <Text style={styles.field}><Text style={styles.label}>الرقم القومي: </Text>{student.nationalId}</Text>
                    <Text style={styles.field}><Text style={styles.label}>رقم الهاتف: </Text>{student.phoneNumber}</Text>
                    <Text style={styles.field}><Text style={styles.label}>المؤهل الدراسي: </Text>{student.levelOfStudy}</Text>
                    <Text style={styles.field}><Text style={styles.label}>جهة العمل: </Text>{student.placeOfWork}</Text>
                    <Text style={styles.field}><Text style={styles.label}>الوظيفة: </Text>{student.job}</Text>
                    <Text style={styles.field}><Text style={styles.label}>العنوان: </Text>{student.address}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>بيانات القبول</Text>
                    <Text style={styles.field}><Text style={styles.label}>مقدار الحفظ السابق: </Text>{student.acceptance?.lastSavingAmount}</Text>
                    <Text style={styles.field}><Text style={styles.label}>اسم الشيخ الممتحن: </Text>{student.acceptance?.examineTeacherName}</Text>
                    <Text style={styles.field}><Text style={styles.label}>مستوى الطالب: </Text>{student.acceptance?.level}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>بيانات الإدارة</Text>
                    <Text style={styles.field}><Text style={styles.label}>الوقت المحدد للحضور: </Text>{student.management?.specifiedTime}</Text>
                    <Text style={styles.field}><Text style={styles.label}>تاريخ الحضور الفعلي: </Text>{student.management?.actualAttendanceDate}</Text>
                    <Text style={styles.field}><Text style={styles.label}>المجموعة: </Text>{student.management?.studentGroupId}</Text>
                    <Text style={styles.field}><Text style={styles.label}>الرسوم: </Text>{student.management?.instituteFees}</Text>
                    <Text style={styles.field}><Text style={styles.label}>رقم الإيصال: </Text>{student.management?.receiptNumber}</Text>
                    <Text style={styles.field}><Text style={styles.label}>اسم المستلم: </Text>{student.management?.receiver}</Text>
                </View>

                <Text style={styles.footer}>.............................................. : مدير الدار</Text>
            </Page>
        </Document>
    );
}
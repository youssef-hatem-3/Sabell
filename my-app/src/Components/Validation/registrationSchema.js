import Joi from 'joi';

const registrationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'اسم الطالب مطلوب',
  }),
  age: Joi.number().integer().min(1).required().messages({
    'number.base': 'السن يجب أن يكون رقمًا و مطلوب',
    'number.min': 'السن يجب أن يكون على الأقل 1',
    'any.required': 'السن مطلوب',
  }),
  nationalId: Joi.string()
    .pattern(/^\d{14}$/)
    .required()
    .messages({
      'string.empty': 'الرقم القومي مطلوب',
      'string.pattern.base': 'الرقم القومي يجب أن يكون 14 رقم',
    }),
  phone: Joi.string()
    .pattern(/^01[0-9]{9}$/)
    .required()
    .messages({
      'string.empty': 'رقم الهاتف مطلوب',
      'string.pattern.base': 'رقم الهاتف يجب أن يكون رقم موبايل مصري صحيح',
    }),
  workplace: Joi.string().max(100).allow('').messages({
    'string.max': 'جهة العمل يجب ألا تزيد عن 100 حرف',
  }),
  job: Joi.string().max(100).allow('').messages({
    'string.max': 'المسمى الوظيفي يجب ألا يزيد عن 100 حرف',
  }),
  residence: Joi.string().max(255).allow('').messages({
    'string.max': 'عنوان الإقامة يجب ألا يزيد عن 255 حرف',
  }),
  degree: Joi.string().max(100).required().messages({
    'string.empty': 'المؤهل الدراسي مطلوب',
    'string.max': 'المؤهل الدراسي يجب ألا يزيد عن 100 حرف',
  }),
  status: Joi.string().valid('ACTIVE', 'TEMPORARILY_EXCLUDED', 'PERMANENTLY_EXCLUDED', 'SUSPENDED','PENDING', 'ENROLLED', 'OVER_SIXTY').required().messages({
    'any.only': 'الحالة غير صحيحة',
    'string.empty': 'حالة الطالب مطلوبة',
  }),

  memorizationLevel: Joi.string().required().messages({
    'string.empty': 'مقدار الحفظ السابق مطلوب',
  }),
  level: Joi.string().max(50).allow('').messages({
    'string.max': 'المستوى يجب ألا يزيد عن 50 حرف',
  }),
  examineTeacherName: Joi.string().max(100).required().messages({
    'string.empty': 'اسم الشيخ الممتحن مطلوب',
    'string.max': 'اسم الشيخ يجب ألا يزيد عن 100 حرف',
  }),
  actualAttendanceDate: Joi.date().greater('now').required().messages({
    'date.base': 'تاريخ الحضور غير صحيح',
    'date.greater': "تاريخ الحضور يجب أن يكون في المستقبل",
    'any.required': 'تاريخ الحضور مطلوب',
  }),
  submissionDate: Joi.date().greater('now').required().messages({
    'date.base': 'تاريخ التقديم غير صحيح',
    'date.greater': 'تاريخ التقديم يجب أن يكون بعد تاريخ اليوم',
    'any.required': 'تاريخ التقديم مطلوب'
  }),
  specifiedTime: Joi.string().max(50).required().messages({
    'string.empty': 'الوقت المحدد مطلوب',
    'string.max': 'الوقت المحدد يجب ألا يزيد عن 50 حرف',
  }),
  instituteFees: Joi.string().pattern(/^\d+(\.\d{1,2})?$/).required().messages({
    'string.empty': 'الرسوم مطلوبة',
    'string.pattern.base': 'الرسوم يجب أن تكون رقم صحيح أو عشري',
  }),
  studentGroupId: Joi.string().required().messages({
    'string.empty': 'رقم المجموعة مطلوب',
  }),
  receiptNumber: Joi.string().max(50).allow('').messages({
    'string.max': 'رقم الإيصال يجب ألا يزيد عن 50 حرف',
  }),
  receiver: Joi.string().max(100).required().messages({
    'string.empty': 'اسم المستلم مطلوب',
    'string.max': 'اسم المستلم يجب ألا يزيد عن 100 حرف',
  }),
  signature: Joi.string().allow(''), // اختياري
  homePhone: Joi.string().allow('')  // اختياري
});

export default registrationSchema;
